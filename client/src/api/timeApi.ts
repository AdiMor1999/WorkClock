import apiClient from "./apiClient";

export const getGermanTime = async () => {
  try {
    const response = await apiClient.get("/api/time/germany");
    return response.data.time;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.error || "Failed to fetch German time"
    );
  }
};
