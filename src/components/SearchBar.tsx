import React from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setSearchQuery } from '../store/dashboardSlice';

const SearchContainer = styled.div`
  position: relative;
  width: 240px;
  height: 32px;
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 100%;
  padding: 0 10px 0 35px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 20px;
  font-size: 0.8rem;
  color: #555;
  
  &::placeholder {
    color: #999;
  }
  
  &:focus {
    outline: none;
    border-color: #3f51b5;
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 12px;
  color: #999;
  display: flex;
  align-items: center;
  pointer-events: none;
`;

const SearchBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const searchQuery = useAppSelector(state => state.dashboard.searchQuery);
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };
  
  return (
    <SearchContainer>
      <SearchIcon>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34 6.5 6.5 0 1 0-6.5 6.5c2.24 0 4.22-1.32 5.34-3.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" fill="currentColor"/>
        </svg>
      </SearchIcon>
      <SearchInput
        type="text"
        placeholder="Search anything..."
        value={searchQuery}
        onChange={handleSearchChange}
      />
    </SearchContainer>
  );
};

export default SearchBar; 