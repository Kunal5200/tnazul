import {
  ArrowBack,
  ArrowForward,
  KeyboardArrowDown,
} from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  Grid,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { SyntheticEvent, useState } from "react";
import { COLORS } from "@/utils/enum";
import { poppins, poppins700 } from "@/utils/fonts";
import { CONTRACT_CATEGORY, CONTRACT_TYPE } from "@/utils/constant";
import { FormikProps, FormikState } from "formik";
import { ContractFormData } from "@/app/dashboard/contracts/create/page";

interface ContractFormProps {
  formData: any;
  updateFormData: (fields: any) => void;
  onNext?: () => void;
  formik: FormikProps<ContractFormData>;
}

const ContractForm = ({ onNext, formik }: ContractFormProps) => {
  const FormLabel = ({
    label,
    required = false,
  }: {
    label: string;
    required?: boolean;
  }) => (
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
        <span
          style={{ color: COLORS.PRIMARY, marginLeft: "4px", fontSize: "14px" }}
        >
          *
        </span>
      )}
    </Typography>
  );

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

  const isFormValid =
    formik.values.contractType !== "" &&
    formik.values.contractTitle.trim() !== "" &&
    formik.values.contractNumber.trim() !== "" &&
    formik.values.category !== "" &&
    formik.values.city.trim() !== "" &&
    formik.values.district.trim() !== "" &&
    formik.values.description.trim() !== "" &&
    formik.values.description.length >= 10;

  return (
    <Box
      sx={{
        backgroundColor: COLORS.WHITE,
        borderRadius: "24px",
        boxShadow: "0px 8px 30px rgba(1, 53, 71, 0.04)",
        border: "1px solid #01354705",
        p: 4,
      }}
    >
      <form onSubmit={(e) => e.preventDefault()}>
        <Grid container spacing={3}>
          <Grid size={12}>
            <FormLabel label="Contract Type" required />
            <Autocomplete
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Select contract type"
                  {...inputStyleProps}
                />
              )}
              options={CONTRACT_TYPE}
              value={formik.values.contractType}
              onChange={(_, value) =>
                formik.setFieldValue("contractType", value)
              }
            />
          </Grid>
          <Grid size={12}>
            <FormLabel label="Contract Title" required />
            <TextField
              placeholder="e.g. 3BR Villa - Al Nakheel District, Riyadh"
              value={formik.values.contractTitle}
              onChange={formik.handleChange}
              {...inputStyleProps}
              id="contractTitle"
            />
          </Grid>
          <Grid size={6}>
            <FormLabel label="Contract Number" required />
            <TextField
              placeholder="e.g. CTR-2024-25"
              value={formik.values.contractNumber}
              onChange={formik.handleChange}
              {...inputStyleProps}
              id="contractNumber"
            />
          </Grid>
          <Grid size={6}>
            <FormLabel label="Category" required />
            <Autocomplete
              renderInput={(params) => (
                <TextField
                  {...params}
                  {...inputStyleProps}
                  placeholder="Select category"
                />
              )}
              options={CONTRACT_CATEGORY}
              value={formik.values.category}
              onChange={(_, value) => formik.setFieldValue("category", value)}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <FormLabel label="CITY" required />

            <TextField
              placeholder="e.g. Riyadh, Jeddah, Dammam, Mecca, Medina"
              value={formik.values.city}
              onChange={formik.handleChange}
              {...inputStyleProps}
              id="city"
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <FormLabel label="DISTRICT / NEIGHBOURHOOD" required />
            <TextField
              placeholder="e.g. Al-Olaya, Al-Nakheel"
              value={formik.values.district}
              onChange={formik.handleChange}
              {...inputStyleProps}
              id="district"
            />
          </Grid>
          <Grid size={12}>
            <FormLabel label="Description" required />
            <TextField
              placeholder="Description"
              {...inputStyleProps}
              value={formik.values.description}
              onChange={formik.handleChange}
              {...inputStyleProps}
              id="description"
              multiline
              rows={5}
              fullWidth
            />
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
              disabled={!isFormValid}
              endIcon={<ArrowForward />}
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
                  backgroundColor: isFormValid
                    ? "rgba(1, 53, 71, 0.9)"
                    : "#E4E7EC",
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
