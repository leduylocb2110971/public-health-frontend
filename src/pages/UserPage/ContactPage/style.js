import styled from "styled-components";

export const ContactSection = styled.section`
  padding: 60px 20px;
  background-color: #f9fafb;
`;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
`;

export const FormSection = styled.div`
  flex: 1 1 500px;
`;

export const InfoSection = styled.div`
  flex: 1 1 500px;

  h3 {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 12px;
  }

  a {
    color: #0ea5e9;
    text-decoration: none;
  }
`;

export const Title = styled.h2`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 24px;
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Input = styled.input`
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
`;

export const TextArea = styled.textarea`
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  resize: vertical;
`;

export const SubmitButton = styled.button`
  background-color: #2BB3A9;
  color: #fff;
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  width: fit-content;
`;

export const InfoItem = styled.p`
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #333;
`;

export const Icon = styled.span`
  color: #0ea5e9;
  font-size: 18px;
`;

export const MapWrapper = styled.div`
  border-radius: 12px;
  overflow: hidden;
  margin-top: 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`;

