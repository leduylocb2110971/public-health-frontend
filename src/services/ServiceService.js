import axiosClient from '../apis/axiosClient';

export const getAllServices = async ({ page = 1, limit } = {}) => {
    try {
        const response = await axiosClient.get('/services/get-all-services?page=' + page + '&limit=' + limit);
        return response.data;
    } catch (error) {
        console.error('Error fetching services:', error);
        throw error;
    }
}
export const getService = async (serviceId) => {
    try {
        const response = await axiosClient.get(`/services/get-service/${serviceId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching service:', error);
        throw error;
    }
}
export const getServiceByType = async (serviceTypeId) => {
    try {
        const response = await axiosClient.get(`/services/get-service-by-type/${serviceTypeId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching service by type:', error);
        throw error;
    }
}
export const createService = async (serviceData) => {
    try {
        const response = await axiosClient.post('/services/create-service', serviceData);
        return response.data;
    } catch (error) {
        console.error('Error creating service:', error);
        throw error;
    }
}
export const updateService = async (serviceId, data) => {
    try {
        console.log("serviceData", data)
        const response = await axiosClient.put(`/services/update-service/${serviceId}`, data);
        return response.data;
    } catch (error) {
        console.error('Error updating service:', error);
        throw error;
    }
}
export const deleteService = async (serviceId) => {
    try {
        const response = await axiosClient.delete(`/services/delete-service/${serviceId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting service:', error);
        throw error;
    }
}
export const deleteManyServices = async (ids) => {
    try {
        console.log(ids);

        const response = await axiosClient.post(
            `/services/delete-many-services`,
            ids,
        );
        return response.data;
    } catch (error) {
        console.error("Error xóa nhiều service:", error);
        throw error;
    }
};
export const searchServices = async (keyword, page, limit) => {
    try {
        const response = await axiosClient.get(
            `/services/search-service?keyword=${keyword}&page=${page}&limit=${limit}`
        );
        return response.data;
    } catch (error) {
        console.error('Error searching service:', error);
        throw error;
    }
}
// phương thức lấy dịch vụ liên quan
export const getRelatedServices = async (serviceId) => {
    try {
        const response = await axiosClient.get(`/services/related-services/${serviceId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching related services:', error);
        throw error;
    }
}