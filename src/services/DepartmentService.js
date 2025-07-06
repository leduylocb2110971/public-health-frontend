import axiosClient from '../apis/axiosClient';

export const getAllDepartments = async () => {
    try {
        const response = await axiosClient.get('/departments/get-all-departments');
        return response.data;
    } catch (error) {
        console.error('Error fetching departments:', error);
        throw error;
    }
}
export const getDepartment = async (departmentId) => {
    try {
        const response = await axiosClient.get(`/departments/get-department/${departmentId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching department:', error);
        throw error;
    }
}
export const createDepartment = async (departmentData) => {
    try {
        const response = await axiosClient.post('/departments/create-department', departmentData);
        return response.data;
    } catch (error) {
        console.error('Error creating department:', error);
        throw error;
    }
}
export const updateDepartment = async (departmentId, departmentData) => {
    try {
        const response = await axiosClient.put(`/departments/update-department/${departmentId}`, departmentData);
        return response.data;
    } catch (error) {
        console.error('Error updating department:', error);
        throw error;
    }
}
export const deleteDepartment = async (departmentId) => {
    try {
        console.log("Giá trị departmentId nhận được:", departmentId)
        const response = await axiosClient.delete(`/departments/delete-department/${departmentId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting department:', error);
        throw error;
    }
}
export const deleteManyDepartments = async (ids) => {
    try {
        console.log(ids);

        const response = await axiosClient.post(
            `/departments/delete-many-departments`,
            ids,
        );
        return response.data;
    } catch (error) {
        console.error("Error xóa nhiều chuyên khoa:", error);
        throw error;
    }
};