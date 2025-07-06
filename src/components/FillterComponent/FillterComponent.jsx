import React from 'react';
import { Checkbox, Spin } from 'antd';
import {
    FilterWrapper,
    Title,
    StyledCheckboxGroup
} from './style';

const FillterComponent = ({ list, selected, onChange, isLoading, title }) => {
  return (
    <FilterWrapper>
      <Title>{title}</Title>
      {isLoading ? (
        <Spin />
      ) : (
        <StyledCheckboxGroup
          options={list.map(s => ({ label: s.name, value: s._id }))}
          value={selected}
          onChange={onChange}
        />
      )}
    </FilterWrapper>
  );
};

export default FillterComponent;