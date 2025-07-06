import axiosClient from '../apis/axiosClient';

export const getAllNewsTypes = async () => {
    try {
        const response = await axiosClient.get('/news-types/get-all-news-types');
        return response.data;
    } catch (error) {
        console.error('Error fetching news types:', error);
        throw error;
    }
}
export const getNewsType = async (newsTypeId) => {
    try {
        const response = await axiosClient.get(`/news-types/get-news-type/${newsTypeId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching news type:', error);
        throw error;
    }
}
export const createNewsType = async (newsTypeData) => {
    try {
        const response = await axiosClient.post('/news-types/create-news-type', newsTypeData);
        return response.data;
    } catch (error) {
        console.error('Error creating news type:', error);
        throw error;
    }
}
export const updateNewsType = async (newsTypeId, newsTypeData) => {
    try {
        const response = await axiosClient.put(`/news-types/update-news-type/${newsTypeId}`, newsTypeData);
        return response.data;
    } catch (error) {
        console.error('Error updating news type:', error);
        throw error;
    }
}
export const deleteNewsType = async (newsTypeId) => {
    try {
        const response = await axiosClient.delete(`/news-types/delete-news-type/${newsTypeId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting news type:', error);
        throw error;
    }
}
export const deleteManyNewsTypes = async (ids) => {
    try {
        console.log(ids);

        const response = await axiosClient.post(
            `/news-types/delete-many-news-types`,
            ids,
        );
        return response.data;
    } catch (error) {
        console.error("Error xóa nhiều loại tin tức:", error);
        throw error;
    }
}
