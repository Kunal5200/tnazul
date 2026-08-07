import { create } from "zustand";

export type SnackbarSeverity = "success" | "error" | "info" | "warning";

export interface SnackbarOptions {
  message: string;
  severity?: SnackbarSeverity;
  autoHideDuration?: number;
  vertical?: "top" | "bottom";
  horizontal?: "left" | "center" | "right";
}

export interface SnackbarState {
  open: boolean;
  message: string;
  severity: SnackbarSeverity;
  autoHideDuration: number;
  vertical: "top" | "bottom";
  horizontal: "left" | "center" | "right";

  openSnackbar: (
    messageOrOptions: string | SnackbarOptions,
    severity?: SnackbarSeverity,
    autoHideDuration?: number,
  ) => void;
  hideSnackbar: () => void;
  closeSnackbar: () => void;
  showSuccess: (message: string, autoHideDuration?: number) => void;
  showError: (message: string, autoHideDuration?: number) => void;
  showInfo: (message: string, autoHideDuration?: number) => void;
  showWarning: (message: string, autoHideDuration?: number) => void;
}

export const useSnackbarStore = create<SnackbarState>((set) => ({
  open: false,
  message: "",
  severity: "success",
  autoHideDuration: 4000,
  vertical: "bottom",
  horizontal: "right",

  openSnackbar: (
    messageOrOptions: string | SnackbarOptions,
    severity: SnackbarSeverity = "success",
    autoHideDuration: number = 4000,
  ) => {
    if (typeof messageOrOptions === "object" && messageOrOptions !== null) {
      set({
        open: true,
        message: messageOrOptions.message || "",
        severity: messageOrOptions.severity || "success",
        autoHideDuration: messageOrOptions.autoHideDuration ?? 4000,
        vertical: messageOrOptions.vertical || "bottom",
        horizontal: messageOrOptions.horizontal || "right",
      });
    } else {
      set({
        open: true,
        message: messageOrOptions,
        severity: severity,
        autoHideDuration: autoHideDuration,
      });
    }
  },

  hideSnackbar: () => {
    set((state) => ({
      ...state,
      open: false,
    }));
  },

  closeSnackbar: () => {
    set((state) => ({
      ...state,
      open: false,
    }));
  },

  showSuccess: (message: string, autoHideDuration = 4000) => {
    set({
      open: true,
      message,
      severity: "success",
      autoHideDuration,
    });
  },

  showError: (message: string, autoHideDuration = 4000) => {
    set({
      open: true,
      message,
      severity: "error",
      autoHideDuration,
    });
  },

  showInfo: (message: string, autoHideDuration = 4000) => {
    set({
      open: true,
      message,
      severity: "info",
      autoHideDuration,
    });
  },

  showWarning: (message: string, autoHideDuration = 4000) => {
    set({
      open: true,
      message,
      severity: "warning",
      autoHideDuration,
    });
  },
}));
