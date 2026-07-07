"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import {
  ArrowBack,
  AccessTime,
  CheckCircle,
  DescriptionOutlined,
  PlaceOutlined,
  StarBorderOutlined,
  VerifiedUserOutlined,
  VisibilityOutlined,
  Check,
} from "@mui/icons-material";
import { COLORS } from "@/utils/enum";
import { poppins, poppins700 } from "@/utils/fonts";

interface ReviewPublishFormProps {
  formData: any;
  updateFormData: (fields: any) => void;
  onBack: () => void;
}

const ReviewPublishForm = ({
  formData,
  updateFormData,
  onBack,
}: ReviewPublishFormProps) => {
  const { listingType } = formData;
  const [selectedPlan, setSelectedPlan] = useState<"Standard" | "Featured">(
    listingType || "Standard"
  );

  const handlePlanChange = (plan: "Standard" | "Featured") => {
    setSelectedPlan(plan);
    updateFormData({ listingType: plan });
  };

  // Helper to format currency values
  const formatCurrency = (val: string) => {
    if (!val) return "Not specified";
    const cleanVal = val.toString().replace(/,/g, "");
    const num = parseFloat(cleanVal);
    if (isNaN(num)) return val;
    return new Intl.NumberFormat("en-US").format(num);
  };

  // Helper to calculate remaining duration
  const getRemainingDurationText = () => {
    const { contractStartDate, contractEndDate } = formData;
    if (!contractStartDate || !contractEndDate) return "0 month";
    const start = new Date(contractStartDate);
    const end = new Date(contractEndDate);
    if (isNaN(start.getTime()) || isNaN(end.getTime())) return "0 month";
    const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    return `${Math.max(0, months)} month`;
  };

  const remainingDurationText = getRemainingDurationText();

  // Detail item for the summary grid
  const DetailRow = ({ label, value }: { label: string; value: string }) => (
    <Stack
      direction="row"
      sx={{
        justifyContent: "space-between",
        py: 1.5,
        borderBottom: "1px solid #F2F4F7",
        alignItems: "center",
      }}
    >
      <Typography
        sx={{
          fontFamily: poppins.style.fontFamily,
          fontSize: "13px",
          color: "#667085",
        }}
      >
        {label}
      </Typography>
      <Typography
        sx={{
          fontFamily: poppins700.style.fontFamily,
          fontSize: "13px",
          fontWeight: 700,
          color: COLORS.SECONDARY,
        }}
      >
        {value}
      </Typography>
    </Stack>
  );

  return (
    <Box
      sx={{
        backgroundColor: COLORS.WHITE,
        borderRadius: "24px",
        boxShadow: "0px 8px 30px rgba(1, 53, 71, 0.04)",
        p: { xs: 3, md: 4 },
        width: "100%",
        border: "1px solid #01354705",
      }}
    >
      {/* HOW BUYERS WILL SEE IT Section */}
      <Stack direction="row" spacing={1} sx={{ alignItems: "center", mb: 3 }}>
        <VisibilityOutlined sx={{ color: COLORS.SIDEBAR_TEXT_COLOR, fontSize: 18 }} />
        <Typography
          sx={{
            fontFamily: poppins700.style.fontFamily,
            fontSize: "11px",
            fontWeight: 700,
            color: COLORS.SIDEBAR_TEXT_COLOR,
            letterSpacing: "1.2px",
            textTransform: "uppercase",
          }}
        >
          How Buyers Will See It
        </Typography>
      </Stack>

      <Grid container spacing={4} sx={{ mb: 5 }}>
        {/* Left Column: Visual Card Preview */}
        <Grid size={{ xs: 12, md: 5.5 }}>
          <Box
            sx={{
              borderRadius: "20px",
              border: "1px solid #EAECF0",
              overflow: "hidden",
              boxShadow: "0px 4px 20px rgba(1, 53, 71, 0.02)",
              backgroundColor: COLORS.WHITE,
            }}
          >
            {/* Card Image Area */}
            <Box sx={{ position: "relative", width: "100%", paddingTop: "62%" }}>
              <Box
                component="img"
                src={
                  formData.assetPhotos?.[0]?.content ||
                  "/images/villa_preview.png"
                }
                alt="Property Preview"
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
              {/* Category Pill (Top Left) */}
              <Box
                sx={{
                  position: "absolute",
                  top: 12,
                  left: 12,
                  backgroundColor: "rgba(1, 53, 71, 0.75)",
                  color: COLORS.WHITE,
                  borderRadius: "20px",
                  px: 1.8,
                  py: 0.6,
                  backdropFilter: "blur(4px)",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: poppins700.style.fontFamily,
                    fontSize: "10px",
                    fontWeight: 700,
                  }}
                >
                  {formData.contractType || "Real Estate"}
                </Typography>
              </Box>

              {/* Time Remaining Pill (Bottom Right) */}
              <Box
                sx={{
                  position: "absolute",
                  bottom: 12,
                  right: 12,
                  backgroundColor: "rgba(0, 0, 0, 0.6)",
                  color: COLORS.WHITE,
                  borderRadius: "20px",
                  px: 1.5,
                  py: 0.5,
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  backdropFilter: "blur(4px)",
                }}
              >
                <AccessTime sx={{ fontSize: 12, color: COLORS.WHITE }} />
                <Typography
                  sx={{
                    fontFamily: poppins.style.fontFamily,
                    fontSize: "10px",
                    fontWeight: 500,
                  }}
                >
                  {remainingDurationText} left
                </Typography>
              </Box>
            </Box>

            {/* Details Content Area */}
            <Box sx={{ p: 2.5 }}>
              <Typography
                noWrap
                sx={{
                  fontFamily: poppins700.style.fontFamily,
                  fontSize: "16px",
                  fontWeight: 700,
                  color: COLORS.SECONDARY,
                  mb: 0.5,
                }}
              >
                {formData.contractTitle || "3BR Villa - Al Nakheel District"}
              </Typography>

              {/* Location */}
              <Stack direction="row" spacing={0.5} sx={{ alignItems: "center", mb: 2 }}>
                <PlaceOutlined sx={{ fontSize: 14, color: "#667085" }} />
                <Typography
                  sx={{
                    fontFamily: poppins.style.fontFamily,
                    fontSize: "12px",
                    color: "#667085",
                  }}
                >
                  {formData.city
                    ? `${formData.district ? formData.district + ", " : ""}${formData.city}`
                    : "Al Nakheel, Riyadh"}
                </Typography>
              </Stack>

              {/* Gray Value Card Container */}
              <Box
                sx={{
                  backgroundColor: "#F9FAFB",
                  border: "1px solid #EAECF0",
                  borderRadius: "14px",
                  p: 2,
                  mb: 2,
                }}
              >
                <Stack
                  direction="row"
                  sx={{
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Typography
                      sx={{
                        fontFamily: poppins.style.fontFamily,
                        fontSize: "9px",
                        fontWeight: 700,
                        color: "#667085",
                        letterSpacing: "0.5px",
                        textTransform: "uppercase",
                      }}
                    >
                      Total Value
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: poppins700.style.fontFamily,
                        fontSize: "18px",
                        fontWeight: 700,
                        color: COLORS.SECONDARY,
                        mt: 0.2,
                      }}
                    >
                      {formatCurrency(formData.totalValue)} <span style={{ fontSize: "12px" }}>SAR</span>
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: "right" }}>
                    <Typography
                      sx={{
                        fontFamily: poppins700.style.fontFamily,
                        fontSize: "14px",
                        fontWeight: 700,
                        color: COLORS.SECONDARY,
                      }}
                    >
                      {formatCurrency(formData.monthlyAmount)}
                      <span style={{ fontSize: "10px", fontWeight: 500, color: "#667085", marginLeft: "2px" }}>
                        /month
                      </span>
                    </Typography>
                  </Box>
                </Stack>
              </Box>

              {/* Badges Row */}
              <Stack direction="row" spacing={1}>
                {/* Verified Badge */}
                <Stack
                  direction="row"
                  spacing={0.5}
                  sx={{
                    alignItems: "center",
                    backgroundColor: "#ECFDF3",
                    borderRadius: "14px",
                    px: 1.5,
                    py: 0.5,
                    border: "1px solid #D1F3DF",
                  }}
                >
                  <VerifiedUserOutlined sx={{ fontSize: 12, color: "#12B76A" }} />
                  <Typography
                    sx={{
                      fontFamily: poppins.style.fontFamily,
                      fontSize: "10px",
                      fontWeight: 700,
                      color: "#12B76A",
                    }}
                  >
                    Verified
                  </Typography>
                </Stack>

                {/* Docs Ready Badge */}
                <Stack
                  direction="row"
                  spacing={0.5}
                  sx={{
                    alignItems: "center",
                    backgroundColor: "#EFF8FF",
                    borderRadius: "14px",
                    px: 1.5,
                    py: 0.5,
                    border: "1px solid #B9E6FE",
                  }}
                >
                  <DescriptionOutlined sx={{ fontSize: 12, color: "#1570EF" }} />
                  <Typography
                    sx={{
                      fontFamily: poppins.style.fontFamily,
                      fontSize: "10px",
                      fontWeight: 700,
                      color: "#1570EF",
                    }}
                  >
                    Docs Ready
                  </Typography>
                </Stack>
              </Stack>
            </Box>
          </Box>
        </Grid>

        {/* Right Column: Details Summary Table */}
        <Grid size={{ xs: 12, md: 6.5 }}>
          <Box sx={{ pl: { md: 2 } }}>
            <Typography
              sx={{
                fontFamily: poppins700.style.fontFamily,
                fontSize: "12px",
                fontWeight: 700,
                color: COLORS.SECONDARY,
                mb: 1.5,
                letterSpacing: "0.5px",
              }}
            >
              DETAILS SUMMARY
            </Typography>

            <Stack>
              <DetailRow label="Contract Type" value={formData.contractType || "Real Estate"} />
              <DetailRow label="Category" value={formData.category || "Penthouse"} />
              <DetailRow label="Location" value={formData.city ? `${formData.district ? formData.district + ", " : ""}${formData.city}` : "Riyadh"} />
              <DetailRow label="Total Value" value={`SAR ${formatCurrency(formData.totalValue)}`} />
              <DetailRow label="Monthly Amount" value={`SAR ${formatCurrency(formData.monthlyAmount)}mo`} />
              <DetailRow label="Transfer Fee" value={formData.transferFee ? `SAR ${formatCurrency(formData.transferFee)}` : "Not specified"} />
              <DetailRow label="Negotiable" value={formData.negotiable ? "Yes" : "No"} />
              <DetailRow label="End Date" value={formData.contractEndDate || "Not specified"} />
              <DetailRow label="Transfer Reason" value={formData.reasonForTransfer || "Financial Reasons"} />
              <DetailRow label="Documents" value={`${formData.contractDocuments?.length || 0} file(s)`} />
              <DetailRow label="Asset Photos" value={`${formData.assetPhotos?.length || 0} photo(s)`} />
            </Stack>
          </Box>
        </Grid>
      </Grid>

      {/* LISTING TYPE Section */}
      <Box sx={{ mb: 5 }}>
        <Typography
          sx={{
            fontFamily: poppins700.style.fontFamily,
            fontSize: "12px",
            fontWeight: 700,
            color: COLORS.SECONDARY,
            mb: 2,
            letterSpacing: "0.5px",
          }}
        >
          LISTING TYPE
        </Typography>

        <Grid container spacing={3}>
          {/* Plan 1: Standard */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              onClick={() => handlePlanChange("Standard")}
              sx={{
                border: selectedPlan === "Standard" ? "2px solid #013547" : "1px solid #EAECF0",
                borderRadius: "16px",
                p: 3,
                cursor: "pointer",
                backgroundColor: selectedPlan === "Standard" ? "#013547" : COLORS.WHITE,
                color: selectedPlan === "Standard" ? COLORS.WHITE : COLORS.SECONDARY,
                transition: "all 0.2s ease",
                position: "relative",
              }}
            >
              <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
                <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      backgroundColor: selectedPlan === "Standard" ? "rgba(255, 255, 255, 0.1)" : "#F2F4F7",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <DescriptionOutlined sx={{ color: selectedPlan === "Standard" ? COLORS.WHITE : "#667085" }} />
                  </Box>
                  <Box>
                    <Typography
                      sx={{
                        fontFamily: poppins700.style.fontFamily,
                        fontSize: "16px",
                        fontWeight: 700,
                      }}
                    >
                      Standard
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: poppins.style.fontFamily,
                        fontSize: "12px",
                        color: selectedPlan === "Standard" ? "rgba(255, 255, 255, 0.7)" : "#667085",
                      }}
                    >
                      Appears in regular search results.
                    </Typography>
                  </Box>
                </Stack>
                <Typography
                  sx={{
                    fontFamily: poppins700.style.fontFamily,
                    fontSize: "14px",
                    fontWeight: 700,
                    color: selectedPlan === "Standard" ? COLORS.PRIMARY : COLORS.SECONDARY,
                  }}
                >
                  Free
                </Typography>
              </Stack>

              <Stack spacing={1.2}>
                {[
                  "Search results listing",
                  "Contact form enabled",
                  "90-day active period",
                ].map((item, i) => (
                  <Stack key={i} direction="row" spacing={1} sx={{ alignItems: "center" }}>
                    <CheckCircle
                      sx={{
                        fontSize: 16,
                        color: selectedPlan === "Standard" ? "#12B76A" : "#667085",
                      }}
                    />
                    <Typography
                      sx={{
                        fontFamily: poppins.style.fontFamily,
                        fontSize: "13px",
                      }}
                    >
                      {item}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </Box>
          </Grid>

          {/* Plan 2: Featured */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              onClick={() => handlePlanChange("Featured")}
              sx={{
                border: selectedPlan === "Featured" ? "2px solid #013547" : "1px solid #EAECF0",
                borderRadius: "16px",
                p: 3,
                cursor: "pointer",
                backgroundColor: selectedPlan === "Featured" ? "#013547" : COLORS.WHITE,
                color: selectedPlan === "Featured" ? COLORS.WHITE : COLORS.SECONDARY,
                transition: "all 0.2s ease",
                position: "relative",
              }}
            >
              <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
                <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      backgroundColor: selectedPlan === "Featured" ? "rgba(255, 255, 255, 0.1)" : "#FFF9E5",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <StarBorderOutlined sx={{ color: selectedPlan === "Featured" ? COLORS.WHITE : COLORS.PRIMARY }} />
                  </Box>
                  <Box>
                    <Typography
                      sx={{
                        fontFamily: poppins700.style.fontFamily,
                        fontSize: "16px",
                        fontWeight: 700,
                      }}
                    >
                      Featured
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: poppins.style.fontFamily,
                        fontSize: "12px",
                        color: selectedPlan === "Featured" ? "rgba(255, 255, 255, 0.7)" : "#667085",
                      }}
                    >
                      Pinned at top with premium badge.
                    </Typography>
                  </Box>
                </Stack>
                <Typography
                  sx={{
                    fontFamily: poppins700.style.fontFamily,
                    fontSize: "14px",
                    fontWeight: 700,
                    color: selectedPlan === "Featured" ? COLORS.PRIMARY : COLORS.SECONDARY,
                  }}
                >
                  Paid
                </Typography>
              </Stack>

              <Stack spacing={1.2}>
                {[
                  "Top of search results",
                  "Featured badge + highlight",
                  "Priority admin review",
                  "180-day active period",
                ].map((item, i) => (
                  <Stack key={i} direction="row" spacing={1} sx={{ alignItems: "center" }}>
                    <CheckCircle
                      sx={{
                        fontSize: 16,
                        color: selectedPlan === "Featured" ? "#12B76A" : "#667085",
                      }}
                    />
                    <Typography
                      sx={{
                        fontFamily: poppins.style.fontFamily,
                        fontSize: "13px",
                      }}
                    >
                      {item}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Buttons & Terms */}
      <Box sx={{ mt: 5, pt: 3, borderTop: "1px solid #F2F4F7" }}>
        <Grid container spacing={2} sx={{ alignItems: "center" }}>
          {/* Back Button */}
          <Grid size={{ xs: 12, sm: 3 }}>
            <Button
              variant="outlined"
              onClick={onBack}
              startIcon={<ArrowBack />}
              fullWidth
              sx={{
                borderRadius: "14px",
                border: "1px solid #E4E7EC",
                color: COLORS.SECONDARY,
                py: 1.8,
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
              Back
            </Button>
          </Grid>

          {/* Action Buttons: Publish & Save Draft */}
          <Grid size={{ xs: 12, sm: 9 }}>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              {/* Publish Button */}
              <Button
                variant="contained"
                fullWidth
                onClick={() => alert("Contract published successfully!")}
                sx={{
                  borderRadius: "14px",
                  backgroundColor: COLORS.SECONDARY,
                  color: COLORS.WHITE,
                  py: 1.8,
                  textTransform: "none",
                  fontFamily: poppins700.style.fontFamily,
                  fontWeight: 700,
                  fontSize: "14px",
                  boxShadow: "none",
                  "&:hover": {
                    backgroundColor: "rgba(1, 53, 71, 0.9)",
                    boxShadow: "none",
                  },
                }}
              >
                Publish Contract
              </Button>

              {/* Save Draft Button */}
              <Button
                variant="outlined"
                fullWidth
                startIcon={<DescriptionOutlined />}
                onClick={() => alert("Draft saved successfully!")}
                sx={{
                  borderRadius: "14px",
                  border: "1px solid #E4E7EC",
                  color: COLORS.SECONDARY,
                  py: 1.8,
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
                Save Draft
              </Button>
            </Stack>
          </Grid>
        </Grid>

        <Typography
          sx={{
            fontFamily: poppins.style.fontFamily,
            fontSize: "11px",
            color: "#98A2B3",
            textAlign: "center",
            mt: 3,
            lineHeight: 1.5,
          }}
        >
          By publishing you agree to the Tnazul Listing Terms. Your listing will not appear publicly until reviewed and approved.
        </Typography>
      </Box>
    </Box>
  );
};

export default ReviewPublishForm;
