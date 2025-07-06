import styled from 'styled-components';

// Section nền sáng
export const SectionLight = styled.section`
  padding: 60px;
  background-color: #fff;
`;

// Section nền xám
export const SectionGray = styled.section`
  padding: 60px;
  background-color: #f0f4f8;
`;

// Heading chung
export const SectionHeading = styled.h2`
  text-align: center;
  margin-bottom: 40px;
`;

// Container cho các thẻ card
export const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 30px;
`;

// Đoạn văn giới thiệu
export const IntroText = styled.p`
  font-size: 18px;
  max-width: 800px;
  margin: 0 auto;
`;

// Nút tùy chỉnh
export const CustomButton = styled.button`
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
// Giới thiệu về dịch vụ
export const IntroWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

export const IntroTextBlock = styled.div`
  flex: 1;
`;

export const IntroParagraph = styled.p`
  font-size: 16px;
  color: #444;
  line-height: 1.6;
`;

export const IntroImage = styled.img`
  flex: 1;
  max-width: 500px;
  width: 100%;
  height: auto;
`;

// Vì sao chọn chúng tôi
export const BenefitsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 40px auto 0;
  padding: 0 20px;
`;

export const BenefitItem = styled.div`
  background: #f9f9f9;
  padding: 30px;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  transition: 0.3s;

  .icon {
    font-size: 40px;
    margin-bottom: 20px;
  }

  h4 {
    font-size: 18px;
    margin-bottom: 10px;
    color: #333;
  }

  p {
    font-size: 15px;
    color: #555;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }
`;
// Vì sao chọn chúng tôi - Icon
export const IntroSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 40px;
  
  background-color: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);

  max-width: 1200px;
  margin: 60px auto;
`;

export const LeftContent = styled.div`
  flex: 1 1 500px;
`;

export const Label = styled.div`
  color: #2563eb;
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 12px;
`;

export const BigHeading = styled.h2`
  font-size: 36px;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 24px;
`;

export const Description = styled.p`
  font-size: 16px;
  color: #4b5563;
  line-height: 1.8;
  margin-bottom: 16px;
`;

export const BlueButton = styled.button`
  background-color: #2BB3A9;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  border: none;
  font-weight: 600;
  margin-top: 20px;
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    background-color: #1e40af;
  }
`;

export const RightContent = styled.div`
  flex: 1 1 500px;
  position: relative;
`;

export const ImageWrapper = styled.div`
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  img {
    width: 100%;
    border-radius: 20px;
    object-fit: cover;
  }
`;

export const StatBox = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
  background-color: #e0f2f1;
  padding: 16px 20px;
  border-radius: 16px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  font-size: 16px;
  strong {
    font-size: 28px;
    display: block;
    color: #0f766e;
  }
  span {
    color: #065f46;
  }
`;