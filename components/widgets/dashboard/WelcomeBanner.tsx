import { Box, Chip, Button, Typography } from "@mui/material";
import React from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import banner from "@/banner_login/welcome_banner.png";
import { COLORS } from "@/utils/enum";
import Link from "next/link";

const WelcomeBanner = () => {
  return (
    <Box>
      <Box
        sx={{
          backgroundImage: `url(${banner.src})`,
          minHeight: "400px",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          backgroundPosition: "center",
          backgroundSize: "cover",
          borderRadius: "35px",
        }}
      >
        <Box sx={{ px: 4 }}>
          <Chip
            label="عقدك ... فرصة لغيرك"
            variant="outlined"
            sx={{
              backgroundColor: "rgba(231, 186, 73, 0.15)",
              borderColor: "rgba(231, 186, 73, 0.3)",
              color: COLORS.PRIMARY,
              fontSize: 16,
              fontWeight: 600,
              lineHeight: "22.78px",
              letterSpacing: "0.69px",
              height: "auto",
              py: 0.8,
              px: 1.5,
              mb: 3,
              borderRadius: "100px",
              "& .MuiChip-label": {
                px: 0,
              },
            }}
          />

          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "36px", sm: "44px", md: "52px" },
              fontWeight: 800,
              color: "#ffffff",
              lineHeight: { xs: 1.2, md: 1.15 },
              mb: 2,
              letterSpacing: "-0.5px",
              "& span": {
                color: COLORS.PRIMARY,
              },
            }}
          >
            Find. <span>Transfer.</span> Benefit.
          </Typography>

          <Typography
            sx={{
              fontSize: { xs: "14px", sm: "15px", md: "16px" },
              fontWeight: 400,
              lineHeight: 1.6,
              color: "rgba(255, 255, 255, 0.7)",
              mb: 4,
            }}
          >
            Tnazul safely links contract owners with opportunity seekers.
            <br />
            Modern, verified, and trusted across Saudi Arabia.
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: 2,
              flexDirection: { xs: "column", sm: "row" },
              width: { xs: "100%", sm: "auto" },
            }}
          >
            <Link href="/dashboard/marketplace" passHref>
              <Button
                variant="contained"
                endIcon={
                  <ArrowForwardIcon sx={{ fontSize: "18px !important" }} />
                }
                sx={{
                  backgroundColor: COLORS.PRIMARY,
                  color: "#013547", // Matching the dark teal theme color
                  borderRadius: "15px",
                  textTransform: "none",
                  fontSize: "16px",
                  fontWeight: 700,
                  px: 4,
                  py: 1.6,
                  boxShadow: "none",
                  "& .MuiButton-endIcon": {
                    marginLeft: "8px",
                  },
                  "&:hover": {
                    backgroundColor: "#D6A838",
                    boxShadow: "none",
                  },
                }}
              >
                Explore Contracts
              </Button>
            </Link>

            <Link href="/dashboard/contracts/create" passHref>
              <Button
                variant="outlined"
                sx={{
                  borderColor: "rgba(255, 255, 255, 0.2)",
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  color: "#ffffff",
                  borderRadius: "15px",
                  textTransform: "none",
                  fontSize: "16px",
                  fontWeight: 700,
                  px: 4,
                  py: 1.6,
                  borderWidth: "1.5px",
                  "&:hover": {
                    borderColor: "rgba(255, 255, 255, 0.4)",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    borderWidth: "1.5px",
                  },
                }}
              >
                Add New Contract
              </Button>
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default WelcomeBanner;
