import LoadingComponent from "../LoadingComponent/LoadingComponent";
import ModalComponent from "../ModalComponent/ModalComponent";
import { useState, useEffect } from "react";
import { Form, Input, Select, DatePicker, Radio, Row, Col } from "antd";

const ModalUpdateUser = ({ isModalOpen, isPendingUpdateProfile, patient, handleUpdateProfile, onCancel }) => {
    const [form] = Form.useForm();
    //Lấy thông tin người dùng từ patient
    useEffect(() => {
        if (patient) {
            form.setFieldsValue({
                name: patient?.name,
                email: patient?.email,
                phone: patient?.phone,
            })
        }
    }, [patient, form]);

    const handleOkUpdate = () => {
        form.validateFields()
            .then((values) => {
                const updateData = {
                    ...values,
                    id: patient?.id, // Giả sử patient có trường _id là ID của người dùng
                };
                
                handleUpdateProfile(updateData);
            })
            .catch(error => {
                console.error("Validation failed:", error);
            });
        }
    return (
        <LoadingComponent isLoading={isPendingUpdateProfile}>

            <ModalComponent
                title="Cập nhật thông tin cá nhân"
                open={isModalOpen}
                onOk={handleOkUpdate}
                onCancel={onCancel}
                okText="Cập nhật"
                cancelText="Hủy"
            >
                <Form form={form} layout="vertical">
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="name"
                                label="Họ và tên"
                                rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}
                            >
                                <Input placeholder="Nhập họ và tên" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="email"
                                label="Email"
                                rules={[{ type: 'email', message: 'Email không hợp lệ!' }]}
                            >
                                <Input placeholder="Nhập email" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="phone"
                                label="Số điện thoại"
                                rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
                            >
                                <Input placeholder="Nhập số điện thoại" />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </ModalComponent>
        </LoadingComponent>
    )
}
export default ModalUpdateUser;
