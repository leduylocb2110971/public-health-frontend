import styled from "styled-components";
import { Card } from "antd";

export const PageContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  gap: 32px;
  padding: 20px 16px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 24px;
  }
`;

export const FilterSidebar = styled.div`
  flex: 0 0 250px;
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  padding: 20px;
  height: fit-content;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);

  @media (max-width: 768px) {
    width: 100%;
  }
`;
export const DoctorListWrapper = styled.div`
  flex: 1;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const DoctorSection = styled.section`
  padding: 60px 20px;

  @media (max-width: 576px) {
    padding: 60px 20px;
  }
`;

export const SectionHeading = styled.h2`
  text-align: center;
  margin-bottom: 40px;
  font-size: 28px;

  @media (max-width: 576px) {
    font-size: 22px;
    margin-bottom: 24px;
  }
`;

export const DoctorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 24px;
  row-gap: 32px;
  width: 100%;
  max-width: 100%;
  padding: 0 16px;
  box-sizing: border-box;

  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 576px) {
    grid-template-columns: repeat(1, 1fr);
    padding: 0;
  }
`;

// Này của trang chi tiết bác sĩ
export const PageWrapper = styled.div`
  background-color: #f0f2f5;
  padding: 80px 24px;
  min-height: 100vh;
`;

export const ContentWrapper = styled.div`
  max-width: 1000px;
  margin: auto;
`;
export const DetailCard = styled(Card)`
  padding: 24px;
  border-radius: 10px;
  background: #ffffff;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
`;
export const DoctorDes = styled.p`
  font-size: 17px;
  line-height: 1.5;
  color: #333;
  text-align: justify;
  text-indent: 2em;
  margin-bottom: 20px;
  white-space: pre-line;
  word-wrap: break-word;
  overflow-wrap: break-word;
  word-break: break-word;

  @media (max-width: 576px) {
    text-indent: 1em;
  }
`;