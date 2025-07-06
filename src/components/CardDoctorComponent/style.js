import styled from "styled-components";

export const CardDoctorContainer = styled.div`
  width: 100%;
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const Header = styled.div`
  background: linear-gradient(to right, #e6f7ff, #f6ffed);
  padding: 24px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  position: relative;
`;

export const Rating = styled.div`
  position: absolute;
  bottom: -10px;
  left: 24px;
  background: #fff;
  padding: 4px 10px;
  border-radius: 16px;
  font-size: 13px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
`;

export const Content = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
`;

export const SpecialtyTags = styled.div`
  margin-top: 4px;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;
