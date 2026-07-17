"use client";

import React, { useState } from "react";
import { 
  Box, 
  Container, 
  Grid, 
  Typography, 
  Stack, 
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from "@mui/material";
import { 
  AttachMoney, 
  Description, 
  Star 
} from "@mui/icons-material";
import AdminSidebar from "@/components/widgets/Sidebar/AdminSidebar";
import MetricCard from "../overview/MetricCard";
import TransactionRow, { TransactionData } from "./TransactionRow";
import { poppins, poppins700 } from "@/utils/fonts";
import { COLORS } from "@/utils/enum";

const initialTransactions: TransactionData[] = [
  {
    id: "1",
    userName: "Ahmad Al-Khalid",
    timestamp: "Today, 10:22 AM",
    type: "Featured Listing",
    amount: "SAR 75",
    method: "Mada",
    status: "Paid"
  },
  {
    id: "2",
    userName: "Sara Al-Mutairi",
    timestamp: "Today, 08:45 AM",
    type: "Standard Listing",
    amount: "SAR 25",
    method: "Apple Pay",
    status: "Paid"
  },
  {
    id: "3",
    userName: "Ahmed Al-Rashidi",
    timestamp: "Yesterday",
    type: "Featured Listing",
    amount: "SAR 75",
    method: "Visa",
    status: "Paid"
  },
  {
    id: "4",
    userName: "Layla Al-Amri",
    timestamp: "Yesterday",
    type: "Standard Listing",
    amount: "SAR 25",
    method: "STC Pay",
    status: "Refunded"
  },
  {
    id: "5",
    userName: "Omar Al-Sayed",
    timestamp: "2 days ago",
    type: "Featured Listing",
    amount: "SAR 75",
    method: "Mada",
    status: "Paid"
  },
  {
    id: "6",
    userName: "Noor Al-Qahtani",
    timestamp: "2 days ago",
    type: "Standard Listing",
    amount: "SAR 25",
    method: "Visa",
    status: "Pending"
  }
];

const RevenueDashboard = () => {
  const [transactions] = useState<TransactionData[]>(initialTransactions);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#F4F7F8" }}>
      {/* Sidebar fixed to the left */}
      <AdminSidebar />

      {/* Main Content Area */}
      <Box 
        sx={{ 
          marginLeft: "276px", 
          flexGrow: 1, 
          display: "flex", 
          flexDirection: "column" 
        }}
      >
        {/* Top Header Panel */}
        <Box 
          sx={{ 
            backgroundColor: COLORS.WHITE, 
            py: 2.5, 
            px: { xs: 3, md: 5 }, 
            borderBottom: "1px solid #0135470F" 
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
            Revenue
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

        {/* Revenue Content Panel */}
        <Container 
          maxWidth="xl" 
          sx={{ 
            py: 4, 
            px: { xs: 3, md: 5 },
            flexGrow: 1 
          }}
        >
          {/* Header Row */}
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
              Revenue & Payments
            </Typography>
            <Typography
              sx={{
                fontFamily: poppins.style.fontFamily,
                fontWeight: 500,
                fontSize: "14px",
                color: "#7A9BAB",
              }}
            >
              Listing fees and platform revenue Phase 1
            </Typography>
          </Box>

          {/* Section 1: KPI Cards */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid size={{ xs: 12, md: 4 }}>
              <MetricCard
                value="SAR 250"
                label="Revenue This Month"
                subLabel="4 paid transactions"
                icon={<AttachMoney sx={{ fontSize: 24 }} />}
                iconBgColor="#FFF8E1"
                iconColor="#E65100"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <MetricCard
                value="SAR 25"
                label="Standard Listings"
                subLabel="3 listings at SAR 25"
                icon={<Description sx={{ fontSize: 24 }} />}
                iconBgColor="#EBF3FE"
                iconColor="#166CA9"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <MetricCard
                value="SAR 225"
                label="Featured Listings"
                subLabel="3 listings at SAR 75"
                icon={<Star sx={{ fontSize: 24 }} />}
                iconBgColor="#F5EBFB"
                iconColor="#8A3FFC"
              />
            </Grid>
          </Grid>

          {/* Section 2: Listing Costs settings / display */}
          <Grid container spacing={3} sx={{ mb: 6 }}>
            {/* Standard Cost Card */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: "24px",
                  border: "1px solid rgba(22, 108, 170, 0.25)",
                  backgroundColor: COLORS.WHITE,
                  display: "flex",
                  alignItems: "center",
                  gap: 3
                }}
              >
                <Box
                  sx={{
                    width: 52,
                    height: 52,
                    borderRadius: "50%",
                    backgroundColor: "rgba(22, 108, 170, 0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#166CA9",
                    fontFamily: poppins700.style.fontFamily,
                    fontWeight: 700,
                    fontSize: "20px"
                  }}
                >
                  $
                </Box>
                <Box>
                  <Typography
                    sx={{
                      fontFamily: poppins700.style.fontFamily,
                      fontWeight: 700,
                      fontSize: "16px",
                      color: COLORS.SECONDARY,
                      mb: 0.5
                    }}
                  >
                    Standard Listing
                  </Typography>
                  <Stack direction="row" spacing={1} sx={{ alignItems: "baseline", mb: 0.5 }}>
                    <Typography
                      sx={{
                        fontFamily: poppins700.style.fontFamily,
                        fontWeight: 800,
                        fontSize: "22px",
                        color: "#166CA9"
                      }}
                    >
                      SAR 25
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: poppins.style.fontFamily,
                        fontWeight: 500,
                        fontSize: "15px",
                        color: "#7A9BAB",
                        textDecoration: "line-through"
                      }}
                    >
                      30
                    </Typography>
                  </Stack>
                  <Typography
                    sx={{
                      fontFamily: poppins.style.fontFamily,
                      fontWeight: 500,
                      fontSize: "12px",
                      color: "#7A9BAB"
                    }}
                  >
                    Appears in regular search results. 90–day active period.
                  </Typography>
                </Box>
              </Paper>
            </Grid>

            {/* Featured Cost Card */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: "24px",
                  border: "1px solid rgba(138, 63, 252, 0.25)",
                  backgroundColor: COLORS.WHITE,
                  display: "flex",
                  alignItems: "center",
                  gap: 3
                }}
              >
                <Box
                  sx={{
                    width: 52,
                    height: 52,
                    borderRadius: "50%",
                    backgroundColor: "rgba(138, 63, 252, 0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#8A3FFC",
                    fontFamily: poppins700.style.fontFamily,
                    fontWeight: 700,
                    fontSize: "20px"
                  }}
                >
                  $
                </Box>
                <Box>
                  <Typography
                    sx={{
                      fontFamily: poppins700.style.fontFamily,
                      fontWeight: 700,
                      fontSize: "16px",
                      color: COLORS.SECONDARY,
                      mb: 0.5
                    }}
                  >
                    Featured Listing
                  </Typography>
                  <Stack direction="row" spacing={1} sx={{ alignItems: "baseline", mb: 0.5 }}>
                    <Typography
                      sx={{
                        fontFamily: poppins700.style.fontFamily,
                        fontWeight: 800,
                        fontSize: "22px",
                        color: "#8A3FFC"
                      }}
                    >
                      SAR 75
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: poppins.style.fontFamily,
                        fontWeight: 500,
                        fontSize: "15px",
                        color: "#7A9BAB",
                        textDecoration: "line-through"
                      }}
                    >
                      100
                    </Typography>
                  </Stack>
                  <Typography
                    sx={{
                      fontFamily: poppins.style.fontFamily,
                      fontWeight: 500,
                      fontSize: "12px",
                      color: "#7A9BAB"
                    }}
                  >
                    Pinned at top with premium badge. 180–day active period.
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>

          {/* Section 3: Recent Transactions Table */}
          <Box>
            <Typography
              sx={{
                fontFamily: poppins700.style.fontFamily,
                fontWeight: 800,
                fontSize: "20px",
                color: COLORS.SECONDARY,
                mb: 3
              }}
            >
              Recent Transactions
            </Typography>

            <TableContainer 
              component={Paper} 
              elevation={0}
              sx={{ 
                borderRadius: "24px",
                border: "1px solid #0135470F",
                overflow: "hidden",
                backgroundColor: COLORS.WHITE
              }}
            >
              <Table aria-label="recent transactions table">
                <TableHead sx={{ backgroundColor: "rgba(1, 53, 71, 0.02)" }}>
                  <TableRow>
                    <TableCell sx={{ 
                      fontFamily: poppins700.style.fontFamily, 
                      fontWeight: 700, 
                      fontSize: "12px", 
                      color: "#7A9BAB",
                      letterSpacing: "0.5px",
                      py: 2.5
                    }}>
                      USER
                    </TableCell>
                    <TableCell sx={{ 
                      fontFamily: poppins700.style.fontFamily, 
                      fontWeight: 700, 
                      fontSize: "12px", 
                      color: "#7A9BAB",
                      letterSpacing: "0.5px",
                      py: 2.5
                    }}>
                      TYPE
                    </TableCell>
                    <TableCell sx={{ 
                      fontFamily: poppins700.style.fontFamily, 
                      fontWeight: 700, 
                      fontSize: "12px", 
                      color: "#7A9BAB",
                      letterSpacing: "0.5px",
                      py: 2.5
                    }}>
                      AMOUNT
                    </TableCell>
                    <TableCell sx={{ 
                      fontFamily: poppins700.style.fontFamily, 
                      fontWeight: 700, 
                      fontSize: "12px", 
                      color: "#7A9BAB",
                      letterSpacing: "0.5px",
                      py: 2.5
                    }}>
                      METHOD
                    </TableCell>
                    <TableCell sx={{ 
                      fontFamily: poppins700.style.fontFamily, 
                      fontWeight: 700, 
                      fontSize: "12px", 
                      color: "#7A9BAB",
                      letterSpacing: "0.5px",
                      py: 2.5
                    }}>
                      STATUS
                    </TableCell>
                  </TableRow>
                </TableHead>
                
                <TableBody>
                  {transactions.map((tx) => (
                    <TransactionRow key={tx.id} tx={tx} />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default RevenueDashboard;
