import apiClient from "./apiClient";

export const loginUser = async (username: string, password: string) => {
  try {
    const response = await apiClient.post("/auth/login", {
      username,
      password,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || "Login failed");
  }
};
