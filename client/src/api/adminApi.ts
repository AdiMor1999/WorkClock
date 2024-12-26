import apiClient from "./apiClient";

export const getReports = async (token: string) => {
  try {
    const response = await apiClient.get("/admin/reports", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.reports;
  } catch (error) {
    console.error("Error fetching reports", error);
    return [];
  }
};

export const updateReport = async (
  token: string,
  username: string,
  index: number,
  clockIn: string,
  clockOut: string
) => {
  try {
    const response = await apiClient.patch(
      `/admin/reports/${username}`,
      { index, clockIn, clockOut },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating the report", error);
    throw new Error("Failed to update the report");
  }
};
