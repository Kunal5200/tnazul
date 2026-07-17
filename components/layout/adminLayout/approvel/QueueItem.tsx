"use client";

import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Stack,
  Button,
  Collapse,
  Grid,
  TextField,
  Divider,
  Chip,
} from "@mui/material";
import {
  LocationOn,
  AttachFile,
  KeyboardArrowDown,
  KeyboardArrowUp,
  Check,
  Close,
  Refresh,
  CheckCircle,
  Error,
} from "@mui/icons-material";
import { poppins, poppins700 } from "@/utils/fonts";
import { COLORS } from "@/utils/enum";

export interface QueueItemData {
  id: string;
  title: string;
  category: string;
  categoryLabel: string;
  categoryColor: string;
  categoryBg: string;
  location: string;
  totalValue: string;
  monthlyValue: string;
  docsCount: number;
  timestamp: string;
  imageUrl: string;
  description: string;
  sellerName: string;
  sellerPhone: string;
  sellerVerified: boolean;
}

interface QueueItemProps {
  item: QueueItemData;
  onApprove: (id: string) => void;
  onReject: (id: string, reason: string) => void;
  onRevision: (id: string, reason: string) => void;
}

const QueueItem = ({
  item,
  onApprove,
  onReject,
  onRevision,
}: QueueItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");

  const handleToggle = () => setIsExpanded(!isExpanded);

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: "24px",
        backgroundColor: COLORS.WHITE,
        border: "1px solid #0135470F",
        overflow: "hidden",
        mb: 3,
        transition: "box-shadow 0.2s ease",
        "&:hover": {
          boxShadow: "0px 8px 24px rgba(1, 53, 71, 0.04)",
        },
      }}
    >
      {/* Upper Header Block (Always visible) */}
      <Box sx={{ p: 3 }}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2.5}
          sx={{ alignItems: "flex-start", justifyContent: "space-between" }}
        >
          <Stack
            direction="row"
            spacing={2.5}
            sx={{ alignItems: "flex-start", flexGrow: 1 }}
          >
            {/* Preview Image */}
            <Box
              component="img"
              src={item.imageUrl}
              alt={item.title}
              sx={{
                width: 80,
                height: 80,
                borderRadius: "16px",
                objectFit: "cover",
                backgroundColor: "#F4F7F8",
                flexShrink: 0,
              }}
            />

            {/* Core Info */}
            <Box>
              <Stack
                direction="row"
                spacing={1.5}
                sx={{ alignItems: "center", mb: 1, flexWrap: "wrap", gap: 1 }}
              >
                <Typography
                  sx={{
                    fontFamily: poppins700.style.fontFamily,
                    fontWeight: 700,
                    fontSize: "18px",
                    color: COLORS.SECONDARY,
                  }}
                >
                  {item.title}
                </Typography>

                {/* Category tag */}
                <Chip
                  label={item.categoryLabel}
                  size="small"
                  sx={{
                    backgroundColor: item.categoryBg,
                    color: item.categoryColor,
                    fontFamily: poppins700.style.fontFamily,
                    fontWeight: 700,
                    fontSize: "11px",
                    borderRadius: "6px",
                    height: "22px",
                  }}
                />

                {/* Verification Status Tag (Item 3 in screenshot has ID Not Verified tag) */}
                {!item.sellerVerified && (
                  <Chip
                    label="ID Not Verified"
                    size="small"
                    variant="outlined"
                    sx={{
                      backgroundColor: "rgba(211, 47, 47, 0.05)",
                      color: "#D32F2F",
                      borderColor: "rgba(211, 47, 47, 0.2)",
                      fontFamily: poppins700.style.fontFamily,
                      fontWeight: 700,
                      fontSize: "11px",
                      borderRadius: "6px",
                      height: "22px",
                    }}
                  />
                )}
              </Stack>

              {/* Sub-details (location, financials, documents, timestamp) */}
              <Stack
                direction="row"
                spacing={1.5}
                sx={{
                  alignItems: "center",
                  color: "#7A9BAB",
                  fontFamily: poppins.style.fontFamily,
                  fontSize: "13px",
                  flexWrap: "wrap",
                  rowGap: 0.5,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <LocationOn sx={{ fontSize: 16 }} />
                  <Typography sx={{ fontSize: "13px" }}>
                    {item.location}
                  </Typography>
                </Box>
                <Typography>•</Typography>
                <Typography sx={{ fontWeight: 600, color: COLORS.SECONDARY }}>
                  SAR {item.totalValue} total
                </Typography>
                <Typography>•</Typography>
                <Typography sx={{ color: "#7A9BAB" }}>
                  SAR {item.monthlyValue}/mo
                </Typography>
                <Typography>•</Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <AttachFile sx={{ fontSize: 16 }} />
                  <Typography sx={{ fontSize: "13px" }}>
                    {item.docsCount} documents
                  </Typography>
                </Box>
                <Typography>•</Typography>
                <Typography sx={{ fontSize: "13px" }}>
                  {item.timestamp}
                </Typography>
              </Stack>
            </Box>
          </Stack>

          {/* Expanded Toggle Button */}
          <Button
            variant="outlined"
            onClick={handleToggle}
            endIcon={isExpanded ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            sx={{
              borderRadius: "100px",
              borderColor: "#0135471A",
              color: COLORS.SECONDARY,
              textTransform: "none",
              fontFamily: poppins700.style.fontFamily,
              fontWeight: 700,
              fontSize: "13px",
              px: 2.5,
              py: 1,
              backgroundColor: COLORS.WHITE,
              "&:hover": {
                borderColor: "#0135473D",
                backgroundColor: "#F4F7F8",
              },
            }}
          >
            {isExpanded ? "Hide" : "View Full"}
          </Button>
        </Stack>
      </Box>

      {/* Expanded Block (Collapsible) */}
      <Collapse in={isExpanded} timeout="auto" unmountOnExit>
        <Divider sx={{ borderColor: "#0135470F" }} />

        {/* Expanded Description & Seller Info */}
        <Box sx={{ p: 4, backgroundColor: "#FAFAFA" }}>
          <Grid container spacing={4} sx={{ mb: 4 }}>
            {/* Description */}
            <Grid size={{ xs: 12, md: 7 }}>
              <Typography
                sx={{
                  fontFamily: poppins700.style.fontFamily,
                  fontWeight: 800,
                  fontSize: "11px",
                  color: "#7A9BAB",
                  letterSpacing: "1px",
                  mb: 1.5,
                }}
              >
                LISTING DESCRIPTION
              </Typography>
              <Typography
                sx={{
                  fontFamily: poppins.style.fontFamily,
                  fontWeight: 500,
                  fontSize: "14px",
                  color: COLORS.SECONDARY,
                  lineHeight: "22px",
                }}
              >
                {item.description}
              </Typography>
            </Grid>

            {/* Seller Info */}
            <Grid size={{ xs: 12, md: 5 }}>
              <Typography
                sx={{
                  fontFamily: poppins700.style.fontFamily,
                  fontWeight: 800,
                  fontSize: "11px",
                  color: "#7A9BAB",
                  letterSpacing: "1px",
                  mb: 1.5,
                }}
              >
                SELLER INFO
              </Typography>
              <Typography
                sx={{
                  fontFamily: poppins700.style.fontFamily,
                  fontWeight: 700,
                  fontSize: "16px",
                  color: COLORS.SECONDARY,
                  mb: 0.5,
                }}
              >
                {item.sellerName}
              </Typography>
              <Typography
                sx={{
                  fontFamily: poppins.style.fontFamily,
                  fontWeight: 500,
                  fontSize: "14px",
                  color: "#7A9BAB",
                  mb: 1.5,
                }}
              >
                {item.sellerPhone}
              </Typography>

              {/* Verification Status */}
              <Stack
                direction="row"
                spacing={0.5}
                sx={{ alignItems: "center" }}
              >
                {item.sellerVerified ? (
                  <>
                    <CheckCircle sx={{ color: "#2E7D32", fontSize: 16 }} />
                    <Typography
                      sx={{
                        fontFamily: poppins700.style.fontFamily,
                        fontWeight: 700,
                        fontSize: "12px",
                        color: "#2E7D32",
                      }}
                    >
                      ID Verified
                    </Typography>
                  </>
                ) : (
                  <>
                    <Error sx={{ color: "#D32F2F", fontSize: 16 }} />
                    <Typography
                      sx={{
                        fontFamily: poppins700.style.fontFamily,
                        fontWeight: 700,
                        fontSize: "12px",
                        color: "#D32F2F",
                      }}
                    >
                      ID Not Verified
                    </Typography>
                  </>
                )}
              </Stack>
            </Grid>
          </Grid>

          {/* Rejection input field */}
          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Rejection reason (required if rejecting)..."
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              slotProps={{
                input: {
                  sx: {
                    borderRadius: "12px",
                    fontFamily: poppins.style.fontFamily,
                    fontSize: "14px",
                    backgroundColor: COLORS.WHITE,
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
        </Box>
      </Collapse>

      <Divider sx={{ borderColor: "#0135470F" }} />

      {/* Footer / Action Row (Always visible) */}
      <Box sx={{ p: 2.5, px: 3 }}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          sx={{ alignItems: "center", justifyContent: "space-between" }}
        >
          {/* Action Buttons */}
          <Stack
            direction="row"
            spacing={1.5}
            sx={{ width: { xs: "100%", sm: "auto" } }}
          >
            <Button
              variant="contained"
              disableElevation
              startIcon={<Check />}
              onClick={() => onApprove(item.id)}
              sx={{
                backgroundColor: "#23A455",
                color: COLORS.WHITE,
                borderRadius: "100px",
                textTransform: "none",
                fontFamily: poppins700.style.fontFamily,
                fontWeight: 700,
                fontSize: "14px",
                px: 3.5,
                py: 1.2,
                "&:hover": {
                  backgroundColor: "#1E8E49",
                },
              }}
            >
              Approve
            </Button>

            <Button
              variant="outlined"
              startIcon={<Close />}
              onClick={() => onReject(item.id, rejectionReason)}
              sx={{
                color: "#FF4D4D",
                borderColor: "rgba(255, 77, 77, 0.4)",
                borderRadius: "100px",
                textTransform: "none",
                fontFamily: poppins700.style.fontFamily,
                fontWeight: 700,
                fontSize: "14px",
                px: 3.5,
                py: 1.2,
                backgroundColor: COLORS.WHITE,
                "&:hover": {
                  borderColor: "#FF4D4D",
                  backgroundColor: "rgba(255, 77, 77, 0.05)",
                },
              }}
            >
              Reject
            </Button>

            <Button
              variant="outlined"
              startIcon={<Refresh />}
              onClick={() => onRevision(item.id, rejectionReason)}
              sx={{
                color: "#E78B49",
                borderColor: "rgba(231, 139, 73, 0.4)",
                borderRadius: "100px",
                textTransform: "none",
                fontFamily: poppins700.style.fontFamily,
                fontWeight: 700,
                fontSize: "14px",
                px: 3.5,
                py: 1.2,
                backgroundColor: COLORS.WHITE,
                "&:hover": {
                  borderColor: "#E78B49",
                  backgroundColor: "rgba(231, 139, 73, 0.05)",
                },
              }}
            >
              Request Revision
            </Button>
          </Stack>

          {/* Submission Info */}
          <Typography
            sx={{
              fontFamily: poppins.style.fontFamily,
              fontWeight: 500,
              fontSize: "13px",
              color: "#7A9BAB",
            }}
          >
            Submitted by {item.sellerName}
          </Typography>
        </Stack>
      </Box>
    </Paper>
  );
};

export default QueueItem;
