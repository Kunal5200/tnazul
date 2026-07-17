"use client";

import React, { useState } from "react";
import {
  Box,
  Paper,
  Stack,
  Typography,
  Grid,
  FormControlLabel,
  Checkbox,
  Button,
  Chip,
} from "@mui/material";
import { ArrowForward, InsertDriveFile } from "@mui/icons-material";
import { poppins, poppins700 } from "@/utils/fonts";
import { COLORS } from "@/utils/enum";

interface Step1ReviewProps {
  onContinue: () => void;
}

const Step1Review = ({ onContinue }: Step1ReviewProps) => {
  const [agreed1, setAgreed1] = useState(false);
  const [agreed2, setAgreed2] = useState(false);

  const canContinue = agreed1 && agreed2;

  return (
    <Paper
      elevation={0}
      sx={{
        p: 4.5,
        borderRadius: "24px",
        backgroundColor: COLORS.WHITE,
        border: "1px solid #0135470F",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      {/* Header Row: Title & Stepper */}
      <Stack
        direction="row"
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Box>
          {/* Tag */}
          <Chip
            label="STANDARD ACTIVATION"
            size="small"
            sx={{
              backgroundColor: "rgba(46, 125, 50, 0.08)",
              color: "#2E7D32",
              fontFamily: poppins700.style.fontFamily,
              fontWeight: 700,
              fontSize: "10px",
              borderRadius: "6px",
              height: "22px",
              mb: 1.5,
            }}
          />
          {/* Title */}
          <Typography
            sx={{
              fontFamily: poppins700.style.fontFamily,
              fontWeight: 800,
              fontSize: "24px",
              color: COLORS.SECONDARY,
            }}
          >
            Activate Listing Journey
          </Typography>
        </Box>

        {/* Stepper Graphic */}
        <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
          {/* Step 1 Circle */}
          <Box
            sx={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              backgroundColor: COLORS.SECONDARY,
              color: COLORS.WHITE,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: poppins700.style.fontFamily,
              fontWeight: 700,
              fontSize: "12px",
            }}
          >
            1
          </Box>
          {/* Connection Line */}
          <Box
            sx={{ width: 36, height: "1px", backgroundColor: "#0135471A" }}
          />
          {/* Step 2 Circle */}
          <Box
            sx={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              backgroundColor: "#F4F7F8",
              color: "#7A9BAB",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: poppins700.style.fontFamily,
              fontWeight: 700,
              fontSize: "12px",
              border: "1px solid #0135471A",
            }}
          >
            2
          </Box>
        </Stack>
      </Stack>

      {/* Step Heading */}
      <Box sx={{ mb: 3 }}>
        <Typography
          sx={{
            fontFamily: poppins700.style.fontFamily,
            fontWeight: 800,
            fontSize: "15px",
            color: COLORS.SECONDARY,
            mb: 0.5,
          }}
        >
          1. LISTING SUMMARY REVIEW
        </Typography>
        <Typography
          sx={{
            fontFamily: poppins.style.fontFamily,
            fontWeight: 500,
            fontSize: "13px",
            color: "#7A9BAB",
          }}
        >
          Please double check your submitted contract specs and files before
          passing to admin moderators.
        </Typography>
      </Box>

      {/* Info Audited specs container */}
      <Box
        sx={{
          p: 3,
          borderRadius: "16px",
          border: "1px solid #0135470F",
          backgroundColor: "#F9F8F680",
          mb: 4,
        }}
      >
        <Grid container spacing={3}>
          <Grid size={{ xs: 6 }}>
            <Typography
              sx={{
                fontFamily: poppins700.style.fontFamily,
                fontWeight: 700,
                fontSize: "10px",
                color: "#7A9BAB",
                letterSpacing: "0.5px",
                mb: 0.5,
              }}
            >
              LISTING ID
            </Typography>
            <Typography
              sx={{
                fontFamily: poppins700.style.fontFamily,
                fontWeight: 700,
                fontSize: "16px",
                color: COLORS.SECONDARY,
              }}
            >
              #TNZ-9281
            </Typography>
          </Grid>

          <Grid size={{ xs: 6 }}>
            <Typography
              sx={{
                fontFamily: poppins700.style.fontFamily,
                fontWeight: 700,
                fontSize: "10px",
                color: "#7A9BAB",
                letterSpacing: "0.5px",
                mb: 0.5,
              }}
            >
              SELLER TRANSFER FEE
            </Typography>
            <Typography
              sx={{
                fontFamily: poppins700.style.fontFamily,
                fontWeight: 700,
                fontSize: "16px",
                color: COLORS.SECONDARY,
              }}
            >
              2,500 SAR
            </Typography>
          </Grid>

          <Grid size={{ xs: 6 }}>
            <Typography
              sx={{
                fontFamily: poppins700.style.fontFamily,
                fontWeight: 700,
                fontSize: "10px",
                color: "#7A9BAB",
                letterSpacing: "0.5px",
                mb: 0.5,
              }}
            >
              MONTHLY PRICE
            </Typography>
            <Typography
              sx={{
                fontFamily: poppins700.style.fontFamily,
                fontWeight: 700,
                fontSize: "16px",
                color: COLORS.SECONDARY,
              }}
            >
              8,500 SAR / mo
            </Typography>
          </Grid>

          <Grid size={{ xs: 6 }}>
            <Typography
              sx={{
                fontFamily: poppins700.style.fontFamily,
                fontWeight: 700,
                fontSize: "10px",
                color: "#7A9BAB",
                letterSpacing: "0.5px",
                mb: 0.5,
              }}
            >
              AUDITED ATTACHMENTS
            </Typography>
            <Stack
              direction="row"
              spacing={1}
              sx={{ alignItems: "center", color: "#166CA9" }}
            >
              <InsertDriveFile sx={{ fontSize: 18 }} />
              <Typography
                sx={{
                  fontFamily: poppins700.style.fontFamily,
                  fontWeight: 700,
                  fontSize: "15px",
                }}
              >
                2 files
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Box>

      {/* Agreements checkboxes */}
      <Stack spacing={3} sx={{ mb: 4 }}>
        {/* Checkbox 1 */}
        <Stack direction="row" spacing={2} sx={{ alignItems: "flex-start" }}>
          <Checkbox
            checked={agreed1}
            onChange={(e) => setAgreed1(e.target.checked)}
            sx={{
              p: 0,
              mt: 0.2,
              color: "#0135472A",
              "&.Mui-checked": {
                color: COLORS.SECONDARY,
              },
            }}
          />
          <Box>
            <Typography
              sx={{
                fontFamily: poppins700.style.fontFamily,
                fontWeight: 700,
                fontSize: "14px",
                color: COLORS.SECONDARY,
                mb: 0.5,
              }}
            >
              Declare legal accuracy of lease specifications
            </Typography>
            <Typography
              sx={{
                fontFamily: poppins.style.fontFamily,
                fontWeight: 500,
                fontSize: "12px",
                color: "#7A9BAB",
                lineHeight: "16px",
              }}
            >
              I confirm that all uploaded documents reflect a valid active
              contract and match local government regulations.
            </Typography>
          </Box>
        </Stack>

        {/* Checkbox 2 */}
        <Stack direction="row" spacing={2} sx={{ alignItems: "flex-start" }}>
          <Checkbox
            checked={agreed2}
            onChange={(e) => setAgreed2(e.target.checked)}
            sx={{
              p: 0,
              mt: 0.2,
              color: "#0135472A",
              "&.Mui-checked": {
                color: COLORS.SECONDARY,
              },
            }}
          />
          <Box>
            <Typography
              sx={{
                fontFamily: poppins700.style.fontFamily,
                fontWeight: 700,
                fontSize: "14px",
                color: COLORS.SECONDARY,
                mb: 0.5,
              }}
            >
              Agree to Tnazul lease transfer commission
            </Typography>
            <Typography
              sx={{
                fontFamily: poppins.style.fontFamily,
                fontWeight: 500,
                fontSize: "12px",
                color: "#7A9BAB",
                lineHeight: "16px",
              }}
            >
              I agree to clear the standard 2.5% success fee upon final transfer
              authorization of this lease.
            </Typography>
          </Box>
        </Stack>
      </Stack>

      {/* Continue Button Row */}
      <Stack direction="row" sx={{ justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          disableElevation
          disabled={!canContinue}
          onClick={onContinue}
          endIcon={<ArrowForward />}
          sx={{
            backgroundColor: COLORS.SECONDARY,
            color: COLORS.WHITE,
            borderRadius: "12px",
            textTransform: "none",
            fontFamily: poppins700.style.fontFamily,
            fontWeight: 700,
            fontSize: "14px",
            px: 4,
            py: 1.5,
            "&:hover": {
              backgroundColor: "#002432",
            },
            "&.Mui-disabled": {
              backgroundColor: "rgba(1, 53, 71, 0.08)",
              color: "#7A9BAB",
            },
          }}
        >
          Continue to ID Verification
        </Button>
      </Stack>
    </Paper>
  );
};

export default Step1Review;
