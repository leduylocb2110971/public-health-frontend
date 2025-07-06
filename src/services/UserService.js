import axiosClient from '../apis/axiosClient';

export const getAllUsers = async () => {
    try {
        const response = await axiosClient.get('/users/get-all-users');
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
}
export const getUser = async (userId) => {
  try {
    const response = await axiosClient.get(`/users/get-user/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
}
export const createUser = async (userData) => {
  try {
    const response = await axiosClient.post('/users/create-user', userData);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}
export const updateUser = async (userId, userData) => {
    try {
        const response = await axiosClient.put(`/users/update-user/${userId}`, userData);
        return response.data;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
}
export const uploadAvatar = async (userId, file) => {
    try {
        const response = await axiosClient.post(
            `/users/upload-avatar/${userId}`,
            file,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error uploading avatar:', error);
        throw error;
    }
};


export const deleteUser = async ({id}) => {
    try {
        const response = await axiosClient.delete(`/users/delete-user/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
}
export const deleteManyUsers = async (ids) => {
    try {
        console.log(ids);

        const response = await axiosClient.post(
            `/users/delete-many-users`,
            ids,
        );
        return response.data;
    } catch (error) {
        console.error("Error xóa nhiều user:", error);
        throw error;
    }
};