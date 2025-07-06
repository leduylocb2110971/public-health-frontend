import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Card } from "antd";
import * as ServiceService from "../../services/ServiceService";
import { useQuery } from "@tanstack/react-query";

const ServiceChart = () => {
    const getAllServices = useQuery({
        queryKey: ["services"],
        queryFn: ServiceService.getAllServices,
        refetchOnWindowFocus: false,
    });
    const { data: servicesResponse, isLoading, error } = getAllServices;
    const services = servicesResponse?.data || [];
    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error loading services: {error.message}</div>;
    }
    // Tính số lượng dịch vụ theo loại
    const serviceCounts = services.reduce((acc, service) => {
    const typeName = service.type?.name || "Không rõ";
    acc[typeName] = (acc[typeName] || 0) + 1;
    return acc;
    }, {});
    // Chuyển đổi thành mảng để biểu đồ
    const chartData = Object.entries(serviceCounts).map(([name, count]) => ({
        name,
        count,
    }));
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6347', '#6A5ACD'];

    return (
        <Card title="Số lượng dịch vụ theo loại" style={{ minHeight: 300 }}>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Tooltip />
                    <Legend />
                    <Pie
                        data={chartData}
                        dataKey="count"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        label
                    >
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`} />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </Card>
    );
}
export default ServiceChart;