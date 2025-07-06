import styled from "styled-components";

export const FAQSectionContainer = styled.section`
  margin: 60px auto 0;
  text-align: center;
  max-width: 1000px;
`;

export const FAQTitle = styled.h2`
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #111827;
`;

export const FAQList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const FAQItem = styled.li`
  margin-bottom: 24px;
  padding: 16px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.05);
`;

export const Question = styled.p`
  font-weight: 600;
  color: #2563eb;
  margin-bottom: 8px;
`;

export const Answer = styled.p`
  color: #4b5563;
  line-height: 1.6;

  a {
    color: #0ea5e9;
    text-decoration: none;
  }
`;
