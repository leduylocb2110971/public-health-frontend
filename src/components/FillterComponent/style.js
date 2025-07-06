import React from 'react';
import { Checkbox, Spin } from 'antd';
import styled from 'styled-components';

export const FilterWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
  margin-bottom: 24px;
`;

export const Title = styled.h3`
  flex-basis: 100%; /* Để tiêu đề chiếm nguyên hàng */
  margin: 0 0 8px 0;
  font-weight: 600;
  font-size: 1.2rem;
  color: #333;
`;

export const StyledCheckboxGroup = styled(Checkbox.Group)`
  display: flex !important;
  flex-direction: column !important;
  gap: 8px;

  .ant-checkbox-wrapper {
    margin-inline-start: 0 !important; /* Xóa khoảng cách thừa mặc định */
  }
`;

