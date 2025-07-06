import React from 'react';
import { useQuery } from "@tanstack/react-query";
import * as NewsService from "../../../services/NewsService";
import { useParams } from 'react-router-dom';
import { Card, Typography, Image, Tag, Spin, Divider, Row, Col, List } from 'antd';
import BannerComponent from '../../../components/BannerComponent/BannerComponent';
import NewsRelated from '../../../components/NewsRelated/NewsRelated';
import BreadcrumbComponent from '../../../components/BreadCrumbComponent/BreadCrumbComponent';
import {
  PageWrapper,
  ContentWrapper,
  DetailCard,
  NewsContent,
  TagAuthor,
} from './style';
const { Title, Paragraph, Text } = Typography;

const NewsDetailPage = () => {
  const { newsId } = useParams();
  const { data, isLoading, isError } = useQuery({
      queryKey: ['getNews', newsId],
      queryFn: () => NewsService.getNews(newsId),
      enabled: !!newsId,
  });

  if (isLoading) {
    return <div style={{ textAlign: 'center', marginTop: 100 }}><Spin size="large" /></div>;
  }

  if (isError || !data?.data) {
      return <div style={{ textAlign: 'center', marginTop: 100 }}>Không tìm thấy thông tin tin tức.</div>;
  }

  const news = data.data;
  const idNameMap = {
      [news.type._id]: news.type.name,
      [newsId]: news.title,
  };
  const customNameMap = {
      news: "Tin tức",
  };
  return (
    <PageWrapper>
      <ContentWrapper>
        <BreadcrumbComponent idNameMap={idNameMap} customNameMap={customNameMap} />
        <Row gutter={[24, 24]}>
          {/* Cột trái: Nội dung tin tức chính */}
          <Col xs={24} md={16}>
            <DetailCard>
                <div>
                  <Title level={2}>{news.title}</Title>
                  <TagAuthor>
                    <Tag color="green">{news?.type?.name || 'Tin tức'}</Tag>
                    <Text type="secondary">
                      {news.author ? `Tác giả: ${news.author}` : 'Tác giả: Không rõ'}
                    </Text>
                  </TagAuthor>

                  <Divider /> {/* Đường kẻ phân cách */}

                  <NewsContent dangerouslySetInnerHTML={{ __html: news?.content }}></NewsContent>
                  <Image
                    src={`${import.meta.env.VITE_API_URL}${news.image}`}
                    alt={news.name}
                    width="100%"
                    style={{ borderTopLeftRadius: 10, borderTopRightRadius: 10, maxHeight: 450, objectFit: 'cover' }}
                    preview={false}
                  />

                  <Text type="secondary">
                    Đăng ngày: {new Date(news.createdAt).toLocaleDateString()}
                  </Text>

                  <Divider />
                  <div style={{ marginTop: 24, textAlign: 'center' }}>
                    <Text strong>Chia sẻ bài viết:</Text>
                    <div style={{ marginTop: 12 }}>
                      <Tag color="#3b5999">Facebook</Tag>
                      <Tag color="#00acee">Twitter</Tag>
                      <Tag color="#c13584">Instagram</Tag>
                    </div>
                  </div>
                </div>
              </DetailCard>
          </Col>

          {/* Cột phải: Tin tức liên quan */}
          <Col xs={24} md={8}>
            <NewsRelated newsId={news?._id} />
          </Col>
        </Row>
      </ContentWrapper>
    </PageWrapper>
  );
}

export default NewsDetailPage;
