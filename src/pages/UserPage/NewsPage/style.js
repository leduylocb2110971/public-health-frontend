import styled from 'styled-components';
import { Card } from "antd";

export const SectionWrapper = styled.section`
  padding: 60px 20px;
  background-color: #f0f4f8;
  @media (max-width: 576px) {
    padding: 60px 20px;
  }
`;

export const SectionGroup = styled.div`
  max-width: 1200px;
  margin: 0 auto 60px auto;
  padding: 0 16px;
`;

export const SectionHeading = styled.h2`
  font-size: 28px;
  border-bottom: 2px solid #ccc;
  padding-bottom: 10px;
`;

export const GridContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
// Này của trang chi tiết tin tức
export const PageWrapper = styled.div`
  min-height: 100vh;
  padding: 80px 20px;
  background: #f9f9f9;
`;

export const ContentWrapper = styled.div`
  max-width: 1100px;
  margin: 0 auto;
`;

export const DetailCard = styled(Card)`
padding: 24px;
  border-radius: 10px;
  background: #ffffff;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
`;

export const NewsContent = styled.p`
font-size: 17px;
  line-height: 1.5;
  color: #333;
  text-align: justify;
  text-indent: 2em;
  margin-bottom: 20px;
  white-space: pre-line;
  img {
    max-width: 100%;
    height: auto;
    display: block;
    margin: 16px 0;
  }

  table {
    width: 100%;
    overflow-x: auto;
    display: block;
  }

  iframe {
    max-width: 100%;
  }

  p {
    margin-bottom: 1em;
  }
`;
export const TagAuthor = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
`;
// Này của trang chi tiết 


