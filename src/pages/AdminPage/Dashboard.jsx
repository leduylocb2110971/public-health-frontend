import React from "react";
import { Row, Col, Card, Statistic } from "antd";
import * as StaticService from "../../services/StaticService";
import { useQuery } from "@tanstack/react-query";
import DoctorChart from "../../components/ChartComponent/DoctorChart";
import DepartmentChart from "../../components/ChartComponent/DepartmentChart";
import ServiceChart from "../../components/ChartComponent/ServiceChart";
import NewsChart from "../../components/ChartComponent/NewsChart";
import {
  TeamOutlined,
  SolutionOutlined,
  MedicineBoxOutlined,
  FileTextOutlined,
  DashboardOutlined,
} from "@ant-design/icons";

const Dashboard = () => {
  const { data: statistics, isLoading } = useQuery({
    queryKey: ["statistics"],
    queryFn: StaticService.getStaticData,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });
  console.log("Statistics:", statistics);
  
  return (
    <div>
      {/* Số liệu tổng quan */}
      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <Statistic
              title="Bác sĩ"
              value={statistics?.data.totalDoctors || 0}
              prefix={<SolutionOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Chuyên khoa"
              value={statistics?.data.totalDepartments || 0}
              prefix={<MedicineBoxOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Dịch vụ"
              value={statistics?.data.totalServices || 0}
              prefix={<FileTextOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Tin tức"
              value={statistics?.data.totalNews || 0}
              prefix={<TeamOutlined />}
            />
          </Card>
        </Col>
      </Row>

      {/* Chỗ biểu đồ, bảng hoặc timeline sẽ đặt bên dưới */}
      <Row gutter={[16, 16]} style={{ marginTop: 32 }}>
        <Col span={12}><DoctorChart /></Col>
        {/* <Col span={12}><DepartmentChart /></Col> */}
        <Col span={12}><ServiceChart /></Col>
        <Col span={12}><NewsChart /></Col>
    </Row>
    </div>
  );
};

export default Dashboard;
