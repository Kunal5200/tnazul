import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import { COLORS } from "@/utils/enum";
import { poppins, poppins700 } from "@/utils/fonts";

interface ContractDescriptionProps {
  description?: string;
}

export const ContractDescription: React.FC<ContractDescriptionProps> = ({ description }) => {
  return (
    <Box>
      <Stack
        direction="row"
        spacing={1.5}
        sx={{ alignItems: "center", mb: 2.5 }}
      >
        <Box
          sx={{
            width: 4,
            height: 18,
            backgroundColor: COLORS.PRIMARY,
            borderRadius: "2px",
          }}
        />
        <Typography
          sx={{
            fontFamily: poppins700.style.fontFamily,
            fontWeight: 700,
            fontSize: "16px",
            color: COLORS.SECONDARY,
          }}
        >
          Description
        </Typography>
      </Stack>
      <Box
        sx={{
          backgroundColor: "#FFFFFF",
          borderRadius: "20px",
          p: 3.5,
          border: "1px solid #0135470D",
        }}
      >
        <Typography
          sx={{
            fontFamily: poppins.style.fontFamily,
            fontWeight: 500,
            fontSize: "14px",
            color: "#5A7A8A",
            lineHeight: 1.7,
          }}
        >
          {description || "No description provided."}
        </Typography>
      </Box>
    </Box>
  );
};
