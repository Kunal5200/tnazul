"use client";

import React, { useState } from "react";
import { Box, Container, Grid, Snackbar, Alert } from "@mui/material";
import Header from "./Header";
import OrderSummary from "./OrderSummary";
import Step1Review from "./Step1Review";
import Step2Verification from "./Step2Verification";
import Step3Verification from "./Step3Verification";
import SuccessReceipt from "./SuccessReceipt";
import FeaturedPaymentForm from "./FeaturedPaymentForm";

// Import modular sub-components
import PlanSelector from "./components/PlanSelector";

const CheckoutLayout = () => {
  const [plan, setPlan] = useState<"standard" | "featured">("standard");
  const [currentStep, setCurrentStep] = useState(1);
  const [savedIqama, setSavedIqama] = useState("1092837465");
  const [cardholderName, setCardholderName] = useState("Ahmed Mohamed");
  const [paymentMethod, setPaymentMethod] = useState("CREDIT CARD");
  const [isSuccess, setIsSuccess] = useState(false);

  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  const handleSnackbarClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const handleBack = () => {
    if (isSuccess) {
      setIsSuccess(false);
      setCurrentStep(1);
    } else if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      window.location.href = "/dashboard";
    }
  };

  // Standard flow actions
  const handleRequestVerification = (iqamaNumber: string) => {
    setSavedIqama(iqamaNumber);
    setCurrentStep(3);
  };

  const handleFinalVerification = () => {
    setSnackbar({
      open: true,
      message: "Listing activated successfully via Nafath!",
      severity: "success",
    });
    setIsSuccess(true);
  };

  // Featured flow actions
  const handlePayFeatured = (holderName: string, method: string) => {
    setCardholderName(holderName);
    setPaymentMethod(method);
    setSnackbar({
      open: true,
      message: `Payment of 113.85 SAR completed successfully via ${method}!`,
      severity: "success",
    });
    setIsSuccess(true);
  };

  const handleDone = () => {
    window.location.href = "/dashboard";
  };

  const handlePrint = () => {
    setSnackbar({
      open: true,
      message: "Downloading invoice receipt PDF...",
      severity: "success",
    });
  };

  const handlePlanToggle = (selectedPlan: "standard" | "featured") => {
    setPlan(selectedPlan);
    setCurrentStep(1);
    setIsSuccess(false);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#F9F8F6",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Distraction-free Secure Header */}
      <Header onBack={handleBack} />

      {/* Plan Selector Switcher */}
      {!isSuccess && (
        <PlanSelector plan={plan} onChange={handlePlanToggle} />
      )}

      {/* Main Content body */}
      <Container
        maxWidth="lg"
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          py: { xs: 4, md: 6 },
          px: { xs: 2, md: 4 },
        }}
      >
        {isSuccess ? (
          /* Render full-width centered success receipt */
          <SuccessReceipt
            plan={plan}
            txRef={plan === "standard" ? "TX-2026-9281" : "TX-2026-5832"}
            billedTo={plan === "standard" ? "Sara Al-Harbi" : cardholderName}
            listingName="Luxury 4BR Villa — Al Malaz Comp"
            method={plan === "standard" ? "NAFATH VERIFIED" : paymentMethod}
            timestamp="06/07/2026, 14:32"
            basePrice={plan === "standard" ? "0.00" : "99.00"}
            vat={plan === "standard" ? "0.00" : "14.85"}
            total={plan === "standard" ? "0.00" : "113.85"}
            onPrint={handlePrint}
            onDone={handleDone}
          />
        ) : (
          /* Render 2-column step form */
          <Grid
            container
            spacing={4}
            sx={{ alignItems: "flex-start", width: "100%" }}
          >
            {/* Left Column: Summary */}
            <Grid size={{ xs: 12, md: 4.5, lg: 4 }}>
              <OrderSummary currentStep={currentStep} plan={plan} />
            </Grid>

            {/* Right Column: Dynamic Steps */}
            <Grid size={{ xs: 12, md: 7.5, lg: 8 }}>
              {/* Step 1 for both Standard and Featured */}
              {currentStep === 1 && (
                <Step1Review onContinue={() => setCurrentStep(2)} />
              )}

              {/* Step 2 (Nafath Iqama for Standard, Payment Form for Featured) */}
              {currentStep === 2 && plan === "standard" && (
                <Step2Verification
                  onBack={() => setCurrentStep(1)}
                  onSubmit={handleRequestVerification}
                />
              )}
              {currentStep === 2 && plan === "featured" && (
                <FeaturedPaymentForm
                  onBack={() => setCurrentStep(1)}
                  onSubmit={handlePayFeatured}
                  amount="113.85"
                />
              )}

              {/* Step 3 (Nafath App Code check - only for Standard) */}
              {currentStep === 3 && plan === "standard" && (
                <Step3Verification
                  onCancel={() => setCurrentStep(2)}
                  onContinue={handleFinalVerification}
                />
              )}
            </Grid>
          </Grid>
        )}
      </Container>

      {/* Action Status Feedback SnackBar */}
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
          sx={{ borderRadius: "12px" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CheckoutLayout;
