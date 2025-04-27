import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { useAppDispatch } from '../store/hooks';
import { addWidget, addCategory, removeWidget } from '../store/dashboardSlice';
import { v4 as uuidv4 } from 'uuid';
import { Category as CategoryType, Widget } from '../types';

interface AddWidgetSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  categoryId: string;
  restrictedCategoryType?: CategoryType['type'];
  allCategories: CategoryType[];
  allWidgets: Record<string, Widget>;
}

const SidebarOverlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  opacity: ${props => props.isOpen ? 1 : 0};
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  transition: opacity 0.3s ease, visibility 0.3s ease;
`;

const SidebarContent = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  width: 40%;
  max-width: 90%;
  background-color: white;
  box-shadow: -2px 0 15px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  z-index: 1001;
  transform: ${props => props.isOpen ? 'translateX(0)' : 'translateX(100%)'};
  transition: transform 0.3s ease-in-out;
  overflow: hidden;
`;

const SidebarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background-color: #3f51b5;
  color: white;
  flex-shrink: 0;
`;

const SidebarTitle = styled.h2`
  margin: 0;
  font-size: 1.2rem;
  font-weight: 500;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: white;
  padding: 0;
  line-height: 1;
  
  &:hover {
    color: #ddd;
  }
`;

const SidebarBody = styled.div`
  display: flex;
  flex-grow: 1;
  overflow: hidden;
`;

const TabContainer = styled.div`
  width: 120px;
  background-color: #f5f5f7;
  border-right: 1px solid #eee;
  flex-shrink: 0;
  overflow-y: auto;
`;

const TabButton = styled.button<{ active: boolean }>`
  width: 100%;
  padding: 12px 15px;
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
  font-weight: ${props => props.active ? '600' : '400'};
  background-color: ${props => props.active ? '#fff' : 'transparent'};
  color: ${props => props.active ? '#333' : '#666'};
  border-left: ${props => props.active ? '3px solid #3f51b5' : '3px solid transparent'};
  
  &:hover {
    background-color: ${props => props.active ? '#fff' : '#e8e8e8'};
  }
`;

const ContentContainer = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  background-color: #fff;
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: #bbb;
  }
`;

const WidgetDescription = styled.p`
  color: #666;
  margin-bottom: 20px;
`;

const SearchContainer = styled.div`
  margin-bottom: 15px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 8px 12px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;
  
  &::placeholder {
    color: #999;
  }
  
  &:focus {
    outline: none;
    border-color: #3f51b5;
  }
`;

const CheckboxGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
`;

const CheckboxItem = styled.label`
  display: flex;
  align-items: center;
  padding: 10px 15px;
  border: 1px solid #eee;
  border-radius: 4px;
  cursor: pointer;
  background-color: #fff;
  
  &:hover {
    background-color: #f9f9f9;
  }
`;

const Checkbox = styled.input`
  margin-right: 10px;
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: #3f51b5;
  background-color: #fff;
  border: 1px solid #ccc;
