import React from "react";
import { Box, Typography, Grid, Stack } from "@mui/material";
import {
  VerifiedUserOutlined,
  Autorenew,
  LockOutlined,
  Language,
} from "@mui/icons-material";
import { COLORS } from "@/utils/enum";
import { poppins, poppins700 } from "@/utils/fonts";

const TrustAndSecurity = () => {
  return (
    <Box>
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
        Trust & Security
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
        We've built a foundation of trust.
      </Typography>

      <Grid container spacing={3.5}>
        {/* Card 1: Nafath Verified */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Box
            sx={{
              backgroundColor: "#FFFFFF",
              borderRadius: "24px",
              border: "1.38px solid #0135470D",
              boxShadow: "0px 4px 20px rgba(1, 53, 71, 0.02)",
              p: 3.5,
              height: 320,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{
                fontFamily: poppins700.style.fontFamily,
                fontWeight: 800,
                fontSize: "56px",
                color: "#0135470D",
                lineHeight: 1,
              }}
            >
              01.
            </Typography>
            <Stack spacing={1.5}>
              <Box
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: "12px",
                  backgroundColor: "#EEFAF0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <VerifiedUserOutlined sx={{ color: "#10753E", fontSize: 22 }} />
              </Box>
              <Typography
                sx={{
                  fontFamily: poppins700.style.fontFamily,
                  fontWeight: 700,
                  fontSize: "18px",
                  color: COLORS.SECONDARY,
                }}
              >
                Nafath Verified
              </Typography>
            </Stack>
          </Box>
        </Grid>

        {/* Card 2: Vetted Listings */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Box
            sx={{
              backgroundColor: "#FFFFFF",
              borderRadius: "24px",
              border: "1.38px solid #0135470D",
              boxShadow: "0px 4px 20px rgba(1, 53, 71, 0.02)",
              p: 3,
              height: 320,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                height: 124,
                width: "calc(100% + 48px)",
                margin: "-24px -24px 0 -24px",
                position: "relative",
                background:
                  "linear-gradient(135deg, #013547 0%, #166CA9 50%, #E7BA49 100%)",
                overflow: "hidden",
              }}
            >
              <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  opacity: 0.25,
                }}
              >
                <path
                  d="M0,45 C30,75 70,25 100,45 L100,100 L0,100 Z"
                  fill="#FFFFFF"
                />
                <path
                  d="M0,55 C35,35 65,75 100,55 L100,100 L0,100 Z"
                  fill="#FFFFFF"
                />
              </svg>
            </Box>

            <Stack spacing={1} sx={{ mt: 1 }}>
              <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: "10px",
                    backgroundColor: "#F4F7F8",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Autorenew sx={{ color: COLORS.SECONDARY, fontSize: 18 }} />
                </Box>
                <Typography
                  sx={{
                    fontFamily: poppins700.style.fontFamily,
                    fontWeight: 700,
                    fontSize: "17px",
                    color: COLORS.SECONDARY,
                  }}
                >
                  Vetted Listings
                </Typography>
              </Stack>
              <Typography
                sx={{
                  fontFamily: poppins.style.fontFamily,
                  fontWeight: 500,
                  fontSize: "12px",
                  color: "#7A9BAB",
                  lineHeight: 1.5,
                }}
              >
                Each contract listing is manually reviewed and approved by our
                team before publishing.
              </Typography>
            </Stack>
          </Box>
        </Grid>

        {/* Card 3: Data Protection */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Box
            sx={{
              backgroundColor: "#FFFFFF",
              borderRadius: "24px",
              border: "1.38px solid #0135470D",
              boxShadow: "0px 4px 20px rgba(1, 53, 71, 0.02)",
              p: 3.5,
              height: 320,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{
                fontFamily: poppins700.style.fontFamily,
                fontWeight: 800,
                fontSize: "56px",
                color: "#0135470D",
                lineHeight: 1,
              }}
            >
              03.
            </Typography>
            <Stack spacing={1.5}>
              <Box
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: "12px",
                  backgroundColor: "#F4F7F8",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <LockOutlined sx={{ color: COLORS.SECONDARY, fontSize: 22 }} />
              </Box>
              <Typography
                sx={{
                  fontFamily: poppins700.style.fontFamily,
                  fontWeight: 700,
                  fontSize: "18px",
                  color: COLORS.SECONDARY,
                }}
              >
                Data Protection
              </Typography>
            </Stack>
          </Box>
        </Grid>

        {/* Card 4: Arabic Support */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Box
            sx={{
              backgroundColor: "#FFFFFF",
              borderRadius: "24px",
              border: "1.38px solid #0135470D",
              boxShadow: "0px 4px 20px rgba(1, 53, 71, 0.02)",
              p: 3.5,
              height: 320,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{
                fontFamily: poppins700.style.fontFamily,
                fontWeight: 800,
                fontSize: "56px",
                color: "#0135470D",
                lineHeight: 1,
              }}
            >
              04.
            </Typography>
            <Stack spacing={1.5}>
              <Box
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: "12px",
                  backgroundColor: "#F4F7F8",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Language sx={{ color: COLORS.SECONDARY, fontSize: 22 }} />
              </Box>
              <Typography
                sx={{
                  fontFamily: poppins700.style.fontFamily,
                  fontWeight: 700,
                  fontSize: "18px",
                  color: COLORS.SECONDARY,
                }}
              >
                Arabic Support
              </Typography>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TrustAndSecurity;
