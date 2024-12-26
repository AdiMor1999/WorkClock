import React, { useState, useEffect } from "react";
import { getReports, updateReport } from "../api/adminApi";
import ReportTable from "./ReportTable";
import { Report } from "../types";
import EditReportModal from "./EditReportModal";
import { toast } from "react-toastify";

const AdminDashboard: React.FC = () => {
  const token = localStorage.getItem("authToken");
  const [reports, setReports] = useState<Report[]>([]);
  const [editingReport, setEditingReport] = useState<{
    username: string;
    index: number;
    clockIn: string;
    clockOut: string;
  } | null>(null);

  useEffect(() => {
    const fetchReports = async () => {
      if (token) {
        const reportsData = await getReports(token); // Pass the token to getReports
        setReports(reportsData); // Set the reports data to state
      }
    };

    fetchReports();
  }, [token]);

  const handleEdit = (report: {
    username: string;
    index: number;
    clockIn: string;
    clockOut: string;
  }) => {
    setEditingReport(report);
  };

  const handleUpdateReport = async (
    updatedClockIn: string,
    updatedClockOut: string
  ) => {
    if (editingReport && token) {
      const { username, index } = editingReport;

      try {
        const { updatedClockTime } = await updateReport(
          token,
          username,
          index,
          updatedClockIn,
          updatedClockOut
        );
        toast.success(`Successfully Update Report!`, {
          position: "top-center",
          autoClose: 3000,
        });

        // Update the specific clockTime in the reports state
        setReports((prevReports) =>
          prevReports.map((userReport) =>
            userReport.username === username
              ? {
                  ...userReport,
                  clockTimes: userReport.clockTimes.map((time, idx) =>
                    idx === updatedClockTime.index
                      ? {
                          ...time,
                          clockIn: updatedClockTime.clockIn,
                          clockOut: updatedClockTime.clockOut,
                        }
                      : time
                  ),
                }
              : userReport
          )
        );
      } catch (error) {
        console.error("Error updating the report:", error);
        toast.error("Failed to update the report. Please try again.", {
          position: "top-center",
          autoClose: 3000,
        });
      } finally {
        setEditingReport(null); // Close the modal
      }
    }
  };

  return (
    <div>
      <ReportTable reports={reports} onEdit={handleEdit} />
      <EditReportModal
        show={!!editingReport}
        onClose={() => setEditingReport(null)}
        report={editingReport}
        onSave={handleUpdateReport}
      />
    </div>
  );
};

export default AdminDashboard;
