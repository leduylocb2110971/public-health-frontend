import React from 'react';
import { useQuery } from "@tanstack/react-query";
import * as ServiceService from "../../../services/ServiceService";
import { useParams } from 'react-router-dom';
import {
  Card,
  Typography,
  Image,
  Tag,
  Spin,
  Row,
  Col,
  Divider,
  Space,
  Button
} from 'antd';
import {
  MedicineBoxOutlined,
  InfoCircleOutlined,
  NumberOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined,
  ExclamationCircleOutlined,
  PhoneOutlined
} from '@ant-design/icons';
import QuickInformation from '../../../components/QuickInformation/QuickInformation';
import ServiceNotes from '../../../components/ServiceNotes/ServiceNotes';
import ServiceBenefits from '../../../components/ServiceBenefits/ServiceBenefits';
import ServiceRelated from '../../../components/ServiceRelated/ServiceRelated';
import BreadcrumbComponent from '../../../components/BreadCrumbComponent/BreadCrumbComponent';
import {
  PageWrapper,
  ContentWrapper,
} from './style';

const { Title, Paragraph, Text } = Typography;

const ServiceDetailPage = () => {
  const { serviceId } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['getService', serviceId],
    queryFn: () => ServiceService.getService(serviceId),
    enabled: !!serviceId,
  });

  if (isLoading) {
    return <div style={{ textAlign: 'center', marginTop: 100 }}><Spin size="large" /></div>;
  }

  if (isError || !data?.data) {
    return <div style={{ textAlign: 'center', marginTop: 100 }}>Không tìm thấy thông tin dịch vụ.</div>;
  }

  const service = data.data;
  const idNameMap = {
    [service.type._id]: service.type.name,
    [serviceId]: service.name,
  }
  const customNameMap = {
    service: "Dịch vụ",
  };

  return (
    <PageWrapper>
      <ContentWrapper>
        <BreadcrumbComponent idNameMap={idNameMap} customNameMap={customNameMap} />
        {/* Tiêu đề */}
        {/* <Title level={2} style={{ textAlign: 'center', marginBottom: 40 }}>
          <MedicineBoxOutlined style={{ color: '#52c41a', marginRight: 10 }} />
          {service.name}
        </Title> */}

        <Row gutter={[32, 32]}>
  {/* Cột trái: Nội dung chính */}
  <Col xs={24} md={16}>
    <Card bordered={false} style={{ borderRadius: 12, padding: 24 }}>
      {/* Hình ảnh và tiêu đề */}
      <Image
        src={`${import.meta.env.VITE_API_URL}${service.image}`}
        alt={service.name}
        width="100%"
        height={400}
        style={{ borderRadius: 10, objectFit: 'cover', marginBottom: 24 }}
      />
      <Tag color="#2BB3A9" style={{ fontSize: 14 }}>{service?.type?.name || "Dịch vụ"}</Tag>
      <Title level={3} style={{ marginTop: 8 }}>{service.name}</Title>
      <div style={{ marginBottom: 16 }} dangerouslySetInnerHTML={{ __html: 
                                `<style> img { max-width: 100%; height: auto; display: block; margin: 8px 0; }
                                table { width: 100%; overflow-x: auto; display: block; }
                                iframe { max-width: 100%; }
                            </style>` + service?.content || "" }} />
      {/* Box gọi tư vấn */} 
      <Button style={{ background:"#B15B68", color:"white" }}type="default" icon={<PhoneOutlined />} size="large">
        Gọi 1900-1234
      </Button>
      <Divider />   
    </Card>
  </Col>

  {/* Cột phải: Thông tin nhanh */}
  <Col xs={24} md={8}>
    <Space direction="vertical" style={{ width: "100%" }} size="middle">
      <QuickInformation />
      {/* <ServiceBenefits /> */}
      <ServiceNotes />
      {/* Box liên quan */}
      
      
    </Space>
    <ServiceRelated serviceId={service._id}/>
  </Col>
</Row>

      </ContentWrapper>
    </PageWrapper>
  );
};

export default ServiceDetailPage;
