// SearchPageStyle.js
import styled from 'styled-components';
import { Typography } from 'antd';

export const Wrapper = styled.div`
  background: #f5f7fa;
  min-height: 100vh;
  padding: 40px 0;
`;

export const Container = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: 0 16px;

`;

export const SearchBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
  gap: 12px;
  padding: 40px 10px 0; // 👈 padding top 24px
`;

export const FilterWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const ResultBox = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  padding: 24px;
`;

export const ResultHeader = styled(Typography.Title)`
  && {
  
    font-size: 20px;
    margin-bottom: 8px;
  }
`;

export const Paragraph = styled(Typography.Paragraph)`
  color: #888;
`;

export const DoctorList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 20px;
  margin-top: 16px;
`;

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 32px;
`;
