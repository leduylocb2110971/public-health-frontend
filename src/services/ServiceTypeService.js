import axiosClient from '../apis/axiosClient';

export const getAllServiceTypes = async () => {
    try {
        const response = await axiosClient.get('/service-types/get-all-service-types');
        return response.data;
    } catch (error) {
        console.error('Error fetching service types:', error);
        throw error;
    }
}
export const getServiceType = async (serviceTypeId) => {
    try {
        const response = await axiosClient.get(`/service-types/get-service-type/${serviceTypeId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching service type:', error);
        throw error;
    }
}
export const createServiceType = async (serviceTypeData) => {
    try {
        const response = await axiosClient.post('/service-types/create-service-type', serviceTypeData);
        return response.data;
    } catch (error) {
        console.error('Error creating service type:', error);
        throw error;
    }
}
export const updateServiceType = async (serviceTypeId, serviceTypeData) => {
    try {
        const response = await axiosClient.put(`/service-types/update-service-type/${serviceTypeId}`, serviceTypeData);
        return response.data;
    } catch (error) {
        console.error('Error updating service type:', error);
        throw error;
    }
}
export const deleteServiceType = async (serviceTypeId) => {
    try {
        const response = await axiosClient.delete(`/service-types/delete-service-type/${serviceTypeId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting service type:', error);
        throw error;
    }
}
export const deleteManyServiceTypes = async (ids) => {
    try {
        console.log(ids);

        const response = await axiosClient.post(
            `/service-types/delete-many-service-types`,
            ids,
        );
        return response.data;
    } catch (error) {
        console.error("Error xóa nhiều ServiceType:", error);
        throw error;
    }
};