import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { addCategory, resetDashboard } from '../store/dashboardSlice';
import Category from './Category';
import AddWidgetSidebar from './AddWidgetSidebar';
import { v4 as uuidv4 } from 'uuid';
import { Category as CategoryType } from '../types';

const DashboardContainer = styled.div`
  padding: 20px;
  max-width: 1400px;
  margin: 0 auto;
`;

const DashboardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const DashboardTitle = styled.h1`
  font-size: 1.2rem;
  margin: 0;
  color: #333;
  font-weight: 500;
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ActionButton = styled.button`
  background-color: #fff;
  color: #333;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 6px 12px;
  display: flex;
  align-items: center;
  cursor: pointer;
  font-weight: 400;
  font-size: 0.85rem;
  transition: all 0.2s;
  
  &:hover {
    background-color: #f5f5f5;
  }
  
  svg {
    margin-right: 5px;
  }
`;

const IconButton = styled.button`
  background-color: #fff;
  color: #666;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  padding: 0;
  
  &:hover {
    background-color: #f5f5f5;
  }
`;

const TimeRangeSelect = styled.div`
  padding: 6px 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  color: #333;
  cursor: pointer;
  gap: 5px;
  user-select: none;
  
  svg {
    flex-shrink: 0;
  }
`;

const EmptyState = styled.div`
  padding: 40px;
  text-align: center;
  background-color: #f9f9f9;
  border-radius: 8px;
  margin-top: 20px;
`;

const EmptyStateTitle = styled.h3`
  margin-bottom: 10px;
  color: #666;
`;

const EmptyStateDescription = styled.p`
  color: #888;
  margin-bottom: 20px;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 10;
  min-width: 150px;
  margin-top: 4px;
`;

const DropdownItem = styled.button`
  display: block;
  width: 100%;
  padding: 8px 12px;
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
  font-size: 0.85rem;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: 8px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  padding: 20px;
`;

const ModalTitle = styled.h2`
  margin: 0 0 20px 0;
  font-size: 1.2rem;
  color: #333;
`;

const ModalForm = styled.div`
  margin-bottom: 20px;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 5px;
  font-size: 0.9rem;
  color: #555;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;
  
  &:focus {
    outline: none;
    border-color: #1a237e;
  }
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const ModalButton = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
`;

const CancelButton = styled(ModalButton)`
  background-color: #f5f5f5;
  color: #666;
  
  &:hover {
    background-color: #e0e0e0;
  }
`;

const SaveButton = styled(ModalButton)`
  background-color: #3f51b5;
  color: white;
  
  &:hover {
    background-color: #303f9f;
  }
  
  &:disabled {
    background-color: #c5cae9;
    cursor: not-allowed;
  }
