import styled from "styled-components";

export const WrapperSection = styled.section`
  padding: 60px;
  background-color: #f0f4f8;
  @media (max-width: 576px) {
    padding: 60px 20px;
  }
`;

export const ServiceGroup = styled.div`
  max-width: 1200px;
  margin: 0 auto 60px auto;
  padding: 0 16px;
`;

export const GroupHeading = styled.h2`
  font-size: 28px;
  border-bottom: 2px solid #ccc;
  padding-bottom: 10px;
`;

export const ServiceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
`;

export const TypeGrid = styled.div`
  display: "flex", 
  justifyContent: "center", 
  flexWrap: "wrap", 
  gap: "30px"
`;

export const LoadMoreWrapper = styled.div`
  text-align: center;
  margin-top: 20px;
`;

export const LoadMoreButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #2bb3a9;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

// Này của trang chi tiết dịch vụ
export const PageWrapper = styled.div`
  min-height: 100vh;
  padding: 80px 20px;
  background: #f9f9f9;
`;

export const ContentWrapper = styled.div`
  max-width: 1100px;
  margin: 0 auto;
`;

// Này của cái danh mục
export const CategoryWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 20px;
  padding: 16px;
`;

export const CategoryItem = styled.div`
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 20px;
  font-weight: ${({ active }) => (active ? '700' : '400')};
  background-color: ${({ active }) => (active ? '#00AEEF' : '#eee')};
  color: ${({ active }) => (active ? '#fff' : '#000')};
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: #00AEEF;
    color: #fff;
  }
`;
