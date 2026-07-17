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
import { AccessTime } from "@mui/icons-material";
import AdminSidebar from "@/components/widgets/Sidebar/AdminSidebar";
import QueueItem, { QueueItemData } from "./QueueItem";
import { poppins, poppins700 } from "@/utils/fonts";
import { COLORS } from "@/utils/enum";

const initialQueueData: QueueItemData[] = [
  {
    id: "1",
    title: "5BR Villa - Diplomatic Quarter",
    category: "real-estate",
    categoryLabel: "Real Estate",
    categoryColor: "#2E7D32",
    categoryBg: "rgba(46, 125, 50, 0.1)",
    location: "Diplomatic Quarter, Riyadh",
    totalValue: "2,80,000",
    monthlyValue: "11,000",
    docsCount: 3,
    timestamp: "Submitted 2 hours ago",
    imageUrl: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=300&auto=format&fit=crop",
    description: "Fully furnished 5-bedroom villa in a gated compound with a garden, pool access, and 2 covered parking spots.",
    sellerName: "Ahmad Al-Khalid",
    sellerPhone: "+966 5X XXX 1234",
    sellerVerified: true,
  },
  {
    id: "2",
    title: "BMW 530i 2023 - Full Lease Transfer",
    category: "vehicles",
    categoryLabel: "Vehicles",
    categoryColor: "#166CA9",
    categoryBg: "rgba(22, 108, 170, 0.1)",
    location: "Al-Rawdah, Jeddah",
    totalValue: "68,000",
    monthlyValue: "2,800",
    docsCount: 2,
    timestamp: "Submitted 4 hours ago",
    imageUrl: "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=300&auto=format&fit=crop",
    description: "BMW 530i in pristine condition. Agency maintained, transfer of lease option ready. Fuel efficient and fully loaded model.",
    sellerName: "Sara Al-Mutairi",
    sellerPhone: "+966 5X XXX 5678",
    sellerVerified: true,
  },
  {
    id: "3",
    title: "Restaurant Space - Tahlia Street",
    category: "commercial",
    categoryLabel: "Commercial",
    categoryColor: "#E78B49",
    categoryBg: "rgba(231, 186, 73, 0.1)",
    location: "Al-Tahlia, Jeddah",
    totalValue: "1,20,000",
    monthlyValue: "6,000",
    docsCount: 4,
    timestamp: "Submitted 6 hours ago",
    imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=300&auto=format&fit=crop",
    description: "Restaurant space on Tahlia Street, high foot traffic, fully equipped kitchen.",
    sellerName: "Mohammed Al-Hassan",
    sellerPhone: "+966 5X XXX 9012",
    sellerVerified: false,
  }
];

const ApprovelQueue = () => {
  const [queueList, setQueueList] = useState<QueueItemData[]>(initialQueueData);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: "success" | "info" | "warning" | "error" }>({
    open: false,
    message: "",
    severity: "success"
  });

  const handleSnackbarClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const handleApprove = (id: string) => {
    const item = queueList.find(q => q.id === id);
    setQueueList((prev) => prev.filter(q => q.id !== id));
    setSnackbar({
      open: true,
      message: `Listing "${item?.title}" approved successfully.`,
      severity: "success"
    });
  };

  const handleReject = (id: string, reason: string) => {
    if (!reason.trim()) {
      setSnackbar({
        open: true,
        message: "Rejection reason is required.",
        severity: "error"
      });
      return;
    }
    const item = queueList.find(q => q.id === id);
    setQueueList((prev) => prev.filter(q => q.id !== id));
    setSnackbar({
      open: true,
      message: `Listing "${item?.title}" rejected. Reason: "${reason}"`,
      severity: "info"
    });
  };

  const handleRevision = (id: string, reason: string) => {
    if (!reason.trim()) {
      setSnackbar({
        open: true,
        message: "Revision details are required.",
        severity: "warning"
      });
      return;
    }
    const item = queueList.find(q => q.id === id);
    setQueueList((prev) => prev.filter(q => q.id !== id));
    setSnackbar({
      open: true,
      message: `Revision requested for "${item?.title}". Details: "${reason}"`,
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
            Approvals
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

        {/* Queue Content Panel */}
        <Container 
          maxWidth="xl" 
          sx={{ 
            py: 4, 
            px: { xs: 3, md: 5 },
            flexGrow: 1 
          }}
        >
          {/* Header Row */}
          <Stack 
            direction={{ xs: "column", sm: "row" }} 
            spacing={2} 
            sx={{ 
              alignItems: { xs: "flex-start", sm: "center" }, 
              justifyContent: "space-between",
              mb: 4 
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontFamily: poppins700.style.fontFamily,
                  fontWeight: 800,
                  fontSize: "22px",
                  color: COLORS.SECONDARY,
                  mb: 0.5,
                }}
              >
                Listing Approval Queue
              </Typography>
              <Typography
                sx={{
                  fontFamily: poppins.style.fontFamily,
                  fontWeight: 500,
                  fontSize: "14px",
                  color: "#7A9BAB",
                }}
              >
                {queueList.length} listings awaiting review
              </Typography>
            </Box>

            {/* Review target badge */}
            <Stack 
              direction="row" 
              spacing={1} 
              sx={{ 
                alignItems: "center",
                backgroundColor: "rgba(231, 186, 73, 0.08)",
                border: "1px solid rgba(231, 186, 73, 0.25)",
                borderRadius: "100px",
                py: 1,
                px: 2.5,
                color: "#E78B49"
              }}
            >
              <AccessTime sx={{ fontSize: 18 }} />
              <Typography
                sx={{
                  fontFamily: poppins700.style.fontFamily,
                  fontWeight: 700,
                  fontSize: "13px",
                }}
              >
                Review within 2 hours
              </Typography>
            </Stack>
          </Stack>

          {/* Queue Items */}
          {queueList.length > 0 ? (
            <Box>
              {queueList.map((item) => (
                <QueueItem
                  key={item.id}
                  item={item}
                  onApprove={handleApprove}
                  onReject={handleReject}
                  onRevision={handleRevision}
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
                All Caught Up!
              </Typography>
              <Typography
                sx={{
                  fontFamily: poppins.style.fontFamily,
                  fontWeight: 500,
                  fontSize: "14px",
                  color: "#7A9BAB"
                }}
              >
                There are no listings awaiting approval in the queue.
              </Typography>
            </Paper>
          )}
        </Container>
      </Box>

      {/* Snackbar Alert Feedback */}
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

export default ApprovelQueue;
