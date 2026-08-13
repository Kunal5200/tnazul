"use client";

import React, { useState, useRef } from "react";
import {
  Box,
  Button,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
  Avatar,
  Snackbar,
  Alert,
  InputAdornment,
  IconButton,
  Switch,
  Dialog,
  CircularProgress,
} from "@mui/material";
import {
  CameraAltOutlined,
  CheckCircle,
  LockOutlined,
  PlaceOutlined,
  LanguageOutlined,
  SaveOutlined,
  ChevronRight,
  ShieldOutlined,
  NotificationsNoneOutlined,
  LogoutOutlined,
  PersonOutlined,
  LocalPhoneOutlined,
  VerifiedOutlined,
  ErrorOutlined,
  Check,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { COLORS } from "@/utils/enum";
import { poppins, poppins700 } from "@/utils/fonts";
import Link from "next/link";
import WhatsAppButton from "@/components/layout/dashboard/contracts/WhatsAppButton";
import { useUserDetail } from "@/hooks/user/useUserDetail";
import { useUpdateProfile } from "@/hooks/user/useUpdateProfile";
import { useUpdatePhoto } from "@/hooks/user/useUpdatePhoto";
import { useChangePassword } from "@/hooks/authentication/changePassword";
import { useDeactivateAccount } from "@/hooks/user/useDeactivateAccount";

interface SettingsLayoutProps {
  activeTab: "edit-profile" | "verification" | "account-settings";
}

const SettingsLayout = ({ activeTab }: SettingsLayoutProps) => {
  const { userData, refetch: refetchUser } = useUserDetail();
  const { updateProfile, loading: updatingProfile } = useUpdateProfile();
  const { updatePhoto, loading: uploadingPhoto } = useUpdatePhoto();
  const { changePassword, loading: updatingPassword } = useChangePassword();
  const { deactivateAccount, loading: deactivatingAccount } = useDeactivateAccount();

  const [deactivateModalOpen, setDeactivateModalOpen] = useState(false);

  const handleConfirmDeactivate = async () => {
    try {
      await deactivateAccount("INACTIVE");
      setDeactivateModalOpen(false);
      setToastMessage("Account deactivated successfully.");
      setToastSeverity("success");
      setToastOpen(true);
      await refetchUser();
    } catch (err: any) {
      setToastMessage(
        err?.response?.data?.message || "Failed to deactivate account."
      );
      setToastSeverity("error");
      setToastOpen(true);
    }
  };

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [cityRegion, setCityRegion] = useState("");
  const [language, setLanguage] = useState<"en" | "ar">("en");
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);

  React.useEffect(() => {
    if (userData) {
      if (userData.name) setFullName(userData.name);
      if (userData.email) setEmail(userData.email);
      if (userData.avatar) setProfilePhoto(userData.avatar);
      if (userData.cityOrRegion) setCityRegion(userData.cityOrRegion);
      if (userData.languagePreference) {
        setLanguage(userData.languagePreference === "Arabic" ? "ar" : "en");
      }
    }
  }, [userData]);

  const getInitials = (name?: string) => {
    if (!name) return "-";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  const [crFileName, setCrFileName] = useState<string | null>(null);
  const [crUploadStatus, setCrUploadStatus] = useState<
    "not_uploaded" | "uploaded"
  >("not_uploaded");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Switches
  const [notifyMessages, setNotifyMessages] = useState(true);
  const [notifyInquiries, setNotifyInquiries] = useState(true);
  const [notifyApprovals, setNotifyApprovals] = useState(true);
  const [notifyExpiry, setNotifyExpiry] = useState(true);

  const [privacyShowPhone, setPrivacyShowPhone] = useState(false);
  const [privacyShowEmail, setPrivacyShowEmail] = useState(true);

  // --- STATUS & TOAST STATE ---
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastSeverity, setToastSeverity] = useState<"success" | "info" | "error">(
    "success",
  );

  // --- REFS ---
  const fileInputRef = useRef<HTMLInputElement>(null);
  const crInputRef = useRef<HTMLInputElement>(null);

  // --- HANDLERS ---
  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setToastMessage("File size exceeds 5MB limit.");
        setToastSeverity("info");
        setToastOpen(true);
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setProfilePhoto(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);

      try {
        const res = await updatePhoto(file);
        console.log("Photo upload response:", res);
        setToastMessage("Profile photo uploaded successfully!");
        setToastSeverity("success");
        setToastOpen(true);
        refetchUser();
      } catch (err: any) {
        console.error("Error uploading photo:", err);
        const msg =
          err?.response?.data?.message ||
          err?.message ||
          "Failed to upload photo.";
        setToastMessage(msg);
        setToastSeverity("info");
        setToastOpen(true);
      }
    }
  };

  const handleCrUploadClick = () => {
    if (crInputRef.current) {
      crInputRef.current.click();
    }
  };

  const handleCrFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setCrFileName(file.name);
      setCrUploadStatus("uploaded");
      setToastMessage("Business Registration (CR) uploaded successfully!");
      setToastSeverity("success");
      setToastOpen(true);
    }
  };

  const handleSaveChanges = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    console.log("Submitting updateProfile payload:", {
      name: fullName,
      cityOrRegion: cityRegion,
      languagePreference: language === "ar" ? "Arabic" : "English",
    });

    try {
      const res = await updateProfile({
        name: fullName,
        cityOrRegion: cityRegion,
        languagePreference: language === "ar" ? "Arabic" : "English",
      });

      console.log("updateProfile success:", res);
      setToastMessage("Profile updated successfully!");
      setToastSeverity("success");
      setToastOpen(true);
      refetchUser();
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (err: any) {
      console.error("updateProfile error:", err);
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to update profile.";
      setToastMessage(msg);
      setToastSeverity("info");
      setToastOpen(true);
    }
  };

  const handleUpdatePassword = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!currentPassword || !newPassword || !confirmPassword) {
      setToastMessage("Please fill in all password fields.");
      setToastSeverity("info");
      setToastOpen(true);
      return;
    }
    if (newPassword !== confirmPassword) {
      setToastMessage("Passwords do not match.");
      setToastSeverity("info");
      setToastOpen(true);
      return;
    }
    try {
      const res = await changePassword({
        oldPassword: currentPassword,
        newPassword: newPassword,
      });
      console.log("changePassword res:", res);
      setToastMessage("Password updated successfully!");
      setToastSeverity("success");
      setToastOpen(true);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      console.error("Error changing password:", err);
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to update password.";
      setToastMessage(msg);
      setToastSeverity("info");
      setToastOpen(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const handleToastClose = () => {
    setToastOpen(false);
  };

  return (
    <Box sx={{ pb: 10, maxWidth: "1200px", margin: "0 auto" }}>
      {/* Hidden file input for Profile Photo */}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        accept="image/png, image/jpeg"
        onChange={handleFileChange}
      />

      {/* Hidden file input for CR Upload */}
      <input
        type="file"
        ref={crInputRef}
        style={{ display: "none" }}
        accept=".pdf, image/png, image/jpeg"
        onChange={handleCrFileChange}
      />

      <Grid container spacing={4.5}>
        {/* Left Column - Profile Summary & Sub-navigation */}
        <Grid
          size={{ xs: 12, md: 4 }}
          sx={{
            position: { xs: "static", md: "sticky" },
            top: "32px",
            alignSelf: "flex-start",
          }}
        >
          <Stack spacing={3}>
            {/* User Overview Card */}
            <Box
              sx={{
                backgroundColor: "#FFFFFF",
                borderRadius: "24px",
                p: 4,
                border: "1px solid #0135470D",
                boxShadow: "0px 4px 20px rgba(1, 53, 71, 0.02)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              {/* Profile Avatar with Hover Camera Upload Badge */}
              <Box
                sx={{ position: "relative", mb: 2.5, cursor: "pointer" }}
                onClick={handleUploadClick}
              >
                <Avatar
                  src={profilePhoto || undefined}
                  sx={{
                    width: 96,
                    height: 96,
                    backgroundColor: COLORS.SECONDARY,
                    fontSize: "32px",
                    fontWeight: 700,
                    fontFamily: poppins700.style.fontFamily,
                    border: "3px solid #FFFFFF",
                    boxShadow: "0px 8px 24px rgba(1, 53, 71, 0.08)",
                  }}
                >
                  {!profilePhoto && getInitials(fullName)}
                </Avatar>
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    right: 4,
                    backgroundColor: COLORS.PRIMARY,
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "2px solid #FFFFFF",
                    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.15)",
                  }}
                >
                  <CameraAltOutlined
                    sx={{ color: COLORS.SECONDARY, fontSize: 15 }}
                  />
                </Box>
              </Box>

              {/* User Info */}
              <Typography
                sx={{
                  fontFamily: poppins700.style.fontFamily,
                  fontWeight: 700,
                  fontSize: "19px",
                  color: COLORS.SECONDARY,
                  mb: 0.75,
                }}
              >
                {fullName || "-"}
              </Typography>

              {/* Verified Member Status */}
              <Stack
                direction="row"
                spacing={0.75}
                sx={{ alignItems: "center", mb: 0.5 }}
              >
                <CheckCircle sx={{ color: "#10753E", fontSize: 16 }} />
                <Typography
                  sx={{
                    fontFamily: poppins.style.fontFamily,
                    fontWeight: 600,
                    fontSize: "12px",
                    color: "#10753E",
                  }}
                >
                  Verified Member
                </Typography>
              </Stack>

              {/* Registration Date */}
              <Typography
                sx={{
                  fontFamily: poppins.style.fontFamily,
                  fontWeight: 500,
                  fontSize: "12px",
                  color: "#7A9BAB",
                }}
              >
                Since January 2024
              </Typography>
            </Box>

            {/* Settings Sub-Navigation */}
            <Box
              sx={{
                backgroundColor: "#FFFFFF",
                borderRadius: "24px",
                p: 2.5,
                border: "1px solid #0135470D",
                boxShadow: "0px 4px 20px rgba(1, 53, 71, 0.02)",
              }}
            >
              <Stack spacing={1}>
                {/* Edit Profile Tab Trigger */}
                <Link
                  href="/dashboard/profile/settings/edit-profile"
                  passHref
                  style={{ textDecoration: "none", width: "100%" }}
                >
                  <Button
                    fullWidth
                    disableElevation
                    sx={{
                      backgroundColor:
                        activeTab === "edit-profile"
                          ? COLORS.SECONDARY
                          : "transparent",
                      color:
                        activeTab === "edit-profile" ? COLORS.WHITE : "#5A7A8A",
                      borderRadius: "100px",
                      py: 1.5,
                      px: 2.5,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      textTransform: "none",
                      minWidth: 0,
                      "&:hover": {
                        backgroundColor:
                          activeTab === "edit-profile" ? "#002432" : "#F4F7F8",
                        color:
                          activeTab === "edit-profile"
                            ? COLORS.WHITE
                            : COLORS.SECONDARY,
                      },
                    }}
                  >
                    <Stack
                      direction="row"
                      spacing={1.75}
                      sx={{ alignItems: "center" }}
                    >
                      <PersonOutlined
                        sx={{
                          color:
                            activeTab === "edit-profile"
                              ? COLORS.WHITE
                              : "#7A9BAB",
                          fontSize: 20,
                        }}
                      />
                      <Typography
                        sx={{
                          fontFamily:
                            activeTab === "edit-profile"
                              ? poppins700.style.fontFamily
                              : poppins.style.fontFamily,
                          fontWeight: activeTab === "edit-profile" ? 700 : 500,
                          fontSize: "14.5px",
                          lineHeight: 1,
                        }}
                      >
                        Edit Profile
                      </Typography>
                    </Stack>
                    {activeTab === "edit-profile" && (
                      <ChevronRight
                        sx={{ color: COLORS.WHITE, fontSize: 18 }}
                      />
                    )}
                  </Button>
                </Link>

                {/* Verification Tab Trigger */}
                <Link
                  href="/dashboard/profile/settings/verification"
                  passHref
                  style={{ textDecoration: "none", width: "100%" }}
                >
                  <Button
                    fullWidth
                    disableElevation
                    sx={{
                      backgroundColor:
                        activeTab === "verification"
                          ? COLORS.SECONDARY
                          : "transparent",
                      color:
                        activeTab === "verification" ? COLORS.WHITE : "#5A7A8A",
                      borderRadius: "100px",
                      py: 1.5,
                      px: 2.5,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      textTransform: "none",
                      minWidth: 0,
                      "&:hover": {
                        backgroundColor:
                          activeTab === "verification" ? "#002432" : "#F4F7F8",
                        color:
                          activeTab === "verification"
                            ? COLORS.WHITE
                            : COLORS.SECONDARY,
                      },
                    }}
                  >
                    <Stack
                      direction="row"
                      spacing={1.75}
                      sx={{ alignItems: "center" }}
                    >
                      <ShieldOutlined
                        sx={{
                          color:
                            activeTab === "verification"
                              ? COLORS.WHITE
                              : "#7A9BAB",
                          fontSize: 20,
                        }}
                      />
                      <Typography
                        sx={{
                          fontFamily:
                            activeTab === "verification"
                              ? poppins700.style.fontFamily
                              : poppins.style.fontFamily,
                          fontWeight: activeTab === "verification" ? 700 : 500,
                          fontSize: "14.5px",
                          lineHeight: 1,
                        }}
                      >
                        Verification
                      </Typography>
                    </Stack>
                    {activeTab === "verification" && (
                      <ChevronRight
                        sx={{ color: COLORS.WHITE, fontSize: 18 }}
                      />
                    )}
                  </Button>
                </Link>

                {/* Account Settings Tab Trigger */}
                <Link
                  href="/dashboard/profile/settings/account-settings"
                  passHref
                  style={{ textDecoration: "none", width: "100%" }}
                >
                  <Button
                    fullWidth
                    disableElevation
                    sx={{
                      backgroundColor:
                        activeTab === "account-settings"
                          ? COLORS.SECONDARY
                          : "transparent",
                      color:
                        activeTab === "account-settings"
                          ? COLORS.WHITE
                          : "#5A7A8A",
                      borderRadius: "100px",
                      py: 1.5,
                      px: 2.5,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      textTransform: "none",
                      minWidth: 0,
                      "&:hover": {
                        backgroundColor:
                          activeTab === "account-settings"
                            ? "#002432"
                            : "#F4F7F8",
                        color:
                          activeTab === "account-settings"
                            ? COLORS.WHITE
                            : COLORS.SECONDARY,
                      },
                    }}
                  >
                    <Stack
                      direction="row"
                      spacing={1.75}
                      sx={{ alignItems: "center" }}
                    >
                      <NotificationsNoneOutlined
                        sx={{
                          color:
                            activeTab === "account-settings"
                              ? COLORS.WHITE
                              : "#7A9BAB",
                          fontSize: 20,
                        }}
                      />
                      <Typography
                        sx={{
                          fontFamily:
                            activeTab === "account-settings"
                              ? poppins700.style.fontFamily
                              : poppins.style.fontFamily,
                          fontWeight:
                            activeTab === "account-settings" ? 700 : 500,
                          fontSize: "14.5px",
                          lineHeight: 1,
                        }}
                      >
                        Account Settings
                      </Typography>
                    </Stack>
                    {activeTab === "account-settings" && (
                      <ChevronRight
                        sx={{ color: COLORS.WHITE, fontSize: 18 }}
                      />
                    )}
                  </Button>
                </Link>

                <Box sx={{ py: 1 }}>
                  <Divider sx={{ borderColor: "#0135470D" }} />
                </Box>

                {/* Logout Action Button */}
                <Button
                  fullWidth
                  disableElevation
                  onClick={handleLogout}
                  sx={{
                    backgroundColor: "transparent",
                    color: "#FF5C5C",
                    borderRadius: "100px",
                    py: 1.5,
                    px: 2.5,
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    textTransform: "none",
                    minWidth: 0,
                    "&:hover": {
                      backgroundColor: "#FF5C5C0F",
                    },
                  }}
                >
                  <Stack
                    direction="row"
                    spacing={1.75}
                    sx={{ alignItems: "center" }}
                  >
                    <LogoutOutlined sx={{ color: "#FF5C5C", fontSize: 20 }} />
                    <Typography
                      sx={{
                        fontFamily: poppins.style.fontFamily,
                        fontWeight: 500,
                        fontSize: "14.5px",
                        lineHeight: 1,
                      }}
                    >
                      Logout
                    </Typography>
                  </Stack>
                </Button>
              </Stack>
            </Box>
          </Stack>
        </Grid>

        {/* Right Column - Dynamic Tab Contents */}
        <Grid size={{ xs: 12, md: 8 }}>
          {activeTab === "edit-profile" && (
            /* ================= EDIT PROFILE VIEW ================= */
            <Box
              component="form"
              onSubmit={handleSaveChanges}
              sx={{
                backgroundColor: "#FFFFFF",
                borderRadius: "24px",
                p: { xs: 3, sm: 4.5 },
                border: "1px solid #0135470D",
                boxShadow: "0px 4px 20px rgba(1, 53, 71, 0.02)",
              }}
            >
              {/* Form Header */}
              <Typography
                sx={{
                  fontFamily: poppins700.style.fontFamily,
                  fontWeight: 700,
                  fontSize: "24px",
                  color: COLORS.SECONDARY,
                  mb: 0.75,
                }}
              >
                Edit Profile
              </Typography>
              <Typography
                sx={{
                  fontFamily: poppins.style.fontFamily,
                  fontWeight: 500,
                  fontSize: "13.5px",
                  color: "#7A9BAB",
                  mb: 3,
                }}
              >
                Update your personal information
              </Typography>

              <Divider sx={{ mb: 4, borderColor: "#0135470D" }} />

              {/* Profile Photo Upload Field */}
              <Typography
                sx={{
                  fontFamily: poppins.style.fontFamily,
                  fontWeight: 600,
                  fontSize: "11px",
                  color: "#7A9BAB",
                  letterSpacing: "0.75px",
                  mb: 1.5,
                }}
              >
                PROFILE PHOTO
              </Typography>
              <Stack
                direction="row"
                spacing={3}
                sx={{ alignItems: "center", mb: 4.5 }}
              >
                <Avatar
                  src={profilePhoto || undefined}
                  sx={{
                    width: 80,
                    height: 80,
                    backgroundColor: COLORS.SECONDARY,
                    fontSize: "26px",
                    fontWeight: 700,
                    fontFamily: poppins700.style.fontFamily,
                  }}
                >
                  {!profilePhoto && getInitials(fullName)}
                </Avatar>
                <Stack spacing={1} sx={{ alignItems: "flex-start" }}>
                  <Button
                    variant="outlined"
                    onClick={handleUploadClick}
                    startIcon={<CameraAltOutlined sx={{ fontSize: 18 }} />}
                    sx={{
                      borderColor: "#0135471F",
                      color: COLORS.SECONDARY,
                      borderRadius: "100px",
                      px: 3,
                      py: 1,
                      textTransform: "none",
                      fontFamily: poppins700.style.fontFamily,
                      fontWeight: 700,
                      fontSize: "13.5px",
                      "&:hover": {
                        borderColor: COLORS.SECONDARY,
                        backgroundColor: "#01354705",
                      },
                    }}
                  >
                    Upload Photo
                  </Button>
                  <Typography
                    sx={{
                      fontFamily: poppins.style.fontFamily,
                      fontWeight: 500,
                      fontSize: "11px",
                      color: "#7A9BAB",
                    }}
                  >
                    JPG, PNG up to 5MB. Square recommended.
                  </Typography>
                </Stack>
              </Stack>

              {/* Full Name Input Field */}
              <Box sx={{ mb: 3.5 }}>
                <Typography
                  sx={{
                    fontFamily: poppins.style.fontFamily,
                    fontWeight: 600,
                    fontSize: "11px",
                    color: "#7A9BAB",
                    letterSpacing: "0.75px",
                    mb: 1.25,
                  }}
                >
                  FULL NAME
                </Typography>
                <TextField
                  fullWidth
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "14px",
                      height: "54px",
                      fontFamily: poppins.style.fontFamily,
                      fontSize: "14.5px",
                      color: COLORS.SECONDARY,
                      backgroundColor: "#F9FBFB",
                      "& fieldset": { borderColor: "#0135471F" },
                      "&:hover fieldset": { borderColor: "#0135473D" },
                      "&.Mui-focused fieldset": {
                        borderColor: COLORS.SECONDARY,
                        borderWidth: "1.5px",
                      },
                    },
                  }}
                />
              </Box>

              {/* Mobile Number & Email Row */}
              <Grid container spacing={3} sx={{ mb: 3.5 }}>
                {/* Saudi Mobile Number Field (Locked) */}
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography
                    sx={{
                      fontFamily: poppins.style.fontFamily,
                      fontWeight: 600,
                      fontSize: "11px",
                      color: "#7A9BAB",
                      letterSpacing: "0.75px",
                      mb: 1.25,
                    }}
                  >
                    SAUDI MOBILE NUMBER
                  </Typography>
                  <TextField
                    fullWidth
                    disabled
                    value="+966 5X XXX XXXX"
                    slotProps={{
                      input: {
                        endAdornment: (
                          <InputAdornment position="end">
                            <LockOutlined
                              sx={{ color: "#7A9BAB", fontSize: 18 }}
                            />
                          </InputAdornment>
                        ),
                      },
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "14px",
                        height: "54px",
                        fontFamily: poppins.style.fontFamily,
                        fontSize: "14.5px",
                        color: COLORS.SECONDARY,
                        backgroundColor: "#F4F7F8",
                        "& fieldset": { borderColor: "#0135470D" },
                        "&.Mui-disabled": {
                          color: "#7A9BAB",
                          WebkitTextFillColor: "#7A9BAB",
                        },
                      },
                    }}
                  />
                  <Typography
                    sx={{
                      fontFamily: poppins.style.fontFamily,
                      fontWeight: 500,
                      fontSize: "11.5px",
                      color: "#7A9BAB",
                      mt: 1,
                      lineHeight: "15px",
                    }}
                  >
                    Mobile number is verified and cannot be changed here.
                  </Typography>
                </Grid>

                {/* Email Address Field */}
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography
                    sx={{
                      fontFamily: poppins.style.fontFamily,
                      fontWeight: 600,
                      fontSize: "11px",
                      color: "#7A9BAB",
                      letterSpacing: "0.75px",
                      mb: 1.25,
                    }}
                  >
                    EMAIL ADDRESS
                  </Typography>
                  <TextField
                    fullWidth
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "14px",
                        height: "54px",
                        fontFamily: poppins.style.fontFamily,
                        fontSize: "14.5px",
                        color: COLORS.SECONDARY,
                        backgroundColor: "#F9FBFB",
                        "& fieldset": { borderColor: "#0135471F" },
                        "&:hover fieldset": { borderColor: "#0135473D" },
                        "&.Mui-focused fieldset": {
                          borderColor: COLORS.SECONDARY,
                          borderWidth: "1.5px",
                        },
                      },
                    }}
                  />
                </Grid>
              </Grid>

              {/* City/Region & Language Row */}
              <Grid container spacing={3} sx={{ mb: 5 }}>
                {/* City/Region Field */}
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography
                    sx={{
                      fontFamily: poppins.style.fontFamily,
                      fontWeight: 600,
                      fontSize: "11px",
                      color: "#7A9BAB",
                      letterSpacing: "0.75px",
                      mb: 1.25,
                    }}
                  >
                    CITY / REGION
                  </Typography>
                  <TextField
                    fullWidth
                    value={cityRegion}
                    placeholder="Select city or region"
                    onChange={(e) => setCityRegion(e.target.value)}
                    slotProps={{
                      input: {
                        endAdornment: (
                          <InputAdornment position="end">
                            <PlaceOutlined
                              sx={{ color: "#7A9BAB", fontSize: 18 }}
                            />
                          </InputAdornment>
                        ),
                      },
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "14px",
                        height: "54px",
                        fontFamily: poppins.style.fontFamily,
                        fontSize: "14.5px",
                        color: COLORS.SECONDARY,
                        backgroundColor: "#F9FBFB",
                        "& fieldset": { borderColor: "#0135471F" },
                        "&:hover fieldset": { borderColor: "#0135473D" },
                        "&.Mui-focused fieldset": {
                          borderColor: COLORS.SECONDARY,
                          borderWidth: "1.5px",
                        },
                      },
                    }}
                  />
                </Grid>

                {/* Language Selection Toggle */}
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography
                    sx={{
                      fontFamily: poppins.style.fontFamily,
                      fontWeight: 600,
                      fontSize: "11px",
                      color: "#7A9BAB",
                      letterSpacing: "0.75px",
                      mb: 1.25,
                    }}
                  >
                    LANGUAGE
                  </Typography>
                  <Stack direction="row" spacing={2} sx={{ height: "54px" }}>
                    {/* English Selection */}
                    <Button
                      fullWidth
                      variant={language === "en" ? "contained" : "outlined"}
                      disableElevation
                      onClick={() => setLanguage("en")}
                      startIcon={<LanguageOutlined sx={{ fontSize: 18 }} />}
                      sx={{
                        borderRadius: "12px",
                        textTransform: "none",
                        fontFamily: poppins700.style.fontFamily,
                        fontWeight: 700,
                        fontSize: "14px",
                        backgroundColor:
                          language === "en" ? COLORS.SECONDARY : "#FFFFFF",
                        color: language === "en" ? COLORS.WHITE : "#7A9BAB",
                        borderColor:
                          language === "en" ? "transparent" : "#0135471F",
                        "&:hover": {
                          backgroundColor:
                            language === "en" ? "#002432" : "#01354705",
                          borderColor:
                            language === "en"
                              ? "transparent"
                              : COLORS.SECONDARY,
                        },
                      }}
                    >
                      English
                    </Button>

                    {/* Arabic Selection */}
                    <Button
                      fullWidth
                      variant={language === "ar" ? "contained" : "outlined"}
                      disableElevation
                      onClick={() => setLanguage("ar")}
                      startIcon={<LanguageOutlined sx={{ fontSize: 18 }} />}
                      sx={{
                        borderRadius: "12px",
                        textTransform: "none",
                        fontFamily: poppins700.style.fontFamily,
                        fontWeight: 700,
                        fontSize: "14px",
                        backgroundColor:
                          language === "ar" ? COLORS.SECONDARY : "#FFFFFF",
                        color: language === "ar" ? COLORS.WHITE : "#7A9BAB",
                        borderColor:
                          language === "ar" ? "transparent" : "#0135471F",
                        "&:hover": {
                          backgroundColor:
                            language === "ar" ? "#002432" : "#01354705",
                          borderColor:
                            language === "ar"
                              ? "transparent"
                              : COLORS.SECONDARY,
                        },
                      }}
                    >
                      Arabic
                    </Button>
                  </Stack>
                </Grid>
              </Grid>

              {/* Save Changes CTA Button */}
              <Button
                type="submit"
                variant="contained"
                disableElevation
                onClick={handleSaveChanges}
                disabled={updatingProfile}
                startIcon={<SaveOutlined sx={{ fontSize: 18 }} />}
                sx={{
                  backgroundColor: COLORS.SECONDARY,
                  color: COLORS.WHITE,
                  borderRadius: "100px",
                  px: 4,
                  py: 1.5,
                  height: "48px",
                  textTransform: "none",
                  fontFamily: poppins700.style.fontFamily,
                  fontWeight: 700,
                  fontSize: "14px",
                  "&.Mui-disabled": {
                    backgroundColor: "#B0C3CC",
                    color: "#FFFFFF99",
                  },
                  "&:hover": {
                    backgroundColor: "#002432",
                  },
                }}
              >
                {updatingProfile ? "Saving..." : "Save Changes"}
              </Button>
            </Box>
          )}

          {activeTab === "verification" && (
            /* ================= VERIFICATION VIEW ================= */
            <Stack spacing={4}>
              {/* Card 1: Verification Status */}
              <Box
                sx={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: "24px",
                  p: { xs: 3, sm: 4.5 },
                  border: "1px solid #0135470D",
                  boxShadow: "0px 4px 20px rgba(1, 53, 71, 0.02)",
                }}
              >
                {/* Header */}
                <Typography
                  sx={{
                    fontFamily: poppins700.style.fontFamily,
                    fontWeight: 700,
                    fontSize: "24px",
                    color: COLORS.SECONDARY,
                    mb: 0.75,
                  }}
                >
                  Verification Status
                </Typography>
                <Typography
                  sx={{
                    fontFamily: poppins.style.fontFamily,
                    fontWeight: 500,
                    fontSize: "13.5px",
                    color: "#7A9BAB",
                    mb: 3.5,
                  }}
                >
                  Your identity verification builds trust with other users
                </Typography>

                <Divider sx={{ mb: 3.5, borderColor: "#0135470D" }} />

                {/* Items Stack */}
                <Stack spacing={3.5}>
                  {/* Phone Number Verification Item */}
                  <Stack
                    direction="row"
                    sx={{
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Stack
                      direction="row"
                      spacing={2.5}
                      sx={{ alignItems: "center" }}
                    >
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: "50%",
                          backgroundColor: "#EEF6FA",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <LocalPhoneOutlined
                          sx={{ color: "#166CA9", fontSize: 22 }}
                        />
                      </Box>
                      <Box>
                        <Typography
                          sx={{
                            fontFamily: poppins700.style.fontFamily,
                            fontWeight: 700,
                            fontSize: "15.5px",
                            color: COLORS.SECONDARY,
                            mb: 0.5,
                          }}
                        >
                          Phone Number
                        </Typography>
                        <Typography
                          sx={{
                            fontFamily: poppins.style.fontFamily,
                            fontSize: "13px",
                            color: "#7A9BAB",
                          }}
                        >
                          +966 5X XXX XXXX
                        </Typography>
                      </Box>
                    </Stack>

                    <Stack
                      direction="row"
                      spacing={0.5}
                      sx={{
                        backgroundColor: "#E8F5E9",
                        color: "#10753E",
                        borderRadius: "100px",
                        py: 0.75,
                        px: 2.2,
                        alignItems: "center",
                      }}
                    >
                      <Check sx={{ fontSize: 15 }} />
                      <Typography
                        sx={{
                          fontFamily: poppins700.style.fontFamily,
                          fontWeight: 700,
                          fontSize: "12px",
                        }}
                      >
                        Verified
                      </Typography>
                    </Stack>
                  </Stack>

                  <Divider sx={{ borderColor: "#0135470D" }} />

                  {/* National ID / Iqama Verification Item */}
                  <Stack
                    direction="row"
                    sx={{
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Stack
                      direction="row"
                      spacing={2.5}
                      sx={{ alignItems: "center" }}
                    >
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: "50%",
                          backgroundColor: "#EEF6FA",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <ShieldOutlined
                          sx={{ color: "#166CA9", fontSize: 22 }}
                        />
                      </Box>
                      <Box>
                        <Typography
                          sx={{
                            fontFamily: poppins700.style.fontFamily,
                            fontWeight: 700,
                            fontSize: "15.5px",
                            color: COLORS.SECONDARY,
                            mb: 0.5,
                          }}
                        >
                          National ID / Iqama
                        </Typography>
                        <Typography
                          sx={{
                            fontFamily: poppins.style.fontFamily,
                            fontSize: "13px",
                            color: "#7A9BAB",
                          }}
                        >
                          Required to contact sellers and post listings
                        </Typography>
                      </Box>
                    </Stack>

                    <Stack
                      direction="row"
                      spacing={0.5}
                      sx={{
                        backgroundColor: "#E8F5E9",
                        color: "#10753E",
                        borderRadius: "100px",
                        py: 0.75,
                        px: 2.2,
                        alignItems: "center",
                      }}
                    >
                      <Check sx={{ fontSize: 15 }} />
                      <Typography
                        sx={{
                          fontFamily: poppins700.style.fontFamily,
                          fontWeight: 700,
                          fontSize: "12px",
                        }}
                      >
                        Verified
                      </Typography>
                    </Stack>
                  </Stack>

                  <Divider sx={{ borderColor: "#0135470D" }} />

                  {/* Business Registration (CR) Verification Item */}
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={{ xs: 2, sm: 0 }}
                    sx={{
                      alignItems: { xs: "flex-start", sm: "center" },
                      justifyContent: "space-between",
                    }}
                  >
                    <Stack
                      direction="row"
                      spacing={2.5}
                      sx={{ alignItems: "center" }}
                    >
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: "50%",
                          backgroundColor: "#EEF6FA",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <VerifiedOutlined
                          sx={{ color: "#166CA9", fontSize: 22 }}
                        />
                      </Box>
                      <Box>
                        <Typography
                          sx={{
                            fontFamily: poppins700.style.fontFamily,
                            fontWeight: 700,
                            fontSize: "15.5px",
                            color: COLORS.SECONDARY,
                            mb: 0.5,
                          }}
                        >
                          Business Registration (CR)
                        </Typography>
                        <Typography
                          sx={{
                            fontFamily: poppins.style.fontFamily,
                            fontSize: "13px",
                            color: "#7A9BAB",
                          }}
                        >
                          {crFileName
                            ? `Uploaded: ${crFileName}`
                            : "For business accounts only"}
                        </Typography>
                      </Box>
                    </Stack>

                    <Stack
                      direction="row"
                      spacing={1.5}
                      sx={{
                        alignItems: "center",
                        alignSelf: { xs: "flex-end", sm: "auto" },
                      }}
                    >
                      {crUploadStatus === "not_uploaded" ? (
                        <Stack
                          direction="row"
                          spacing={0.5}
                          sx={{
                            backgroundColor: "#FF5C5C1A",
                            color: "#FF5C5C",
                            borderRadius: "100px",
                            py: 0.75,
                            px: 2.2,
                            alignItems: "center",
                          }}
                        >
                          <ErrorOutlined sx={{ fontSize: 15 }} />
                          <Typography
                            sx={{
                              fontFamily: poppins700.style.fontFamily,
                              fontWeight: 700,
                              fontSize: "12px",
                            }}
                          >
                            Not Uploaded
                          </Typography>
                        </Stack>
                      ) : (
                        <Stack
                          direction="row"
                          spacing={0.5}
                          sx={{
                            backgroundColor: "#E2F0D9",
                            color: "#385723",
                            borderRadius: "100px",
                            py: 0.75,
                            px: 2.2,
                            alignItems: "center",
                          }}
                        >
                          <Check sx={{ fontSize: 15 }} />
                          <Typography
                            sx={{
                              fontFamily: poppins700.style.fontFamily,
                              fontWeight: 700,
                              fontSize: "12px",
                            }}
                          >
                            Pending Review
                          </Typography>
                        </Stack>
                      )}

                      <Button
                        variant="contained"
                        disableElevation
                        onClick={handleCrUploadClick}
                        sx={{
                          backgroundColor: COLORS.SECONDARY,
                          color: COLORS.WHITE,
                          borderRadius: "100px",
                          px: 2.5,
                          py: 1,
                          textTransform: "none",
                          fontFamily: poppins700.style.fontFamily,
                          fontWeight: 700,
                          fontSize: "13px",
                          "&:hover": {
                            backgroundColor: "#002432",
                          },
                        }}
                      >
                        {crUploadStatus === "not_uploaded"
                          ? "Upload CR"
                          : "Re-upload"}
                      </Button>
                    </Stack>
                  </Stack>
                </Stack>
              </Box>

              {/* Card 2: Nafath Government Verification Banner */}
              <Box
                sx={{
                  backgroundColor: COLORS.SECONDARY,
                  borderRadius: "24px",
                  p: { xs: 3.5, sm: 4.5 },
                  boxShadow: "0px 8px 32px rgba(1, 53, 71, 0.08)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <Grid container spacing={3} sx={{ alignItems: "flex-start" }}>
                  {/* Gold Shield Icon */}
                  <Grid size={{ xs: 12, sm: 1.5 }}>
                    <Box
                      sx={{
                        width: 56,
                        height: 56,
                        borderRadius: "16px",
                        backgroundColor: "rgba(255, 255, 255, 0.08)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <ShieldOutlined
                        sx={{ color: COLORS.PRIMARY, fontSize: 30 }}
                      />
                    </Box>
                  </Grid>

                  {/* Main Details */}
                  <Grid size={{ xs: 12, sm: 10.5 }}>
                    <Typography
                      sx={{
                        fontFamily: poppins700.style.fontFamily,
                        fontWeight: 700,
                        fontSize: "19px",
                        color: COLORS.WHITE,
                        mb: 1.25,
                      }}
                    >
                      Nafath Government Verification
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: poppins.style.fontFamily,
                        fontWeight: 500,
                        fontSize: "13.5px",
                        color: "#A0B7C5",
                        lineHeight: "22px",
                        mb: 3,
                      }}
                    >
                      Coming soon: One-tap identity verification through Saudi
                      Arabia's official Nafath platform. Instantly verified with
                      a government trust badge on your profile and all listings.
                    </Typography>

                    {/* Features chips */}
                    <Stack
                      direction="row"
                      useFlexGap
                      sx={{
                        flexWrap: "wrap",
                        gap: 1.5,
                      }}
                    >
                      {[
                        "Instant verification",
                        "No document upload",
                        "Government trusted",
                        "Higher trust rating",
                      ].map((feature, idx) => (
                        <Stack
                          key={idx}
                          direction="row"
                          spacing={0.75}
                          sx={{
                            backgroundColor: "rgba(255, 255, 255, 0.06)",
                            borderRadius: "100px",
                            py: 0.8,
                            px: 2,
                            alignItems: "center",
                          }}
                        >
                          <CheckCircle
                            sx={{ color: "#10753E", fontSize: 15 }}
                          />
                          <Typography
                            sx={{
                              fontFamily: poppins.style.fontFamily,
                              fontWeight: 500,
                              fontSize: "12px",
                              color: COLORS.WHITE,
                            }}
                          >
                            {feature}
                          </Typography>
                        </Stack>
                      ))}
                    </Stack>
                  </Grid>
                </Grid>
              </Box>
            </Stack>
          )}

          {activeTab === "account-settings" && (
            /* ================= ACCOUNT SETTINGS VIEW ================= */
            <Stack spacing={4}>
              {/* Card 1: Change Password */}
              <Box
                component="form"
                onSubmit={handleUpdatePassword}
                sx={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: "24px",
                  p: { xs: 3, sm: 4.5 },
                  border: "1px solid #0135470D",
                  boxShadow: "0px 4px 20px rgba(1, 53, 71, 0.02)",
                }}
              >
                {/* Header */}
                <Typography
                  sx={{
                    fontFamily: poppins700.style.fontFamily,
                    fontWeight: 700,
                    fontSize: "24px",
                    color: COLORS.SECONDARY,
                    mb: 2,
                  }}
                >
                  Change Password
                </Typography>

                <Divider sx={{ mb: 4, borderColor: "#0135470D" }} />

                {/* Password Fields */}
                <Stack spacing={3.5} sx={{ mb: 4.5 }}>
                  {/* Current Password */}
                  <Box>
                    <Typography
                      sx={{
                        fontFamily: poppins.style.fontFamily,
                        fontWeight: 600,
                        fontSize: "11px",
                        color: "#7A9BAB",
                        letterSpacing: "0.75px",
                        mb: 1.25,
                      }}
                    >
                      CURRENT PASSWORD
                    </Typography>
                    <TextField
                      fullWidth
                      type={showCurrentPassword ? "text" : "password"}
                      value={currentPassword}
                      placeholder="Enter current password"
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      slotProps={{
                        input: {
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() =>
                                  setShowCurrentPassword(!showCurrentPassword)
                                }
                                edge="end"
                              >
                                {showCurrentPassword ? (
                                  <Visibility
                                    sx={{ color: "#7A9BAB", fontSize: 20 }}
                                  />
                                ) : (
                                  <VisibilityOff
                                    sx={{ color: "#7A9BAB", fontSize: 20 }}
                                  />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        },
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "14px",
                          height: "54px",
                          fontFamily: poppins.style.fontFamily,
                          fontSize: "14.5px",
                          color: COLORS.SECONDARY,
                          backgroundColor: "#F9FBFB",
                          "& fieldset": { borderColor: "#0135471F" },
                          "&:hover fieldset": { borderColor: "#0135473D" },
                          "&.Mui-focused fieldset": {
                            borderColor: COLORS.SECONDARY,
                            borderWidth: "1.5px",
                          },
                        },
                      }}
                    />
                  </Box>

                  {/* New Password */}
                  <Box>
                    <Typography
                      sx={{
                        fontFamily: poppins.style.fontFamily,
                        fontWeight: 600,
                        fontSize: "11px",
                        color: "#7A9BAB",
                        letterSpacing: "0.75px",
                        mb: 1.25,
                      }}
                    >
                      NEW PASSWORD
                    </Typography>
                    <TextField
                      fullWidth
                      type={showNewPassword ? "text" : "password"}
                      value={newPassword}
                      placeholder="Min 8 characters"
                      onChange={(e) => setNewPassword(e.target.value)}
                      slotProps={{
                        input: {
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() =>
                                  setShowNewPassword(!showNewPassword)
                                }
                                edge="end"
                              >
                                {showNewPassword ? (
                                  <Visibility
                                    sx={{ color: "#7A9BAB", fontSize: 20 }}
                                  />
                                ) : (
                                  <VisibilityOff
                                    sx={{ color: "#7A9BAB", fontSize: 20 }}
                                  />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        },
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "14px",
                          height: "54px",
                          fontFamily: poppins.style.fontFamily,
                          fontSize: "14.5px",
                          color: COLORS.SECONDARY,
                          backgroundColor: "#F9FBFB",
                          "& fieldset": { borderColor: "#0135471F" },
                          "&:hover fieldset": { borderColor: "#0135473D" },
                          "&.Mui-focused fieldset": {
                            borderColor: COLORS.SECONDARY,
                            borderWidth: "1.5px",
                          },
                        },
                      }}
                    />
                  </Box>

                  {/* Confirm Password */}
                  <Box>
                    <Typography
                      sx={{
                        fontFamily: poppins.style.fontFamily,
                        fontWeight: 600,
                        fontSize: "11px",
                        color: "#7A9BAB",
                        letterSpacing: "0.75px",
                        mb: 1.25,
                      }}
                    >
                      CONFIRM NEW PASSWORD
                    </Typography>
                    <TextField
                      fullWidth
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      placeholder="Re-enter new password"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      slotProps={{
                        input: {
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() =>
                                  setShowConfirmPassword(!showConfirmPassword)
                                }
                                edge="end"
                              >
                                {showConfirmPassword ? (
                                  <Visibility
                                    sx={{ color: "#7A9BAB", fontSize: 20 }}
                                  />
                                ) : (
                                  <VisibilityOff
                                    sx={{ color: "#7A9BAB", fontSize: 20 }}
                                  />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        },
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "14px",
                          height: "54px",
                          fontFamily: poppins.style.fontFamily,
                          fontSize: "14.5px",
                          color: COLORS.SECONDARY,
                          backgroundColor: "#F9FBFB",
                          "& fieldset": { borderColor: "#0135471F" },
                          "&:hover fieldset": { borderColor: "#0135473D" },
                          "&.Mui-focused fieldset": {
                            borderColor: COLORS.SECONDARY,
                            borderWidth: "1.5px",
                          },
                        },
                      }}
                    />
                  </Box>
                </Stack>

                {/* Update Password Button */}
                <Button
                  type="submit"
                  variant="contained"
                  disableElevation
                  onClick={handleUpdatePassword}
                  disabled={updatingPassword}
                  startIcon={<LockOutlined sx={{ fontSize: 18 }} />}
                  sx={{
                    backgroundColor: COLORS.SECONDARY,
                    color: COLORS.WHITE,
                    borderRadius: "100px",
                    px: 4,
                    py: 1.5,
                    height: "48px",
                    textTransform: "none",
                    fontFamily: poppins700.style.fontFamily,
                    fontWeight: 700,
                    fontSize: "14px",
                    "&.Mui-disabled": {
                      backgroundColor: "#B0C3CC",
                      color: "#FFFFFF99",
                    },
                    "&:hover": {
                      backgroundColor: "#002432",
                    },
                  }}
                >
                  {updatingPassword ? "Updating..." : "Update Password"}
                </Button>
              </Box>

              {/* Card 2: Notification Preferences */}
              <Box
                sx={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: "24px",
                  p: { xs: 3, sm: 4.5 },
                  border: "1px solid #0135470D",
                  boxShadow: "0px 4px 20px rgba(1, 53, 71, 0.02)",
                }}
              >
                {/* Header */}
                <Typography
                  sx={{
                    fontFamily: poppins700.style.fontFamily,
                    fontWeight: 700,
                    fontSize: "24px",
                    color: COLORS.SECONDARY,
                    mb: 0.75,
                  }}
                >
                  Notification Preferences
                </Typography>
                <Typography
                  sx={{
                    fontFamily: poppins.style.fontFamily,
                    fontWeight: 500,
                    fontSize: "13.5px",
                    color: "#7A9BAB",
                    mb: 3.5,
                  }}
                >
                  Choose what notifications you receive via SMS and in-app
                </Typography>

                <Divider sx={{ mb: 3, borderColor: "#0135470D" }} />

                <Stack spacing={2.5}>
                  {/* Messages Row */}
                  <Stack
                    direction="row"
                    sx={{
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box>
                      <Typography
                        sx={{
                          fontFamily: poppins700.style.fontFamily,
                          fontWeight: 700,
                          fontSize: "15px",
                          color: COLORS.SECONDARY,
                          mb: 0.5,
                        }}
                      >
                        New Messages
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: poppins.style.fontFamily,
                          fontSize: "12.5px",
                          color: "#7A9BAB",
                        }}
                      >
                        When someone sends you a message
                      </Typography>
                    </Box>
                    <Switch
                      checked={notifyMessages}
                      onChange={(e) => setNotifyMessages(e.target.checked)}
                      sx={{
                        "& .MuiSwitch-switchBase.Mui-checked": {
                          color: COLORS.SECONDARY,
                        },
                        "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                          {
                            backgroundColor: COLORS.SECONDARY,
                          },
                      }}
                    />
                  </Stack>

                  <Divider sx={{ borderColor: "#0135470D" }} />

                  {/* Interest Row */}
                  <Stack
                    direction="row"
                    sx={{
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box>
                      <Typography
                        sx={{
                          fontFamily: poppins700.style.fontFamily,
                          fontWeight: 700,
                          fontSize: "15px",
                          color: COLORS.SECONDARY,
                          mb: 0.5,
                        }}
                      >
                        New Interest / Inquiries
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: poppins.style.fontFamily,
                          fontSize: "12.5px",
                          color: "#7A9BAB",
                        }}
                      >
                        When someone saves or contacts about your listing
                      </Typography>
                    </Box>
                    <Switch
                      checked={notifyInquiries}
                      onChange={(e) => setNotifyInquiries(e.target.checked)}
                      sx={{
                        "& .MuiSwitch-switchBase.Mui-checked": {
                          color: COLORS.SECONDARY,
                        },
                        "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                          {
                            backgroundColor: COLORS.SECONDARY,
                          },
                      }}
                    />
                  </Stack>

                  <Divider sx={{ borderColor: "#0135470D" }} />

                  {/* Approvals Row */}
                  <Stack
                    direction="row"
                    sx={{
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box>
                      <Typography
                        sx={{
                          fontFamily: poppins700.style.fontFamily,
                          fontWeight: 700,
                          fontSize: "15px",
                          color: COLORS.SECONDARY,
                          mb: 0.5,
                        }}
                      >
                        Listing Approvals
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: poppins.style.fontFamily,
                          fontSize: "12.5px",
                          color: "#7A9BAB",
                        }}
                      >
                        When your listing is approved or rejected by admin
                      </Typography>
                    </Box>
                    <Switch
                      checked={notifyApprovals}
                      onChange={(e) => setNotifyApprovals(e.target.checked)}
                      sx={{
                        "& .MuiSwitch-switchBase.Mui-checked": {
                          color: COLORS.SECONDARY,
                        },
                        "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                          {
                            backgroundColor: COLORS.SECONDARY,
                          },
                      }}
                    />
                  </Stack>

                  <Divider sx={{ borderColor: "#0135470D" }} />

                  {/* Expiry Reminders Row */}
                  <Stack
                    direction="row"
                    sx={{
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box>
                      <Typography
                        sx={{
                          fontFamily: poppins700.style.fontFamily,
                          fontWeight: 700,
                          fontSize: "15px",
                          color: COLORS.SECONDARY,
                          mb: 0.5,
                        }}
                      >
                        Contract Expiry Reminders
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: poppins.style.fontFamily,
                          fontSize: "12.5px",
                          color: "#7A9BAB",
                        }}
                      >
                        Reminder before your contract expires
                      </Typography>
                    </Box>
                    <Switch
                      checked={notifyExpiry}
                      onChange={(e) => setNotifyExpiry(e.target.checked)}
                      sx={{
                        "& .MuiSwitch-switchBase.Mui-checked": {
                          color: COLORS.SECONDARY,
                        },
                        "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                          {
                            backgroundColor: COLORS.SECONDARY,
                          },
                      }}
                    />
                  </Stack>
                </Stack>
              </Box>

              {/* Card 3: Privacy Settings */}
              <Box
                sx={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: "24px",
                  p: { xs: 3, sm: 4.5 },
                  border: "1px solid #0135470D",
                  boxShadow: "0px 4px 20px rgba(1, 53, 71, 0.02)",
                }}
              >
                {/* Header */}
                <Typography
                  sx={{
                    fontFamily: poppins700.style.fontFamily,
                    fontWeight: 700,
                    fontSize: "24px",
                    color: COLORS.SECONDARY,
                    mb: 0.75,
                  }}
                >
                  Privacy Settings
                </Typography>
                <Typography
                  sx={{
                    fontFamily: poppins.style.fontFamily,
                    fontWeight: 500,
                    fontSize: "13.5px",
                    color: "#7A9BAB",
                    mb: 3.5,
                  }}
                >
                  Control what other users can see on your profile
                </Typography>

                <Divider sx={{ mb: 3, borderColor: "#0135470D" }} />

                <Stack spacing={2.5}>
                  {/* Phone Row */}
                  <Stack
                    direction="row"
                    sx={{
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box>
                      <Typography
                        sx={{
                          fontFamily: poppins700.style.fontFamily,
                          fontWeight: 700,
                          fontSize: "15px",
                          color: COLORS.SECONDARY,
                          mb: 0.5,
                        }}
                      >
                        Show Phone Number
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: poppins.style.fontFamily,
                          fontSize: "12.5px",
                          color: "#7A9BAB",
                        }}
                      >
                        Visible to registered users viewing your listings
                      </Typography>
                    </Box>
                    <Switch
                      checked={privacyShowPhone}
                      onChange={(e) => setPrivacyShowPhone(e.target.checked)}
                      sx={{
                        "& .MuiSwitch-switchBase.Mui-checked": {
                          color: COLORS.SECONDARY,
                        },
                        "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                          {
                            backgroundColor: COLORS.SECONDARY,
                          },
                      }}
                    />
                  </Stack>

                  <Divider sx={{ borderColor: "#0135470D" }} />

                  {/* Email Row */}
                  <Stack
                    direction="row"
                    sx={{
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box>
                      <Typography
                        sx={{
                          fontFamily: poppins700.style.fontFamily,
                          fontWeight: 700,
                          fontSize: "15px",
                          color: COLORS.SECONDARY,
                          mb: 0.5,
                        }}
                      >
                        Show Email Address
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: poppins.style.fontFamily,
                          fontSize: "12.5px",
                          color: "#7A9BAB",
                        }}
                      >
                        Visible on your public profile
                      </Typography>
                    </Box>
                    <Switch
                      checked={privacyShowEmail}
                      onChange={(e) => setPrivacyShowEmail(e.target.checked)}
                      sx={{
                        "& .MuiSwitch-switchBase.Mui-checked": {
                          color: COLORS.SECONDARY,
                        },
                        "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                          {
                            backgroundColor: COLORS.SECONDARY,
                          },
                      }}
                    />
                  </Stack>
                </Stack>
              </Box>

              {/* Card 4: Danger Zone */}
              <Box
                sx={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: "24px",
                  p: { xs: 3, sm: 4.5 },
                  border: "1.5px solid #FF5C5C26",
                  boxShadow: "0px 4px 20px rgba(255, 92, 92, 0.01)",
                }}
              >
                {/* Header */}
                <Typography
                  sx={{
                    fontFamily: poppins700.style.fontFamily,
                    fontWeight: 700,
                    fontSize: "24px",
                    color: "#FF5C5C",
                    mb: 2,
                  }}
                >
                  Danger Zone
                </Typography>

                <Divider sx={{ mb: 3.5, borderColor: "#FF5C5C1A" }} />

                <Stack spacing={3.5}>
                  {/* Deactivate Row */}
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={{ xs: 2.5, sm: 0 }}
                    sx={{
                      alignItems: { xs: "flex-start", sm: "center" },
                      justifyContent: "space-between",
                    }}
                  >
                    <Box>
                      <Typography
                        sx={{
                          fontFamily: poppins700.style.fontFamily,
                          fontWeight: 700,
                          fontSize: "15px",
                          color: COLORS.SECONDARY,
                          mb: 0.5,
                        }}
                      >
                        Deactivate Account
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: poppins.style.fontFamily,
                          fontSize: "12.5px",
                          color: "#7A9BAB",
                        }}
                      >
                        Temporarily hide your profile and listings. You can
                        reactivate anytime.
                      </Typography>
                    </Box>

                    <Button
                      variant="outlined"
                      sx={{
                        color: "#FF5C5C",
                        borderColor: "#FF5C5C33",
                        borderRadius: "100px",
                        px: 3.5,
                        py: 1,
                        textTransform: "none",
                        fontFamily: poppins700.style.fontFamily,
                        fontWeight: 700,
                        fontSize: "13px",
                        "&:hover": {
                          borderColor: "#FF5C5C",
                          backgroundColor: "#FF5C5C0A",
                        },
                      }}
                      onClick={() => setDeactivateModalOpen(true)}
                    >
                      Deactivate
                    </Button>
                  </Stack>

                  <Divider sx={{ borderColor: "#FF5C5C1A" }} />

                  {/* Logout Row */}
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={{ xs: 2.5, sm: 0 }}
                    sx={{
                      alignItems: { xs: "flex-start", sm: "center" },
                      justifyContent: "space-between",
                    }}
                  >
                    <Box>
                      <Typography
                        sx={{
                          fontFamily: poppins700.style.fontFamily,
                          fontWeight: 700,
                          fontSize: "15px",
                          color: COLORS.SECONDARY,
                          mb: 0.5,
                        }}
                      >
                        Logout
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: poppins.style.fontFamily,
                          fontSize: "12.5px",
                          color: "#7A9BAB",
                        }}
                      >
                        Sign out from your account on this device.
                      </Typography>
                    </Box>

                    <Button
                      variant="outlined"
                      startIcon={<LogoutOutlined sx={{ fontSize: 17 }} />}
                      sx={{
                        color: "#FF5C5C",
                        borderColor: "#FF5C5C33",
                        borderRadius: "100px",
                        px: 3.5,
                        py: 1,
                        textTransform: "none",
                        fontFamily: poppins700.style.fontFamily,
                        fontWeight: 700,
                        fontSize: "13px",
                        "&:hover": {
                          borderColor: "#FF5C5C",
                          backgroundColor: "#FF5C5C0A",
                        },
                      }}
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                  </Stack>
                </Stack>
              </Box>
            </Stack>
          )}
        </Grid>
      </Grid>

      {/* Floating WhatsApp Action Trigger */}
      <WhatsAppButton />

      {/* Toast Alert Notification */}
      <Snackbar
        open={toastOpen}
        autoHideDuration={4000}
        onClose={handleToastClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleToastClose}
          severity={toastSeverity}
          variant="filled"
          sx={{
            width: "100%",
            fontFamily: poppins.style.fontFamily,
            borderRadius: "10px",
            backgroundColor:
              toastSeverity === "success" ? "#10753E" : COLORS.SECONDARY,
          }}
        >
          {toastMessage}
        </Alert>
      </Snackbar>

      {/* Deactivate Account Confirmation Dialog */}
      <Dialog
        open={deactivateModalOpen}
        onClose={() => !deactivatingAccount && setDeactivateModalOpen(false)}
        slotProps={{
          paper: {
            sx: {
              borderRadius: "20px",
              padding: 3,
              maxWidth: "450px",
              width: "100%",
            },
          },
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              backgroundColor: "#FF5C5C1A",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px auto",
            }}
          >
            <ErrorOutlined sx={{ color: "#FF5C5C", fontSize: 32 }} />
          </Box>

          <Typography
            sx={{
              fontFamily: poppins700.style.fontFamily,
              fontWeight: 700,
              fontSize: "18px",
              color: COLORS.SECONDARY,
              mb: 1,
            }}
          >
            Deactivate Account?
          </Typography>

          <Typography
            sx={{
              fontFamily: poppins.style.fontFamily,
              fontSize: "13.5px",
              color: "#7A9BAB",
              mb: 3,
              lineHeight: 1.6,
            }}
          >
            Are you sure you want to deactivate your account? Temporarily hide your profile and listings. You can reactivate anytime.
          </Typography>

          <Stack direction="row" spacing={2} sx={{ justifyContent: "center" }}>
            <Button
              variant="outlined"
              disabled={deactivatingAccount}
              onClick={() => setDeactivateModalOpen(false)}
              sx={{
                flex: 1,
                borderRadius: "100px",
                borderColor: "#E5E7EB",
                color: COLORS.SECONDARY,
                textTransform: "none",
                fontFamily: poppins700.style.fontFamily,
                fontWeight: 600,
                fontSize: "13px",
                py: 1.2,
                "&:hover": {
                  borderColor: COLORS.SECONDARY,
                  backgroundColor: "transparent",
                },
              }}
            >
              No, Cancel
            </Button>
            <Button
              variant="contained"
              disabled={deactivatingAccount}
              onClick={handleConfirmDeactivate}
              sx={{
                flex: 1,
                borderRadius: "100px",
                backgroundColor: "#FF5C5C",
                color: "#FFFFFF",
                textTransform: "none",
                fontFamily: poppins700.style.fontFamily,
                fontWeight: 600,
                fontSize: "13px",
                py: 1.2,
                boxShadow: "none",
                "&:hover": {
                  backgroundColor: "#E04848",
                  boxShadow: "none",
                },
              }}
            >
              {deactivatingAccount ? (
                <CircularProgress size={20} sx={{ color: "#FFFFFF" }} />
              ) : (
                "Yes, Deactivate"
              )}
            </Button>
          </Stack>
        </Box>
      </Dialog>
    </Box>
  );
};

export default SettingsLayout;
