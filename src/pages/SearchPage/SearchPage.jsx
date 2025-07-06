import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import DefaultLayout from '../../components/DefaultLayout/DefaultLayout'
import InputComponent from '../../components/InputComponent/InputComponent'
import { AppstoreOutlined , EnvironmentFilled } from '@ant-design/icons'
import { Typography, Pagination, Flex, Space, Popover} from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDebounce } from '../../hooks/useDebounce.js'
import { useState, useEffect, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import ModalComponent from '../../components/ModalComponent/ModalComponent'
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent'
import ServiceCardComponent from '../../components/CardComponent/ServiceCardComponent.jsx'
import * as ServiceService from '../../services/ServiceService'
import * as NewsService from '../../services/NewsService'
import {
    Wrapper,
    Container,
    SearchBox,
    FilterWrapper,
    ResultBox,
    ResultHeader,
    DoctorList,
    PaginationWrapper
} from './style'
import { PopupItem } from '../../components/HeaderComponent/style.js'

const { Title, Text, Paragraph} = Typography;
const SearchPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    
    //Lấy dữ liệu từ URL
    const queryParams = new URLSearchParams(location.search);
    const keyWord = queryParams.get('keyword') || '';
    // const department = queryParams.get('department') || '';
    const type = queryParams.get('type') || 'all';
    
    //Quản lí state
    const [selectedType, setSelectedType] = useState(type);
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState(keyWord);
    const debouncedSearchQuery = useDebounce(inputValue, 500);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0,
    });

    const handleSearch = (value) => setInputValue(value);
    const servicePageSize = selectedType === 'all' ? 100 : pagination.pageSize;
    const newsPageSize = selectedType === 'all' ? 100 : pagination.pageSize;

    //Gọi API
    const { data: serviceResponse, isLoading: isLoadingServices } = useQuery({
        queryKey: ['searchServices', debouncedSearchQuery, selectedType == 'all'? 'all': pagination.current ],
        queryFn: () => ServiceService.searchServices(debouncedSearchQuery, selectedType === 'all' ? 1 : pagination.current, servicePageSize),
        enabled: selectedType === 'service' || selectedType === 'all',
        keepPreviousData: true,
    });
    const { data: newsResponse, isLoading: isLoadingNews } = useQuery({
        queryKey: ['searchNews', debouncedSearchQuery, selectedType == 'all'? 'all': pagination.current ],
        queryFn: () => NewsService.searchNews(debouncedSearchQuery, selectedType === 'all' ? 1 : pagination.current, newsPageSize),
        enabled: selectedType === 'news' || selectedType === 'all',
        keepPreviousData: true,
    });

    const content = (
        <>
            <PopupItem onClick={() => handleSelectedType('all')}>Tất cả</PopupItem>
            <PopupItem onClick={() => handleSelectedType('service')}>Dịch vụ</PopupItem>
            <PopupItem onClick={() => handleSelectedType('news')}>Tin tức</PopupItem>

        </>
    )
    //Chuyển dữ liệu thành mảng
    const services = serviceResponse?.data || [];
    const news = newsResponse?.data || [];
    console.log('services', serviceResponse);
    // console.log('news', newsResponse);
    const combinedData = useMemo(() => {
        if (selectedType === 'all') {
            const merged = [
            //Khi kết hợp dữ liệu, thêm typeName để phân biệt
            ...services.map(item => ({ ...item, typeName: 'service' })),
            ...news.map(item => ({ ...item, typeName: 'news' }))
            ];
            return merged.slice(
                (pagination.current - 1) * pagination.pageSize,
                pagination.current * pagination.pageSize
            );
        } else if (selectedType === 'service') {
            return services.map(item => ({ ...item, typeName: 'service' }));
        } else if (selectedType === 'news') {
            return news.map(item => ({ ...item, typeName: 'news' }));
        }
        return [];
    }, [selectedType, services, news, pagination]);
    // console.log('combinedData', combinedData);
     // ✅ Cập nhật lại tổng số dữ liệu (total)
    useEffect(() => {
        if (selectedType === 'all') {
            const mergedLength = services.length + news.length;
            setPagination(prev => {
                const newCurrent = Math.min(prev.current, Math.ceil(mergedLength / prev.pageSize)) || 1;
                if (prev.total === mergedLength && prev.current === newCurrent) return prev;
                return { ...prev, total: mergedLength, current: newCurrent };
            });
        } else if (selectedType === 'service') {
            const total = serviceResponse?.total || services.length;
            setPagination(prev => {
                const newCurrent = Math.min(prev.current, Math.ceil(total / prev.pageSize)) || 1;
                if (prev.total === total && prev.current === newCurrent) return prev;
                return { ...prev, total, current: newCurrent };
            });
        } else if (selectedType === 'news') {
            const total = newsResponse?.total || news.length;
            setPagination(prev => {
                const newCurrent = Math.min(prev.current, Math.ceil(total / prev.pageSize)) || 1;
                if (prev.total === total && prev.current === newCurrent) return prev;
                return { ...prev, total, current: newCurrent };
            });
        }
    }, [selectedType, services, news]);

    // Đồng bộ keyword vào URL
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        if (inputValue) params.set('keyword', inputValue);
        else params.delete('keyword');
        navigate({ search: params.toString() }, { replace: true });
    }, [inputValue, navigate]);
    // Đồng bộ URL khi người dùng thay đổi loại tìm kiếm
    // Đồng bộ type vào URL
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        if (selectedType) params.set('type', selectedType);
        else params.delete('type');
        navigate({ search: params.toString() }, { replace: true });
    }, [selectedType, navigate]);
    // ✅ Reset current = 1 khi thay đổi bộ lọc
    useEffect(() => {
        setPagination(prev => ({
            ...prev,
            current: 1,
        }));
    }, [selectedType, debouncedSearchQuery]);
    // Đồng bộ inputValue từ URL khi trang được tải
    useEffect(() => {
    const params = new URLSearchParams(location.search);
    const keywordFromURL = params.get('keyword') || '';
    setInputValue(keywordFromURL);
}, [location.search]);
    
    const handleSelectedType = (type) => {
        setSelectedType(type);
        const params = new URLSearchParams(location.search);
        params.set('type', type); // Cập nhật type
        navigate({ search: params.toString() }, { replace: true });
    }
    const convertTypeToText = (type) => {
        switch (type) {
            case 'service':
                return 'Dịch vụ';
            case 'news':
                return 'Tin tức';
            case 'all':
                return 'Tất cả';
            default:
                return '';
        }
    }
    return (
        <>
            <Wrapper>
                <Container>
                    {/* Ô tìm kiếm */}
                    <SearchBox>
                        {/* <InputComponent
                            placeholder="Tìm kiếm bác sĩ, phòng khám, chuyên khoa..."
                            onSearch={handleSearch}
                            size="large"
                            defaultValue={keyWord}
                        /> */}

                        {/* Bộ lọc */}
                        <FilterWrapper>
                            <Popover
                                content={content}
                                open={isOpen}
                                onOpenChange={(open) => setIsOpen(open)}
                                title="Chọn loại tìm kiếm"
                                placement='bottomRight'
                                getPopupContainer={(trigger) => trigger.parentNode}
                            >


                                <ButtonComponent
                                    type="default"
                                    icon={<AppstoreOutlined />}
                                >
                                    Loại: {convertTypeToText(selectedType)}
                                </ButtonComponent>
                            </Popover>
                            
                            {/* <ButtonComponent type="default" icon={<EnvironmentFilled />}>
                                Khu vực
                            </ButtonComponent> */}
                        </FilterWrapper>
                    </SearchBox>

                    {/* Kết quả */}
                    <ResultBox>
                        {/* Tiêu đề */}
                        {debouncedSearchQuery ? (
                            <ResultHeader level={4}>
                                Tìm thấy {selectedType === 'service'
                                    ? `${serviceResponse?.total || 0} dịch vụ`
                                    : selectedType === 'news'
                                        ? `${newsResponse?.total || 0} tin tức`
                                        : `${(serviceResponse?.total || 0) + (newsResponse?.total || 0)} kết quả`}
                            </ResultHeader>
                        ) : (
                            <ResultHeader level={4}>
                                {selectedType === 'service'
                                    ? 'Tất cả dịch vụ'
                                    : selectedType === 'news'
                                        ? 'Tất cả tin tức'
                                        : 'Tất cả kết quả'}
                            </ResultHeader>
                        )}
                        {debouncedSearchQuery && (
                            <Paragraph style={{ padding: '0 16px', color: '#888' }}>
                                Kết quả cho từ khóa: <strong>{debouncedSearchQuery}</strong>
                            </Paragraph>
                            )}
                        <DoctorList>
                            {/* --- Loại dịch vụ --- */}
                            {selectedType === 'service' && (
                                <>
                                    {isLoadingServices ? (
                                        <LoadingComponent isLoading={isLoadingServices}>
                                            <Paragraph>Đang tải dữ liệu ...</Paragraph>
                                        </LoadingComponent>
                                    ) : services?.length > 0 ? (
                                        services.map((doctor) => (
                                            <ServiceCardComponent
                                                key={doctor._id}
                                                image={doctor.image}
                                                content={doctor.content}
                                                name={doctor.name}
                                                isLoading={isLoadingServices}
                                                onClick={() => navigate(`/service/${doctor?.type._id}/${doctor._id}`)}
                                            />
                                        ))
                                    ) : (
                                        <Paragraph>Không có dịch vụ nào phù hợp với tìm kiếm của bạn.</Paragraph>
                                    )}
                                </>
                            )}
                            {/* --- Loại tin tức --- */}
                            {selectedType === 'news' && (
                                <>
                                    {isLoadingNews ? (
                                        <LoadingComponent isLoading={isLoadingNews}>
                                            <Paragraph>Đang tải dữ liệu phòng khám...</Paragraph>
                                        </LoadingComponent>
                                    ) : news?.length > 0 ? (
                                        news.map((neww) => (
                                            <ServiceCardComponent
                                                key={neww._id}
                                                image={neww.image}
                                                content={neww.content}
                                                name={neww.name}
                                                isLoading={isLoadingNews}
                                                onClick={() => navigate(`/news/${neww?.type._id}/${neww._id}`)}
                                            />
                                        ))
                                    ) : (
                                        <Paragraph>Không có phòng khám nào phù hợp với tìm kiếm của bạn.</Paragraph>
                                    )}
                                </>
                            )}

                            {/* --- Loại "all" --- */}
                            {selectedType === 'all' && (
                                <>
                                    {(isLoadingServices || isLoadingNews) ? (
                                        <LoadingComponent isLoading>
                                            <Paragraph>Đang tải dữ liệu...</Paragraph>
                                        </LoadingComponent>
                                    ) : combinedData.length > 0 ? (
                                        combinedData.map((item) => (
                                            <ServiceCardComponent
                                                key={item._id}
                                                image={item.image}
                                                content={item.content}
                                                name={item.name}
                                                isLoading={false}
                                                onClick={() => {
                                                    if (item.typeName === 'service') {
                                                        navigate(`/service/${services[0].type._id}/${item._id}`);
                                                    } else if (item.typeName === 'news') {
                                                        navigate(`/news/${news[0].type._id}/${item._id}`);
                                                    }
                                                }}
                                            />
                                        ))
                                    ) : (
                                        <Paragraph>Không có kết quả nào phù hợp với tìm kiếm của bạn.</Paragraph>
                                    )}
                                </>
                            )}
                        </DoctorList>
                    </ResultBox>

                    {/* Phân trang */}
                    <PaginationWrapper justify="center">
                        <Pagination
                            current={pagination.current}
                            pageSize={pagination.pageSize}
                            total={pagination.total}
                            onChange={(page, pageSize) => {
                                setPagination(prev => ({
                                    ...prev,
                                    current: page,
                                    pageSize: pageSize,
                                }));
                            }}
                            showSizeChanger={false}
                        />
                    </PaginationWrapper>

                </Container>
            </Wrapper>
        </>
        
    )
    
}
export default SearchPage;
