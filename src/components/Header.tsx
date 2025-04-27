import React from 'react';
import styled from 'styled-components';
import SearchBar from './SearchBar';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  background-color: #fff;
  border-bottom: 1px solid #eee;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const Logo = styled.div`
  font-size: 0.9rem;
  color: #555;
  display: flex;
  align-items: center;
`;

const Separator = styled.span`
  margin: 0 8px;
  color: #ccc;
`;

const DashboardTitle = styled.span`
  color: #444;
  font-weight: 500;
  font-size: 0.9rem;
`;

const ProfileButton = styled.button`
  background: none;
  border: none;
  padding: 5px;
  cursor: pointer;
  color: #777;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  justify-content: center;
  
  &:hover {
    background-color: #f5f5f5;
  }
`;

const NotificationButton = styled(ProfileButton)``;

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <LeftSection>
        <Logo>Home</Logo>
        <Separator>›</Separator>
        <DashboardTitle>Dashboard V2</DashboardTitle>
      </LeftSection>
      <RightSection>
        <SearchBar />
        <ProfileButton>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-4-8v2h8v-2H8zm0-3v2h8V11H8zm0-3v2h8V8H8z" fill="currentColor"/>
          </svg>
        </ProfileButton>
        <NotificationButton>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C13.1 22 14 21.1 14 20H10C10 21.1 10.9 22 12 22ZM18 16V11C18 7.93 16.36 5.36 13.5 4.68V4C13.5 3.17 12.83 2.5 12 2.5C11.17 2.5 10.5 3.17 10.5 4V4.68C7.63 5.36 6 7.92 6 11V16L4 18V19H20V18L18 16Z" fill="currentColor"/>
          </svg>
        </NotificationButton>
        <ProfileButton>
          <div style={{ 
            width: '24px', 
            height: '24px', 
            borderRadius: '50%', 
            backgroundColor: '#3f51b5', 
            color: 'white', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            fontSize: '14px'
          }}>
            U
          </div>
        </ProfileButton>
      </RightSection>
    </HeaderContainer>
  );
};

export default Header; 