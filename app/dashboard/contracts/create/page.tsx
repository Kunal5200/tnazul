"use client";

import React, { useState } from "react";
import { Box, Container, Grid } from "@mui/material";
import ContractHeader from "@/components/layout/dashboard/contracts/Header";
import StepperSidebar from "@/components/layout/dashboard/contracts/StepperSidebar";
import ContractForm from "@/components/layout/dashboard/contracts/ContractForm";
import FinancialForm from "@/components/layout/dashboard/contracts/FinancialForm";
import ConditionsForm from "@/components/layout/dashboard/contracts/ConditionsForm";
import AttachmentsForm from "@/components/layout/dashboard/contracts/AttachmentsForm";
import ReviewPublishForm from "@/components/layout/dashboard/contracts/ReviewPublishForm";
import WhatsAppButton from "@/components/layout/dashboard/contracts/WhatsAppButton";

export interface ContractFormData {
  contractType: string;
  contractTitle: string;
  contractNumber: string;
  category: string;
  city: string;
  district: string;
  description: string;

  totalValue: string;
  monthlyAmount: string;
  transferFee: string;
  securityDeposit: string;
  negotiable: boolean;

  contractStartDate: string;
  contractEndDate: string;
  transferExpiryDate: string;
  reasonForTransfer: string;
  transferTerms: string;

  // Step 4: Attachments
  contractDocuments: {
    name: string;
    size: number;
    type: string;
    content?: string;
  }[];
  assetPhotos: { name: string; size: number; type: string; content?: string }[];

  listingType: "Standard" | "Featured";
}

const CreateContractPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<ContractFormData>({
    contractType: "",
    contractTitle: "",
    contractNumber: "",
    category: "",
    city: "",
    district: "",
    description: "",
    totalValue: "",
    monthlyAmount: "",
    transferFee: "",
    securityDeposit: "",
    negotiable: false,
    contractStartDate: "",
    contractEndDate: "",
    transferExpiryDate: "",
    reasonForTransfer: "",
    transferTerms: "",
    contractDocuments: [],
    assetPhotos: [],
    listingType: "Standard",
  });

  const updateFormData = (fields: Partial<ContractFormData>) => {
    setFormData((prev) => ({ ...prev, ...fields }));
  };

  const renderFormStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <ContractForm
            formData={formData}
            updateFormData={updateFormData}
            onNext={() => setCurrentStep(2)}
          />
        );
      case 2:
        return (
          <FinancialForm
            formData={formData}
            updateFormData={updateFormData}
            onBack={() => setCurrentStep(1)}
            onNext={() => setCurrentStep(3)}
          />
        );
      case 3:
        return (
          <ConditionsForm
            formData={formData}
            updateFormData={updateFormData}
            onBack={() => setCurrentStep(2)}
            onNext={() => setCurrentStep(4)}
          />
        );
      case 4:
        return (
          <AttachmentsForm
            formData={formData}
            updateFormData={updateFormData}
            onBack={() => setCurrentStep(3)}
            onNext={() => setCurrentStep(5)}
          />
        );
      case 5:
        return (
          <ReviewPublishForm
            formData={formData}
            updateFormData={updateFormData}
            onBack={() => setCurrentStep(4)}
          />
        );
      default:
        return (
          <ContractForm
            formData={formData}
            updateFormData={updateFormData}
            onNext={() => setCurrentStep(2)}
          />
        );
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#F9F8F6",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      {/* Top Header */}
      <ContractHeader currentStep={currentStep} />

      {/* Main Content Area */}
      <Container
        maxWidth="lg"
        sx={{
          flex: 1,
          display: "flex",
          py: { xs: 4, md: 6 },
          px: { xs: 2, md: 4 },
        }}
      >
        <Grid container spacing={4} sx={{ alignItems: "flex-start" }}>
          {/* Left Column: Form Progress Stepper */}
          <Grid size={{ xs: 12, md: 4, lg: 3.5 }}>
            <StepperSidebar currentStep={currentStep} />
          </Grid>

          {/* Right Column: Dynamic Form depending on currentStep */}
          <Grid size={{ xs: 12, md: 8, lg: 8.5 }}>{renderFormStep()}</Grid>
        </Grid>
      </Container>

      {/* Floating WhatsApp Action Button */}
      <WhatsAppButton />
    </Box>
  );
};

export default CreateContractPage;
