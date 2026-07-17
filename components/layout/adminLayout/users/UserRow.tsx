"use client";

import React from "react";
import {
  TableRow,
  TableCell,
  Avatar,
  Typography,
  Stack,
  Chip,
  Button,
  Box,
} from "@mui/material";
import { Block, Check, Cached, WarningAmber } from "@mui/icons-material";
import { poppins, poppins700 } from "@/utils/fonts";
import { COLORS } from "@/utils/enum";

export interface UserData {
  id: string;
  name: string;
  joinDate: string;
  initials: string;
  phone: string;
  email: string;
  status: "Verified" | "Pending ID" | "Suspended";
  listingsCount: number;
  reportsCount?: number;
}

interface UserRowProps {
  user: UserData;
  onVerify: (id: string) => void;
  onSuspend: (id: string) => void;
  onReinstate: (id: string) => void;
}

const UserRow = ({ user, onVerify, onSuspend, onReinstate }: UserRowProps) => {
  // Status pill config
  const getStatusChip = (status: UserData["status"]) => {
    switch (status) {
      case "Verified":
        return (
          <Chip
            label="Verified"
            size="small"
            sx={{
              backgroundColor: "rgba(46, 125, 50, 0.1)",
              color: "#2E7D32",
              fontFamily: poppins700.style.fontFamily,
              fontWeight: 700,
              fontSize: "12px",
              borderRadius: "6px",
            }}
          />
        );
      case "Pending ID":
        return (
          <Chip
            label="Pending ID"
            size="small"
            sx={{
              backgroundColor: "rgba(231, 186, 73, 0.1)",
              color: "#E78B49",
              fontFamily: poppins700.style.fontFamily,
              fontWeight: 700,
              fontSize: "12px",
              borderRadius: "6px",
            }}
          />
        );
      case "Suspended":
        return (
          <Stack spacing={0.5} sx={{ alignItems: "flex-start" }}>
            <Chip
              label="Suspended"
              size="small"
              sx={{
                backgroundColor: "rgba(211, 47, 47, 0.1)",
                color: "#D32F2F",
                fontFamily: poppins700.style.fontFamily,
                fontWeight: 700,
                fontSize: "12px",
                borderRadius: "6px",
              }}
            />
            {user.reportsCount && user.reportsCount > 0 ? (
              <Stack
                direction="row"
                spacing={0.5}
                sx={{ alignItems: "center", color: "#D32F2F" }}
              >
                <WarningAmber sx={{ fontSize: 13 }} />
                <Typography
                  sx={{
                    fontFamily: poppins.style.fontFamily,
                    fontSize: "11px",
                    fontWeight: 600,
                  }}
                >
                  {user.reportsCount} reports
                </Typography>
              </Stack>
            ) : null}
          </Stack>
        );
    }
  };

  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      {/* Col 1: USER */}
      <TableCell sx={{ py: 2 }}>
        <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
          <Avatar
            sx={{
              backgroundColor: COLORS.SECONDARY,
              color: COLORS.WHITE,
              width: 44,
              height: 44,
              fontFamily: poppins700.style.fontFamily,
              fontWeight: 700,
              fontSize: "15px",
            }}
          >
            {user.initials}
          </Avatar>
          <Box>
            <Typography
              sx={{
                fontFamily: poppins700.style.fontFamily,
                fontWeight: 700,
                fontSize: "15px",
                color: COLORS.SECONDARY,
              }}
            >
              {user.name}
            </Typography>
            <Typography
              sx={{
                fontFamily: poppins.style.fontFamily,
                fontWeight: 500,
                fontSize: "12px",
                color: "#7A9BAB",
              }}
            >
              Since {user.joinDate}
            </Typography>
          </Box>
        </Stack>
      </TableCell>

      {/* Col 2: CONTACT */}
      <TableCell sx={{ py: 2 }}>
        <Typography
          sx={{
            fontFamily: poppins.style.fontFamily,
            fontWeight: 500,
            fontSize: "14px",
            color: COLORS.SECONDARY,
          }}
        >
          {user.phone}
        </Typography>
        <Typography
          sx={{
            fontFamily: poppins.style.fontFamily,
            fontWeight: 500,
            fontSize: "13px",
            color: "#7A9BAB",
          }}
        >
          {user.email}
        </Typography>
      </TableCell>

      {/* Col 3: STATUS */}
      <TableCell sx={{ py: 2 }}>{getStatusChip(user.status)}</TableCell>

      {/* Col 4: LISTINGS */}
      <TableCell sx={{ py: 2 }}>
        <Typography
          sx={{
            fontFamily: poppins700.style.fontFamily,
            fontWeight: 700,
            fontSize: "15px",
            color: COLORS.SECONDARY,
            pl: 2,
          }}
        >
          {user.listingsCount}
        </Typography>
      </TableCell>

      {/* Col 5: ACTIONS */}
      <TableCell sx={{ py: 2 }}>
        <Stack direction="row" spacing={1}>
          {/* Render Verify button only if pending ID */}
          {user.status === "Pending ID" && (
            <Button
              variant="outlined"
              size="small"
              startIcon={<Check sx={{ fontSize: 16 }} />}
              onClick={() => onVerify(user.id)}
              sx={{
                borderColor: "rgba(46, 125, 50, 0.4)",
                color: "#2E7D32",
                backgroundColor: "rgba(46, 125, 50, 0.02)",
                borderRadius: "100px",
                textTransform: "none",
                fontFamily: poppins700.style.fontFamily,
                fontWeight: 700,
                fontSize: "13px",
                py: 0.6,
                px: 2,
                "&:hover": {
                  borderColor: "#2E7D32",
                  backgroundColor: "rgba(46, 125, 50, 0.08)",
                },
              }}
            >
              Verify
            </Button>
          )}

          {/* Render Suspend button if not suspended */}
          {user.status !== "Suspended" ? (
            <Button
              variant="outlined"
              size="small"
              startIcon={<Block sx={{ fontSize: 16 }} />}
              onClick={() => onSuspend(user.id)}
              sx={{
                borderColor: "rgba(211, 47, 47, 0.3)",
                color: "#D32F2F",
                backgroundColor: "rgba(211, 47, 47, 0.02)",
                borderRadius: "100px",
                textTransform: "none",
                fontFamily: poppins700.style.fontFamily,
                fontWeight: 700,
                fontSize: "13px",
                py: 0.6,
                px: 2,
                "&:hover": {
                  borderColor: "#D32F2F",
                  backgroundColor: "rgba(211, 47, 47, 0.08)",
                },
              }}
            >
              Suspend
            </Button>
          ) : (
            // Render Reinstate button if suspended
            <Button
              variant="outlined"
              size="small"
              startIcon={<Cached sx={{ fontSize: 16 }} />}
              onClick={() => onReinstate(user.id)}
              sx={{
                borderColor: "rgba(46, 125, 50, 0.4)",
                color: "#2E7D32",
                backgroundColor: "rgba(46, 125, 50, 0.02)",
                borderRadius: "100px",
                textTransform: "none",
                fontFamily: poppins700.style.fontFamily,
                fontWeight: 700,
                fontSize: "13px",
                py: 0.6,
                px: 2,
                "&:hover": {
                  borderColor: "#2E7D32",
                  backgroundColor: "rgba(46, 125, 50, 0.08)",
                },
              }}
            >
              Reinstate
            </Button>
          )}
        </Stack>
      </TableCell>
    </TableRow>
  );
};

export default UserRow;
