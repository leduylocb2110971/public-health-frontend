import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend } from "recharts";
import { Card } from "antd";
import * as NewsService from "../../services/NewsService";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs"; // Nhớ cài: npm install dayjs

const NewsChart = () => {
    const getAllNews = useQuery({
        queryKey: ["news"],
        queryFn: NewsService.getAllNews,
        refetchOnWindowFocus: false,
    });

    const { data: newsResponse, isLoading, error } = getAllNews;
    const news = Array.isArray(newsResponse?.data) ? newsResponse.data : [];

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading news: {error.message}</div>;

    // ✅ Group theo tháng
    const newsByMonthMap = {};

    news.forEach((item) => {
        const month = dayjs(item.createdAt).format("MM/YYYY");
        newsByMonthMap[month] = (newsByMonthMap[month] || 0) + 1;
    });

    const chartData = Object.entries(newsByMonthMap).map(([month, count]) => ({
        month,
        count,
    }));

    return (
        <Card title="Số bài viết theo tháng" style={{ height: '100%' }}>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#82ca9d" name="Số bài viết" />
                </BarChart>
            </ResponsiveContainer>
        </Card>
    );
};

export default NewsChart;
