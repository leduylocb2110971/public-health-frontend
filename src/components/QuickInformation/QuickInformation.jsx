import React from 'react';
import { Card, Typography, Space } from 'antd';
import {
  InfoCircleOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined,
  PhoneOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;

const QuickInformation = () => {
  return (
    <>
      <Card >
        <Title level={4} style={{ marginBottom: 16 }}>
          <InfoCircleOutlined style={{ marginRight: 6 }} />
          Thông tin nhanh
        </Title>
        <Space direction="vertical">
        <Text>
          <EnvironmentOutlined style={{ marginRight: 6 }} />
          <strong>Địa chỉ:</strong> đường 3/2, Xuân Khánh, Ninh Kiều, tp.Cần Thơ
        </Text>

        <Text>
          <ClockCircleOutlined style={{ marginRight: 6 }} />
          <strong>Thời gian làm việc:</strong> Thứ 2 - Thứ 7 (08:00 - 17:00)
        </Text>

        <Text>
          <InfoCircleOutlined style={{ marginRight: 6 }} />
          <strong>Chuẩn bị:</strong> Nhịn ăn 6–8 giờ (xét nghiệm máu)
        </Text>

        <Text>
          <PhoneOutlined style={{ marginRight: 6 }} />
          <strong>Hotline:</strong> 1900-1234
        </Text>
      </Space>
      </Card>

      
    </>
  );
};

export default QuickInformation;
