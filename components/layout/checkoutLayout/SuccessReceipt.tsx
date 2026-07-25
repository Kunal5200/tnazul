"use client";

import React from "react";
import {
  Box,
  Paper,
  Stack,
  Typography,
  Button,
  Divider,
  Grid,
} from "@mui/material";
import { CheckCircle, PrintOutlined, ArrowForward } from "@mui/icons-material";
import { poppins, poppins700 } from "@/utils/fonts";
import { COLORS } from "@/utils/enum";

interface SuccessReceiptProps {
  plan: "standard" | "featured";
  txRef: string;
  billedTo: string;
  listingName: string;
  method: string;
  timestamp: string;
  basePrice: string;
  vat: string;
  total: string;
  onPrint: () => void;
  onDone: () => void;
}

const SuccessReceipt = ({
  plan,
  txRef,
  billedTo,
  listingName,
  method,
  timestamp,
  basePrice,
  vat,
  total,
  onPrint,
  onDone,
}: SuccessReceiptProps) => {
  return (
    <Stack
      spacing={4}
      sx={{
        alignItems: "center",
        maxWidth: "680px",
        margin: "0 auto",
        width: "100%",
      }}
    >
      {/* Top Completion Header */}
      <Stack spacing={1.5} sx={{ alignItems: "center", textAlign: "center" }}>
        <CheckCircle sx={{ color: "#2E7D32", fontSize: 56 }} />
        <Typography
          sx={{
            fontFamily: poppins700.style.fontFamily,
            fontWeight: 800,
            fontSize: "24px",
            color: COLORS.SECONDARY,
          }}
        >
          Transaction Completed Successfully!
        </Typography>
        <Typography
          sx={{
            fontFamily: poppins.style.fontFamily,
            fontWeight: 500,
            fontSize: "14px",
            color: "#7A9BAB",
            maxWidth: "530px",
            lineHeight: "20px",
          }}
        >
          {plan === "standard"
            ? "Digital National ID linked. Your contract specifications have been successfully sent to the admin moderation queue."
            : "Thank you! Your featured payment is authenticated and your contract listing is now active in top search slots."}
        </Typography>
      </Stack>

      {/* Tax Invoice Receipt Card */}
      <Paper
        elevation={0}
        sx={{
          p: 4.5,
          borderRadius: "32px",
          backgroundColor: COLORS.WHITE,
          border: "1px solid rgba(231, 186, 73, 0.4)", // Gold border to match Figma
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        {/* Receipt Header Block */}
        <Stack
          direction="row"
          sx={{
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: 4.5,
          }}
        >
          <Box>
            <Typography
              sx={{
                fontFamily: poppins700.style.fontFamily,
                fontWeight: 800,
                fontSize: "15px",
                color: COLORS.SECONDARY,
                mb: 0.5,
              }}
            >
              TAX INVOICE RECEIPT
            </Typography>
            <Typography
              sx={{
                fontFamily: poppins.style.fontFamily,
                fontWeight: 500,
                fontSize: "11px",
                color: "#7A9BAB",
              }}
            >
              SAMA/ZATCA electronic record invoice
            </Typography>
          </Box>

          {/* High-Fidelity SVG QR Code */}
          <Box sx={{ color: COLORS.SECONDARY }}>
            <svg width="68" height="68" viewBox="0 0 24 24" fill="currentColor">
              {/* QR Code corners */}
              <path d="M2,2 h6 v6 h-6 z M4,4 h2 v2 h-2 z" />
              <path d="M16,2 h6 v6 h-6 z M18,4 h2 v2 h-2 z" />
              <path d="M2,16 h6 v6 h-6 z M4,18 h2 v2 h-2 z" />
              {/* QR Code details */}
              <rect x="10" y="3" width="2" height="2" />
              <rect x="13" y="2" width="2" height="1" />
              <rect x="10" y="7" width="1" height="3" />
              <rect x="13" y="5" width="2" height="2" />
              <rect x="10" y="12" width="4" height="2" />
              <rect x="16" y="10" width="2" height="2" />
              <rect x="15" y="14" width="3" height="1" />
              <rect x="10" y="16" width="2" height="4" />
              <rect x="14" y="18" width="4" height="2" />
              <rect x="20" y="11" width="2" height="3" />
              <rect x="18" y="16" width="3" height="1" />
            </svg>
          </Box>
        </Stack>

        {/* Invoice Metadata Rows */}
        <Stack spacing={2} sx={{ mb: 4.5 }}>
          <Stack direction="row" sx={{ justifyContent: "space-between" }}>
            <Typography
              sx={{
                fontFamily: poppins.style.fontFamily,
                fontSize: "14px",
                color: "#7A9BAB",
              }}
            >
              Transaction Reference
            </Typography>
            <Typography
              sx={{
                fontFamily: poppins700.style.fontFamily,
                fontWeight: 700,
                fontSize: "14px",
                color: COLORS.SECONDARY,
              }}
            >
              {txRef}
            </Typography>
          </Stack>

          <Stack direction="row" sx={{ justifyContent: "space-between" }}>
            <Typography
              sx={{
                fontFamily: poppins.style.fontFamily,
                fontSize: "14px",
                color: "#7A9BAB",
              }}
            >
              Billed To
            </Typography>
            <Typography
              sx={{
                fontFamily: poppins700.style.fontFamily,
                fontWeight: 700,
                fontSize: "14px",
                color: COLORS.SECONDARY,
              }}
            >
              {billedTo}
            </Typography>
          </Stack>

          <Stack direction="row" sx={{ justifyContent: "space-between" }}>
            <Typography
              sx={{
                fontFamily: poppins.style.fontFamily,
                fontSize: "14px",
                color: "#7A9BAB",
              }}
            >
              Lease Reference Listing
            </Typography>
            <Typography
              sx={{
                fontFamily: poppins700.style.fontFamily,
                fontWeight: 700,
                fontSize: "14px",
                color: COLORS.SECONDARY,
              }}
            >
              {listingName}
            </Typography>
          </Stack>

          <Stack direction="row" sx={{ justifyContent: "space-between" }}>
            <Typography
              sx={{
                fontFamily: poppins.style.fontFamily,
                fontSize: "14px",
                color: "#7A9BAB",
              }}
            >
              Method
            </Typography>
            <Typography
              sx={{
                fontFamily: poppins700.style.fontFamily,
                fontWeight: 700,
                fontSize: "14px",
                color: COLORS.SECONDARY,
              }}
            >
              {method}
            </Typography>
          </Stack>

          <Stack direction="row" sx={{ justifyContent: "space-between" }}>
            <Typography
              sx={{
                fontFamily: poppins.style.fontFamily,
                fontSize: "14px",
                color: "#7A9BAB",
              }}
            >
              Timestamp
            </Typography>
            <Typography
              sx={{
                fontFamily: poppins700.style.fontFamily,
                fontWeight: 700,
                fontSize: "14px",
                color: COLORS.SECONDARY,
              }}
            >
              {timestamp}
            </Typography>
          </Stack>
        </Stack>

        <Divider sx={{ borderColor: "#0135470F", mb: 3 }} />

        {/* Pricing Summary */}
        <Stack spacing={2} sx={{ mb: 3 }}>
          <Stack direction="row" sx={{ justifyContent: "space-between" }}>
            <Typography
              sx={{
                fontFamily: poppins.style.fontFamily,
                fontSize: "14px",
                color: COLORS.SECONDARY,
                fontWeight: 600,
              }}
            >
              Base Plan Price
            </Typography>
            <Typography
              sx={{
                fontFamily: poppins700.style.fontFamily,
                fontWeight: 700,
                fontSize: "14px",
                color: COLORS.SECONDARY,
              }}
            >
              {basePrice} SAR
            </Typography>
          </Stack>

          <Stack direction="row" sx={{ justifyContent: "space-between" }}>
            <Typography
              sx={{
                fontFamily: poppins.style.fontFamily,
                fontSize: "14px",
                color: "#7A9BAB",
              }}
            >
              VAT (15%)
            </Typography>
            <Typography
              sx={{
                fontFamily: poppins700.style.fontFamily,
                fontWeight: 700,
                fontSize: "14px",
                color: COLORS.SECONDARY,
              }}
            >
              {vat} SAR
            </Typography>
          </Stack>
        </Stack>

        <Divider sx={{ borderColor: "#0135470F", mb: 3.5 }} />

        {/* Final Total */}
        <Stack
          direction="row"
          sx={{ justifyContent: "space-between", alignItems: "center" }}
        >
          <Typography
            sx={{
              fontFamily: poppins700.style.fontFamily,
              fontWeight: 800,
              fontSize: "16px",
              color: COLORS.SECONDARY,
            }}
          >
            Total Paid (VAT incl.)
          </Typography>
          <Typography
            sx={{
              fontFamily: poppins700.style.fontFamily,
              fontWeight: 800,
              fontSize: "20px",
              color: COLORS.PRIMARY,
            }}
          >
            {total} SAR
          </Typography>
        </Stack>
      </Paper>

      {/* Button Row */}
      <Stack
        direction="row"
        spacing={2.5}
        sx={{ width: "100%", justifyContent: "center" }}
      >
        <Button
          variant="outlined"
          startIcon={<PrintOutlined />}
          onClick={onPrint}
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
          Print Invoice
        </Button>

        <Button
          variant="contained"
          disableElevation
          onClick={onDone}
          endIcon={<ArrowForward />}
          sx={{
            flex: 1.5,
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
          }}
        >
          Go to Dashboard
        </Button>
      </Stack>
    </Stack>
  );
};

export default SuccessReceipt;
