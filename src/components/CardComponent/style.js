import styled from 'styled-components';
import { Card } from 'antd';

export const StyledCard = styled(Card)`
  width: 100%;
  max-width: 100%;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  & .ant-card-body {
    padding: 12px;
  }

  & .ant-card-meta-title {
    font-size: 16px;
    font-weight: 600;
  }
`;

export const StyledImage = styled.img`
  width: 100%;
  height: 160px;
  object-fit: cover;
  display: block;
  transition: transform 0.3s ease, filter 0.3s ease;
  
  //Hiệu ứng hover
  ${StyledCard}:hover & {
    transform: scale(1.05);
    filter: brightness(1.1);
  }
`;

export const StyledDescription = styled.p`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #555;
  margin: 0;
  font-size: 13px;
  display: -webkit-box; // Hiển thị dưới dạng box
  -webkit-line-clamp: 2; // Hiển thị tối đa 3 dòng
  -webkit-box-orient: vertical; // Định hướng box theo chiều dọc
  height: 2em; // Chiều cao tương ứng với 3 dòng (3 * 1.5em)
`;
