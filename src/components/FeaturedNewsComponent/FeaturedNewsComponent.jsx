import React from 'react';
import styled from 'styled-components';
import { RightOutlined, FireOutlined } from '@ant-design/icons';
import { Tag } from 'antd';

const Wrapper = styled.div`
  display: flex;
  gap: 24px;
  padding: 24px;
  background: #f0f8ff;
  border-radius: 12px;
  cursor: pointer;
  margin-bottom: 32px;
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 16px;
  }
`;

const Image = styled.img`
  width: 300px;
  height: 180px;
  object-fit: cover;
  border-radius: 8px;
  @media (max-width: 768px) {
    width: 100%;
    height: auto;
  }
`;

const Content = styled.div`
  flex: 1;
  @media (max-width: 768px) {
    text-align: center;
    padding-top: 12px;
  }
`;

const Title = styled.h2`
  font-size: 22px;
  color: #1890ff;
  margin-bottom: 8px;
  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const Meta = styled.div`
  font-size: 14px;
  color: #888;
  margin-bottom: 12px;
`;

const Description = styled.p`
  font-size: 15px;
  color: #333;
  line-height: 1.5;
  margin-bottom: 8px;
`;

const ReadMore = styled.div`
  color: #1890ff;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 4px;
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const FeaturedNewsComponent = ({ image, title, description, date, type, onClick }) => {
  const plainText = (description || '').replace(/<[^>]+>/g, '');
  return (
    
    <Wrapper onClick={onClick}>
      <Image src={image} alt={title} />
      <Content>
        <Tag color="red" icon={<FireOutlined />}>NỔI BẬT</Tag>
        <Title>{title}</Title>
        <Meta>{date} • {type}</Meta>
        <Description>{plainText?.slice(0, 180)}...</Description>
        <ReadMore>
          Xem chi tiết <RightOutlined />
        </ReadMore>
      </Content>
    </Wrapper>
  );
};

export default FeaturedNewsComponent;
