import React, { useState, useEffect } from "react";
import { Modal, Button, TextField, Box } from "@mui/material";
import { DateTime } from "luxon";

interface EditReportModalProps {
  show: boolean;
  onClose: () => void;
  report: {
    username: string;
    index: number;
    clockIn: string;
    clockOut: string;
  } | null;
  onSave: (updatedClockIn: string, updatedClockOut: string) => void;
}

const EditReportModal: React.FC<EditReportModalProps> = ({
  show,
  onClose,
  report,
  onSave,
}) => {
  const [clockIn, setClockIn] = useState<string>("");
  const [clockOut, setClockOut] = useState<string>("");

  // Update state when the report changes
  useEffect(() => {
    setClockIn(report?.clockIn || "");
    setClockOut(report?.clockOut || "");
  }, [report]);

  const handleSave = () => {
    onSave(clockIn, clockOut);
  };

  if (!report) return null;

  return (
    <Modal open={show} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <h3>Edit Clock Times</h3>
        <form>
          <TextField
            label="Clock In"
            type="datetime-local"
            fullWidth
            margin="normal"
            value={DateTime.fromISO(clockIn, {
              zone: "Europe/Berlin",
            }).toFormat("yyyy-MM-dd'T'HH:mm")}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setClockIn(
                DateTime.fromFormat(e.target.value, "yyyy-MM-dd'T'HH:mm", {
                  zone: "Europe/Berlin",
                }).toISO() || ""
              )
            }
          />
          <TextField
            label="Clock Out"
            type="datetime-local"
            fullWidth
            margin="normal"
            value={DateTime.fromISO(clockOut, {
              zone: "Europe/Berlin",
            }).toFormat("yyyy-MM-dd'T'HH:mm")}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setClockOut(
                DateTime.fromFormat(e.target.value, "yyyy-MM-dd'T'HH:mm", {
                  zone: "Europe/Berlin",
                }).toISO() || ""
              )
            }
          />

          <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={handleSave} variant="contained" color="primary">
              Save
            </Button>
            <Button onClick={onClose} variant="outlined" sx={{ ml: 2 }}>
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default EditReportModal;
