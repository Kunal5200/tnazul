"use client";

import React from "react";
import { Snackbar, Alert } from "@mui/material";
import { useSnackbarStore } from "@/store/snackbarStore";

export const GlobalSnackbar: React.FC = () => {
  const {
    open,
    message,
    severity,
    autoHideDuration,
    vertical,
    horizontal,
    hideSnackbar,
  } = useSnackbarStore();

  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={hideSnackbar}
      anchorOrigin={{ vertical, horizontal }}
    >
      <Alert
        onClose={hideSnackbar}
        severity={severity}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default GlobalSnackbar;
