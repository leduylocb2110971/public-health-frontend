import React from 'react';
import { Card, Typography} from 'antd';
const { Title, Paragraph } = Typography;
const ServiceNotes = () => {
    return (
        <>
        <Card>
            <Title level={4}>⚠️ Lưu ý khi sử dụng</Title>
            <Paragraph>
                - Mang theo giấy tờ tuỳ thân và hồ sơ bệnh án (nếu có). <br />
                - Nhịn ăn ít nhất 8 giờ nếu làm xét nghiệm máu. <br />
                - Không dùng chất kích thích trước 24 giờ. <br />
                - Đến đúng giờ theo lịch hẹn.
            </Paragraph>
        </Card>
            
        </>
    )
}
export default ServiceNotes;