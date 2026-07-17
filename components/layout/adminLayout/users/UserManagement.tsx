"use client";

import React, { useState, useMemo } from "react";
import { 
  Box, 
  Container, 
  Typography, 
  Stack, 
  TextField, 
  InputAdornment,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Snackbar,
  Alert
} from "@mui/material";
import { Search } from "@mui/icons-material";
import AdminSidebar from "@/components/widgets/Sidebar/AdminSidebar";
import UserRow, { UserData } from "./UserRow";
import { poppins, poppins700 } from "@/utils/fonts";
import { COLORS } from "@/utils/enum";

const initialUsers: UserData[] = [
  {
    id: "1",
    name: "Ahmed Al-Rashidi",
    joinDate: "Jan 2024",
    initials: "AA",
    phone: "+966 5X XXX 1111",
    email: "ahmed@email.com",
    status: "Verified",
    listingsCount: 3
  },
  {
    id: "2",
    name: "Sara Al-Otaibi",
    joinDate: "Feb 2024",
    initials: "SO",
    phone: "+966 5X XXX 2222",
    email: "sara@email.com",
    status: "Verified",
    listingsCount: 1
  },
  {
    id: "3",
    name: "Mohammed Hassan",
    joinDate: "Mar 2024",
    initials: "MH",
    phone: "+966 5X XXX 3333",
    email: "mh@email.com",
    status: "Pending ID",
    listingsCount: 0
  },
  {
    id: "4",
    name: "Khalid Al-Mutairi",
    joinDate: "Dec 2023",
    initials: "KM",
    phone: "+966 5X XXX 4444",
    email: "khalid@email.com",
    status: "Suspended",
    listingsCount: 2,
    reportsCount: 3
  },
  {
    id: "5",
    name: "Fatima Al-Zahrani",
    joinDate: "Jan 2024",
    initials: "FZ",
    phone: "+966 5X XXX 5555",
    email: "fatima@email.com",
    status: "Verified",
    listingsCount: 1
  }
];

const UserManagement = () => {
  const [users, setUsers] = useState<UserData[]>(initialUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: "success" | "info" | "warning" | "error" }>({
    open: false,
    message: "",
    severity: "success"
  });

  const handleSnackbarClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  // Actions
  const handleVerify = (id: string) => {
    setUsers((prev) => 
      prev.map((user) => 
        user.id === id ? { ...user, status: "Verified" } : user
      )
    );
    const target = users.find(u => u.id === id);
    setSnackbar({
      open: true,
      message: `User "${target?.name}" has been verified successfully.`,
      severity: "success"
    });
  };

  const handleSuspend = (id: string) => {
    setUsers((prev) => 
      prev.map((user) => 
        user.id === id ? { ...user, status: "Suspended", reportsCount: user.reportsCount || 1 } : user
      )
    );
    const target = users.find(u => u.id === id);
    setSnackbar({
      open: true,
      message: `User "${target?.name}" has been suspended.`,
      severity: "error"
    });
  };

  const handleReinstate = (id: string) => {
    setUsers((prev) => 
      prev.map((user) => 
        user.id === id ? { ...user, status: "Verified", reportsCount: undefined } : user
      )
    );
    const target = users.find(u => u.id === id);
    setSnackbar({
      open: true,
      message: `User "${target?.name}" has been reinstated successfully.`,
      severity: "success"
    });
  };

  // Filtered List
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchName = user.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchPhone = user.phone.includes(searchQuery);
      return matchName || matchPhone;
    });
  }, [users, searchQuery]);

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
            Users
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

        {/* Users Management Panel */}
        <Container 
          maxWidth="xl" 
          sx={{ 
            py: 4, 
            px: { xs: 3, md: 5 },
            flexGrow: 1 
          }}
        >
          {/* Header Row */}
          <Stack 
            direction={{ xs: "column", sm: "row" }} 
            spacing={2} 
            sx={{ 
              alignItems: { xs: "flex-start", sm: "center" }, 
              justifyContent: "space-between",
              mb: 4 
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
                User Management
              </Typography>
              <Typography
                sx={{
                  fontFamily: poppins.style.fontFamily,
                  fontWeight: 500,
                  fontSize: "14px",
                  color: "#7A9BAB",
                }}
              >
                {filteredUsers.length} registered users
              </Typography>
            </Box>

            {/* Search Bar */}
            <TextField
              placeholder="Search by name or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{
                width: { xs: "100%", sm: "320px" },
              }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search sx={{ color: "#7A9BAB", fontSize: 20 }} />
                    </InputAdornment>
                  ),
                  sx: {
                    borderRadius: "100px",
                    fontFamily: poppins.style.fontFamily,
                    fontSize: "14px",
                    backgroundColor: "rgba(1, 53, 71, 0.03)",
                    px: 1.5,
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "transparent",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#0135471A",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: COLORS.SECONDARY,
                    },
                  }
                }
              }}
            />
          </Stack>

          {/* Users Table Card */}
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
            <Table aria-label="user management table">
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
                    CONTACT
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
                  <TableCell sx={{ 
                    fontFamily: poppins700.style.fontFamily, 
                    fontWeight: 700, 
                    fontSize: "12px", 
                    color: "#7A9BAB",
                    letterSpacing: "0.5px",
                    py: 2.5
                  }}>
                    LISTINGS
                  </TableCell>
                  <TableCell sx={{ 
                    fontFamily: poppins700.style.fontFamily, 
                    fontWeight: 700, 
                    fontSize: "12px", 
                    color: "#7A9BAB",
                    letterSpacing: "0.5px",
                    py: 2.5
                  }}>
                    ACTIONS
                  </TableCell>
                </TableRow>
              </TableHead>
              
              <TableBody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <UserRow
                      key={user.id}
                      user={user}
                      onVerify={handleVerify}
                      onSuspend={handleSuspend}
                      onReinstate={handleReinstate}
                    />
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} sx={{ py: 6, textAlign: "center" }}>
                      <Typography sx={{ fontFamily: poppins.style.fontFamily, fontWeight: 500, color: "#7A9BAB" }}>
                        No users found matching your search.
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Box>

      {/* Snackbar alerts */}
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={4000} 
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert 
          onClose={handleSnackbarClose} 
          severity={snackbar.severity} 
          variant="filled"
          sx={{ 
            borderRadius: "12px", 
            fontFamily: poppins.style.fontFamily,
            fontSize: "14px"
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default UserManagement;
