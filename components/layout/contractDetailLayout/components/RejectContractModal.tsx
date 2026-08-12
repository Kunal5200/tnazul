"use client";

import React, { useState } from "react";
import { Box, Stack, Typography, TextField, Button } from "@mui/material";
import { poppins700 } from "@/utils/fonts";
import { COLORS } from "@/utils/enum";
import { useModal } from "@/store/useModal";

export const RejectContractModalContent = ({ onSubmit }: { onSubmit: (reason: string) => void }) => {
  const { hideModal } = useModal();
  const [reason, setReason] = useState("");

  return (
    <Box>
      <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h6" sx={{ fontFamily: poppins700.style.fontFamily, color: "#1E1E1E" }}>
          Reject Contract
        </Typography>
      </Stack>
      <Typography variant="body2" sx={{ mb: 3, color: "#737373" }}>
        Please provide a reason for rejecting this contract. This will be shared with the relevant parties.
      </Typography>
      <TextField
        fullWidth
        multiline
        rows={4}
        variant="outlined"
        placeholder="Enter rejection reason here..."
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        sx={{ 
          mb: 4,
          "& .MuiOutlinedInput-root": {
            borderRadius: "12px",
          }
        }}
      />
      <Stack direction="row" spacing={2} sx={{ justifyContent: "flex-end" }}>
        <Button
          variant="outlined"
          onClick={() => hideModal()}
          sx={{ 
            borderRadius: "100px", 
            textTransform: "none", 
            px: 4,
            borderColor: "#E5E7EB",
            color: "#1E1E1E",
            "&:hover": {
              borderColor: "#1E1E1E",
              backgroundColor: "transparent"
            }
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={() => onSubmit(reason)}
          disabled={!reason.trim()}
          sx={{
            borderRadius: "100px",
            backgroundColor: "#E53935",
            color: COLORS.WHITE,
            textTransform: "none",
            px: 4,
            boxShadow: "none",
            "&:hover": { backgroundColor: "#c62828", boxShadow: "none" },
            "&:disabled": { backgroundColor: "#ffcdd2", color: "#fff" },
          }}
        >
          Confirm Reject
        </Button>
      </Stack>
    </Box>
  );
};
