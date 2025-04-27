import React from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../store/hooks';
import Widget from './widgets/Widget';
import { Category as CategoryType } from '../types';

interface CategoryComponentProps {
  category: CategoryType;
  onAddWidget: (categoryId: string) => void;
}

const CategoryContainer = styled.div`
  margin-bottom: 20px;
`;

const CategoryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding-bottom: 6px;
  border-bottom: 1px solid #eee;
`;

const CategoryTitle = styled.h2`
  font-size: 1.1rem;
  margin: 0;
  color: #333;
  font-weight: 500;
`;

const WidgetsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const AddWidgetPlaceholder = styled.div`
  background-color: #f9f9f9;
  border: 2px dashed #ddd;
  border-radius: 8px;
  height: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: #f0f0f0;
    border-color: #ccc;
  }
`;

const PlusIcon = styled.div`
  font-size: 1.8rem;
  color: #aaa;
  margin-bottom: 8px;
`;

const AddText = styled.p`
  color: #888;
  margin: 0;
  font-size: 0.9rem;
`;

const EmptyCategory = styled.div`
  padding: 30px;
  background-color: #f9f9f9;
  border-radius: 8px;
  text-align: center;
  margin-bottom: 20px;
`;

const EmptyCategoryText = styled.p`
  color: #888;
  margin-bottom: 15px;
`;

const Category: React.FC<CategoryComponentProps> = ({ category, onAddWidget }) => {
  const widgets = useAppSelector((state) => {
    return category.widgets.map(id => state.dashboard.widgets[id]);
  });
  
  return (
    <CategoryContainer>
      <CategoryHeader>
        <CategoryTitle>{category.name}</CategoryTitle>
      </CategoryHeader>
      
      {widgets.length > 0 ? (
        <WidgetsGrid>
          {widgets.map(widget => (
            <Widget 
              key={widget.id}
              widget={widget}
              categoryId={category.id}
            />
          ))}
          <AddWidgetPlaceholder onClick={() => onAddWidget(category.id)}>
            <PlusIcon>+</PlusIcon>
            <AddText>Add Widget to {category.name}</AddText>
          </AddWidgetPlaceholder>
        </WidgetsGrid>
      ) : (
        <EmptyCategory>
          <EmptyCategoryText>No widgets in this category yet</EmptyCategoryText>
          <AddWidgetPlaceholder 
            onClick={() => onAddWidget(category.id)}
            style={{ 
              display: 'inline-flex', 
              width: '200px', 
              height: '150px', 
              margin: '0 auto' 
            }}
          >
            <PlusIcon>+</PlusIcon>
            <AddText>Add Widget to {category.name}</AddText>
          </AddWidgetPlaceholder>
        </EmptyCategory>
      )}
    </CategoryContainer>
  );
};

export default Category; 