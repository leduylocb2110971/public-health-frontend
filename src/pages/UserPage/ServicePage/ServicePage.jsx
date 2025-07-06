import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import * as ServiceService from '../../../services/ServiceService';
import ServiceCardComponent from '../../../components/CardComponent/ServiceCardComponent';
import SlideComponent from '../../../components/SlideComponent/SlideComponent';
import {
  WrapperSection,
  ServiceGroup,
  GroupHeading,
  ServiceGrid,
  LoadMoreWrapper,
  LoadMoreButton,
  CategoryWrapper,
  CategoryItem
} from './style';


const ServicePage = () => {
    const navigate = useNavigate();
    const INITIAL_VISIBLE_COUNT = 4;
    const [visibleService, setVisibleService] = useState({});
    const [activeCategory, setActiveCategory] = useState('all');

    const getAllServices = useQuery({
        queryKey: ['services'],
        queryFn: ServiceService.getAllServices,
        refetchOnWindowFocus: false,
    });

    const { data: serviceResponse, isLoading: isLoadingServices } = getAllServices;
    const services = serviceResponse?.data || [];

    // Nhóm dịch vụ theo type._id và giữ cả name
    const groupedServices = services.reduce((acc, service) => {
        const typeId = service.type?._id || 'unknown';
        const typeName = service.type?.name || 'Khác';

        if (!acc[typeId]) {
            acc[typeId] = {
                name: typeName,
                items: [],
            };
        }
        acc[typeId].items.push(service);
        return acc;
    }, {});

    const categories = [
        { _id: 'all', name: 'Tất cả' },
        ...Object.entries(groupedServices).map(([typeId, group]) => ({
            _id: typeId,
            name: group.name,
        })),
    ];

    const displayedGroups =
        activeCategory === 'all'
            ? groupedServices
            : {
                [activeCategory]: groupedServices[activeCategory],
            };

    const handleLoadMore = (typeId) => {
        const currentCount = visibleService[typeId] || INITIAL_VISIBLE_COUNT;
        setVisibleService({
            ...visibleService,
            [typeId]: currentCount + INITIAL_VISIBLE_COUNT,
        });
    };

    const handleCollapse = (typeId) => {
        setVisibleService({
            ...visibleService,
            [typeId]: INITIAL_VISIBLE_COUNT,
        });
    };

    return (
        <WrapperSection>
            <CategoryWrapper>
                {categories.map((category) => (
                    <CategoryItem
                        key={category._id}
                        active={activeCategory === category._id}
                        onClick={() => setActiveCategory(category._id)}
                    >
                        {category.name}
                    </CategoryItem>
                ))}
            </CategoryWrapper>

            {Object.entries(displayedGroups).map(([typeId, group]) => {
                const visibleCount = visibleService[typeId] || INITIAL_VISIBLE_COUNT;
                const visibleServices = group.items.slice(0, visibleCount);
                const isAllVisible = visibleCount >= group.items.length;

                return (
                    <ServiceGroup key={typeId}>
                        <GroupHeading>{group.name}</GroupHeading>

                        <ServiceGrid>
                            {visibleServices.map((item) => (
                                <ServiceCardComponent
                                    key={item._id}
                                    image={item.image}
                                    name={item.name}
                                    content={item.content}
                                    onClick={() => navigate(`/service/${item.type._id}/${item._id}`)}
                                />
                            ))}
                        </ServiceGrid>

                        <LoadMoreWrapper>
                            {!isAllVisible ? (
                                <LoadMoreButton onClick={() => handleLoadMore(typeId)}>
                                    Xem thêm
                                </LoadMoreButton>
                            ) : (
                                group.items.length > INITIAL_VISIBLE_COUNT && (
                                    <LoadMoreButton onClick={() => handleCollapse(typeId)}>
                                        Thu gọn
                                    </LoadMoreButton>
                                )
                            )}
                        </LoadMoreWrapper>
                    </ServiceGroup>
                );
            })}
        </WrapperSection>
    );
};

export default ServicePage;
