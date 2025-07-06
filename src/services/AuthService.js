import axiosClient from '../apis/axiosClient';

export const registerUser = async (userData) => {
    try {
        const response = await axiosClient.post('/auth/register', userData);
        return response.data;
    } catch (error) {
        console.error('Error registering user:'+ error.message);
        throw error;
    }
}
export const loginUser = async (credentials) => {
    try {
        const response = await axiosClient.post('/auth/login', credentials);
        return response.data;   
    }
    catch (error) {
        console.error('Error logging in user:', error);
        throw error;
    }
}
export const logoutUser = async () => {
    try {
        const response = await axiosClient.post('/auth/logout');
        return response.data;
    } catch (error) {
        console.error('Error logging out user:', error);
        throw error;
    }
}   
export const refreshToken = async () => {
    try {
        const response = await axiosClient.post('/auth/refresh-token');
        return response.data;
    } catch (error) {
        console.error('Error refreshing token:', error);
        throw error;
    }
}
export const changePassword = async (data) => {
    try {
        const response = await axiosClient.post(`/auth/change-password`, data);
        return response.data;
    } catch (error) {
        throw error?.response?.data || error.message;
    }
}