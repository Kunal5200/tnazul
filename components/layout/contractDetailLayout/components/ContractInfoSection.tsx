"use client";

import React from "react";
import { Box, Typography, Stack, Grid } from "@mui/material";
import { InsertDriveFileOutlined, PlaceOutlined } from "@mui/icons-material";
import { COLORS } from "@/utils/enum";
import { poppins, poppins700 } from "@/utils/fonts";

export interface ContractInfoSectionProps {
  contractType?: string;
  districtOrNeighborhood?: string;
  city?: string;
  remainingDuration?: string;
  startDate?: string;
  totalDuration?: string;
  endDate?: string;
}

export const ContractInfoSection: React.FC<ContractInfoSectionProps> = ({
  contractType,
  districtOrNeighborhood,
  city,
  remainingDuration,
  startDate,
  totalDuration,
  endDate,
}) => {
  const locationText = `${districtOrNeighborhood || ""}, ${city || ""}`.replace(/^, | , $/g, "");

  return (
    <Box>
      <Stack direction="row" spacing={1.5} sx={{ alignItems: "center", mb: 3 }}>
        <Box sx={{ width: 4, height: 18, backgroundColor: COLORS.PRIMARY, borderRadius: "2px" }} />
        <Typography
          sx={{
            fontFamily: poppins700.style.fontFamily,
            fontWeight: 700,
            fontSize: "16px",
            color: COLORS.SECONDARY,
          }}
        >
          Contract Information
        </Typography>
      </Stack>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Parameter 1: contract type */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <Box sx={{ backgroundColor: "#FFFFFF", borderRadius: "20px", p: 3, border: "1px solid #0135470D", display: "flex", alignItems: "center", gap: 2.5 }}>
            <Box sx={{ width: 48, height: 48, borderRadius: "50%", backgroundColor: "#EEF6FA", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <InsertDriveFileOutlined sx={{ color: "#166CA9", fontSize: 22 }} />
            </Box>
            <Box>
              <Typography sx={{ fontFamily: poppins.style.fontFamily, fontSize: "11px", color: "#7A9BAB", fontWeight: 700, letterSpacing: "0.5px", textTransform: "uppercase" }}>
                Contract Type
              </Typography>
              <Typography sx={{ fontFamily: poppins700.style.fontFamily, fontSize: "15px", color: COLORS.SECONDARY, fontWeight: 700, mt: 0.2 }}>
                {contractType || "Lease"}
              </Typography>
            </Box>
          </Box>
        </Grid>

        {/* Parameter 2: location */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <Box sx={{ backgroundColor: "#FFFFFF", borderRadius: "20px", p: 3, border: "1px solid #0135470D", display: "flex", alignItems: "center", gap: 2.5 }}>
            <Box sx={{ width: 48, height: 48, borderRadius: "50%", backgroundColor: "#FCF8EE", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <PlaceOutlined sx={{ color: COLORS.PRIMARY, fontSize: 22 }} />
            </Box>
            <Box>
              <Typography sx={{ fontFamily: poppins.style.fontFamily, fontSize: "11px", color: "#7A9BAB", fontWeight: 700, letterSpacing: "0.5px", textTransform: "uppercase" }}>
                Location
              </Typography>
              <Typography sx={{ fontFamily: poppins700.style.fontFamily, fontSize: "15px", color: COLORS.SECONDARY, fontWeight: 700, mt: 0.2 }}>
                {locationText}
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* Lease Timeline Wrapper */}
      <Box sx={{ backgroundColor: "#FFFFFF", borderRadius: "20px", p: 3.5, border: "1px solid #0135470D" }}>
        {/* Labels Header */}
        <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "baseline", mb: 2 }}>
          <Typography
            sx={{
              fontFamily: poppins700.style.fontFamily,
              fontWeight: 700,
              fontSize: "12px",
              color: COLORS.SECONDARY,
              letterSpacing: "0.5px",
            }}
          >
            LEASE TIMELINE
          </Typography>
          <Typography
            sx={{
              fontFamily: poppins700.style.fontFamily,
              fontWeight: 700,
              fontSize: "11px",
              color: COLORS.SECONDARY,
              backgroundColor: "rgba(1, 53, 71, 0.05)",
              borderRadius: "6px",
              px: 1,
              py: 0.4,
            }}
          >
            {remainingDuration || "N/A"}
          </Typography>
        </Stack>

        {/* Progress bar line */}
        <Box sx={{ height: 7, width: "100%", backgroundColor: "#EDF1F2", borderRadius: "4px", overflow: "hidden", mb: 2.5 }}>
          <Box sx={{ width: "25%", height: "100%", backgroundColor: COLORS.SECONDARY, borderRadius: "4px" }} />
        </Box>

        {/* Start, duration, end markers */}
        <Stack direction="row" sx={{ justifyContent: "space-between" }}>
          <Box>
            <Typography sx={{ fontFamily: poppins.style.fontFamily, fontSize: "10px", color: "#7A9BAB", fontWeight: 700, textTransform: "uppercase", mb: 0.25 }}>
              Start Date
            </Typography>
            <Typography sx={{ fontFamily: poppins700.style.fontFamily, fontSize: "12.5px", color: COLORS.SECONDARY, fontWeight: 700 }}>
              {startDate ? new Date(startDate).toLocaleDateString() : "N/A"}
            </Typography>
          </Box>
          <Box sx={{ textAlign: "center" }}>
            <Typography sx={{ fontFamily: poppins.style.fontFamily, fontSize: "10px", color: "#7A9BAB", fontWeight: 700, textTransform: "uppercase", mb: 0.25 }}>
              Total Duration
            </Typography>
            <Typography sx={{ fontFamily: poppins700.style.fontFamily, fontSize: "12.5px", color: COLORS.SECONDARY, fontWeight: 700 }}>
              {totalDuration || "N/A"}
            </Typography>
          </Box>
          <Box sx={{ textAlign: "right" }}>
            <Typography sx={{ fontFamily: poppins.style.fontFamily, fontSize: "10px", color: "#7A9BAB", fontWeight: 700, textTransform: "uppercase", mb: 0.25 }}>
              End Date
            </Typography>
            <Typography sx={{ fontFamily: poppins700.style.fontFamily, fontSize: "12.5px", color: COLORS.SECONDARY, fontWeight: 700 }}>
              {endDate ? new Date(endDate).toLocaleDateString() : "N/A"}
            </Typography>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};
