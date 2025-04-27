import React from 'react';
import styled from 'styled-components';
import { useAppDispatch } from '../../store/hooks';
import { removeWidget } from '../../store/dashboardSlice';
import DonutChart from './DonutChart';
import EmptyWidget from './EmptyWidget';
import GaugeChart from './GaugeChart';
import { Widget as WidgetType } from '../../types';

interface WidgetProps {
  widget: WidgetType;
  categoryId: string;
}

const WidgetContainer = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  padding: 15px;
  position: relative;
  height: 250px;
`;

const WidgetHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const WidgetTitle = styled.h3`
  margin: 0;
  font-size: 0.95rem;
  color: #333;
  font-weight: 500;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
  font-size: 1.2rem;
  padding: 5px;
  &:hover {
    color: #ff4500;
  }
`;

const WidgetContent = styled.div`
  height: calc(100% - 30px);
`;

const Widget: React.FC<WidgetProps> = ({ widget, categoryId }) => {
  const dispatch = useAppDispatch();
  
  const handleRemove = () => {
    dispatch(removeWidget({ widgetId: widget.id, categoryId }));
  };
  
  const renderContent = () => {
    if (widget.type === 'text') {
      return <EmptyWidget content={widget.content || 'No content provided'} />;
    }
    
    if (!widget.data) {
      return <EmptyWidget message={`No data available for this ${widget.type} chart`} />;
    }
    
    switch (widget.type) {
      case 'donut':
        return <DonutChart title={widget.title} data={widget.data} />;
      case 'gauge':
        return <GaugeChart title={widget.title} data={widget.data} />;
      case 'bar':
      case 'line':
        return <EmptyWidget message={`${widget.type.charAt(0).toUpperCase() + widget.type.slice(1)} chart coming soon!`} />;
      default:
        return <EmptyWidget message="Unknown widget type" />;
    }
  };
  
  return (
    <WidgetContainer>
      <WidgetHeader>
        <WidgetTitle>{widget.title}</WidgetTitle>
        <RemoveButton onClick={handleRemove} title="Remove widget">×</RemoveButton>
      </WidgetHeader>
      <WidgetContent>
        {renderContent()}
      </WidgetContent>
    </WidgetContainer>
  );
};

export default Widget; 