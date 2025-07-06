import React from 'react';
import styled from 'styled-components';

// Định dạng cho các thành phần của bộ lọc danh mục
export const CategoryWrapper = styled.div`
    display: flex;
    gap: 24px;
    margin-bottom: 24px;
    padding: 16px;
`;

// Định dạng cho từng mục danh mục
export const CategoryItem = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'active',
})`
  font-size: 25px;
  font-weight: ${({ active }) => (active ? '700' : '400')};
  color: ${(props) => (props.active ? '#00AEEF' : '#000')};
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    color: #00AEEF;
  }
`;