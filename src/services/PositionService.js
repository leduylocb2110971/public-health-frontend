import axiosClient from '../apis/axiosClient';

export const getAllPositions = async () => {
    try {
        const response = await axiosClient.get('/positions/get-all-positions');
        return response.data;
    } catch (error) {
        console.error('Error fetching positions:', error);
        throw error;
    }
}
export const getPosition = async (positionId) => {
    try {
        const response = await axiosClient.get(`/positions/get-position/${positionId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching position:', error);
        throw error;
    }
}
export const createPosition = async (positionData) => {
    try {
        const response = await axiosClient.post('/positions/create-position', positionData);
        return response.data;
    } catch (error) {
        console.error('Error creating position:', error);
        throw error;
    }
}
export const updatePosition = async (positionId, positionData) => {
    try {
        const response = await axiosClient.put(`/positions/update-position/${positionId}`, positionData);
        return response.data;
    } catch (error) {
        console.error('Error updating position:', error);
        throw error;
    }
}
export const deletePosition = async ({positionId}) => {
    try {
        const response = await axiosClient.delete(`/positions/delete-position/${positionId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting position:', error);
        throw error;
    }
}
export const deleteManyPositions = async (ids) => {
    try {
        console.log(ids);

        const response = await axiosClient.post(
            `/positions/delete-many-positions`,
            ids,
        );
        return response.data;
    } catch (error) {
        console.error("Error xóa nhiều vị trí:", error);
        throw error;
    }
};