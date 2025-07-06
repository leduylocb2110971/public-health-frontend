import React from 'react';
import { RightOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import { StyledCard, StyledImage, StyledDescription } from './style';

const { Meta } = Card;

const ServiceCardComponent = ({ image, name, content, onClick }) => {
  const plainText = content.replace(/<[^>]+>/g, ''); // Remove unwanted tags
  return (
    <StyledCard
      hoverable
      cover={
        <StyledImage
          alt={name}
          src={`${import.meta.env.VITE_API_URL}${image}`}
        />
      }
      onClick={onClick}
      actions={[
        <span style={{ color: '#1890ff' }}>
          Xem chi tiết <RightOutlined />
        </span>,
      ]}
    >
      <Meta
          title={name}
          {...content&&
            { description: <StyledDescription dangerouslySetInnerHTML={{ __html: plainText }} /> }
          }
        />
  
    </StyledCard>
  );
};

export default ServiceCardComponent;