`;

const CustomWidgetForm = styled.div`
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #eee;
`;

const FormTitle = styled.h3`
  font-size: 1rem;
  margin: 0 0 15px 0;
  color: #333;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-size: 0.9rem;
  color: #555;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px 12px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;
  
  &::placeholder {
    color: #999;
  }
  
  &:focus {
    outline: none;
    border-color: #3f51b5;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 8px 12px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;
  min-height: 80px;
  
  &::placeholder {
    color: #999;
  }
  
  &:focus {
    outline: none;
    border-color: #3f51b5;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 8px 12px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;
  
  &:focus {
    outline: none;
    border-color: #3f51b5;
  }
`;

const CategoryOptions = styled.div`
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #eee;
`;

const RadioGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const RadioItem = styled.label`
  display: flex;
  align-items: center;
  padding: 10px 15px;
  border: 1px solid #eee;
  border-radius: 4px;
  cursor: pointer;
  background-color: #fff;
  
  &:hover {
    background-color: #f9f9f9;
  }
`;

const Radio = styled.input`
  margin-right: 10px;
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: #3f51b5;
  background-color: #fff;
  border: 1px solid #ccc;
`;

const NewCategoryOption = styled.div`
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid #eee;
`;

const SidebarFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding: 15px 20px;
  border-top: 1px solid #eee;
  flex-shrink: 0;
`;

const Button = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
`;

const CancelButton = styled(Button)`
  background-color: #f5f5f5;
  color: #666;
  
  &:hover {
    background-color: #e0e0e0;
  }
`;

const ConfirmButton = styled(Button)`
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

const widgetOptions = {
  CSPM: [
    { id: 'cloud-accounts', label: 'Cloud Accounts' },
    { id: 'cloud-account-risk', label: 'Cloud Account Risk Assessment' },
    { id: 'compliance-posture', label: 'Compliance Posture' },
    { id: 'security-assessment', label: 'Security Assessment' }
  ],
  CWPP: [
    { id: 'namespace-alerts', label: 'Top 5 Namespace Specific Alerts' },
    { id: 'workload-alerts', label: 'Workload Alerts' },
    { id: 'runtime-alerts', label: 'Runtime Alerts' },
    { id: 'cluster-overview', label: 'Cluster Overview' }
  ],
  Image: [
    { id: 'image-risk', label: 'Image Risk Assessment' },
    { id: 'image-security', label: 'Image Security Issues' },
    { id: 'scan-results', label: 'Scan Results' },
    { id: 'vulnerabilities', label: 'Vulnerabilities' }
  ],
  Ticket: [
    { id: 'ticket-summary', label: 'Ticket Summary' },
    { id: 'open-tickets', label: 'Open Tickets' },
    { id: 'ticket-resolution', label: 'Ticket Resolution Time' },
    { id: 'tickets-category', label: 'Tickets by Category' }
  ]
};

type WidgetTabKey = keyof typeof widgetOptions;

interface WidgetData {
  type: 'donut' | 'bar' | 'line' | 'gauge' | 'text';
  data: {
    [key: string]: number | boolean | null;
  } | null;
}

const widgetDataMappings: Record<string, WidgetData> = {
  'cloud-accounts': {
    type: 'donut',
    data: {
      connected: 2,
      notConnected: 2,
      total: 4
    }
  },
  'cloud-account-risk': {
    type: 'donut',
    data: {
      passed: 7753,
      failed: 1689,
      warning: 681,
      notAvailable: 36,
      total: 9659
    }
  },
  'namespace-alerts': {
    type: 'bar',
    data: null
  },
  'workload-alerts': {
    type: 'line',
    data: null
  },
  'image-risk': {
    type: 'gauge',
    data: {
      critical: 9,
      high: 150,
      medium: 460,
      low: 851,
      total: 1470,
      vulnerabilities: true
    }
  },
  'image-security': {
    type: 'gauge',
    data: {
      critical: 2,
      high: 2,
      total: 2,
      images: true
    }
  },
  'ticket-summary': {
    type: 'donut',
    data: {
      open: 24,
      inProgress: 18,
      resolved: 42,
      closed: 16,
      total: 100
    }
  },
  'open-tickets': {
    type: 'donut',
    data: {
      critical: 5,
      high: 8,
      medium: 7,
      low: 4,
      total: 24
    }
  },
  'ticket-resolution': {
    type: 'bar',
    data: null
  },
  'tickets-category': {
    type: 'bar',
    data: null
  }
};

const AddWidgetSidebar: React.FC<AddWidgetSidebarProps> = ({ 
  isOpen, 
  onClose, 
  categoryId, 
  restrictedCategoryType, 
  allCategories,
  allWidgets 
}) => {
  const categories = allCategories;
  const widgets = allWidgets;
  const dispatch = useAppDispatch();

  const isModeA_RestrictedTyped = restrictedCategoryType && restrictedCategoryType !== 'General' && widgetOptions[restrictedCategoryType];
  const isModeB_RestrictedGeneral = restrictedCategoryType === 'General';
  const isModeC_Global = !restrictedCategoryType;
  
  const isEffectivelyRestricted = isModeA_RestrictedTyped;

  const getInitialTab = (): WidgetTabKey | 'Custom' => {
      if (isModeA_RestrictedTyped) return restrictedCategoryType;
      if (isModeB_RestrictedGeneral) return 'Custom'; 
      return 'CSPM';
  };
  const [currentTab, setCurrentTab] = useState<WidgetTabKey | 'Custom'>(getInitialTab());
  
  const [widgetsInSidebar, setWidgetsInSidebar] = useState<string[]>([]); 
  const [searchQuery, setSearchQuery] = useState('');
  const [modalSelectedCategoryId, setModalSelectedCategoryId] = useState(''); 
  const [createNewCategory, setCreateNewCategory] = useState(false); 
  const [newCategoryName, setNewCategoryName] = useState(''); 
  const [customWidgetTitle, setCustomWidgetTitle] = useState('');
  const [customWidgetType, setCustomWidgetType] = useState('text'); 
  const [customWidgetContent, setCustomWidgetContent] = useState('');

  const targetCatIdForDisplay = useMemo(() => {
    if (!isOpen) return ''; 
    if (restrictedCategoryType) return categoryId; 
    if (createNewCategory) return ''; 
    return modalSelectedCategoryId;
  }, [isOpen, restrictedCategoryType, categoryId, createNewCategory, modalSelectedCategoryId]);

  useEffect(() => {
    if (isOpen) {
      const initialTab = getInitialTab();
      setCurrentTab(initialTab);
      
      setSearchQuery('');
      setCustomWidgetTitle('');
      setCustomWidgetType('text');
      setCustomWidgetContent('');
      
      if (!isModeC_Global) {
         setModalSelectedCategoryId('');
         setCreateNewCategory(false);
         setNewCategoryName('');
      } else {
          let initialGlobalCatId = '';
          if (initialTab !== 'Custom') { 
             const matchingCategory = categories.find(cat => cat.type === initialTab);
             if (matchingCategory) initialGlobalCatId = matchingCategory.id;
          }
          setModalSelectedCategoryId(initialGlobalCatId);
          setCreateNewCategory(false);
          setNewCategoryName('');
      }

    } else { 
      setWidgetsInSidebar([]); 
      setModalSelectedCategoryId('');
      setCreateNewCategory(false);
      setNewCategoryName('');
    }
  }, [isOpen, restrictedCategoryType, categoryId, categories, isModeC_Global]); 

  useEffect(() => {
    if (isOpen) {
       if (!targetCatIdForDisplay) {
         setWidgetsInSidebar([]); 
       } else {
         const category = categories.find(c => c.id === targetCatIdForDisplay);
         if (category) {
            const currentWidgetObjects = category.widgets.map(id => widgets[id]).filter(Boolean);
            const currentActualOptionIds = currentWidgetObjects.map(widget => {
              const matchedOption = Object.values(widgetOptions).flat().find(opt => opt.label === widget.title);
              return matchedOption?.id;
            }).filter((id): id is string => !!id); 
            setWidgetsInSidebar(currentActualOptionIds);
         } else {
            setWidgetsInSidebar([]); 
         }
       }
    }
  }, [isOpen, targetCatIdForDisplay, categories, widgets]); 

  if (!isOpen) return null;

  const handleTabChange = (tab: WidgetTabKey | 'Custom') => {
    if (!isEffectivelyRestricted) { 
       setCurrentTab(tab);
       setSearchQuery(''); 
       if (isModeC_Global && tab !== 'Custom') {
            const matchingCategory = categories.find(cat => cat.type === tab);
            setModalSelectedCategoryId(matchingCategory ? matchingCategory.id : '');
            setCreateNewCategory(false); 
       }
    } else if (tab === restrictedCategoryType) {
        setCurrentTab(tab);
    }
  };

  const handleCheckboxChange = (widgetId: string) => {
    setWidgetsInSidebar(prev => {
      if (prev.includes(widgetId)) { return prev.filter(id => id !== widgetId); } 
      else { return [...prev, widgetId]; }
    });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isModeC_Global) return;
    const value = e.target.value;
    if (value === 'new') {
      setCreateNewCategory(true);
      setModalSelectedCategoryId(''); 
    } else {
      setCreateNewCategory(false);
      setModalSelectedCategoryId(value); 
    }
  };
  
  const createCategory = (): string => {
    if (!newCategoryName.trim()) return '';
    const newCategoryId = `category-${uuidv4().slice(0, 8)}`;
    dispatch(addCategory({
      id: newCategoryId,
      name: newCategoryName.trim(),
      widgets: [],
      type: 'General' 
    }));
    return newCategoryId;
  };

  const handleAddCustomWidget = (targetCategoryId: string) => {
    if (!customWidgetTitle.trim() || !targetCategoryId) {
      console.error("Custom widget title or target category ID missing.");
      return;
    } 
    
    const newWidgetId = `widget-${uuidv4().slice(0, 8)}`;
    const type = customWidgetType;

    dispatch(addWidget({
        widget: {
            id: newWidgetId,
            title: customWidgetTitle,
            type: type, 
            data: null,
            content: customWidgetContent 
        },
        categoryId: targetCategoryId
    }));
    
    onClose();
  };

  const handleConfirm = () => {
    let finalTargetCategoryId = '';

    if (isModeA_RestrictedTyped || isModeB_RestrictedGeneral) {
      finalTargetCategoryId = categoryId;
    } else { 
      if (createNewCategory) {
        if (newCategoryName.trim()) { finalTargetCategoryId = createCategory(); }
         else { console.error("New category name empty."); return; }
      } else {
        finalTargetCategoryId = modalSelectedCategoryId;
      }
    }

    if (!finalTargetCategoryId) {
      console.error("No target category ID for confirmation.");
      return;
    }

    if (currentTab === 'Custom') {
      if (isModeA_RestrictedTyped) { 
         console.warn("Cannot add custom widget when restricted to specific type."); return; 
      }
      handleAddCustomWidget(finalTargetCategoryId);
      return;
    }
    
    const category = categories.find(c => c.id === finalTargetCategoryId);
    const currentWidgetObjects = category ? category.widgets.map(id => widgets[id]).filter(Boolean) : [];
    const currentActualOptionIds = currentWidgetObjects.map(widget => {
      return Object.values(widgetOptions).flat().find(opt => opt.label === widget.title)?.id;
    }).filter((id): id is string => !!id);

    const widgetsToAdd = widgetsInSidebar.filter(id => !currentActualOptionIds.includes(id));
    const widgetsToRemove = currentActualOptionIds.filter(id => !widgetsInSidebar.includes(id));

    widgetsToRemove.forEach(optionId => {
      const option = Object.values(widgetOptions).flat().find(opt => opt.id === optionId);
      if (option) {
          const widgetObjectToRemove = currentWidgetObjects.find(w => w?.title === option.label);
          if (widgetObjectToRemove) {
              dispatch(removeWidget({ widgetId: widgetObjectToRemove.id, categoryId: finalTargetCategoryId }));
          }
      }
    });
    widgetsToAdd.forEach(optionId => {
      const option = Object.values(widgetOptions).flat().find(opt => opt.id === optionId);
      if (option) {
        const alreadyExists = currentWidgetObjects.some(w => w?.title === option.label);
        if (alreadyExists && !widgetsToRemove.includes(optionId)) { 
            console.warn(`Widget "${option.label}" already exists. Skipping.`);
            return;
        }
        const newWidgetId = `widget-${uuidv4().slice(0, 8)}`;
        const mapping = widgetDataMappings[optionId] || { type: 'donut', data: null }; 
        dispatch(addWidget({
          widget: { id: newWidgetId, title: option.label, type: mapping.type, data: mapping.data },
          categoryId: finalTargetCategoryId,
        }));
      }
    });

    setTimeout(() => { onClose(); }, 100); 
  };

  const filteredWidgetOptions = () => {
    if (currentTab === 'Custom') return [];
    if (!widgetOptions[currentTab as WidgetTabKey]) return []; 
    return widgetOptions[currentTab as WidgetTabKey]
      .filter(widget => widget.label.toLowerCase().includes(searchQuery.toLowerCase()));
  };

  const getTabDescription = () => {
    const tabKey = currentTab as WidgetTabKey; 
    if (currentTab === 'Custom') {
      return 'Create a custom widget with your own title and content.';
    } else if (widgetOptions[tabKey]) {
      switch (tabKey) {
        case 'CSPM':
          return 'Cloud Security Posture Management widgets provide insights into your cloud security status.';
        case 'CWPP':
          return 'Cloud Workload Protection Platform widgets show metrics related to your workloads and containers.';
        case 'Image':
          return 'Image scanning widgets display vulnerability and security issues found in container images.';
        case 'Ticket':
          return 'Ticket management widgets help track and manage security and compliance issues.';
        default:
          return '';
      }
    } 
    return '';
  };

  const displayTabs: Array<WidgetTabKey | 'Custom'> = isEffectivelyRestricted
      ? [restrictedCategoryType as WidgetTabKey] 
      : ['CSPM', 'CWPP', 'Image', 'Ticket', 'Custom'];

  return (
    <SidebarOverlay isOpen={isOpen} onClick={onClose}>
      <SidebarContent isOpen={isOpen} onClick={e => e.stopPropagation()}>
        <SidebarHeader>
          <SidebarTitle>Add Widget</SidebarTitle>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </SidebarHeader>
        <SidebarBody>
          <TabContainer>
            {displayTabs.map(tabKey => (
                 <TabButton 
                    key={tabKey}
                    active={currentTab === tabKey} 
                    onClick={() => handleTabChange(tabKey)}
                    disabled={isEffectivelyRestricted && tabKey !== restrictedCategoryType}
                    style={isEffectivelyRestricted && tabKey !== restrictedCategoryType ? { cursor: 'not-allowed', opacity: 0.5 } : {}}
                 >
                 {tabKey}
                 </TabButton>
            ))}
          </TabContainer>
          <ContentContainer>
            <WidgetDescription>{getTabDescription()}</WidgetDescription>
            
            {currentTab !== 'Custom' ? (
                <>
                  <SearchContainer>
                    <SearchInput
                      type="text"
                      placeholder="Search widgets"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </SearchContainer>
                  <CheckboxGroup>
                    {filteredWidgetOptions().map(option => {
                      const isChecked = widgetsInSidebar.includes(option.id);
                      return (
                        <CheckboxItem key={option.id}>
                          <Checkbox
                            type="checkbox"
                            checked={isChecked} 
                            onChange={() => handleCheckboxChange(option.id)}
                          />
                          {option.label}
                        </CheckboxItem>
                      );
                    })}
                    {filteredWidgetOptions().length === 0 && (
                      <div style={{ padding: '10px', color: '#888', textAlign: 'center', backgroundColor: '#fff', borderRadius: '4px' }}>
                        No widgets match your search.
                      </div>
                    )}
                  </CheckboxGroup>
               </>
             ) : (
               <>
                 {isModeC_Global && (
                   <CategoryOptions>
                     <FormTitle>Add to Category</FormTitle>
                     <RadioGroup>
                       {categories.map(category => (
                         <RadioItem key={category.id}>
                           <Radio 
                             type="radio" 
                             name="category" 
                             value={category.id}
                             checked={modalSelectedCategoryId === category.id && !createNewCategory}
                             onChange={handleCategoryChange}
                           />
                           {category.name}
                         </RadioItem>
                       ))}
                       <RadioItem>
                         <Radio 
                           type="radio" 
                           name="category" 
                           value="new"
                           checked={createNewCategory}
                           onChange={handleCategoryChange}
                         />
                         Create New Category
                       </RadioItem>
                     </RadioGroup>
                     {createNewCategory && (
                       <NewCategoryOption>
                         <FormGroup>
                           <Label>New Category Name</Label>
                           <Input 
                             type="text" 
                             placeholder="Enter category name"
                             value={newCategoryName}
                             onChange={(e) => setNewCategoryName(e.target.value)}
                             style={{ backgroundColor: '#fff' }}
                           />
                         </FormGroup>
                       </NewCategoryOption>
                     )}
                   </CategoryOptions>
                 )} 

                 {!isModeA_RestrictedTyped ? (
                     <CustomWidgetForm>
                       <FormTitle>Create Custom Widget</FormTitle>
                       
                       <FormGroup>
                         <Label>Widget Title</Label>
                         <Input
                           type="text"
                           placeholder="Enter widget title"
                           value={customWidgetTitle}
                           onChange={(e) => setCustomWidgetTitle(e.target.value)}
                           style={{ backgroundColor: '#fff' }}
                         />
                       </FormGroup>
                       
                       <FormGroup>
                         <Label>Widget Type</Label>
                         <Select
                           value={customWidgetType}
                           onChange={(e) => setCustomWidgetType(e.target.value)}
                           style={{ backgroundColor: '#fff' }}
                         >
                           <option value="donut">Donut Chart</option>
                           <option value="bar">Bar Chart</option>
                           <option value="line">Line Chart</option>
                           <option value="gauge">Gauge Chart</option>
                           <option value="text">Text</option>
                         </Select>
                       </FormGroup>
                       
                       <FormGroup>
                         <Label>Widget Content (optional)</Label>
                         <Textarea
                           rows={4}
                           placeholder="Enter widget description or content"
                           value={customWidgetContent}
                           onChange={(e) => setCustomWidgetContent(e.target.value)}
                           style={{ backgroundColor: '#fff' }}
                         />
                       </FormGroup>
                     </CustomWidgetForm>
                 ) : (
                     <div style={{ padding: '20px', color: '#888', textAlign: 'center' }}>
                         Cannot add custom widgets when restricted to a specific category type.
                     </div>
                 )}
               </>
            )}
          </ContentContainer>
        </SidebarBody>
        <SidebarFooter>
            <CancelButton onClick={onClose}>Cancel</CancelButton>
            <ConfirmButton 
                onClick={handleConfirm}
                disabled={ 
                (
                    isModeC_Global && createNewCategory && !newCategoryName.trim()
                ) || 
                (
                    isModeC_Global && currentTab === 'Custom' && !modalSelectedCategoryId && !createNewCategory
                ) || 
                (
                    isModeC_Global && currentTab === 'Custom' && !customWidgetTitle.trim()
                ) ||
                (
                    isModeC_Global && currentTab !== 'Custom' && !modalSelectedCategoryId
                )
                }
            >
                Confirm Changes
            </ConfirmButton>
        </SidebarFooter>
      </SidebarContent>
    </SidebarOverlay>
  );
};

export default AddWidgetSidebar; 