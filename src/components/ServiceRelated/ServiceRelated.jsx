import React from 'react';
import { Card, Typography, Space, Image} from 'antd';
import { Navigate, useNavigate} from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

const { Title, Paragraph, Text } = Typography;
import * as ServiceService from '../../services/ServiceService';
import SlideComponent from '../../components/SlideComponent/SlideComponent';

const ServiceRelated = ({serviceId}) => {
  const navigate = useNavigate();
  // Lấy ra danh sách dịch vụ liên quan từ API hoặc dữ liệu tĩnh
  const queryRelatedServices = useQuery({
    queryKey: ['relatedServices'],
    queryFn:()=> ServiceService.getRelatedServices(serviceId),
    enabled: !!serviceId, // Chỉ gọi API nếu có serviceId
  })
  // Lấy ra id loại dịch vụ
  const serviceTypeId = queryRelatedServices?.data?.data?.[0]?.type._id;
  const nameServiceType = queryRelatedServices?.data?.data?.[0]?.type.name;
  const { data: relatedServices, isLoading: isLoadingRelatedServices } = queryRelatedServices;
    return (
        <Card title="📂 Dịch vụ liên quan" bordered={false}>
        <SlideComponent length={relatedServices?.data?.length}>
          {relatedServices?.data.map((service) => (
            <div key={service._id} style={{ padding: 8 }}>
              <div style={{ display: 'flex', gap: 10 }}>
                <Image
                  src={`${import.meta.env.VITE_API_URL}${service?.image}`}
                  width={60}
                  height={60}
                  style={{ objectFit: "cover", borderRadius: 8 }}
                />
                <div>
                  <Text strong
                  onClick={() => navigate(`/service/${serviceTypeId}/${service._id}`)}
                  >{service?.name}</Text>
                  <br />
                  <Text type="secondary">
                    {service?.content
                      ? (() => {
                          const plainText = service.content.replace(/<[^>]+>/g, '');
                          return plainText.slice(0, 60) + (plainText.length > 60 ? '...' : '');
                        })()
                      : ''}
                  </Text>
                </div>
              </div>
            </div>
          ))}
        </SlideComponent>

        <div style={{ marginTop: 20, textAlign: 'center' }}>
          <Text type="secondary" style={{ fontSize: 12 }} onClick={() => navigate(`/service/${serviceTypeId}`)}>
           <strong>Xem tất cả dịch vụ loại {nameServiceType}</strong>  
          </Text>
        </div>
      </Card>
    )
}
export default ServiceRelated;