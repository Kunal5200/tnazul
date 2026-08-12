import React from "react";
import { Box, Typography } from "@mui/material";
import { poppins, poppins700 } from "@/utils/fonts";
import { COLORS } from "@/utils/enum";

const ApprovalsTopBar = () => {
  return (
    <Box
      sx={{
        backgroundColor: COLORS.WHITE,
        py: 2.5,
        px: { xs: 3, md: 5 },
        borderBottom: "1px solid #0135470F",
      }}
    >
      <Typography
        sx={{
          fontFamily: poppins700.style.fontFamily,
          fontWeight: 800,
          fontSize: "24px",
          color: COLORS.SECONDARY,
        }}
      >
        Approvals
      </Typography>
      <Typography
        sx={{
          fontFamily: poppins.style.fontFamily,
          fontWeight: 500,
          fontSize: "13px",
          color: "#7A9BAB",
        }}
      >
        Tnazul Administration
      </Typography>
    </Box>
  );
};

export default ApprovalsTopBar;
