import React from 'react';
import { Card, List, Typography, Image } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import * as NewsService from '../../services/NewsService';
const { Text } = Typography;



const NewsRelated = ({newsId}) => {
  const navigate = useNavigate();
  const queryRelatedNews = useQuery({
    queryKey: ['relatedNews', newsId],
    queryFn: () => NewsService.getRelatedNews(newsId),
    enabled: !!newsId, // Chỉ gọi API nếu có newsId
  });
  const {data: relatedNews, isLoading: isLoadingRelatedNews} = queryRelatedNews;
  const newsTypeId = relatedNews?.data?.[0]?.type._id;
  const handleNavigateNews = (newsId) => {
    navigate(`/news/${newsTypeId}/${newsId}`);
    window.scrollTo(0, 0); // Cuộn lên đầu trang khi điều hướng
    
  };

  return (
    <div style={{ marginTop: 50 }}>
        <Card title="Tin tức liên quan" >
          {relatedNews?.data.map((news) => (
            // <List.Item key={news._id} style={{ marginBottom: 16 }}>
            //   <List.Item.Meta
            //     avatar={
            //       <Image
            //         src={`${import.meta.env.VITE_API_URL}${news.image}`}
            //         width={60}
            //         height={60}
            //         style={{ objectFit: 'cover', borderRadius: 8 }}
            //       />
            //     }
            //     title={
            //       <Text
            //         strong
            //         onClick={() => navigate(`/news/${news._id}`)}
            //         style={{ cursor: 'pointer' }}
            //       >
            //         {news.title}
            //       </Text>
            //     }
            //     description={
            //       <Text type="secondary">
            //         {news.content.length > 60 ? news.content.slice(0, 60) + '...' : news.content}
            //       </Text>
            //     }
            //   />
            // </List.Item>
            <div>
              <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
                <Image
                  src={`${import.meta.env.VITE_API_URL}${news.image}`}
                  width={60}
                  height={60}
                  style={{ objectFit: 'cover', borderRadius: 8 }}
                />
                <div>
                  <Text
                    strong
                    onClick={()=>handleNavigateNews(news._id)}
                    style={{ cursor: 'pointer' }}
                  >
                    {news.title}
                  </Text>
                  <br />
                  <Text type="secondary">
                    {news.content ? (() => {
                      const plainText = news.content.replace(/<[^>]+>/g, '');
                      return plainText.slice(0, 60) + (plainText.length > 60 ? '...' : '');
                    })() : ''}
                  </Text>
                </div>
              </div>
            </div>
          ))}
    </Card>
    </div>
  );
};

export default NewsRelated;
