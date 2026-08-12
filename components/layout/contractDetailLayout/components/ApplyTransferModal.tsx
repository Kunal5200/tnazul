"use client";

import React, { useState, useRef } from "react";
import {
  Box,
  Typography,
  Stack,
  Button,
  IconButton,
  Dialog,
  Divider,
  Checkbox,
} from "@mui/material";
import {
  Close,
  ErrorOutlined,
  CloudUploadOutlined,
  CheckCircle,
} from "@mui/icons-material";
import { COLORS } from "@/utils/enum";
import { poppins, poppins700 } from "@/utils/fonts";

export interface ApplyTransferModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ApplyTransferModal: React.FC<ApplyTransferModalProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [confirmObligations, setConfirmObligations] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);

  // Canvas Ref for Signature Drawing Pad
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Stepper Header Config
  const stepsConfig = [
    { label: "Financials", id: 1 },
    { label: "Documents", id: 2 },
    { label: "Signature", id: 3 },
    { label: "Success", id: 4 },
  ];

  const handleCloseModal = () => {
    onClose();
    // Reset state after a small delay to allow close animation
    setTimeout(() => {
      setCurrentStep(1);
      setConfirmObligations(false);
      setAgreeTerms(false);
    }, 300);
  };

  // Signature Pad Drawing Logic
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();

    let clientX, clientY;
    if ("touches" in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    ctx.moveTo(clientX - rect.left, clientY - rect.top);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();

    let clientX, clientY;
    if ("touches" in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.strokeStyle = COLORS.SECONDARY;
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleCloseModal}
      maxWidth="sm"
      fullWidth
      scroll="body"
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: "24px",
          p: 4,
          overflow: "visible",
          boxShadow: "0px 10px 40px rgba(0, 0, 0, 0.08)",
        },
      }}
    >
      {/* Modal Header */}
      <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
        <Box>
          <Typography
            sx={{
              fontFamily: poppins700.style.fontFamily,
              fontWeight: 700,
              fontSize: "19px",
              color: COLORS.SECONDARY,
            }}
          >
            {`Apply for Contract Transfer (Step ${currentStep})`}
          </Typography>
          <Typography
            sx={{
              fontFamily: poppins.style.fontFamily,
              fontWeight: 500,
              fontSize: "12px",
              color: "#7A9BAB",
              mt: 0.25,
            }}
          >
            Complete the steps below to secure your interest
          </Typography>
        </Box>
        <IconButton
          onClick={handleCloseModal}
          sx={{
            width: 32,
            height: 32,
            backgroundColor: "rgba(1, 53, 71, 0.03)",
            color: COLORS.SECONDARY,
            "&:hover": { backgroundColor: "rgba(1, 53, 71, 0.08)" },
          }}
        >
          <Close sx={{ fontSize: 16 }} />
        </IconButton>
      </Stack>

      {/* Wizard Stepper Progress bar */}
      <Box sx={{ mb: 4 }}>
        <Stack direction="row" sx={{ justifyContent: "space-between", position: "relative" }}>
          {/* Background line */}
          <Box
            sx={{
              position: "absolute",
              top: 10,
              left: "12%",
              right: "12%",
              height: 2,
              backgroundColor: "#EDF1F2",
              zIndex: 0,
            }}
          />
          {/* Progress line */}
          <Box
            sx={{
              position: "absolute",
              top: 10,
              left: "12%",
              width: `${(currentStep - 1) * 33.33}%`,
              height: 2,
              backgroundColor: COLORS.SECONDARY,
              zIndex: 1,
              transition: "width 0.3s ease",
            }}
          />

          {stepsConfig.map((step) => {
            const isCompleted = currentStep > step.id;
            const isCurrent = currentStep === step.id;
            return (
              <Stack key={step.id} sx={{ alignItems: "center", zIndex: 2, width: "25%" }}>
                <Box
                  sx={{
                    width: 22,
                    height: 22,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: isCompleted || isCurrent ? COLORS.SECONDARY : "#FFFFFF",
                    border: `2px solid ${isCompleted || isCurrent ? COLORS.SECONDARY : "#EDF1F2"}`,
                    color: "#FFFFFF",
                    fontSize: "10px",
                    fontWeight: 700,
                    fontFamily: poppins700.style.fontFamily,
                    mb: 1,
                    transition: "all 0.3s ease",
                  }}
                >
                  {isCompleted ? <CheckCircle sx={{ fontSize: 14 }} /> : step.id}
                </Box>
                <Typography
                  sx={{
                    fontFamily: poppins700.style.fontFamily,
                    fontWeight: isCurrent ? 700 : 500,
                    fontSize: "10px",
                    color: isCurrent ? COLORS.SECONDARY : "#A0B1B9",
                    textTransform: "uppercase",
                  }}
                >
                  {step.label}
                </Typography>
              </Stack>
            );
          })}
        </Stack>
      </Box>

      {/* -------------------- STEP 1: FINANCIALS -------------------- */}
      {currentStep === 1 && (
        <Box>
          <Box sx={{ backgroundColor: "#F4F7F8", borderRadius: "16px", p: 2.5, mb: 3 }}>
            <Stack direction="row" spacing={1.5} sx={{ alignItems: "center", mb: 2 }}>
              <ErrorOutlined sx={{ fontSize: 18, color: "#E7BA49" }} />
              <Typography sx={{ fontFamily: poppins700.style.fontFamily, fontWeight: 700, fontSize: "13px", color: COLORS.SECONDARY }}>
                Important Financial Disclosure
              </Typography>
            </Stack>
            <Typography sx={{ fontFamily: poppins.style.fontFamily, fontWeight: 500, fontSize: "12px", color: "#5A7A8A", lineHeight: 1.6 }}>
              By proceeding, you acknowledge that you are responsible for the remaining lease value of{" "}
              <Box component="span" sx={{ fontWeight: 700, color: COLORS.SECONDARY }}>
                203,000 SAR
              </Box>{" "}
              and the one-time transfer fee of{" "}
              <Box component="span" sx={{ fontWeight: 700, color: COLORS.SECONDARY }}>
                2,500 SAR
              </Box>
              .
            </Typography>
          </Box>

          <Box sx={{ backgroundColor: "#FFFFFF", borderRadius: "16px", p: 2.5, border: "1px solid #01354714", mb: 3 }}>
            <Stack direction="row" sx={{ justifyContent: "space-between", mb: 1.5 }}>
              <Typography sx={{ fontFamily: poppins.style.fontFamily, fontSize: "13px", color: "#7A9BAB", fontWeight: 500 }}>
                Transfer Fee
              </Typography>
              <Typography sx={{ fontFamily: poppins700.style.fontFamily, fontSize: "13px", color: COLORS.SECONDARY }}>
                2,500 SAR
              </Typography>
            </Stack>
            <Stack direction="row" sx={{ justifyContent: "space-between", mb: 1.5 }}>
              <Typography sx={{ fontFamily: poppins.style.fontFamily, fontSize: "13px", color: "#7A9BAB", fontWeight: 500 }}>
                Initial Deposit
              </Typography>
              <Typography sx={{ fontFamily: poppins700.style.fontFamily, fontSize: "13px", color: COLORS.SECONDARY }}>
                17,000 SAR
              </Typography>
            </Stack>
            <Divider sx={{ my: 1.5, borderColor: "#0135470D" }} />
            <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
              <Typography sx={{ fontFamily: poppins700.style.fontFamily, fontSize: "12px", color: COLORS.SECONDARY, textTransform: "uppercase" }}>
                Total Due Now
              </Typography>
              <Typography sx={{ fontFamily: poppins700.style.fontFamily, fontSize: "18px", color: COLORS.SECONDARY }}>
                19,500 SAR
              </Typography>
            </Stack>
          </Box>

          <Stack direction="row" spacing={1.5} sx={{ alignItems: "flex-start", backgroundColor: "rgba(1, 53, 71, 0.02)", p: 2, borderRadius: "12px" }}>
            <Checkbox
              checked={confirmObligations}
              onChange={(e) => setConfirmObligations(e.target.checked)}
              sx={{ p: 0, color: "#01354733", "&.Mui-checked": { color: COLORS.SECONDARY } }}
            />
            <Typography sx={{ fontFamily: poppins.style.fontFamily, fontSize: "11px", color: "#5A7A8A", lineHeight: 1.5, mt: 0.25 }}>
              I confirm that I understand the financial obligations and I am ready to proceed with the payment upon approval.
            </Typography>
          </Stack>

          <Button
            fullWidth
            variant="contained"
            disableElevation
            disabled={!confirmObligations}
            onClick={() => setCurrentStep(2)}
            sx={{
              mt: 4,
              borderRadius: "100px",
              backgroundColor: COLORS.SECONDARY,
              color: COLORS.WHITE,
              py: 1.5,
              fontFamily: poppins700.style.fontFamily,
              fontWeight: 700,
              fontSize: "14px",
              textTransform: "none",
              "&:hover": { backgroundColor: "#002432" },
              "&:disabled": { backgroundColor: "#E0E0E0", color: "#9E9E9E" },
            }}
          >
            Continue to Documents
          </Button>
        </Box>
      )}

      {/* -------------------- STEP 2: DOCUMENTS -------------------- */}
      {currentStep === 2 && (
        <Box>
          <Typography sx={{ fontFamily: poppins.style.fontFamily, fontWeight: 500, fontSize: "13px", color: "#5A7A8A", mb: 3 }}>
            To process the transfer, we need to verify your identity. Please upload a copy of your National ID or Iqama.
          </Typography>

          <Box
            sx={{
              border: "2px dashed #0135471F",
              borderRadius: "16px",
              p: 4,
              textAlign: "center",
              mb: 3,
              backgroundColor: "#FAFAFA",
              cursor: "pointer",
              transition: "all 0.2s",
              "&:hover": { borderColor: COLORS.SECONDARY, backgroundColor: "rgba(1, 53, 71, 0.02)" },
            }}
          >
            <Box sx={{ width: 48, height: 48, borderRadius: "50%", backgroundColor: "#FFFFFF", display: "inline-flex", alignItems: "center", justifyContent: "center", boxShadow: "0px 4px 10px rgba(0,0,0,0.03)", mb: 2 }}>
              <CloudUploadOutlined sx={{ color: COLORS.PRIMARY, fontSize: 24 }} />
            </Box>
            <Typography sx={{ fontFamily: poppins700.style.fontFamily, fontSize: "14px", color: COLORS.SECONDARY, mb: 0.5 }}>
              Click to upload document
            </Typography>
            <Typography sx={{ fontFamily: poppins.style.fontFamily, fontSize: "11px", color: "#7A9BAB" }}>
              PDF, JPG or PNG (Max 5MB)
            </Typography>
          </Box>

          <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => setCurrentStep(1)}
              sx={{
                borderRadius: "100px",
                borderColor: "#0135471F",
                color: COLORS.SECONDARY,
                py: 1.5,
                fontFamily: poppins700.style.fontFamily,
                fontWeight: 700,
                fontSize: "14px",
                textTransform: "none",
                "&:hover": { borderColor: COLORS.SECONDARY, backgroundColor: "rgba(1, 53, 71, 0.02)" },
              }}
            >
              Back
            </Button>
            <Button
              fullWidth
              variant="contained"
              disableElevation
              onClick={() => setCurrentStep(3)}
              sx={{
                borderRadius: "100px",
                backgroundColor: COLORS.SECONDARY,
                color: COLORS.WHITE,
                py: 1.5,
                fontFamily: poppins700.style.fontFamily,
                fontWeight: 700,
                fontSize: "14px",
                textTransform: "none",
                "&:hover": { backgroundColor: "#002432" },
              }}
            >
              Continue to Signature
            </Button>
          </Stack>
        </Box>
      )}

      {/* -------------------- STEP 3: SIGNATURE -------------------- */}
      {currentStep === 3 && (
        <Box>
          <Typography sx={{ fontFamily: poppins.style.fontFamily, fontWeight: 500, fontSize: "13px", color: "#5A7A8A", mb: 3 }}>
            Please draw your signature below to officially request the contract transfer. This acts as a binding intent.
          </Typography>

          <Box sx={{ backgroundColor: "#F9F9F9", border: "1px solid #E0E0E0", borderRadius: "16px", overflow: "hidden", mb: 2 }}>
            {/* Signature Canvas */}
            <canvas
              ref={canvasRef}
              width={500}
              height={200}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
              style={{ width: "100%", cursor: "crosshair", touchAction: "none" }}
            />
          </Box>
          
          <Stack direction="row" sx={{ justifyContent: "flex-end", mb: 3 }}>
            <Button
              size="small"
              onClick={clearCanvas}
              sx={{ fontFamily: poppins.style.fontFamily, fontSize: "11px", color: "#7A9BAB", textTransform: "none" }}
            >
              Clear Signature
            </Button>
          </Stack>

          <Stack direction="row" spacing={1.5} sx={{ alignItems: "flex-start", p: 2, borderRadius: "12px" }}>
            <Checkbox
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              sx={{ p: 0, color: "#01354733", "&.Mui-checked": { color: COLORS.SECONDARY } }}
            />
            <Typography sx={{ fontFamily: poppins.style.fontFamily, fontSize: "11px", color: "#5A7A8A", lineHeight: 1.5, mt: 0.25 }}>
              I agree to the Tnazul Platform Terms & Conditions and authorize this transfer request.
            </Typography>
          </Stack>

          <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => setCurrentStep(2)}
              sx={{
                borderRadius: "100px",
                borderColor: "#0135471F",
                color: COLORS.SECONDARY,
                py: 1.5,
                fontFamily: poppins700.style.fontFamily,
                fontWeight: 700,
                fontSize: "14px",
                textTransform: "none",
                "&:hover": { borderColor: COLORS.SECONDARY, backgroundColor: "rgba(1, 53, 71, 0.02)" },
              }}
            >
              Back
            </Button>
            <Button
              fullWidth
              variant="contained"
              disableElevation
              disabled={!agreeTerms}
              onClick={() => setCurrentStep(4)}
              sx={{
                borderRadius: "100px",
                backgroundColor: COLORS.SECONDARY,
                color: COLORS.WHITE,
                py: 1.5,
                fontFamily: poppins700.style.fontFamily,
                fontWeight: 700,
                fontSize: "14px",
                textTransform: "none",
                "&:hover": { backgroundColor: "#002432" },
                "&:disabled": { backgroundColor: "#E0E0E0", color: "#9E9E9E" },
              }}
            >
              Submit Application
            </Button>
          </Stack>
        </Box>
      )}

      {/* -------------------- STEP 4: SUCCESS -------------------- */}
      {currentStep === 4 && (
        <Box sx={{ textAlign: "center", py: 4 }}>
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              backgroundColor: "rgba(35, 164, 85, 0.1)",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 3,
            }}
          >
            <CheckCircle sx={{ fontSize: 40, color: "#23A455" }} />
          </Box>
          <Typography sx={{ fontFamily: poppins700.style.fontFamily, fontWeight: 700, fontSize: "20px", color: COLORS.SECONDARY, mb: 1 }}>
            Application Submitted!
          </Typography>
          <Typography sx={{ fontFamily: poppins.style.fontFamily, fontWeight: 500, fontSize: "13px", color: "#5A7A8A", mb: 4, px: 2 }}>
            Your transfer request has been sent to the seller. We will notify you once they review and accept your offer.
          </Typography>

          <Stack direction="row" spacing={2}>
            <Button
              fullWidth
              variant="contained"
              disableElevation
              onClick={handleCloseModal}
              sx={{
                borderRadius: "100px",
                backgroundColor: COLORS.SECONDARY,
                color: COLORS.WHITE,
                px: 4,
                py: 1.25,
                fontFamily: poppins700.style.fontFamily,
                fontWeight: 700,
                fontSize: "14px",
                textTransform: "none",
                "&:hover": { backgroundColor: "#002432" },
              }}
            >
              Close
            </Button>
          </Stack>
        </Box>
      )}
    </Dialog>
  );
};
