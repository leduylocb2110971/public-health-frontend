import React from 'react';
import { useQuery } from "@tanstack/react-query";
import * as DoctorService from '../../../services/DoctorService';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Typography, Image, Tag, Spin, Divider, Row, Col, Descriptions, Button } from 'antd';
import { LeftOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";
import BreadcrumbComponent from '../../../components/BreadCrumbComponent/BreadCrumbComponent';
import ButtonComponent from '../../../components/ButtonComponent/ButtonComponent';
import {
    PageWrapper,
    ContentWrapper,
    DetailCard,
    DoctorDes,
} from './style';

const { Title, Paragraph, Text } = Typography;

const MedicalStaffDetailPage = () => {
    const navigate = useNavigate();
    const { doctorId } = useParams();

    const { data, isLoading, isError } = useQuery({
        queryKey: ['getDoctor', doctorId],
        queryFn: () => DoctorService.getDoctor(doctorId),
        enabled: !!doctorId,
    });

    if (isLoading) {
        return <div style={{ textAlign: 'center', marginTop: 100 }}><Spin size="large" /></div>;
    }

    if (isError || !data?.data) {
        return <div style={{ textAlign: 'center', marginTop: 100 }}>Không tìm thấy thông tin bác sĩ.</div>;
    }

    const doctor = data.data;
    const idNameMap = {
        [doctorId]: doctor.user.name,
    };

    const avatarUrl = doctor?.user?.avatar
        ? `${import.meta.env.VITE_API_URL}${doctor.user.avatar}`
        : null;
    const doctorSchedule = [
        { day: "Thứ 2", timeSlots: ["08:00 - 11:00", "14:00 - 17:00"] },
        { day: "Thứ 3", timeSlots: ["08:00 - 11:00"] },
        { day: "Thứ 4", timeSlots: ["14:00 - 17:00"] },
        { day: "Thứ 5", timeSlots: ["08:00 - 11:00", "14:00 - 17:00"] },
        { day: "Thứ 6", timeSlots: ["08:00 - 11:00"] },
        { day: "Thứ 7", timeSlots: ["08:00 - 12:00"] },
        { day: "Chủ nhật", timeSlots: [] }, // Nghỉ
    ];

    return (
        <PageWrapper>
            <ContentWrapper>
                <BreadcrumbComponent idNameMap={idNameMap} customNameMap={{ "medical-staff": "Đội ngũ y tế" }}/>

                {/* <Button type="link" onClick={() => navigate(-1)} icon={<LeftOutlined />}>
                    Quay lại
                </Button> */}

                <DetailCard>
                    <Row gutter={[32, 24]}>
                        <Col xs={24} md={8}>
                            <Image
                                src={avatarUrl}
                                alt={doctor?.user?.name}
                                width="100%"
                                style={{ borderRadius: 12, maxWidth: '100%', height: 'auto' }}
                                
                            />
                        </Col>
                        <Col xs={24} md={16}>
                            <Title level={2}>
                                {doctor?.user?.name || "Không rõ tên"}
                            </Title>
                            <Text type="secondary" style={{ fontSize: 16 }}>
                                {doctor?.position?.name || "Chức vụ"}
                            </Text>
                            <br />
                            <Tag color="#2BB3A9" style={{ margin: '12px 0', fontSize: 14 }}>
                                {doctor?.department?.name || "Chuyên khoa"}
                            </Tag>

                            <Descriptions column={1} size="middle" style={{ marginTop: 16 }}>
                                <Descriptions.Item label="Email">
                                    <MailOutlined />  {doctor?.user?.email || "Chưa có"}
                                </Descriptions.Item>
                                <Descriptions.Item label="Số điện thoại">
                                    <PhoneOutlined /> {doctor?.user?.phone || "Chưa có"}
                                </Descriptions.Item>
                                <Descriptions.Item label="Địa chỉ">
                                    {doctor?.user?.address || "Chưa cập nhật"}
                                </Descriptions.Item>
                            </Descriptions>
                            <Button style={{ marginTop: 20,background:"#B15B68", color:"white" }}type="default" icon={<PhoneOutlined />} size="large">
                                Liên hệ đặt lịch
                            </Button>
                        </Col>
                    </Row>

                    <Divider style={{ margin: '16px 0' }} />

                    <DoctorDes dangerouslySetInnerHTML={{ __html: doctor?.description }}></DoctorDes>
                    
                    <Divider style={{ margin: '16px 0' }} />

                    <Title level={4}>Lịch làm việc</Title>

                    {doctorSchedule.map(({ day, timeSlots }) => (
                    <div key={day} style={{ marginBottom: 8 }}>
                        <Text strong style={{ width: 80, display: "inline-block" }}>{day}:</Text>
                        {timeSlots.length > 0 ? (
                        timeSlots.map((slot, idx) => (
                            <Tag key={idx} color="blue" style={{ marginBottom: 4 }}>
                            {slot}
                            </Tag>
                        ))
                        ) : (
                        <Text type="secondary">Nghỉ</Text>
                        )}
                    </div>
                    ))}
                </DetailCard>
            </ContentWrapper>
        </PageWrapper>
    );
};

export default MedicalStaffDetailPage;
