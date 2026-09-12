"use client";

import React from "react";
import { Box, Typography, Stack, Divider, Button } from "@mui/material";
import { CheckCircle, Close, Bolt, ChatBubbleOutlineOutlined, LocalPhoneOutlined } from "@mui/icons-material";
import { COLORS } from "@/utils/enum";
import { poppins, poppins700 } from "@/utils/fonts";
import { CONTRACT_STATUS } from "@/utils/enum";

export interface SellerOverviewCardProps {
  sellerName?: string;
  isAdmin?: boolean;
  contractStatus?: string;
  onApprove?: () => void;
  onReject?: () => void;
  onApplyForTransfer?: () => void;
  onMessage?: () => void;
}

export const SellerOverviewCard: React.FC<SellerOverviewCardProps> = ({
  sellerName,
  isAdmin,
  contractStatus,
  onApprove,
  onReject,
  onApplyForTransfer,
  onMessage,
}) => {
  return (
    <Box
      sx={{
        backgroundColor: "#FFFFFF",
        borderRadius: "24px",
        p: 3.5,
        border: "1px solid #0135470D",
        boxShadow: "0px 4px 20px rgba(1, 53, 71, 0.02)",
      }}
    >
      <Typography
        sx={{
          fontFamily: poppins700.style.fontFamily,
          fontWeight: 700,
          fontSize: "10.5px",
          color: "#7A9BAB",
          letterSpacing: "0.5px",
          textTransform: "uppercase",
          mb: 2.5,
        }}
      >
        Listed By
      </Typography>

      {/* User Overview Row */}
      <Stack direction="row" spacing={2} sx={{ alignItems: "center", mb: 3 }}>
        <Box
          sx={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            backgroundColor: "rgba(231, 186, 73, 0.18)",
            color: COLORS.SECONDARY,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "18px",
            fontWeight: 700,
            fontFamily: poppins700.style.fontFamily,
          }}
        >
          {sellerName?.slice(0, 2).toUpperCase() || "UN"}
        </Box>
        <Box>
          <Typography
            sx={{
              fontFamily: poppins700.style.fontFamily,
              fontWeight: 700,
              fontSize: "16px",
              color: COLORS.SECONDARY,
              mb: 0.25,
            }}
          >
            {sellerName || "Seller"}
          </Typography>
          <Typography
            sx={{
              fontFamily: poppins.style.fontFamily,
              fontWeight: 500,
              fontSize: "11.5px",
              color: "#7A9BAB",
            }}
          >
            Member since Jan 2024
          </Typography>
        </Box>
      </Stack>

      {/* Nafath status pill */}
      <Box
        sx={{
          borderRadius: "100px",
          py: 0.6,
          px: 1.5,
          backgroundColor: "#E8F5E9",
          color: "#10753E",
          display: "inline-flex",
          alignItems: "center",
          gap: 0.5,
          mb: 3.5,
        }}
      >
        <CheckCircle sx={{ fontSize: 13, color: "#10753E" }} />
        <Typography sx={{ fontFamily: poppins700.style.fontFamily, fontWeight: 700, fontSize: "11px", lineHeight: 1 }}>
          Nafath Verified
        </Typography>
      </Box>

      {/* Profile stats row */}
      <Stack
        direction="row"
        sx={{
          justifyContent: "space-between",
          textAlign: "center",
          mb: 4,
        }}
      >
        <Box>
          <Typography sx={{ fontFamily: poppins700.style.fontFamily, fontWeight: 700, fontSize: "16px", color: COLORS.SECONDARY }}>
            95%
          </Typography>
          <Typography sx={{ fontFamily: poppins.style.fontFamily, fontWeight: 500, fontSize: "11px", color: "#7A9BAB", mt: 0.2 }}>
            Response
          </Typography>
        </Box>
        <Divider orientation="vertical" flexItem sx={{ borderColor: "#0135470D" }} />
        <Box>
          <Typography sx={{ fontFamily: poppins700.style.fontFamily, fontWeight: 700, fontSize: "16px", color: COLORS.SECONDARY }}>
            ~ 2 hours
          </Typography>
          <Typography sx={{ fontFamily: poppins.style.fontFamily, fontWeight: 500, fontSize: "11px", color: "#7A9BAB", mt: 0.2 }}>
            Reply in
          </Typography>
        </Box>
        <Divider orientation="vertical" flexItem sx={{ borderColor: "#0135470D" }} />
        <Box>
          <Typography sx={{ fontFamily: poppins700.style.fontFamily, fontWeight: 700, fontSize: "16px", color: COLORS.SECONDARY }}>
            3
          </Typography>
          <Typography sx={{ fontFamily: poppins.style.fontFamily, fontWeight: 500, fontSize: "11px", color: "#7A9BAB", mt: 0.2 }}>
            Listings
          </Typography>
        </Box>
      </Stack>

      {/* Call to Actions stack */}
      <Stack spacing={1.5}>
        {isAdmin ? (
          contractStatus !== CONTRACT_STATUS.APPROVED && (
            <>
              <Button
                fullWidth
                variant="contained"
                disableElevation
                onClick={onApprove}
                startIcon={<CheckCircle sx={{ fontSize: 16 }} />}
                sx={{
                  borderRadius: "100px",
                  backgroundColor: "#10753E", // Green for approve
                  color: COLORS.WHITE,
                  py: 1.5,
                  fontFamily: poppins700.style.fontFamily,
                  fontWeight: 700,
                  fontSize: "14px",
                  textTransform: "none",
                  boxShadow: "0px 6px 15px rgba(16, 117, 62, 0.15)",
                  "&:hover": { backgroundColor: "#0b522b" },
                }}
              >
                Approve Contract
              </Button>
              <Button
                fullWidth
                variant="contained"
                disableElevation
                onClick={onReject}
                startIcon={<Close sx={{ fontSize: 16 }} />}
                sx={{
                  borderRadius: "100px",
                  backgroundColor: "#E53935", // Red for reject
                  color: COLORS.WHITE,
                  py: 1.5,
                  fontFamily: poppins700.style.fontFamily,
                  fontWeight: 700,
                  fontSize: "14px",
                  textTransform: "none",
                  boxShadow: "0px 6px 15px rgba(229, 57, 53, 0.15)",
                  "&:hover": { backgroundColor: "#c62828" },
                }}
              >
                Reject Contract
              </Button>
            </>
          )
        ) : (
          <>
            <Button
              fullWidth
              variant="contained"
              disableElevation
              onClick={onApplyForTransfer}
              startIcon={<Bolt sx={{ fontSize: 16 }} />}
              sx={{
                borderRadius: "100px",
                backgroundColor: COLORS.SECONDARY,
                color: COLORS.WHITE,
                py: 1.5,
                fontFamily: poppins700.style.fontFamily,
                fontWeight: 700,
                fontSize: "14px",
                textTransform: "none",
                boxShadow: "0px 6px 15px rgba(1, 53, 71, 0.15)",
                "&:hover": { backgroundColor: "#002432" },
              }}
            >
              Apply for Transfer
            </Button>

            <Stack direction="row" spacing={1.5}>
              <Button
                fullWidth
                variant="outlined"
                onClick={onMessage}
                startIcon={<ChatBubbleOutlineOutlined sx={{ fontSize: 15 }} />}
                sx={{
                  borderRadius: "100px",
                  borderColor: "#0135471F",
                  color: COLORS.SECONDARY,
                  py: 1.25,
                  fontFamily: poppins700.style.fontFamily,
                  fontWeight: 700,
                  fontSize: "13px",
                  textTransform: "none",
                  "&:hover": { borderColor: COLORS.SECONDARY, backgroundColor: "rgba(1, 53, 71, 0.02)" },
                }}
              >
                Message
              </Button>

              <Button
                fullWidth
                variant="outlined"
                startIcon={<LocalPhoneOutlined sx={{ fontSize: 15 }} />}
                sx={{
                  borderRadius: "100px",
                  borderColor: "#0135471F",
                  color: COLORS.SECONDARY,
                  py: 1.25,
                  fontFamily: poppins700.style.fontFamily,
                  fontWeight: 700,
                  fontSize: "13px",
                  textTransform: "none",
                  "&:hover": { borderColor: COLORS.SECONDARY, backgroundColor: "rgba(1, 53, 71, 0.02)" },
                }}
              >
                Request Call
              </Button>
            </Stack>
          </>
        )}
      </Stack>
    </Box>
  );
};
