import React from 'react';
import { Card, Typography, Row, Col } from 'antd';
import { CheckCircleOutlined, InfoCircleOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;
const ServiceBenefits = () => {
    return(
        <>
        <Card >
            <Title level={4} style={{ marginBottom: 16 }}>
                <CheckCircleOutlined style={{ color: '#52c41a', marginRight: 8 }} />
                Lợi ích khi sử dụng dịch vụ
            </Title>
            <Paragraph>
            </Paragraph>
            - Thực hiện bởi đội ngũ bác sĩ chuyên môn cao. <br />
            - Trang thiết bị hiện đại, quy trình an toàn. <br />
            - Hỗ trợ tư vấn miễn phí trước và sau khi sử dụng dịch vụ. <br />
            - Chi phí minh bạch, rõ ràng, không phát sinh thêm.
        </Card>
        </>
    )
}
export default ServiceBenefits;