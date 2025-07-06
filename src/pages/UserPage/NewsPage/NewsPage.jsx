import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate} from 'react-router-dom';
import * as NewsService from '../../../services/NewsService';
import * as NewsTypeService from '../../../services/NewsTypeService';
import NewsCardComponent from '../../../components/NewsCardComponent/NewsCardComponent';
import FeaturedNewsComponent from '../../../components/FeaturedNewsComponent/FeaturedNewsComponent';
import CategoryFilterComponent from '../../../components/CategoryFillterComponent/CategoryFillterComponent';
import { useState } from 'react';
import {
    SectionWrapper,
    SectionGroup,
    SectionHeading,
    GridContainer,
} from './style';

const NewsPage = () => {
    const navigate = useNavigate();

    const queryGetAllNews = useQuery({
        queryKey: ['getAllNews'],
        queryFn: NewsService.getAllNews,
        refetchOnWindowFocus: false,
    });
    const { data: newsResponse, isLoading: isLoadingNews } = queryGetAllNews;
    const news = newsResponse?.data || [];
    // Giả sử bạn lấy bài viết đầu tiên làm nổi bật:
    const featured = news[0]; 
    const others = news?.slice(1);
    

    // Nhóm tin tức theo loại
    const groupedNews = news.reduce((acc, item) => {
        const typeId = item.type?._id || 'unknown';
        const typeName = item.type?.name || 'Khác';
        if (!acc[typeId]) {
            acc[typeId] = {
                name: typeName,
                items: [],
            };
        }
        acc[typeId].items.push(item);
        return acc;
    }, {});
    
    // Danh mục tin tức
    const [activeCategory, setActiveCategory] = useState('all'); // Mặc định là 'all'
    const allNews = Object.values(groupedNews).flatMap(group => group.items);// Lấy tất cả tin tức từ các nhóm dựa trên loại
    const filteredNews = activeCategory === 'all'
        ? allNews
        : groupedNews[activeCategory]?.items || [];  // Lọc tin tức theo loại đã chọn 
    const categories = [
        { _id: 'all', name: 'Tất cả' },
        ...Object.entries(groupedNews).map(([id, group]) => ({
            _id: id,
            name: group.name
        }))
    ];

    return (
        <SectionWrapper>
            <SectionGroup>
                
                <SectionHeading style={{ color:"#DC143C"}}>📢Tin nổi bật</SectionHeading>
                <FeaturedNewsComponent
                    image={`${import.meta.env.VITE_API_URL}${featured?.image}`}
                    title={featured?.title}
                    description={featured?.content}
                    date={new Date(featured?.createdAt).toLocaleDateString()}
                    type={featured?.type.name}
                    onClick={() => navigate(`/news/${featured.type?._id}/${featured?._id}`)}
                />
                <CategoryFilterComponent
                            categories={categories}
                            activeCategory={activeCategory}
                            onChange={setActiveCategory}
                    />
                    
            </SectionGroup>
            
            {activeCategory === 'all' ? (
    Object.entries(groupedNews).map(([id, group]) => (
        <SectionGroup key={id}>
            <SectionHeading>{group.name}</SectionHeading>
            <GridContainer>
                {group.items.map((item) => (
                    <NewsCardComponent
                        key={item._id}
                        image={item.image}
                        title={item.title}
                        content={item.content}
                        onClick={() => navigate(`/news/${item.type?._id}/${item._id}`)}
                    />
                ))}
            </GridContainer>
        </SectionGroup>
    ))
) : (
    <SectionGroup>
        <SectionHeading>{groupedNews[activeCategory]?.name}</SectionHeading>
        <GridContainer>
            {filteredNews.map((item) => (
                <NewsCardComponent
                    key={item._id}
                    image={item.image}
                    title={item.title}
                    content={item.content}
                    onClick={() => navigate(`/news/${item.type?._id}/${item._id}`)}
                />
            ))}
        </GridContainer>
    </SectionGroup>
)}

            {/* {Object.entries(groupedNews).map(([typeName, newsItems]) => ( 
                <SectionGroup key={typeName}>
                    <SectionHeading>{typeName}</SectionHeading>
                    <GridContainer>
                        {newsItems.map((item) => (
                            <NewsCardComponent
                                key={item._id}
                                image={item.image}
                                title={item.title}
                                content={item.content}
                                onClick={() => navigate(`/news/${item.type?._id}/${item._id}`)}
                            />
                        ))}

                    </GridContainer>
                </SectionGroup>
            ))} */}
        </SectionWrapper>
    );
}
export default NewsPage;


