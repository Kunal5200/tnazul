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

      </Stack>
    </Box>
  );
};
