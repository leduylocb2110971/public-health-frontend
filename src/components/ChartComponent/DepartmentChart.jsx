import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import { Card } from "antd";
import * as DepartmentService from "../../services/DepartmentService";
import { useQuery } from "@tanstack/react-query";

const DepartmentChart = () => {
  const getAllDepartments = useQuery({
    queryKey: ["departments"],
    queryFn: DepartmentService.getAllDepartments,
    refetchOnWindowFocus: false,
  });

  const { data: departmentsResponse, isLoading, error } = getAllDepartments;
  const departments = departmentsResponse?.data || [];

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error loading departments: {error.message}</div>;
  }

  // Tạo dữ liệu biểu đồ: mỗi chuyên khoa và số bác sĩ tương ứng
  const chartData = departments.map((dept) => ({
    name: dept.name,
    count: dept.doctors?.length || 0,
  }));

  return (
    <Card title="Số lượng bác sĩ theo chuyên khoa" style={{ minHeight: 300 }}>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" name="Số bác sĩ" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default DepartmentChart;
