"use client";

import React, { useState, useEffect } from "react";
import { Box, Container, Grid } from "@mui/material";
import ContractHeader from "@/components/layout/dashboard/contracts/Header";
import StepperSidebar from "@/components/layout/dashboard/contracts/StepperSidebar";
import ContractForm from "@/components/layout/dashboard/contracts/ContractForm";
import FinancialForm from "@/components/layout/dashboard/contracts/FinancialForm";
import ConditionsForm from "@/components/layout/dashboard/contracts/ConditionsForm";
import AttachmentsForm from "@/components/layout/dashboard/contracts/AttachmentsForm";
import ReviewPublishForm from "@/components/layout/dashboard/contracts/ReviewPublishForm";
import WhatsAppButton from "@/components/layout/dashboard/contracts/WhatsAppButton";
import { useFormik } from "formik";
// best
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

  contract: {
    name: string;
    size: number;
    type: string;
    content?: string;
    file?: File;
  } | null;
  asset: {
    name: string;
    size: number;
    type: string;
    content?: string;
    file?: File;
  }[];

  listingType: "Standard" | "Featured";
}

const CreateContractPage = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const formik = useFormik<ContractFormData>({
    initialValues: {
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
      contract: null,
      asset: [],
      listingType: "Standard",
    },
    validationSchema: "",

    onSubmit: (values) => {
      console.log("values", values);
    },
  });
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
    contract: null,
    asset: [],
    listingType: "Standard",
  });

  const updateFormData = (fields: Partial<ContractFormData>) => {
    setFormData((prev) => ({ ...prev, ...fields }));
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    
    if (id) {
      const fetchContractDetails = async () => {
        try {
          const { contractControllers } = await import("@/app/api/contractControllers");
          const res = await contractControllers.getContractDetailsById(id);
          const data = res?.data || res || {};
          
          const mappedValues: ContractFormData = {
            contractType: data.contractType || "",
            contractTitle: data.contractTitle || data.title || "",
            contractNumber: data.contractNumber || "",
            category: data.category || "",
            city: data.city || "",
            district: data.districtOrNeighborhood || data.district || "",
            description: data.contractDescription || data.description || "",
            totalValue: data.totalContractValue?.toString() || data.totalValue?.toString() || data.price?.toString() || "",
            monthlyAmount: data.monthlyAmount?.toString() || "",
            transferFee: data.transferFee?.toString() || "",
            securityDeposit: data.securityDeposit?.toString() || "",
            negotiable: data.negotiable || false,
            contractStartDate: (data.contractStartDate || data.startDate) ? new Date(data.contractStartDate || data.startDate).toISOString().split('T')[0] : "",
            contractEndDate: (data.contractEndDate || data.endDate) ? new Date(data.contractEndDate || data.endDate).toISOString().split('T')[0] : "",
            transferExpiryDate: data.transferExpiryDate ? new Date(data.transferExpiryDate).toISOString().split('T')[0] : "",
            reasonForTransfer: data.reasonForTransfer || data.transferReason || "",
            transferTerms: data.transferTerms || data.TransferTermsConditions || "",
            contract: data.contractDocuments?.[0] ? {
              name: data.contractDocuments[0].split('/').pop() || "contract.jpg",
              size: 0,
              type: "image/jpeg",
              content: data.contractDocuments[0]
            } : null,
            asset: (data.assetImages || []).map((url: string) => ({
              name: url.split('/').pop() || "asset.jpg",
              size: 0,
              type: "image/jpeg",
              content: url
            })),
            listingType: data.listingType || "Standard",
          };

          formik.setValues(mappedValues);
          setFormData(mappedValues);
        } catch (error) {
          console.error("Failed to fetch contract details for editing", error);
        }
      };

      fetchContractDetails();
    }
  }, []);

  const renderFormStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <ContractForm
            formData={formData}
            updateFormData={updateFormData}
            onNext={() => setCurrentStep(2)}
            formik={formik}
          />
        );
      case 2:
        return (
          <FinancialForm
            onBack={() => setCurrentStep(1)}
            onNext={() => setCurrentStep(3)}
            formik={formik}
          />
        );
      case 3:
        return (
          <ConditionsForm
            formData={formData}
            updateFormData={updateFormData}
            onBack={() => setCurrentStep(2)}
            onNext={() => setCurrentStep(4)}
            formik={formik}
          />
        );
      case 4:
        return (
          <AttachmentsForm
            onBack={() => setCurrentStep(3)}
            onNext={() => setCurrentStep(5)}
            formik={formik}
          />
        );
      case 5:
        return (
          <ReviewPublishForm formik={formik} onBack={() => setCurrentStep(4)} />
        );
      default:
        return (
          <ContractForm
            formData={formData}
            updateFormData={updateFormData}
            onNext={() => setCurrentStep(2)}
            formik={formik}
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
      <ContractHeader currentStep={currentStep} />

      <Container maxWidth="lg" sx={{ mt: 5 }}>
        <Grid container spacing={4} sx={{ alignItems: "flex-start" }}>
          <Grid size={{ xs: 12, md: 4, lg: 3.5 }}>
            <StepperSidebar currentStep={currentStep} />
          </Grid>

          <Grid size={{ xs: 12, md: 8, lg: 8.5 }}>{renderFormStep()}</Grid>
        </Grid>
      </Container>

      <WhatsAppButton />
    </Box>
  );
};

export default CreateContractPage;
