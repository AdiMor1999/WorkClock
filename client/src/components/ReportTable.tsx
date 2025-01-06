import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Paper,
} from "@mui/material";
import { DateTime } from "luxon";
import { Report } from "../types";

interface ReportTableProps {
  reports: Report[];
  onEdit: (report: {
    username: string;
    index: number;
    clockIn: string;
    clockOut: string;
  }) => void;
}

const ReportTable: React.FC<ReportTableProps> = ({ reports, onEdit }) => {
  const formatDate = (isoString: string) => {
    // Format the clock-in and clock-out dates using Luxon DateTime
    return DateTime.fromISO(isoString, {
      zone: "Europe/Berlin",
    }).toLocaleString(DateTime.DATETIME_SHORT);
  };

  // Flatten the clockTimes to display each clock-in and clock-out on separate rows
  const flattenedReports = reports.flatMap((report) =>
    report.clockTimes.map((clockTime, index) => ({
      username: report.username,
      clockIn: clockTime.clockIn,
      clockOut: clockTime.clockOut,
      index,
      key: `${report.username}-${index}`,
    }))
  );

  //from:
  // const reports = [
  // {
  //   username: 'Alice',
  //   clockTimes: [
  //     { clockIn: '2024-12-01T08:00', clockOut: '2024-12-01T16:00' },
  //     { clockIn: '2024-12-02T08:30', clockOut: '2024-12-02T16:30' },
  //   ]
  // }
  //];
  //to:
  // [
  //   { username: 'Alice', clockIn: '2024-12-01T08:00', clockOut: '2024-12-01T16:00', index: 0, key: 'Alice-0' },
  //   { username: 'Alice', clockIn: '2024-12-02T08:30', clockOut: '2024-12-02T16:30', index: 1, key: 'Alice-1' },
  // ]

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Username</TableCell>
            <TableCell align="center">Clock In</TableCell>
            <TableCell align="center">Clock Out</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {flattenedReports.map((row) => (
            <TableRow key={row.key}>
              <TableCell>{row.username}</TableCell>
              <TableCell align="center">{formatDate(row.clockIn)}</TableCell>
              <TableCell align="center">{formatDate(row.clockOut)}</TableCell>
              <TableCell align="center">
                <Button
                  onClick={() =>
                    onEdit({
                      username: row.username,
                      index: row.index,
                      clockIn: row.clockIn,
                      clockOut: row.clockOut,
                    })
                  }
                  variant="contained"
                  color="primary"
                >
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ReportTable;
