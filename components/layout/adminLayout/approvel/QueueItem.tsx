"use client";

import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Stack,
  Button,
  TextField,
  Divider,
  Chip,
  CircularProgress,
} from "@mui/material";
import {
  LocationOn,
  AttachFile,
  Check,
  Close,
} from "@mui/icons-material";
import { poppins, poppins700 } from "@/utils/fonts";
import { COLORS, CONTRACT_STATUS } from "@/utils/enum";
import { QueueItemData } from "@/utils/types";
import ImageCarousel from "@/components/widgets/dashboard/ImageCarousel";
import { useRouter } from "next/navigation";
import { useApproveDisapproveContract } from "@/hooks/admin/useApprovedOrdisApproveContract";

interface QueueItemProps {
  item: QueueItemData;
  onActionComplete?: () => void;
}

const QueueItem = ({
  item,
  onActionComplete,
}: QueueItemProps) => {
  const [showRejectField, setShowRejectField] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const router = useRouter();

  const { approveDisapproveContract, loading } = useApproveDisapproveContract();

  const handleApprove = async () => {
    try {
      await approveDisapproveContract(item._id, CONTRACT_STATUS.APPROVED);
      if (onActionComplete) onActionComplete();
    } catch (e) {
      // Error handled by hook toast
    }
  };

  const handleRejectClick = () => {
    if (!showRejectField) {
      setShowRejectField(true);
    } else {
      setShowRejectField(false);
      setRejectionReason("");
    }
  };

  const handleSubmitReject = async () => {
    if (!rejectionReason.trim()) return;
    try {
      await approveDisapproveContract(item._id, CONTRACT_STATUS.REJECTED, rejectionReason);
      setShowRejectField(false);
      if (onActionComplete) onActionComplete();
    } catch (e) {
      // Error handled by hook toast
    }
  };

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
            <ImageCarousel data={item?.assetImages} />
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
                  {item.contractTitle}
                </Typography>

                {/* Category tag */}
                <Chip
                  label={item.category || item.contractType}
                  size="small"
                  sx={{
                    backgroundColor: "rgba(35, 164, 85, 0.1)",
                    color: "#23A455",
                    fontFamily: poppins700.style.fontFamily,
                    fontWeight: 700,
                    fontSize: "11px",
                    borderRadius: "6px",
                    height: "22px",
                  }}
                />
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
                    {`${item.city || ""}, ${item.districtOrNeighborhood || ""}`}
                  </Typography>
                </Box>
                <Typography>•</Typography>
                <Typography sx={{ fontWeight: 600, color: COLORS.SECONDARY }}>
                  {item.currency || "SAR"}{" "}
                  {item.totalContractValue?.toLocaleString()} total
                </Typography>
                <Typography>•</Typography>
                <Typography sx={{ color: "#7A9BAB" }}>
                  {item.currency || "SAR"}{" "}
                  {item.monthlyAmount?.toLocaleString()}/mo
                </Typography>
                <Typography>•</Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <AttachFile sx={{ fontSize: 16 }} />
                  <Typography sx={{ fontSize: "13px" }}>
                    {item.contractDocuments?.length || 0} documents
                  </Typography>
                </Box>
                <Typography>•</Typography>
                <Typography sx={{ fontSize: "13px" }}>
                  {new Date(item.createdAt).toLocaleDateString()}
                </Typography>
              </Stack>
            </Box>
          </Stack>

          {/* Expanded Toggle Button */}
          <Button
            variant="outlined"
            onClick={() => router.push(`/admin/approvals/${item._id}`)}
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
            View Details
          </Button>
        </Stack>
      </Box>

      <Divider sx={{ borderColor: "#0135470F" }} />

      <Box sx={{ p: 2.5, px: 3 }}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          sx={{ alignItems: "center", justifyContent: "space-between" }}
        >
          {/* Action Buttons */}
          {item.contractStatus === CONTRACT_STATUS.PUBLISHED ? (
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={1.5}
              sx={{ width: { xs: "100%", sm: "auto" } }}
            >
              <Button
                variant="contained"
                disableElevation
                startIcon={loading ? <CircularProgress size={16} color="inherit" /> : <Check />}
                onClick={handleApprove}
                disabled={loading}
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
                variant={showRejectField ? "contained" : "outlined"}
                startIcon={<Close />}
                onClick={handleRejectClick}
                disabled={loading}
                sx={{
                  color: showRejectField ? COLORS.WHITE : "#FF4D4D",
                  borderColor: showRejectField ? "transparent" : "rgba(255, 77, 77, 0.4)",
                  borderRadius: "100px",
                  textTransform: "none",
                  fontFamily: poppins700.style.fontFamily,
                  fontWeight: 700,
                  fontSize: "14px",
                  px: 3.5,
                  py: 1.2,
                  backgroundColor: showRejectField ? "#FF4D4D" : COLORS.WHITE,
                  "&:hover": {
                    borderColor: showRejectField ? "transparent" : "#FF4D4D",
                    backgroundColor: showRejectField ? "#E64545" : "rgba(255, 77, 77, 0.05)",
                  },
                }}
              >
                {showRejectField ? "Cancel Reject" : "Reject"}
              </Button>
            </Stack>
          ) : (
            <Box sx={{ width: { xs: "100%", sm: "auto" }, display: "flex", alignItems: "center" }}>
              <Chip
                icon={item.contractStatus === CONTRACT_STATUS.APPROVED ? <Check fontSize="small" /> : <Close fontSize="small" />}
                label={item.contractStatus === CONTRACT_STATUS.APPROVED ? "Approved" : "Rejected"}
                sx={{
                  backgroundColor: item.contractStatus === CONTRACT_STATUS.APPROVED ? "rgba(35, 164, 85, 0.1)" : "rgba(255, 77, 77, 0.1)",
                  color: item.contractStatus === CONTRACT_STATUS.APPROVED ? "#23A455" : "#FF4D4D",
                  fontFamily: poppins700.style.fontFamily,
                  fontWeight: 700,
                  fontSize: "13px",
                  borderRadius: "100px",
                  px: 1,
                  py: 2,
                  "& .MuiChip-icon": {
                    color: "inherit",
                  },
                }}
              />
            </Box>
          )}

          {/* Submission Info */}
          <Typography
            sx={{
              fontFamily: poppins.style.fontFamily,
              fontWeight: 500,
              fontSize: "13px",
              color: "#7A9BAB",
            }}
          >
            Submitted by {item.createdBy?.name || "Unknown"}
          </Typography>
        </Stack>

        {/* Rejection Field */}
        {showRejectField && (
          <Box sx={{ mt: 3, p: 3, backgroundColor: "#F9FAFB", borderRadius: "16px", border: "1px solid #E5E7EB" }}>
            <Typography sx={{ fontFamily: poppins700.style.fontFamily, fontSize: "14px", color: COLORS.SECONDARY, mb: 1 }}>
              Provide a reason for rejection
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={3}
              variant="outlined"
              placeholder="Explain why this listing is being rejected..."
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              disabled={loading}
              sx={{
                mb: 2,
                backgroundColor: COLORS.WHITE,
                "& .MuiOutlinedInput-root": {
                  fontFamily: poppins.style.fontFamily,
                  fontSize: "14px",
                  borderRadius: "12px",
                }
              }}
            />
            <Stack direction="row" sx={{ justifyContent: "flex-end" }}>
              <Button
                variant="contained"
                onClick={handleSubmitReject}
                disabled={!rejectionReason.trim() || loading}
                sx={{
                  backgroundColor: "#FF4D4D",
                  color: COLORS.WHITE,
                  borderRadius: "100px",
                  textTransform: "none",
                  fontFamily: poppins700.style.fontFamily,
                  fontWeight: 700,
                  fontSize: "14px",
                  px: 3,
                  "&:hover": {
                    backgroundColor: "#E64545",
                  },
                }}
              >
                {loading ? <CircularProgress size={20} color="inherit" /> : "Confirm Reject"}
              </Button>
            </Stack>
          </Box>
        )}
      </Box>
    </Paper>
  );
};

export default QueueItem;
