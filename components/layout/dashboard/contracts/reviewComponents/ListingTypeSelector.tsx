import React from "react";
import { Box, Grid, Stack, Typography } from "@mui/material";
import {
  CheckCircle,
  DescriptionOutlined,
  StarBorderOutlined,
} from "@mui/icons-material";
import { COLORS } from "@/utils/enum";
import { poppins, poppins700 } from "@/utils/fonts";

interface ListingTypeSelectorProps {
  selectedPlan: "Standard" | "Featured";
  onPlanChange: (plan: "Standard" | "Featured") => void;
}

export const ListingTypeSelector: React.FC<ListingTypeSelectorProps> = ({
  selectedPlan,
  onPlanChange,
}) => {
  return (
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
            onClick={() => onPlanChange("Standard")}
            sx={{
              border:
                selectedPlan === "Standard"
                  ? "2px solid #013547"
                  : "1px solid #EAECF0",
              borderRadius: "16px",
              p: 3,
              cursor: "pointer",
              backgroundColor:
                selectedPlan === "Standard" ? "#013547" : COLORS.WHITE,
              color:
                selectedPlan === "Standard" ? COLORS.WHITE : COLORS.SECONDARY,
              transition: "all 0.2s ease",
              position: "relative",
            }}
          >
            <Stack
              direction="row"
              sx={{
                justifyContent: "space-between",
                alignItems: "flex-start",
                mb: 2,
              }}
            >
              <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    backgroundColor:
                      selectedPlan === "Standard"
                        ? "rgba(255, 255, 255, 0.1)"
                        : "#F2F4F7",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <DescriptionOutlined
                    sx={{
                      color:
                        selectedPlan === "Standard"
                          ? COLORS.WHITE
                          : "#667085",
                    }}
                  />
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
                      color:
                        selectedPlan === "Standard"
                          ? "rgba(255, 255, 255, 0.7)"
                          : "#667085",
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
                  color:
                    selectedPlan === "Standard"
                      ? COLORS.PRIMARY
                      : COLORS.SECONDARY,
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
                <Stack
                  key={i}
                  direction="row"
                  spacing={1}
                  sx={{ alignItems: "center" }}
                >
                  <CheckCircle
                    sx={{
                      fontSize: 16,
                      color:
                        selectedPlan === "Standard"
                          ? "#12B76A"
                          : "#667085",
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
            onClick={() => onPlanChange("Featured")}
            sx={{
              border:
                selectedPlan === "Featured"
                  ? "2px solid #013547"
                  : "1px solid #EAECF0",
              borderRadius: "16px",
              p: 3,
              cursor: "pointer",
              backgroundColor:
                selectedPlan === "Featured" ? "#013547" : COLORS.WHITE,
              color:
                selectedPlan === "Featured" ? COLORS.WHITE : COLORS.SECONDARY,
              transition: "all 0.2s ease",
              position: "relative",
            }}
          >
            <Stack
              direction="row"
              sx={{
                justifyContent: "space-between",
                alignItems: "flex-start",
                mb: 2,
              }}
            >
              <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    backgroundColor:
                      selectedPlan === "Featured"
                        ? "rgba(255, 255, 255, 0.1)"
                        : "#FFF9E5",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <StarBorderOutlined
                    sx={{
                      color:
                        selectedPlan === "Featured"
                          ? COLORS.WHITE
                          : COLORS.PRIMARY,
                    }}
                  />
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
                      color:
                        selectedPlan === "Featured"
                          ? "rgba(255, 255, 255, 0.7)"
                          : "#667085",
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
                  color:
                    selectedPlan === "Featured"
                      ? COLORS.PRIMARY
                      : COLORS.SECONDARY,
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
                <Stack
                  key={i}
                  direction="row"
                  spacing={1}
                  sx={{ alignItems: "center" }}
                >
                  <CheckCircle
                    sx={{
                      fontSize: 16,
                      color:
                        selectedPlan === "Featured"
                          ? "#12B76A"
                          : "#667085",
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
  );
};

export default ListingTypeSelector;
