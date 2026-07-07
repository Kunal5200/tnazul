"use client";

import React, { useEffect } from "react";
import {
  Box,
  Button,
  Grid,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  ArrowBack,
  ArrowForward,
  AccessTime,
  KeyboardArrowDown,
} from "@mui/icons-material";
import { COLORS } from "@/utils/enum";
import { poppins, poppins700 } from "@/utils/fonts";

interface ConditionsFormProps {
  formData: any;
  updateFormData: (fields: any) => void;
  onBack: () => void;
  onNext: () => void;
}

const ConditionsForm = ({
  formData,
  updateFormData,
  onBack,
  onNext,
}: ConditionsFormProps) => {
  const {
    contractStartDate,
    contractEndDate,
    transferExpiryDate,
    reasonForTransfer,
    transferTerms,
  } = formData;

  const setContractStartDate = (val: string) => updateFormData({ contractStartDate: val });
  const setContractEndDate = (val: string) => updateFormData({ contractEndDate: val });
  const setTransferExpiryDate = (val: string) => updateFormData({ transferExpiryDate: val });
  const setReasonForTransfer = (val: string) => updateFormData({ reasonForTransfer: val });
  const setTransferTerms = (val: string) => updateFormData({ transferTerms: val });

  // Custom Input Label Component
  const FormLabel = ({ label, required = false }: { label: string; required?: boolean }) => (
    <Typography
      sx={{
        fontFamily: poppins700.style.fontFamily,
        fontSize: "11px",
        fontWeight: 700,
        color: COLORS.SECONDARY,
        letterSpacing: "0.5px",
        mb: 1,
        display: "flex",
        alignItems: "center",
      }}
    >
      {label}
      {required && (
        <span style={{ color: COLORS.PRIMARY, marginLeft: "4px", fontSize: "14px" }}>*</span>
      )}
    </Typography>
  );

  // Common Input styling
  const inputStyleProps = {
    fullWidth: true,
    variant: "outlined" as const,
    sx: {
      "& .MuiOutlinedInput-root": {
        backgroundColor: "#F9FAFB",
        borderRadius: "14px",
        fontFamily: poppins.style.fontFamily,
        fontSize: "14px",
        "& fieldset": {
          borderColor: "#E4E7EC",
        },
        "&:hover fieldset": {
          borderColor: "#CBD5E1",
        },
        "&.Mui-focused fieldset": {
          borderColor: COLORS.PRIMARY,
          borderWidth: "1px",
        },
      },
      "& .MuiInputBase-input": {
        py: 1.8,
        px: 2,
        color: COLORS.SECONDARY,
        "&::placeholder": {
          color: "#98A2B3",
          opacity: 1,
        },
      },
    },
  };

  const selectStyleProps = {
    fullWidth: true,
    IconComponent: KeyboardArrowDown,
    displayEmpty: true,
    sx: {
      backgroundColor: "#F9FAFB",
      borderRadius: "14px",
      fontFamily: poppins.style.fontFamily,
      fontSize: "14px",
      color: COLORS.SECONDARY,
      "& .MuiSelect-select": {
        py: 1.8,
        px: 2,
      },
      "& fieldset": {
        borderColor: "#E4E7EC",
      },
      "&:hover fieldset": {
        borderColor: "#CBD5E1",
      },
      "&.Mui-focused fieldset": {
        borderColor: COLORS.PRIMARY,
        borderWidth: "1px",
      },
      "& .MuiSvgIcon-root": {
        color: COLORS.SECONDARY,
        right: 12,
      },
    },
  };

  // Auto calculate remaining duration in months based on dates
  const calculateRemainingDuration = () => {
    if (!contractStartDate || !contractEndDate) return "0 Months";
    const start = new Date(contractStartDate);
    const end = new Date(contractEndDate);
    if (isNaN(start.getTime()) || isNaN(end.getTime())) return "0 Months";
    
    // Difference in months
    const diffMonths = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    
    if (diffMonths <= 0) return "0 Months";
    return `${diffMonths} Month${diffMonths !== 1 ? "s" : ""}`;
  };

  const remainingDuration = calculateRemainingDuration();

  const isFormValid = contractEndDate !== "" && reasonForTransfer !== "";

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
      <form onSubmit={(e) => e.preventDefault()}>
        <Grid container spacing={3}>
          {/* Row 1: Start Date, End Date, Expiry Date */}
          <Grid size={{ xs: 12, md: 4 }}>
            <FormLabel label="CONTRACT START DATE" />
            <TextField
              type="date"
              value={contractStartDate}
              onChange={(e) => setContractStartDate(e.target.value)}
              {...inputStyleProps}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <FormLabel label="CONTRACT END DATE" required />
            <TextField
              type="date"
              value={contractEndDate}
              onChange={(e) => setContractEndDate(e.target.value)}
              {...inputStyleProps}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <FormLabel label="TRANSFER EXPIRY DATE" />
            <TextField
              type="date"
              value={transferExpiryDate}
              onChange={(e) => setTransferExpiryDate(e.target.value)}
              {...inputStyleProps}
            />
            <Typography
              sx={{
                fontFamily: poppins.style.fontFamily,
                fontSize: "11px",
                color: "#98A2B3",
                mt: 0.8,
              }}
            >
              Last date you accept transfer requests
            </Typography>
          </Grid>

          {/* Row 2: Green duration box */}
          <Grid size={{ xs: 12 }}>
            <Box
              sx={{
                backgroundColor: "#EDF9F1",
                border: "1px solid #D1F3DF",
                borderRadius: "14px",
                p: 2,
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <AccessTime sx={{ color: "#10753E" }} />
              <Box>
                <Typography
                  sx={{
                    fontFamily: poppins700.style.fontFamily,
                    fontSize: "14px",
                    fontWeight: 700,
                    color: "#10753E",
                  }}
                >
                  Remaining Duration: {remainingDuration}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: poppins.style.fontFamily,
                    fontSize: "12px",
                    color: "#475467",
                    mt: 0.2,
                  }}
                >
                  Auto-calculated from Contract End Date
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Row 3: Reason for transfer */}
          <Grid size={{ xs: 12 }}>
            <FormLabel label="REASON FOR TRANSFER" required />
            <Select
              value={reasonForTransfer}
              onChange={(e) => setReasonForTransfer(e.target.value)}
              renderValue={(selected) => {
                if (!selected) {
                  return <span style={{ color: "#98A2B3" }}>Select reason</span>;
                }
                return selected;
              }}
              {...selectStyleProps}
            >
              <MenuItem value="" disabled>Select reason</MenuItem>
              <MenuItem value="Financial Reasons">Financial Reasons</MenuItem>
              <MenuItem value="Relocation">Relocation</MenuItem>
              <MenuItem value="Upgrade">Upgrade</MenuItem>
              <MenuItem value="Downsize">Downsize</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </Grid>

          {/* Row 4: Transfer terms & conditions */}
          <Grid size={{ xs: 12 }}>
            <FormLabel label="TRANSFER TERMS & CONDITIONS" />
            <TextField
              multiline
              rows={4}
              placeholder="Describe any specific conditions for the transfer. E.g. Buyer must meet landlord approval, outstanding maintenance responsibilities, included items, etc."
              value={transferTerms}
              onChange={(e) => setTransferTerms(e.target.value)}
              {...inputStyleProps}
              sx={{
                ...inputStyleProps.sx,
                "& .MuiInputBase-input": {
                  ...inputStyleProps.sx["& .MuiInputBase-input"],
                  py: 1,
                  px: 0.5,
                },
              }}
            />
          </Grid>
        </Grid>

        {/* Bottom Navigation */}
        <Stack
          direction="row"
          sx={{
            alignItems: "center",
            justifyContent: "space-between",
            mt: 5,
            pt: 2,
            borderTop: "1px solid #F2F4F7",
          }}
        >
          {/* Back Button */}
          <Button
            variant="outlined"
            onClick={onBack}
            startIcon={<ArrowBack />}
            sx={{
              borderRadius: "14px",
              border: "1px solid #E4E7EC",
              color: COLORS.SECONDARY,
              px: 3,
              py: 1.5,
              textTransform: "none",
              fontFamily: poppins700.style.fontFamily,
              fontWeight: 700,
              fontSize: "14px",
              "&:hover": {
                backgroundColor: "#F9FAFB",
                borderColor: "#D0D5DD",
              },
            }}
          >
            Back
          </Button>

          {/* Continue Button */}
          <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
            {!isFormValid && (
              <Typography
                sx={{
                  fontFamily: poppins.style.fontFamily,
                  fontSize: "12px",
                  color: "#98A2B3",
                }}
              >
                Fill required fields to continue
              </Typography>
            )}
            <Button
              variant="contained"
              onClick={onNext}
              endIcon={<ArrowForward />}
              disabled={!isFormValid}
              sx={{
                borderRadius: "14px",
                backgroundColor: isFormValid ? COLORS.SECONDARY : "#E4E7EC",
                color: isFormValid ? COLORS.WHITE : "#98A2B3",
                px: 4,
                py: 1.5,
                textTransform: "none",
                fontFamily: poppins700.style.fontFamily,
                fontWeight: 700,
                fontSize: "14px",
                boxShadow: "none",
                "&:hover": {
                  backgroundColor: isFormValid ? "rgba(1, 53, 71, 0.9)" : "#E4E7EC",
                  boxShadow: "none",
                },
                "&.Mui-disabled": {
                  backgroundColor: "#E4E7EC",
                  color: "#98A2B3",
                },
              }}
            >
              Continue
            </Button>
          </Stack>
        </Stack>
      </form>
    </Box>
  );
};

export default ConditionsForm;
