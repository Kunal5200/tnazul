"use client";

import React from "react";
import { Box, Container, Grid, Typography, Stack } from "@mui/material";
import {
  People,
  Shield,
  Description,
  AccessTime,
  AttachMoney,
  Warning,
} from "@mui/icons-material";
import AdminSidebar from "@/components/widgets/Sidebar/AdminSidebar";
import MetricCard from "./MetricCard";
import AttentionItem from "./AttentionItem";
import { poppins, poppins700 } from "@/utils/fonts";
import { COLORS } from "@/utils/enum";

const AdminDashboard = () => {
  return (
    <Box
      sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#F4F7F8" }}
    >
      {/* Sidebar fixed to the left */}
      <AdminSidebar />

      {/* Main Content Area */}
      <Box
        sx={{
          marginLeft: "276px",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Top Header Panel (Matches the white bar in Figma) */}
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
            Overview
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

        {/* Dashboard Body Panel */}
        <Container
          maxWidth="xl"
          sx={{
            py: 4,
            px: { xs: 3, md: 5 },
            flexGrow: 1,
          }}
        >
          {/* Section 1: Platform Overview Title */}
          <Box sx={{ mb: 4 }}>
            <Typography
              sx={{
                fontFamily: poppins700.style.fontFamily,
                fontWeight: 800,
                fontSize: "22px",
                color: COLORS.SECONDARY,
                mb: 0.5,
              }}
            >
              Platform Overview
            </Typography>
            <Typography
              sx={{
                fontFamily: poppins.style.fontFamily,
                fontWeight: 500,
                fontSize: "14px",
                color: "#7A9BAB",
              }}
            >
              Real-time snapshot of Tnazul's key metrics.
            </Typography>
          </Box>

          {/* Section 2: Metrics Grid */}
          <Grid container spacing={3} sx={{ mb: 6 }}>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <MetricCard
                value="1,284"
                label="Total Users"
                subLabel="+23 this week"
                icon={<People sx={{ fontSize: 24 }} />}
                iconBgColor="#EBF3FE"
                iconColor="#166CA9"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <MetricCard
                value="987"
                label="Verified Users"
                subLabel="76% of total"
                icon={<Shield sx={{ fontSize: 24 }} />}
                iconBgColor="#EBF8F2"
                iconColor="#2E7D32"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <MetricCard
                value="412"
                label="Active Listings"
                subLabel="38 added today"
                icon={<Description sx={{ fontSize: 24 }} />}
                iconBgColor="#F0F4F8"
                iconColor="#475569"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <MetricCard
                value="14"
                label="Pending Approval"
                subLabel="Needs action"
                subLabelColor="#E78B49"
                icon={<AccessTime sx={{ fontSize: 24 }} />}
                iconBgColor="#FFF8E1"
                iconColor="#E65100"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <MetricCard
                value="SAR 18,450"
                label="Total Revenue"
                subLabel="This month"
                icon={<AttachMoney sx={{ fontSize: 24 }} />}
                iconBgColor="#FFFDE7"
                iconColor="#F57F17"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <MetricCard
                value="6"
                label="Open Reports"
                subLabel="3 urgent"
                subLabelColor="#FF4D4D"
                icon={<Warning sx={{ fontSize: 24 }} />}
                iconBgColor="#FFEBEE"
                iconColor="#C62828"
              />
            </Grid>
          </Grid>

          {/* Section 3: Needs Immediate Attention */}
          <Box>
            <Typography
              sx={{
                fontFamily: poppins700.style.fontFamily,
                fontWeight: 800,
                fontSize: "20px",
                color: COLORS.SECONDARY,
                mb: 3,
              }}
            >
              Needs Immediate Attention
            </Typography>

            <Stack spacing={2.5}>
              <AttentionItem
                id="1"
                title="5BR Villa - Diplomatic Quarter"
                subtext="Ahmad Al-Khalid · 2 hours ago"
                imageUrl="https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=300&auto=format&fit=crop"
                status="Awaiting Review"
              />
              <AttentionItem
                id="2"
                title="BMW 530i 2023 - Full Lease Transfer"
                subtext="Sara Al-Mutairi · 4 hours ago"
                imageUrl="https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=300&auto=format&fit=crop"
                status="Awaiting Review"
              />
            </Stack>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
