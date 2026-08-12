"use client";
import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { useContractDetails } from "@/hooks/contract/useContractList";
import { useUserStore } from "@/store/userStore";
import { Box, Container, Grid } from "@mui/material";
import { ACCOUNT_TYPE } from "@/utils/enum";

// Import Refactored Components
import ContractHeader from "./contractDetails/ContractHeader";
import ContractInfo from "./contractDetails/ContractInfo";
import ContractFinancials from "./contractDetails/ContractFinancials";
import ContractSeller from "./contractDetails/ContractSeller";
import ContractDetailsSkeleton from "./contractDetails/ContractDetailsSkeleton";

const ContractDetailsLayout = () => {
  const { fetchContractDetails, loading, contractDetails } = useContractDetails();
  const { id } = useParams();
  
  // Use user store to check role
  const { userData, fetchUserDetail } = useUserStore();

  useEffect(() => {
    if (!userData) {
      fetchUserDetail();
    }
  }, [userData, fetchUserDetail]);

  useEffect(() => {
    if (id) {
      fetchContractDetails(id);
    }
  }, [id]);

  const isAdmin = userData?.roleName === ACCOUNT_TYPE.ADMINISTRATOR;
  
  // Handlers for Admin actions
  const handleApprove = () => {
    console.log("Approved", contractDetails?._id);
  };

  const handleReject = () => {
    console.log("Rejected", contractDetails?._id);
  };

  return (
    <Box sx={{ backgroundColor: "#F4F7F8", minHeight: "100vh", py: 4 }}>
      <Container maxWidth="xl">
        {loading || !contractDetails ? (
          <ContractDetailsSkeleton />
        ) : (
          <>
            <ContractHeader 
              contractDetails={contractDetails} 
              isAdmin={isAdmin} 
              onApprove={handleApprove} 
              onReject={handleReject} 
            />

            <Grid container spacing={4}>
              {/* Left Column (Images, Details, Description) */}
              <Grid size={{ xs: 12, lg: 8 }}>
                <ContractInfo contractDetails={contractDetails} />
              </Grid>

              {/* Right Column (Financials & User Info) */}
              <Grid size={{ xs: 12, lg: 4 }}>
                <ContractFinancials contractDetails={contractDetails} />
                <ContractSeller contractDetails={contractDetails} />
              </Grid>
            </Grid>
          </>
        )}
      </Container>
    </Box>
  );
};

export default ContractDetailsLayout;
