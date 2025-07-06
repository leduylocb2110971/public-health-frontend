import React from 'react';
import { RightOutlined } from '@ant-design/icons';
import {
  NewsCardWrapper,
  NewsCardImage,
  NewsCardContent,
  NewsCardTitle,
  NewsCardDescription,
  NewsCardAction,
} from './style';
import { Typography } from 'antd';


const NewsCardComponent = ({ image, title, content, onClick }) => {
  const { Title, Paragraph, Text } = Typography;
  // Loại bỏ những tag không mong muốn
  const plainText = content.replace(/<[^>]+>/g, '');
  return (
    <NewsCardWrapper onClick={onClick}>
      <NewsCardImage src={`${import.meta.env.VITE_API_URL}${image}`} alt={title} />
      <NewsCardContent>
        <NewsCardTitle>{title}</NewsCardTitle>
        <NewsCardDescription dangerouslySetInnerHTML={{ __html: plainText }}/>
        <NewsCardAction>
          Xem chi tiết <RightOutlined />
        </NewsCardAction>
      </NewsCardContent>
    </NewsCardWrapper>
  );
};

export default NewsCardComponent;
