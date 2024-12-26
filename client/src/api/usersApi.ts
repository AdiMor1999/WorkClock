import apiClient from "./apiClient";

export const recordClock = async (
  username: string,
  type: "in" | "out",
  token: string
) => {
  if (!token) {
    throw new Error("Authentication token not found");
  }

  try {
    const response = await apiClient.post(
      `/users/${username}/clock`,
      { type },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Add token to headers
        },
      }
    );
    return response.data; // Assuming the response contains the clock time status
  } catch (error: any) {
    throw new Error(
      error.response?.data?.error || "Failed to record clock time"
    );
  }
};
