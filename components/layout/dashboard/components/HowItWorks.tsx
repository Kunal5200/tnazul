import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import {
  PersonOutlined,
  DescriptionOutlined,
  HandshakeOutlined,
  CheckCircleOutlined,
} from "@mui/icons-material";
import { COLORS } from "@/utils/enum";
import { poppins, poppins700 } from "@/utils/fonts";

const HowItWorks = () => {
  return (
    <Box sx={{ mb: 10 }}>
      <Typography
        sx={{
          color: COLORS.PRIMARY,
          fontSize: "12px",
          fontWeight: 700,
          fontFamily: poppins700.style.fontFamily,
          letterSpacing: "1.5px",
          textTransform: "uppercase",
          mb: 1,
        }}
      >
        Simple Process
      </Typography>
      <Typography
        sx={{
          color: COLORS.SECONDARY,
          fontSize: "36px",
          fontWeight: 800,
          fontFamily: poppins700.style.fontFamily,
          mb: 5,
        }}
      >
        How It Works
      </Typography>

      <Grid container spacing={4.5}>
        {/* Step 1 */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Box sx={{ position: "relative", display: "inline-block", mb: 3 }}>
            <Box
              sx={{
                width: 72,
                height: 72,
                borderRadius: "50%",
                backgroundColor: "#EEF6FA",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1.38px solid #0135470D",
              }}
            >
              <PersonOutlined sx={{ color: "#166CA9", fontSize: 28 }} />
            </Box>
            <Box
              sx={{
                width: 22,
                height: 22,
                borderRadius: "50%",
                backgroundColor: "#166CA9",
                color: "#FFFFFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "11px",
                fontWeight: 700,
                position: "absolute",
                top: -2,
                right: -2,
                border: "2px solid #FFFFFF",
              }}
            >
              1
            </Box>
          </Box>
          <Typography
            sx={{
              fontFamily: poppins700.style.fontFamily,
              fontWeight: 700,
              fontSize: "16px",
              color: COLORS.SECONDARY,
              mb: 1.5,
            }}
          >
            Register & Verify Identity
          </Typography>
          <Typography
            sx={{
              fontFamily: poppins.style.fontFamily,
              fontWeight: 500,
              fontSize: "13.5px",
              color: "#7A9BAB",
              lineHeight: 1.6,
              mb: 2.5,
            }}
          >
            Create your account and complete Nafath verification in minutes.
          </Typography>
          <Box
            sx={{
              width: 24,
              height: 3,
              backgroundColor: "#166CA9",
              borderRadius: "2px",
            }}
          />
        </Grid>

        {/* Step 2 */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Box sx={{ position: "relative", display: "inline-block", mb: 3 }}>
            <Box
              sx={{
                width: 72,
                height: 72,
                borderRadius: "50%",
                backgroundColor: "#FCF8EE",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1.38px solid #0135470D",
              }}
            >
              <DescriptionOutlined
                sx={{ color: COLORS.PRIMARY, fontSize: 28 }}
              />
            </Box>
            <Box
              sx={{
                width: 22,
                height: 22,
                borderRadius: "50%",
                backgroundColor: COLORS.PRIMARY,
                color: "#FFFFFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "11px",
                fontWeight: 700,
                position: "absolute",
                top: -2,
                right: -2,
                border: "2px solid #FFFFFF",
              }}
            >
              2
            </Box>
          </Box>
          <Typography
            sx={{
              fontFamily: poppins700.style.fontFamily,
              fontWeight: 700,
              fontSize: "16px",
              color: COLORS.SECONDARY,
              mb: 1.5,
            }}
          >
            Post Your Contract
          </Typography>
          <Typography
            sx={{
              fontFamily: poppins.style.fontFamily,
              fontWeight: 500,
              fontSize: "13.5px",
              color: "#7A9BAB",
              lineHeight: 1.6,
              mb: 2.5,
            }}
          >
            List your contract with pricing, details, and remaining duration.
          </Typography>
          <Box
            sx={{
              width: 24,
              height: 3,
              backgroundColor: COLORS.PRIMARY,
              borderRadius: "2px",
            }}
          />
        </Grid>

        {/* Step 3 */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Box sx={{ position: "relative", display: "inline-block", mb: 3 }}>
            <Box
              sx={{
                width: 72,
                height: 72,
                borderRadius: "50%",
                backgroundColor: "#EEFAF7",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1.38px solid #0135470D",
              }}
            >
              <HandshakeOutlined sx={{ color: "#009688", fontSize: 28 }} />
            </Box>
            <Box
              sx={{
                width: 22,
                height: 22,
                borderRadius: "50%",
                backgroundColor: "#009688",
                color: "#FFFFFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "11px",
                fontWeight: 700,
                position: "absolute",
                top: -2,
                right: -2,
                border: "2px solid #FFFFFF",
              }}
            >
              3
            </Box>
          </Box>
          <Typography
            sx={{
              fontFamily: poppins700.style.fontFamily,
              fontWeight: 700,
              fontSize: "16px",
              color: COLORS.SECONDARY,
              mb: 1.5,
            }}
          >
            Connect with Interested Party
          </Typography>
          <Typography
            sx={{
              fontFamily: poppins.style.fontFamily,
              fontWeight: 500,
              fontSize: "13.5px",
              color: "#7A9BAB",
              lineHeight: 1.6,
              mb: 2.5,
            }}
          >
            Receive inquiries and negotiate terms securely on-platform.
          </Typography>
          <Box
            sx={{
              width: 24,
              height: 3,
              backgroundColor: "#009688",
              borderRadius: "2px",
            }}
          />
        </Grid>

        {/* Step 4 */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Box sx={{ position: "relative", display: "inline-block", mb: 3 }}>
            <Box
              sx={{
                width: 72,
                height: 72,
                borderRadius: "50%",
                backgroundColor: "#EEFAF0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1.38px solid #0135470D",
              }}
            >
              <CheckCircleOutlined sx={{ color: "#10753E", fontSize: 28 }} />
            </Box>
            <Box
              sx={{
                width: 22,
                height: 22,
                borderRadius: "50%",
                backgroundColor: "#10753E",
                color: "#FFFFFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "11px",
                fontWeight: 700,
                position: "absolute",
                top: -2,
                right: -2,
                border: "2px solid #FFFFFF",
              }}
            >
              4
            </Box>
          </Box>
          <Typography
            sx={{
              fontFamily: poppins700.style.fontFamily,
              fontWeight: 700,
              fontSize: "16px",
              color: COLORS.SECONDARY,
              mb: 1.5,
            }}
          >
            Complete the Transfer
          </Typography>
          <Typography
            sx={{
              fontFamily: poppins.style.fontFamily,
              fontWeight: 500,
              fontSize: "13.5px",
              color: "#7A9BAB",
              lineHeight: 1.6,
              mb: 2.5,
            }}
          >
            Finalize via our verified process with full documentation.
          </Typography>
          <Box
            sx={{
              width: 24,
              height: 3,
              backgroundColor: "#10753E",
              borderRadius: "2px",
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default HowItWorks;
