"use client";

import React from "react";
import { 
  TableRow, 
  TableCell, 
  Typography, 
  Stack, 
  Chip, 
  Box 
} from "@mui/material";
import { poppins, poppins700 } from "@/utils/fonts";
import { COLORS } from "@/utils/enum";

export interface TransactionData {
  id: string;
  userName: string;
  timestamp: string;
  type: string;
  amount: string;
  method: string;
  status: "Paid" | "Refunded" | "Pending";
}

interface TransactionRowProps {
  tx: TransactionData;
}

const TransactionRow = ({ tx }: TransactionRowProps) => {
  // Status pill config
  const getStatusChip = (status: TransactionData["status"]) => {
    switch (status) {
      case "Paid":
        return (
          <Chip
            label="Paid"
            size="small"
            sx={{
              backgroundColor: "rgba(46, 125, 50, 0.1)",
              color: "#2E7D32",
              fontFamily: poppins700.style.fontFamily,
              fontWeight: 700,
              fontSize: "12px",
              borderRadius: "6px",
              px: 0.5
            }}
          />
        );
      case "Refunded":
        return (
          <Chip
            label="Refunded"
            size="small"
            sx={{
              backgroundColor: "rgba(231, 110, 34, 0.1)",
              color: "#E67E22",
              fontFamily: poppins700.style.fontFamily,
              fontWeight: 700,
              fontSize: "12px",
              borderRadius: "6px",
              px: 0.5
            }}
          />
        );
      case "Pending":
        return (
          <Chip
            label="Pending"
            size="small"
            sx={{
              backgroundColor: "rgba(122, 155, 171, 0.1)",
              color: "#7A9BAB",
              fontFamily: poppins700.style.fontFamily,
              fontWeight: 700,
              fontSize: "12px",
              borderRadius: "6px",
              px: 0.5
            }}
          />
        );
    }
  };

  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      {/* Col 1: USER */}
      <TableCell sx={{ py: 2.5 }}>
        <Box>
          <Typography
            sx={{
              fontFamily: poppins700.style.fontFamily,
              fontWeight: 700,
              fontSize: "15px",
              color: COLORS.SECONDARY,
            }}
          >
            {tx.userName}
          </Typography>
          <Typography
            sx={{
              fontFamily: poppins.style.fontFamily,
              fontWeight: 500,
              fontSize: "12px",
              color: "#7A9BAB",
            }}
          >
            {tx.timestamp}
          </Typography>
        </Box>
      </TableCell>

      {/* Col 2: TYPE */}
      <TableCell sx={{ py: 2.5 }}>
        <Typography
          sx={{
            fontFamily: poppins.style.fontFamily,
            fontWeight: 500,
            fontSize: "14px",
            color: "#5A7A8A",
          }}
        >
          {tx.type}
        </Typography>
      </TableCell>

      {/* Col 3: AMOUNT */}
      <TableCell sx={{ py: 2.5 }}>
        <Typography
          sx={{
            fontFamily: poppins700.style.fontFamily,
            fontWeight: 700,
            fontSize: "15px",
            color: COLORS.SECONDARY,
          }}
        >
          {tx.amount}
        </Typography>
      </TableCell>

      {/* Col 4: METHOD */}
      <TableCell sx={{ py: 2.5 }}>
        <Typography
          sx={{
            fontFamily: poppins.style.fontFamily,
            fontWeight: 500,
            fontSize: "14px",
            color: "#7A9BAB",
          }}
        >
          {tx.method}
        </Typography>
      </TableCell>

      {/* Col 5: STATUS */}
      <TableCell sx={{ py: 2.5 }}>
        {getStatusChip(tx.status)}
      </TableCell>
    </TableRow>
  );
};

export default TransactionRow;
