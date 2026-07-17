"use client";

import React from "react";
import { Box, Paper, Stack, Typography, Button, Chip } from "@mui/material";
import { Check } from "@mui/icons-material";
import { poppins, poppins700 } from "@/utils/fonts";
import { COLORS } from "@/utils/enum";

interface Step3VerificationProps {
  onCancel: () => void;
  onContinue: () => void;
}

const Step3Verification = ({
  onCancel,
  onContinue,
}: Step3VerificationProps) => {
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
          {/* Step 1 Circle (Completed) */}
          <Box
            sx={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              backgroundColor: "rgba(46, 125, 50, 0.1)",
              color: "#2E7D32",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid rgba(46, 125, 50, 0.3)",
            }}
          >
            <Check sx={{ fontSize: 16 }} />
          </Box>
          {/* Connection Line (Completed/Green) */}
          <Box sx={{ width: 36, height: "1px", backgroundColor: "#2E7D32" }} />
          {/* Step 2 Circle (Active) */}
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
            2
          </Box>
        </Stack>
      </Stack>

      {/* Verification Code Display & Mobile App instructions */}
      <Stack
        spacing={3.5}
        sx={{
          alignItems: "center",
          maxWidth: "480px",
          margin: "40px auto 20px auto",
        }}
      >
        {/* Verification Code Box (76) */}
        <Box
          sx={{
            width: 90,
            height: 70,
            borderRadius: "14px",
            border: "2px solid #166CA9",
            backgroundColor: "rgba(22, 108, 170, 0.03)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#166CA9",
          }}
        >
          <Typography
            sx={{
              fontFamily: poppins700.style.fontFamily,
              fontWeight: 800,
              fontSize: "36px",
              lineHeight: "36px",
            }}
          >
            76
          </Typography>
        </Box>

        {/* Labels & instructions */}
        <Box sx={{ textAlign: "center" }}>
          <Typography
            sx={{
              fontFamily: poppins700.style.fontFamily,
              fontWeight: 700,
              fontSize: "18px",
              color: COLORS.SECONDARY,
              mb: 1,
            }}
          >
            Open Nafath Mobile App
          </Typography>
          <Typography
            sx={{
              fontFamily: poppins.style.fontFamily,
              fontWeight: 500,
              fontSize: "13px",
              color: "#7A9BAB",
              lineHeight: "18px",
            }}
          >
            We issued a verification ping to your mobile. Open the Nafath app
            and select the verification code shown above.
          </Typography>
        </Box>

        {/* Request authorized reference code alert box */}
        <Box
          sx={{
            width: "100%",
            p: 1.8,
            borderRadius: "12px",
            border: "1px solid rgba(231, 186, 73, 0.35)",
            backgroundColor: "rgba(231, 186, 73, 0.03)",
            color: "#E78B49",
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              fontFamily: poppins700.style.fontFamily,
              fontWeight: 700,
              fontSize: "12px",
            }}
          >
            Request authorized reference code: #NAF-9281
          </Typography>
        </Box>

        {/* Action Row */}
        <Stack direction="row" spacing={2} sx={{ width: "100%", pt: 2 }}>
          <Button
            variant="outlined"
            onClick={onCancel}
            sx={{
              flex: 1,
              borderRadius: "12px",
              borderColor: "#0135471A",
              color: COLORS.SECONDARY,
              textTransform: "none",
              fontFamily: poppins700.style.fontFamily,
              fontWeight: 700,
              fontSize: "14px",
              py: 1.5,
              backgroundColor: COLORS.WHITE,
              "&:hover": {
                borderColor: "#0135473D",
                backgroundColor: "#F4F7F8",
              },
            }}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            disableElevation
            onClick={onContinue}
            startIcon={<Check />}
            sx={{
              flex: 2,
              backgroundColor: "#23A455", // Green continue button
              color: COLORS.WHITE,
              borderRadius: "12px",
              textTransform: "none",
              fontFamily: poppins700.style.fontFamily,
              fontWeight: 700,
              fontSize: "14px",
              py: 1.5,
              "&:hover": {
                backgroundColor: "#1E8E49",
              },
            }}
          >
            Continue
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default Step3Verification;
