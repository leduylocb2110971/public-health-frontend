import axiosClient from "../apis/axiosClient";

export const getStaticData = async () => {
  try {
    const response = await axiosClient.get("/statics/overview");
    return response.data;
  } catch (error) {
    console.error("Error fetching static data:", error);
    throw error;
  }
}