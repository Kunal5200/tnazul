import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import { AccessTime } from "@mui/icons-material";
import { poppins, poppins700 } from "@/utils/fonts";
import { COLORS } from "@/utils/enum";

interface ApprovalQueueHeaderProps {
  count?: number;
}

const ApprovalQueueHeader = ({ count = 0 }: ApprovalQueueHeaderProps) => {
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={2}
      sx={{
        alignItems: { xs: "flex-start", sm: "center" },
        justifyContent: "space-between",
        mb: 4,
      }}
    >
      <Box>
        <Typography
          sx={{
            fontFamily: poppins700.style.fontFamily,
            fontWeight: 800,
            fontSize: "22px",
            color: COLORS.SECONDARY,
            mb: 0.5,
          }}
        >
          Listing Approval Queue
        </Typography>
        <Typography
          sx={{
            fontFamily: poppins.style.fontFamily,
            fontWeight: 500,
            fontSize: "14px",
            color: "#7A9BAB",
          }}
        >
          {count} listings awaiting review
        </Typography>
      </Box>

      {/* Review target badge */}
      <Stack
        direction="row"
        spacing={1}
        sx={{
          alignItems: "center",
          backgroundColor: "rgba(231, 186, 73, 0.08)",
          border: "1px solid rgba(231, 186, 73, 0.25)",
          borderRadius: "100px",
          py: 1,
          px: 2.5,
          color: "#E78B49",
        }}
      >
        <AccessTime sx={{ fontSize: 18 }} />
        <Typography
          sx={{
            fontFamily: poppins700.style.fontFamily,
            fontWeight: 700,
            fontSize: "13px",
          }}
        >
          Review within 2 hours
        </Typography>
      </Stack>
    </Stack>
  );
};

export default ApprovalQueueHeader;