`;

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const [widgetModalOpen, setWidgetModalOpen] = useState(false);
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [restrictedType, setRestrictedType] = useState<CategoryType['type'] | undefined>(undefined);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [isTimeDropdownOpen, setIsTimeDropdownOpen] = useState(false);
  const [selectedTimeRange, setSelectedTimeRange] = useState('Last 2 days');
  const timeRangeRef = useRef<HTMLDivElement>(null); 
  
  const categories = useAppSelector(state => state.dashboard.categories);
  const searchQuery = useAppSelector(state => state.dashboard.searchQuery);
  const widgets = useAppSelector(state => state.dashboard.widgets);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (timeRangeRef.current && !timeRangeRef.current.contains(event.target as Node)) {
        setIsTimeDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const filteredCategories = categories.filter(category => {
    if (!searchQuery) return true;
    
    if (category.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return true;
    }
    
    return category.widgets.some(widgetId => {
      const widget = widgets[widgetId];
      return widget && widget.title.toLowerCase().includes(searchQuery.toLowerCase());
    });
  });
  
  const handleAddWidget = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    setSelectedCategoryId(categoryId);
    setRestrictedType(category?.type);
    setWidgetModalOpen(true);
  };

  const handleGlobalAddWidget = () => {
    console.log("handleGlobalAddWidget called");
    setSelectedCategoryId('');
    setRestrictedType(undefined);
    setWidgetModalOpen(true);
  };
  
  const handleAddCategory = () => {
    setCategoryModalOpen(true);
  };
  
  const handleCreateCategory = () => {
    if (!newCategoryName.trim()) return;
    
    const newCategoryId = `category-${uuidv4().slice(0, 8)}`;
    
    dispatch(addCategory({
      id: newCategoryId,
      name: newCategoryName.trim(),
      widgets: [],
      type: 'General'
    }));
    
    setNewCategoryName('');
    setCategoryModalOpen(false);
  };
  
  const handleRefresh = () => {
      if (window.confirm('Are you sure you want to reset the dashboard to its initial state?')) {
        dispatch(resetDashboard());
      }
  };

  const handleTimeRangeChange = (range: string) => {
    setSelectedTimeRange(range);
    setIsTimeDropdownOpen(false);
    console.log("Time range selected:", range);
  };

  const timeRangeOptions = [
      "Last 1 hour",
      "Last 6 hours",
      "Last 24 hours",
      "Last 2 days",
      "Last 7 days",
      "Last 30 days",
  ];

  return (
    <DashboardContainer>
      <DashboardHeader>
        <DashboardTitle>CNAPP Dashboard</DashboardTitle>
        <HeaderActions>
          <ActionButton 
            onClick={handleAddCategory}
            title="Create a new category"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 6h-8l-2-2H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm0 12H4V6h5.17l2 2H20v10zm-8-4h2v2h2v-2h2v-2h-2v-2h-2v2h-2z" fill="currentColor"/>
            </svg>
            New Category
          </ActionButton>
          <ActionButton 
            onClick={handleGlobalAddWidget}
            disabled={categories.length === 0}
            title={categories.length === 0 ? "No categories available" : "Add widget to category"}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" fill="currentColor"/>
            </svg>
            Add Widget To Category
          </ActionButton>
          <IconButton onClick={handleRefresh} title="Reset Dashboard">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46A7.93 7.93 0 0020 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74A7.93 7.93 0 004 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z" fill="currentColor"/>
            </svg>
          </IconButton>
          <IconButton title="More Options">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" fill="currentColor"/>
            </svg>
          </IconButton>
          <div style={{ position: 'relative' }} ref={timeRangeRef}> 
            <TimeRangeSelect onClick={() => setIsTimeDropdownOpen(!isTimeDropdownOpen)}>
                 <svg width="16" height="16" viewBox="0 0 24 24" fill="#3f51b5" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                 </svg>
                 {selectedTimeRange} 
                 <svg width="10" height="10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: isTimeDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
                    <path d="M7 10l5 5 5-5z" fill="currentColor"/>
                 </svg>
            </TimeRangeSelect>
            {isTimeDropdownOpen && (
              <DropdownMenu>
                {timeRangeOptions.map(option => (
                  <DropdownItem
                    key={option}
                    onClick={() => handleTimeRangeChange(option)}
                  >
                    {option}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            )}
           </div>
        </HeaderActions>
      </DashboardHeader>
      
      {filteredCategories.length > 0 ? (
        filteredCategories.map(category => (
          <Category
            key={category.id}
            category={category}
            onAddWidget={() => handleAddWidget(category.id)}
          />
        ))
      ) : (
        searchQuery ? (
           <EmptyState>
              <EmptyStateTitle>No results found</EmptyStateTitle>
              <EmptyStateDescription>
                No categories or widgets match your search query: "{searchQuery}"
              </EmptyStateDescription>
           </EmptyState>
        ) : (
           <EmptyState>
              <EmptyStateTitle>No dashboard categories available</EmptyStateTitle>
              <EmptyStateDescription>
                Click the "New Category" button to create your first category.
              </EmptyStateDescription>
              <ActionButton onClick={handleAddCategory}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 6h-8l-2-2H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm0 12H4V6h5.17l2 2H20v10zm-8-4h2v2h2v-2h2v-2h-2v-2h-2v2h-2z" fill="currentColor"/>
                </svg>
                Create New Category
              </ActionButton>
           </EmptyState>
        )
      )}
      
      <AddWidgetSidebar
        isOpen={widgetModalOpen}
        onClose={() => { 
            setWidgetModalOpen(false); 
        }}
        categoryId={selectedCategoryId}
        restrictedCategoryType={restrictedType}
        allCategories={categories}
        allWidgets={widgets}
      />
      
      {categoryModalOpen && (
        <ModalOverlay>
            <ModalContent> 
                <ModalTitle>Create New Category</ModalTitle>
                <ModalForm>
                  <FormLabel>Category Name</FormLabel>
                  <FormInput 
                      type="text"
                      placeholder="Enter category name"
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                  />
                </ModalForm>
                <ModalActions>
                  <CancelButton onClick={() => {
                      setNewCategoryName('');
                      setCategoryModalOpen(false);
                  }}>
                      Cancel
                  </CancelButton>
                  <SaveButton 
                      onClick={handleCreateCategory}
                      disabled={!newCategoryName.trim()}
                  >
                      Create
                  </SaveButton>
                </ModalActions>
            </ModalContent>
        </ModalOverlay>
      )}
    </DashboardContainer>
  );
};

export default Dashboard; 