import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend } from "recharts";
import { useQuery } from "@tanstack/react-query";
import * as DoctorService from "../../services/DoctorService";
import { Card } from "antd";

const useQueryGetAllDoctors = () => {
  return useQuery({
    queryKey: ["getAllDoctors"],
    queryFn: () => DoctorService.getAllDoctors(),
  });
}

const DoctorChart = () => {
  const { data: doctorsResponse, isLoading } = useQueryGetAllDoctors();
  const doctors = doctorsResponse?.data || [];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Tính số lượng bác sĩ theo chuyên khoa
  const departmentCounts = doctors.reduce((acc, doctor) => {
    acc[doctor.department.name] = (acc[doctor.department.name] || 0) + 1;
    return acc;
  }, {});

  // Chuyển đổi thành mảng để biểu đồ
  const chartData = Object.entries(departmentCounts).map(([name, count ]) => ({
    name,
    "Số lượng": count,
  }));

  return (
    <Card title="Số lượng bác sĩ theo chuyên khoa" style={{ minHeight: 300 }}>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Số lượng" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};
export default DoctorChart;