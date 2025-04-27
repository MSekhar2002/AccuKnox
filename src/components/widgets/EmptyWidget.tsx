import React from 'react';
import styled from 'styled-components';

interface EmptyWidgetProps {
  message?: string;
  content?: string;
}

const EmptyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 20px;
  text-align: center;
  color: #888;
`;

const Icon = styled.div`
  margin-bottom: 15px;
  font-size: 2rem;
  color: #ccc;
`;

const Message = styled.p`
  margin: 0;
  font-size: 0.9rem;
`;

const ContentContainer = styled.div`
  height: 100%;
  padding: 15px;
  overflow-y: auto;
  font-size: 0.9rem;
  color: #555;
  line-height: 1.5;
`;

const EmptyWidget: React.FC<EmptyWidgetProps> = ({ message, content }) => {
  if (content) {
    return (
      <ContentContainer>
        {content}
      </ContentContainer>
    );
  }

  return (
    <EmptyContainer>
      <Icon>
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5-1.95 0-4.05.4-5.5 1.5v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1zm0 13.5c-1.1-.35-2.3-.5-3.5-.5-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5 1.2 0 2.4.15 3.5.5v11.5z" fill="currentColor"/>
        </svg>
      </Icon>
      <Message>
        {message || 'No widget data available'}
      </Message>
    </EmptyContainer>
  );
};

export default EmptyWidget; 