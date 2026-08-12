"use client";

import React, { useEffect, useState } from "react";
import { Box, Container, Snackbar, Alert, Tabs, Tab } from "@mui/material";
import AdminSidebar from "@/components/widgets/Sidebar/AdminSidebar";
import ApprovalsTopBar from "./ApprovalsTopBar";
import ApprovalQueueHeader from "./ApprovalQueueHeader";
import ApprovalQueueList from "./ApprovalQueueList";
import { poppins, poppins700 } from "@/utils/fonts";
import { COLORS, CONTRACT_STATUS } from "@/utils/enum";
import { useContractList } from "@/hooks/contract/useContractList";

const ApprovelQueue = () => {
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "info" | "warning" | "error";
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  const handleSnackbarClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const [apiRequestData, setApiRequstData] = useState({
    page: 1,
    limit: 10,
    status: CONTRACT_STATUS.PUBLISHED,
  });

  const { loading, fetchContractDetails, contractData } = useContractList();

  useEffect(() => {
    fetchContractDetails(apiRequestData);
  }, [apiRequestData]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setApiRequstData((prev) => ({ ...prev, status: newValue as CONTRACT_STATUS }));
  };

  return (
    <Box
      sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#F4F7F8" }}
    >
      {/* Sidebar fixed to the left */}
      <AdminSidebar approval_number={contractData?.docs?.length || 0} />

      {/* Main Content Area */}
      <Box
        sx={{
          marginLeft: "276px",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <ApprovalsTopBar />

        {/* Queue Content Panel */}
        <Container
          maxWidth="xl"
          sx={{
            py: 4,
            px: { xs: 3, md: 5 },
            flexGrow: 1,
          }}
        >
          <ApprovalQueueHeader count={contractData?.docs?.length} />

          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
            <Tabs 
              value={apiRequestData.status} 
              onChange={handleTabChange}
              sx={{
                '& .MuiTab-root': {
                  fontFamily: poppins700.style.fontFamily,
                  fontWeight: 600,
                  textTransform: 'none',
                  fontSize: '15px',
                  color: '#7A9BAB',
                  '&.Mui-selected': {
                    color: COLORS.SECONDARY,
                  },
                },
                '& .MuiTabs-indicator': {
                  backgroundColor: COLORS.PRIMARY,
                }
              }}
            >
              <Tab label="Pending" value={CONTRACT_STATUS.PUBLISHED} />
              <Tab label="Approved" value={CONTRACT_STATUS.APPROVED} />
              <Tab label="Rejected" value={CONTRACT_STATUS.REJECTED} />
            </Tabs>
          </Box>

          <ApprovalQueueList 
            loading={loading} 
            contractData={contractData} 
            onRefresh={() => fetchContractDetails(apiRequestData)} 
          />
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
            fontSize: "14px",
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ApprovelQueue;
