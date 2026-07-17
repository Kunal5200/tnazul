"use client";

import React, { useState } from "react";
import { 
  Box, 
  Container, 
  Typography, 
  Stack, 
  Snackbar, 
  Alert,
  Paper
} from "@mui/material";
import AdminSidebar from "@/components/widgets/Sidebar/AdminSidebar";
import ReportItem, { ReportData } from "./ReportItem";
import { poppins, poppins700 } from "@/utils/fonts";
import { COLORS } from "@/utils/enum";

const initialReports: ReportData[] = [
  {
    id: "1",
    type: "listing",
    typeLabel: "Listing Report",
    title: "3BR Villa – Al-Nakheel (ID #1042)",
    isUrgent: true,
    reason: "Photos appear to be copied from a different property listing online.",
    reporterInfo: "User: S. Al-Qahtani · Today 09:14",
    actionLabel: "Remove Listing"
  },
  {
    id: "2",
    type: "user",
    typeLabel: "User Report",
    title: "User: Nasser Al-Rashed (ID #U-0821)",
    isUrgent: true,
    reason: "Requesting cash payment outside the platform and sharing personal phone numbers.",
    reporterInfo: "User: M. Al-Dosari · Yesterday 17:30",
    actionLabel: "Warn User"
  },
  {
    id: "3",
    type: "listing",
    typeLabel: "Listing Report",
    title: "Commercial Shop – Riyadh (ID #1039)",
    isUrgent: false,
    reason: "Monthly amount listed is significantly below market rate. Possible fraud.",
    reporterInfo: "User: K. Al-Ghamdi · Yesterday 11:05",
    actionLabel: "Remove Listing"
  }
];

const ReportsQueue = () => {
  const [reports, setReports] = useState<ReportData[]>(initialReports);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: "success" | "info" | "warning" | "error" }>({
    open: false,
    message: "",
    severity: "success"
  });

  const handleSnackbarClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const handleAction = (id: string) => {
    const target = reports.find(r => r.id === id);
    setReports((prev) => prev.filter(r => r.id !== id));
    setSnackbar({
      open: true,
      message: `Action executed: "${target?.actionLabel}" on "${target?.title}".`,
      severity: "success"
    });
  };

  const handleReview = (id: string) => {
    const target = reports.find(r => r.id === id);
    setSnackbar({
      open: true,
      message: `Opening moderation view for "${target?.title}"...`,
      severity: "info"
    });
  };

  const handleDismiss = (id: string) => {
    const target = reports.find(r => r.id === id);
    setReports((prev) => prev.filter(r => r.id !== id));
    setSnackbar({
      open: true,
      message: `Report on "${target?.title}" dismissed.`,
      severity: "info"
    });
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#F4F7F8" }}>
      {/* Sidebar fixed to the left */}
      <AdminSidebar />

      {/* Main Content Area */}
      <Box 
        sx={{ 
          marginLeft: "276px", 
          flexGrow: 1, 
          display: "flex", 
          flexDirection: "column" 
        }}
      >
        {/* Top Header Panel */}
        <Box 
          sx={{ 
            backgroundColor: COLORS.WHITE, 
            py: 2.5, 
            px: { xs: 3, md: 5 }, 
            borderBottom: "1px solid #0135470F" 
          }}
        >
          <Typography
            sx={{
              fontFamily: poppins700.style.fontFamily,
              fontWeight: 800,
              fontSize: "24px",
              color: COLORS.SECONDARY,
            }}
          >
            Reports
          </Typography>
          <Typography
            sx={{
              fontFamily: poppins.style.fontFamily,
              fontWeight: 500,
              fontSize: "13px",
              color: "#7A9BAB",
            }}
          >
            Tnazul Administration
          </Typography>
        </Box>

        {/* Complaints & Reports Content Panel */}
        <Container 
          maxWidth="xl" 
          sx={{ 
            py: 4, 
            px: { xs: 3, md: 5 },
            flexGrow: 1 
          }}
        >
          {/* Header Row */}
          <Box sx={{ mb: 4 }}>
            <Typography
              sx={{
                fontFamily: poppins700.style.fontFamily,
                fontWeight: 800,
                fontSize: "22px",
                color: COLORS.SECONDARY,
                mb: 0.5,
              }}
            >
              Complaints & Reports
            </Typography>
            <Typography
              sx={{
                fontFamily: poppins.style.fontFamily,
                fontWeight: 500,
                fontSize: "14px",
                color: "#7A9BAB",
              }}
            >
              {reports.length} open reports
            </Typography>
          </Box>

          {/* Reports Items Queue */}
          {reports.length > 0 ? (
            <Box>
              {reports.map((item) => (
                <ReportItem
                  key={item.id}
                  item={item}
                  onAction={handleAction}
                  onReview={handleReview}
                  onDismiss={handleDismiss}
                />
              ))}
            </Box>
          ) : (
            <Paper 
              elevation={0} 
              sx={{ 
                p: 6, 
                borderRadius: "24px", 
                textAlign: "center",
                border: "1px solid #0135470F",
                backgroundColor: COLORS.WHITE
              }}
            >
              <Typography
                sx={{
                  fontFamily: poppins700.style.fontFamily,
                  fontWeight: 700,
                  fontSize: "18px",
                  color: COLORS.SECONDARY,
                  mb: 1
                }}
              >
                No Reports Active!
              </Typography>
              <Typography
                sx={{
                  fontFamily: poppins.style.fontFamily,
                  fontWeight: 500,
                  fontSize: "14px",
                  color: "#7A9BAB"
                }}
              >
                All user and listing complaints are currently cleared.
              </Typography>
            </Paper>
          )}
        </Container>
      </Box>

      {/* Snackbar alerts */}
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={4000} 
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert 
          onClose={handleSnackbarClose} 
          severity={snackbar.severity} 
          variant="filled"
          sx={{ 
            borderRadius: "12px", 
            fontFamily: poppins.style.fontFamily,
            fontSize: "14px"
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ReportsQueue;
