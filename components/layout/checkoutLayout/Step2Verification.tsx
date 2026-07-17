"use client";

import React, { useState } from "react";
import {
  Box,
  Paper,
  Stack,
  Typography,
  TextField,
  Button,
  Chip,
} from "@mui/material";
import { Check, ShieldOutlined } from "@mui/icons-material";
import { poppins, poppins700 } from "@/utils/fonts";
import { COLORS } from "@/utils/enum";

interface Step2VerificationProps {
  onBack: () => void;
  onSubmit: (idValue: string) => void;
}

const Step2Verification = ({ onBack, onSubmit }: Step2VerificationProps) => {
  const [iqamaNumber, setIqamaNumber] = useState("1092837465");

  const handleSubmit = () => {
    if (iqamaNumber.trim()) {
      onSubmit(iqamaNumber);
    }
  };

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

      {/* Verification Core Content */}
      <Stack
        spacing={3.5}
        sx={{
          alignItems: "center",
          maxWidth: "480px",
          margin: "40px auto 20px auto",
        }}
      >
        {/* Shield verification Icon */}
        <Box
          sx={{
            width: 72,
            height: 72,
            borderRadius: "50%",
            backgroundColor: "rgba(1, 53, 71, 0.03)",
            border: "1px solid #0135470F",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: COLORS.SECONDARY,
          }}
        >
          <ShieldOutlined sx={{ fontSize: 36 }} />
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
            Unified National ID verification (Nafath)
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
            Enter your Saudi national ID or resident Iqama number to map this
            listing to your digital identity.
          </Typography>
        </Box>

        {/* Input Field */}
        <Box sx={{ width: "100%" }}>
          <Typography
            sx={{
              fontFamily: poppins700.style.fontFamily,
              fontWeight: 700,
              fontSize: "10px",
              color: "#7A9BAB",
              letterSpacing: "0.5px",
              mb: 1,
            }}
          >
            NATIONAL ID / RESIDENT IQAMA
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            value={iqamaNumber}
            onChange={(e) => setIqamaNumber(e.target.value)}
            slotProps={{
              input: {
                sx: {
                  borderRadius: "12px",
                  fontFamily: poppins700.style.fontFamily,
                  fontWeight: 700,
                  fontSize: "15px",
                  color: COLORS.SECONDARY,
                  textAlign: "left",
                  py: 0.5,
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#0135471A",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#0135473D",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: COLORS.SECONDARY,
                  },
                },
              },
            }}
          />
        </Box>

        {/* Action Row */}
        <Stack direction="row" spacing={2} sx={{ width: "100%", pt: 2 }}>
          <Button
            variant="outlined"
            onClick={onBack}
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
            Back
          </Button>

          <Button
            variant="contained"
            disableElevation
            onClick={handleSubmit}
            disabled={!iqamaNumber.trim()}
            sx={{
              flex: 2,
              backgroundColor: COLORS.SECONDARY,
              color: COLORS.WHITE,
              borderRadius: "12px",
              textTransform: "none",
              fontFamily: poppins700.style.fontFamily,
              fontWeight: 700,
              fontSize: "14px",
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
            Send request
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default Step2Verification;
