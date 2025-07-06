import styled from 'styled-components';

export const NewsCardWrapper = styled.div`
  display: flex;
  gap: 16px;
  padding: 16px;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
  transition: background-color 0.2s;
  align-items: flex-start;
  

  &:hover {
    background-color: #f5f5f5;
  }
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center; /* căn giữa hình ảnh */
    text-align: center;
  }
`;

export const NewsCardImage = styled.img`
  width: 200px;
  height: 120px;
  object-fit: cover;
  border-radius: 4px;
  @media (max-width: 768px) {
    width: 100%;
    max-width: 300px;
    height: auto;
  }
`;

export const NewsCardContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1; /* để content kéo dài đều nhau */
  padding: 16px;
  @media (max-width: 768px) {
    padding: 12px 0;
  }
`;

export const NewsCardTitle = styled.h3`
  margin: 0 0 8px 0;
  font-size: 18px;
  font-weight: 700;
  color: #006400;
`;

export const NewsCardDescription = styled.p`
  font-size: 15px;
  color: #444;
  margin: 0 0 10px 0;
  line-height: 1.4;

  display: -webkit-box;
  -webkit-line-clamp: 1;        /* Hiển thị 3 dòng */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;


  word-break: break-word;
  overflow-wrap: break-word;

  img, table, pre, code {
    display: none !important;   /* Ẩn những thành phần HTML "nặng" khi rút gọn */
  }
`;

export const NewsCardAction = styled.div`
  font-size: 14px;
  color: #1890ff;
  display: flex;
  align-items: center;
  gap: 4px;
  font-weight: 500;
`;
