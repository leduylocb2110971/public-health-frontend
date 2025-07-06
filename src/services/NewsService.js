import axiosClient from '../apis/axiosClient';

export  const getAllNews = async () => {
    try {
        const response = await axiosClient.get('/news/get-all-news');
        return response.data;
    } catch (error) {
        console.error('Error fetching news:', error);
        throw error;
    }
}
export const getNews = async (newsId) => {
    try {
        const response = await axiosClient.get(`/news/get-news/${newsId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching news:', error);
        throw error;
    }
}
export const getNewsByType = async (newsTypeId) => {
    try {
        const response = await axiosClient.get(`/news/get-news-by-type/${newsTypeId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching news by type:', error);
        throw error;
    }
}
export const createNews = async (newsData) => {
    try {
        const response = await axiosClient.post('/news/create-news', newsData);
        return response.data;
    } catch (error) {
        console.error('Error creating news:', error);
        throw error;
    }
}   
export const updateNews = async (newsId, newsData) => {
    try {
        const response = await axiosClient.put(`/news/update-news/${newsId}`, newsData);
        return response.data;
    } catch (error) {
        console.error('Error updating news:', error);
        throw error;
    }
}
export const deleteNews = async (newsId) => {
    try {
        const response = await axiosClient.delete(`/news/delete-news/${newsId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting news:', error);
        throw error;
    }
}
export const deleteManyNews = async (ids) => {
    try {
        console.log(ids);

        const response = await axiosClient.post(
            `/news/delete-many-news`,
            ids,
        );
        return response.data;
    } catch (error) {
        console.error("Error xóa nhiều tin tức:", error);
        throw error;
    }
}
export const searchNews = async (keyword, page, limit ) => {
    try {
        const response = await axiosClient.get(
            `/news/search-news?keyword=${keyword}&page=${page}&limit=${limit}`
        );
        return response.data;
    } catch (error) {
        console.error('Error searching news:', error);
        throw error;
    }
}
// Lấy tin tức liên quan
export const getRelatedNews = async (newsId) => {
    try {
        const response = await axiosClient.get(`/news/related-news/${newsId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching related news:', error);
        throw error;
    }
}