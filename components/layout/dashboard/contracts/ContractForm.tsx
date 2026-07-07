import {
  ArrowBack,
  ArrowForward,
  KeyboardArrowDown,
} from "@mui/icons-material";
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
import React, { useState } from "react";
import { COLORS } from "@/utils/enum";
import { poppins, poppins700 } from "@/utils/fonts";

interface ContractFormProps {
  formData: any;
  updateFormData: (fields: any) => void;
  onNext?: () => void;
}

const ContractForm = ({ formData, updateFormData, onNext }: ContractFormProps) => {
  const {
    contractType,
    contractTitle,
    contractNumber,
    category,
    city,
    district,
    description,
  } = formData;

  const setContractType = (val: string) => updateFormData({ contractType: val });
  const setContractTitle = (val: string) => updateFormData({ contractTitle: val });
  const setContractNumber = (val: string) => updateFormData({ contractNumber: val });
  const setCategory = (val: string) => updateFormData({ category: val });
  const setCity = (val: string) => updateFormData({ city: val });
  const setDistrict = (val: string) => updateFormData({ district: val });
  const setDescription = (val: string) => updateFormData({ description: val });

  const maxDescriptionLength = 1000;

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

  // Check if form is valid (required fields filled)
  const isFormValid =
    contractType !== "" &&
    contractTitle.trim() !== "" &&
    category !== "" &&
    city !== "" &&
    description.trim() !== "";

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
          {/* Contract Type */}
          <Grid size={{ xs: 12 }}>
            <FormLabel label="CONTRACT TYPE" required />
            <Select
              value={contractType}
              onChange={(e) => setContractType(e.target.value)}
              renderValue={(selected) => {
                if (!selected) {
                  return <span style={{ color: "#98A2B3" }}>Select contract type</span>;
                }
                return selected;
              }}
              {...selectStyleProps}
            >
              <MenuItem value="" disabled>Select contract type</MenuItem>
              <MenuItem value="Residential Rent">Residential Rent</MenuItem>
              <MenuItem value="Commercial Rent">Commercial Rent</MenuItem>
              <MenuItem value="Sale Contract">Sale Contract</MenuItem>
              <MenuItem value="Investment Contract">Investment Contract</MenuItem>
            </Select>
          </Grid>

          {/* Contract Title */}
          <Grid size={{ xs: 12 }}>
            <FormLabel label="CONTRACT TITLE" required />
            <TextField
              placeholder="e.g. 3BR Villa - Al Nakheel District, Riyadh"
              value={contractTitle}
              onChange={(e) => setContractTitle(e.target.value)}
              {...inputStyleProps}
            />
          </Grid>

          {/* Contract Number and Category */}
          <Grid size={{ xs: 12, md: 6 }}>
            <FormLabel label="CONTRACT NUMBER" />
            <TextField
              placeholder="e.g. CTR-2024-00123"
              value={contractNumber}
              onChange={(e) => setContractNumber(e.target.value)}
              {...inputStyleProps}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <FormLabel label="CATEGORY" required />
            <Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              renderValue={(selected) => {
                if (!selected) {
                  return <span style={{ color: "#98A2B3" }}>Select category</span>;
                }
                return selected;
              }}
              {...selectStyleProps}
            >
              <MenuItem value="" disabled>Select category</MenuItem>
              <MenuItem value="Apartment">Apartment</MenuItem>
              <MenuItem value="Villa">Villa</MenuItem>
              <MenuItem value="Land">Land</MenuItem>
              <MenuItem value="Building">Building</MenuItem>
              <MenuItem value="Office">Office</MenuItem>
            </Select>
          </Grid>

          {/* City and District/Neighbourhood */}
          <Grid size={{ xs: 12, md: 6 }}>
            <FormLabel label="CITY" required />
            <Select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              renderValue={(selected) => {
                if (!selected) {
                  return <span style={{ color: "#98A2B3" }}>Select city</span>;
                }
                return selected;
              }}
              {...selectStyleProps}
            >
              <MenuItem value="" disabled>Select city</MenuItem>
              <MenuItem value="Riyadh">Riyadh</MenuItem>
              <MenuItem value="Jeddah">Jeddah</MenuItem>
              <MenuItem value="Dammam">Dammam</MenuItem>
              <MenuItem value="Mecca">Mecca</MenuItem>
              <MenuItem value="Medina">Medina</MenuItem>
            </Select>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <FormLabel label="DISTRICT / NEIGHBOURHOOD" />
            <TextField
              placeholder="e.g. Al-Olaya, Al-Nakheel"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              {...inputStyleProps}
            />
          </Grid>

          {/* Contract Description */}
          <Grid size={{ xs: 12 }}>
            <FormLabel label="CONTRACT DESCRIPTION" required />
            <TextField
              multiline
              rows={4}
              placeholder="Describe the contract, property details, key terms, and any important information for potential buyers..."
              value={description}
              onChange={(e) => {
                if (e.target.value.length <= maxDescriptionLength) {
                  setDescription(e.target.value);
                }
              }}
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
            {/* Character Count */}
            <Typography
              sx={{
                fontFamily: poppins.style.fontFamily,
                fontSize: "11px",
                color: "#98A2B3",
                mt: 1,
              }}
            >
              {description.length}/{maxDescriptionLength} characters
            </Typography>
          </Grid>
        </Grid>

        {/* Action Buttons */}
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
          {/* Cancel Button */}
          <Button
            variant="outlined"
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
            Cancel
          </Button>

          {/* Right Action buttons */}
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

export default ContractForm;
