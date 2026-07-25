"use client";

import React from "react";
import { Dialog, Stack, Typography, Divider, Box, Button } from "@mui/material";
import { poppins, poppins700 } from "@/utils/fonts";

interface ApplePayModalProps {
  open: boolean;
  onClose: () => void;
}

const ApplePayModal = ({ open, onClose }: ApplePayModalProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDialog-paper": {
          backgroundColor: "#1A1A1A", // Apple Pay Dark Charcoal Theme
          color: "#FFFFFF",
          borderRadius: "18px",
          width: "100%",
          maxWidth: "380px",
          p: 3,
          boxShadow: "0px 24px 48px rgba(0,0,0,0.6)",
        },
      }}
    >
      <Stack spacing={2.5}>
        {/* Header Row */}
        <Stack
          direction="row"
          sx={{ justifyContent: "space-between", alignItems: "center" }}
        >
          <Typography
            sx={{
              fontFamily: poppins700.style.fontFamily,
              fontWeight: 800,
              fontSize: "16px",
            }}
          >
            Pay
          </Typography>
          <Typography sx={{ fontSize: "11px", color: "#8E8E93" }}>
            Secure Transaction
          </Typography>
        </Stack>

        <Divider sx={{ borderColor: "#2C2C2E" }} />

        {/* Upgrade Specifications info */}
        <Stack spacing={1.5}>
          <Stack direction="row" sx={{ justifyContent: "space-between" }}>
            <Typography
              sx={{
                fontSize: "10px",
                color: "#8E8E93",
                letterSpacing: "0.5px",
              }}
            >
              TNAZUL UPGRADE
            </Typography>
            <Typography sx={{ fontSize: "13px", fontWeight: 600 }}>
              Featured Plan Boost
            </Typography>
          </Stack>

          <Stack direction="row" sx={{ justifyContent: "space-between" }}>
            <Typography
              sx={{
                fontSize: "10px",
                color: "#8E8E93",
                letterSpacing: "0.5px",
              }}
            >
              Device Account Number
            </Typography>
            <Typography sx={{ fontSize: "13px", color: "#8E8E93" }}>
              *7734
            </Typography>
          </Stack>
        </Stack>

        <Divider sx={{ borderColor: "#2C2C2E" }} />

        {/* Pricing Details */}
        <Stack spacing={1.5}>
          <Stack direction="row" sx={{ justifyContent: "space-between" }}>
            <Typography sx={{ fontSize: "12px", color: "#8E8E93" }}>
              Merchant
            </Typography>
            <Typography sx={{ fontSize: "13px", fontWeight: 600 }}>
              Tnazul Marketplace Co.
            </Typography>
          </Stack>

          <Stack direction="row" sx={{ justifyContent: "space-between" }}>
            <Typography sx={{ fontSize: "12px", color: "#8E8E93" }}>
              Pay With
            </Typography>
            <Typography sx={{ fontSize: "13px", fontWeight: 600 }}>
              Mada Card (Debit)
            </Typography>
          </Stack>

          <Stack
            direction="row"
            sx={{ justifyContent: "space-between", alignItems: "center" }}
          >
            <Typography sx={{ fontSize: "12px", color: "#8E8E93" }}>
              Amount
            </Typography>
            <Typography
              sx={{
                fontFamily: poppins700.style.fontFamily,
                fontSize: "18px",
                fontWeight: 800,
              }}
            >
              113.85 SAR
            </Typography>
          </Stack>
        </Stack>

        <Divider sx={{ borderColor: "#2C2C2E" }} />

        {/* Animated Spinner Face ID indicator */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            pt: 1,
            pb: 1,
          }}
        >
          <Box
            component="div"
            sx={{
              width: 36,
              height: 36,
              border: "3px solid rgba(255,255,255,0.15)",
              borderTop: "3px solid #FFFFFF",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
              "@keyframes spin": {
                "0%": { transform: "rotate(0deg)" },
                "100%": { transform: "rotate(360deg)" },
              },
              mb: 1.5,
            }}
          />
          <Typography
            sx={{
              fontFamily: poppins.style.fontFamily,
              fontSize: "13px",
              color: "#8E8E93",
            }}
          >
            Scanning Face ID...
          </Typography>
        </Box>

        {/* Cancel button */}
        <Button
          onClick={onClose}
          fullWidth
          sx={{
            color: "#FF453A", // Apple System Red
            textTransform: "none",
            fontFamily: poppins700.style.fontFamily,
            fontWeight: 700,
            fontSize: "13px",
            pt: 0.5,
          }}
        >
          Cancel
        </Button>
      </Stack>
    </Dialog>
  );
};

export default ApplePayModal;
