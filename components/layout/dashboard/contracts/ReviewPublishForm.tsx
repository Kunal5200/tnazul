"use client";

import React, { useState } from "react";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { VisibilityOutlined } from "@mui/icons-material";
import { COLORS } from "@/utils/enum";
import { poppins700 } from "@/utils/fonts";
import { useRouter } from "next/navigation";
import { useCreateContract } from "@/hooks/contract/useCreateContract";
import { ContractPayload } from "@/utils/types";

import CardPreview from "./reviewComponents/CardPreview";
import DetailsSummary from "./reviewComponents/DetailsSummary";
import ListingTypeSelector from "./reviewComponents/ListingTypeSelector";
import ReviewFormActions from "./reviewComponents/ReviewFormActions";

interface ReviewPublishFormProps {
  formData: any;
  updateFormData: (fields: any) => void;
  onBack: () => void;
}

const ReviewPublishForm = ({
  formData,
  updateFormData,
  onBack,
}: ReviewPublishFormProps) => {
  const router = useRouter();
  const { createContract, loading } = useCreateContract();

  const { listingType } = formData;
  const [selectedPlan, setSelectedPlan] = useState<"Standard" | "Featured">(
    listingType || "Standard",
  );

  const handlePlanChange = (plan: "Standard" | "Featured") => {
    setSelectedPlan(plan);
    updateFormData({ listingType: plan });
  };

  // Helper to format currency values
  const formatCurrency = (val: string) => {
    if (!val) return "Not specified";
    const cleanVal = val.toString().replace(/,/g, "");
    const num = parseFloat(cleanVal);
    if (isNaN(num)) return val;
    return new Intl.NumberFormat("en-US").format(num);
  };

  // Helper to calculate remaining duration
  const getRemainingDurationText = () => {
    const { contractStartDate, contractEndDate } = formData;
    if (!contractStartDate || !contractEndDate) return "0 month";
    const start = new Date(contractStartDate);
    const end = new Date(contractEndDate);
    if (isNaN(start.getTime()) || isNaN(end.getTime())) return "0 month";
    const months =
      (end.getFullYear() - start.getFullYear()) * 12 +
      (end.getMonth() - start.getMonth());
    return `${Math.max(0, months)} month`;
  };

  const remainingDurationText = getRemainingDurationText();

  const handleContractSubmit = async (status: "Draft" | "Published") => {
    const payload: ContractPayload = {
      contractNumber: formData.contractNumber,
      contractType: formData.contractType,
      contractTitle: formData.contractTitle,
      contractDescription: formData.description,
      city: formData.city,
      districtOrNeighborhood: formData.district,
      category: formData.category,
      totalContractValue: formData.totalValue
        ? parseFloat(formData.totalValue.toString().replace(/,/g, ""))
        : undefined,
      monthlyAmount: formData.monthlyAmount
        ? parseFloat(formData.monthlyAmount.toString().replace(/,/g, ""))
        : undefined,
      transferFee: formData.transferFee
        ? parseFloat(formData.transferFee.toString().replace(/,/g, ""))
        : undefined,
      securityDeposit: formData.securityDeposit
        ? parseFloat(formData.securityDeposit.toString().replace(/,/g, ""))
        : undefined,
      priceNegotiable: formData.negotiable ?? false,
      startDate: formData.contractStartDate,
      endDate: formData.contractEndDate,
      transferExpiryDate: formData.transferExpiryDate,
      remainingDuration: remainingDurationText,
      transferReason: formData.reasonForTransfer,
      TransferTermsConditions: formData.transferTerms,
      contractStatus: status,
      // assetPhotos: formData.assetPhotos,
    };

    console.log("werty", payload);

    try {
      await createContract(payload);
    } catch (err) {
      console.error("Error creating contract:", err);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: COLORS.WHITE,
        borderRadius: "24px",
        boxShadow: "0px 8px 30px rgba(1, 53, 71, 0.04)",
        p: { xs: 3, md: 4 },
        width: "100%",
        border: "1px solid #01354705",
      }}
    >
      {/* HOW BUYERS WILL SEE IT Header */}
      <Stack direction="row" spacing={1} sx={{ alignItems: "center", mb: 3 }}>
        <VisibilityOutlined
          sx={{ color: COLORS.SIDEBAR_TEXT_COLOR, fontSize: 18 }}
        />
        <Typography
          sx={{
            fontFamily: poppins700.style.fontFamily,
            fontSize: "11px",
            fontWeight: 700,
            color: COLORS.SIDEBAR_TEXT_COLOR,
            letterSpacing: "1.2px",
            textTransform: "uppercase",
          }}
        >
          How Buyers Will See It
        </Typography>
      </Stack>

      {/* Main Grid: Card Preview (Left) & Details Summary (Right) */}
      <Grid container spacing={4} sx={{ mb: 5 }}>
        <Grid size={{ xs: 12, md: 5.5 }}>
          <CardPreview
            formData={formData}
            remainingDurationText={remainingDurationText}
            formatCurrency={formatCurrency}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6.5 }}>
          <DetailsSummary formData={formData} formatCurrency={formatCurrency} />
        </Grid>
      </Grid>

      {/* LISTING TYPE Section */}
      <ListingTypeSelector
        selectedPlan={selectedPlan}
        onPlanChange={handlePlanChange}
      />

      {/* Action Footer Buttons */}
      <ReviewFormActions
        onBack={onBack}
        onPublish={() => handleContractSubmit("Published")}
        onSaveDraft={() => handleContractSubmit("Draft")}
        loading={loading}
      />
    </Box>
  );
};

export default ReviewPublishForm;
