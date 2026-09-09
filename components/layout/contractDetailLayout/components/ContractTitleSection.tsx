import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import { VisibilityOutlined, AccessTimeOutlined, CheckCircle } from "@mui/icons-material";
import { COLORS } from "@/utils/enum";
import { poppins, poppins700 } from "@/utils/fonts";

interface ContractTitleSectionProps {
  title?: string;
  createdAt?: string;
}

export const ContractTitleSection: React.FC<ContractTitleSectionProps> = ({ title, createdAt }) => {
  return (
    <Box>
      <Typography
        sx={{
          fontFamily: poppins700.style.fontFamily,
          fontWeight: 800,
          fontSize: "26px",
          color: COLORS.SECONDARY,
          mb: 1.5,
        }}
      >
        {title || "Contract Title"}
      </Typography>

      <Stack
        direction="row"
        spacing={2.5}
        sx={{ alignItems: "center", flexWrap: "wrap", gap: 1.5 }}
      >
        <Stack
          direction="row"
          spacing={0.75}
          sx={{ alignItems: "center", color: "#7A9BAB" }}
        >
          <VisibilityOutlined sx={{ fontSize: 16 }} />
          <Typography
            sx={{
              fontFamily: poppins.style.fontFamily,
              fontSize: "13px",
              fontWeight: 600,
            }}
          >
            412 views
          </Typography>
        </Stack>
        <Stack
          direction="row"
          spacing={0.75}
          sx={{ alignItems: "center", color: "#7A9BAB" }}
        >
          <AccessTimeOutlined sx={{ fontSize: 16 }} />
          <Typography
            sx={{
              fontFamily: poppins.style.fontFamily,
              fontSize: "13px",
              fontWeight: 600,
            }}
          >
            {createdAt ? new Date(createdAt).toLocaleDateString() : "N/A"}
          </Typography>
        </Stack>
        <Box
          sx={{
            borderRadius: "100px",
            py: 0.5,
            px: 1.5,
            backgroundColor: "#E8F5E9",
            color: "#10753E",
            display: "inline-flex",
            alignItems: "center",
            gap: 0.5,
          }}
        >
          <CheckCircle sx={{ fontSize: 13, color: "#10753E" }} />
          <Typography
            sx={{
              fontFamily: poppins700.style.fontFamily,
              fontWeight: 700,
              fontSize: "11px",
              lineHeight: 1,
            }}
          >
            Nafath Verified
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
};
