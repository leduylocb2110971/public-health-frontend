import React from 'react';
import { useQuery } from "@tanstack/react-query";
import * as NewsService from "../../../services/NewsService";
import * as NewsTypeService from "../../../services/NewsTypeService";
import { useParams, useNavigate } from 'react-router-dom';
import BannerComponent from '../../../components/BannerComponent/BannerComponent';
import NewsCardComponent from '../../../components/NewsCardComponent/NewsCardComponent';
import BreadcrumbComponent from '../../../components/BreadcrumbComponent/BreadcrumbComponent';
import {
    SectionWrapper,
    SectionGroup,
    SectionHeading,
    GridContainer,
} from './style';

const NewsListPage = () => {
    const { newsTypeId } = useParams();
    const navigate = useNavigate();
    
    const queryGetNewsType = useQuery({
        queryKey: ['getNewsType', newsTypeId],
        queryFn: () => NewsTypeService.getNewsType(newsTypeId),
    });
    
    const queryGetAllNewsByType = useQuery({
        queryKey: ['getAllNewsByType', newsTypeId],
        queryFn: () => NewsService.getNewsByType(newsTypeId),
    });
    
    const { data: newsResponse, isLoading: isLoadingNews } = queryGetAllNewsByType;
    const { data: newsTypeResponse, isLoading: isLoadingNewsType } = queryGetNewsType;
    
    const news = newsResponse?.data || [];
    const newsType = newsTypeResponse?.data;
    
    if (isLoadingNews || isLoadingNewsType) {
        return <div>Loading...</div>;
    }
    const idNameMap = {
        [newsTypeId]: newsType.name,
    };
    const customNameMap = {
        news: "Tin tức",
        newsType: newsType.name,
    };

    
    return (
    <>
    <SectionWrapper>
        <SectionGroup>
          
        <BreadcrumbComponent idNameMap={idNameMap} customNameMap={customNameMap} />

          <SectionHeading>{ newsType.name }</SectionHeading>
          <GridContainer>
            {news.map((item) => (
              <NewsCardComponent
                key={item._id}
                image={item.image}
                title={item.title}
                content={item.content}
                onClick={() => navigate(`/news/${newsTypeId}/${item._id}`)}
              />
            ))}
          </GridContainer>
        </SectionGroup>
      </SectionWrapper>
    </>
    
  )
    }
export default NewsListPage;