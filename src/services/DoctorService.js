import axiosClient from '../apis/axiosClient';

export const getAllDoctors = async () => {
    try {
        const response = await axiosClient.get('/doctors/get-all-doctors');
        return response.data;
    } catch (error) {
        console.error('Error fetching doctors:', error);
        throw error;
    }
}
export const getDoctor = async (doctorId) => {
    try {
        const response = await axiosClient.get(`/doctors/get-doctor/${doctorId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching doctor:', error);
        throw error;
    }
}
export const createDoctor = async (doctorData) => {
    try {
        const response = await axiosClient.post('/doctors/create-doctor', doctorData);
        return response.data;
    } catch (error) {
        console.error('Error creating doctor:', error);
        throw error;
    }
}
export const updateDoctor = async (doctorId, doctorData) => {
    try {
        const response = await axiosClient.put(`/doctors/update-doctor/${doctorId}`, doctorData);
        return response.data;
    } catch (error) {
        console.error('Error updating doctor:', error);
        throw error;
    }
}
export const deleteDoctor = async (doctorId) => {
    try {
        const response = await axiosClient.delete(`/doctors/delete-doctor/${doctorId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting doctor:', error);
        throw error;
    }
}
export const deleteManyDoctors = async (ids) => {
    try {
        console.log(ids);
        const response = await axiosClient.post(
            `/doctors/delete-many-doctors`,
            ids,
        );
        return response.data;
    } catch (error) {
        console.error("Error xóa nhiều bacs sĩ:", error);
        throw error;
    }
};