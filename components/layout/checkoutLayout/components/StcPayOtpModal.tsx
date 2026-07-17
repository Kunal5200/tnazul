"use client";

import React from "react";
import { Dialog, Stack, Box, Typography, Button } from "@mui/material";
import { PhoneIphone } from "@mui/icons-material";
import { poppins, poppins700 } from "@/utils/fonts";
import { COLORS } from "@/utils/enum";

interface StcPayOtpModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  stcMobile: string;
}

const StcPayOtpModal = ({ open, onClose, onSubmit, stcMobile }: StcPayOtpModalProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDialog-paper": {
          backgroundColor: COLORS.WHITE,
          color: COLORS.SECONDARY,
          borderRadius: "24px",
          width: "100%",
          maxWidth: "385px",
          p: 4,
          textAlign: "center",
        },
      }}
    >
      <Stack spacing={3} sx={{ alignItems: "center" }}>
        {/* Centered Yellow Phone Icon */}
        <Box
          sx={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            border: "1px solid rgba(231, 186, 73, 0.4)",
            backgroundColor: "rgba(231, 186, 73, 0.05)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#E7BA49",
          }}
        >
          <PhoneIphone sx={{ fontSize: 26 }} />
        </Box>

        <Box>
          <Typography sx={{ fontFamily: poppins700.style.fontFamily, fontWeight: 800, fontSize: "18px", color: COLORS.SECONDARY, mb: 1 }}>
            Enter STC Pay OTP
          </Typography>
          <Typography sx={{ fontFamily: poppins.style.fontFamily, fontSize: "12px", color: "#7A9BAB", lineHeight: "16px" }}>
            We sent a 4-digit verification code to your phone +966 {stcMobile}
          </Typography>
        </Box>

        {/* Custom OTP Digits Layout: 1 2 3 4 */}
        <Stack direction="row" spacing={2} sx={{ justifyContent: "center", my: 1 }}>
          {["1", "2", "3", "4"].map((digit, i) => (
            <Box
              key={i}
              sx={{
                width: 44,
                height: 44,
                borderRadius: "10px",
                border: "1px solid #0135471F",
                backgroundColor: "#F9F8F6",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: poppins700.style.fontFamily,
                fontWeight: 700,
                fontSize: "18px",
                color: COLORS.SECONDARY,
              }}
            >
              {digit}
            </Box>
          ))}
        </Stack>

        {/* Dialog Buttons Row */}
        <Stack direction="row" spacing={2} sx={{ width: "100%", pt: 1 }}>
          <Button
            variant="outlined"
            onClick={onClose}
            sx={{
              flex: 1,
              borderRadius: "12px",
              borderColor: "#0135471A",
              color: COLORS.SECONDARY,
              textTransform: "none",
              fontFamily: poppins700.style.fontFamily,
              fontWeight: 700,
              fontSize: "14px",
              py: 1.2,
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
            onClick={onSubmit}
            sx={{
              flex: 1.5,
              backgroundColor: COLORS.SECONDARY,
              color: COLORS.WHITE,
              borderRadius: "12px",
              textTransform: "none",
              fontFamily: poppins700.style.fontFamily,
              fontWeight: 700,
              fontSize: "14px",
              py: 1.2,
              "&:hover": {
                backgroundColor: "#002432",
              },
            }}
          >
            Verify & Pay
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default StcPayOtpModal;
