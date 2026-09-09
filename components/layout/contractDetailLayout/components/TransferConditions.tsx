import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import { COLORS } from "@/utils/enum";
import { poppins, poppins700 } from "@/utils/fonts";

export const TransferConditions: React.FC = () => {
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
          Transfer Conditions
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
        <Stack spacing={2.5}>
          {[
            "Buyer must pass identity verification (Nafath or manual ID review)",
            "Remaining lease balance to be settled within 30 days of agreement",
            "Transfer fee (SAR 2,500) is non-refundable once documents are submitted",
            "Compound management approval required — typically 5-7 business days",
            "Security deposit transfers to new tenant upon landlord confirmation",
          ].map((condition, idx) => (
            <Stack
              key={idx}
              direction="row"
              spacing={2}
              sx={{ alignItems: "center" }}
            >
              <Box
                sx={{
                  width: 26,
                  height: 26,
                  borderRadius: "50%",
                  backgroundColor: "#F4F7F8",
                  color: COLORS.SECONDARY,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "12px",
                  fontWeight: 700,
                  fontFamily: poppins700.style.fontFamily,
                  flexShrink: 0,
                }}
              >
                {idx + 1}
              </Box>
              <Typography
                sx={{
                  fontFamily: poppins.style.fontFamily,
                  fontWeight: 500,
                  fontSize: "13.5px",
                  color: "#5A7A8A",
                }}
              >
                {condition}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Box>
    </Box>
  );
};
