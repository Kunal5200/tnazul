"use client";

import React, { useRef } from "react";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import {
  ArrowBack,
  ArrowForward,
  CloudUploadOutlined,
  DeleteOutlined,
  ShieldOutlined,
} from "@mui/icons-material";
import { COLORS } from "@/utils/enum";
import { poppins, poppins700 } from "@/utils/fonts";

interface AttachmentsFormProps {
  formData: any;
  updateFormData: (fields: any) => void;
  onBack: () => void;
  onNext: () => void;
}

const AttachmentsForm = ({
  formData,
  updateFormData,
  onBack,
  onNext,
}: AttachmentsFormProps) => {
  const { contractDocuments, assetPhotos } = formData;

  const docInputRef = useRef<HTMLInputElement>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);

  // Helper to format file sizes
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  // Document upload handers
  const handleDocUpload = (files: FileList | null) => {
    if (!files) return;
    const newDocs = [...contractDocuments];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      // Max 5MB
      if (file.size > 5 * 1024 * 1024) {
        alert(`File ${file.name} exceeds the 5MB size limit.`);
        continue;
      }
      newDocs.push({
        name: file.name,
        size: file.size,
        type: file.type,
        // Mock preview string or standard file handling
        content: URL.createObjectURL(file),
      });
    }
    updateFormData({ contractDocuments: newDocs });
  };

  const removeDoc = (index: number) => {
    const newDocs = contractDocuments.filter(
      (_: any, i: number) => i !== index,
    );
    updateFormData({ contractDocuments: newDocs });
  };

  // Asset photo upload handlers
  const handlePhotoUpload = (files: FileList | null) => {
    if (!files) return;
    const newPhotos = [...assetPhotos];
    if (newPhotos.length + files.length > 10) {
      alert("You can upload a maximum of 10 photos.");
      return;
    }
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      // Max 5MB
      if (file.size > 5 * 1024 * 1024) {
        alert(`File ${file.name} exceeds the 5MB size limit.`);
        continue;
      }
      newPhotos.push({
        name: file.name,
        size: file.size,
        type: file.type,
        content: URL.createObjectURL(file),
        file: file,
      });
    }
    updateFormData({ assetPhotos: newPhotos });
  };

  const removePhoto = (index: number) => {
    const newPhotos = assetPhotos.filter((_: any, i: number) => i !== index);
    updateFormData({ assetPhotos: newPhotos });
  };

  // Drag and drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDocDrop = (e: React.DragEvent) => {
    e.preventDefault();
    handleDocUpload(e.dataTransfer.files);
  };

  const handlePhotoDrop = (e: React.DragEvent) => {
    e.preventDefault();
    handlePhotoUpload(e.dataTransfer.files);
  };

  const isFormValid = contractDocuments.length > 0;

  return (
    <Box
      sx={{
        backgroundColor: COLORS.WHITE,
        borderRadius: "24px",
        boxShadow: "0px 8px 30px rgba(1, 53, 71, 0.04)",
        p: { xs: 3, md: 4 },
        width: "100%",
        border: "1px solid #01354705",
      }}
    >
      <form onSubmit={(e) => e.preventDefault()}>
        <Stack spacing={4}>
          {/* Section 1: Contract Documents */}
          <Box>
            <Typography
              sx={{
                fontFamily: poppins700.style.fontFamily,
                fontSize: "11px",
                fontWeight: 700,
                color: COLORS.SECONDARY,
                letterSpacing: "0.5px",
                mb: 0.5,
              }}
            >
              CONTRACT DOCUMENTS{" "}
              <span style={{ color: COLORS.PRIMARY }}>*</span>
            </Typography>
            <Typography
              sx={{
                fontFamily: poppins.style.fontFamily,
                fontSize: "12px",
                color: "#667085",
                mb: 2,
              }}
            >
              Upload the official contract, any amendments, or supporting legal
              documents.
            </Typography>

            {/* Hidden Input */}
            <input
              type="file"
              ref={docInputRef}
              multiple
              accept=".pdf,.jpg,.jpeg,.png"
              style={{ display: "none" }}
              onChange={(e) => handleDocUpload(e.target.files)}
            />

            {/* Upload Box */}
            <Box
              onClick={() => docInputRef.current?.click()}
              onDragOver={handleDragOver}
              onDrop={handleDocDrop}
              sx={{
                border: "1px dashed #D0D5DD",
                borderRadius: "16px",
                backgroundColor: "#F9FAFB",
                py: 4,
                px: 2,
                textAlign: "center",
                cursor: "pointer",
                transition: "all 0.2s ease",
                "&:hover": {
                  backgroundColor: "#F2F4F7",
                  borderColor: COLORS.PRIMARY,
                },
              }}
            >
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  backgroundColor: "#F2F4F7",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 1.5,
                }}
              >
                <CloudUploadOutlined sx={{ color: "#667085", fontSize: 22 }} />
              </Box>
              <Typography
                sx={{
                  fontFamily: poppins700.style.fontFamily,
                  fontSize: "14px",
                  fontWeight: 700,
                  color: COLORS.SECONDARY,
                  mb: 0.5,
                }}
              >
                Drag & drop contract files here
              </Typography>
              <Typography
                sx={{
                  fontFamily: poppins.style.fontFamily,
                  fontSize: "12px",
                  color: "#667085",
                }}
              >
                PDF, JPG, PNG accepted - Max 5MB per file
              </Typography>
            </Box>

            {/* List of uploaded docs */}
            {contractDocuments.length > 0 && (
              <Stack spacing={1} sx={{ mt: 2 }}>
                {contractDocuments.map((doc: any, index: number) => (
                  <Stack
                    key={index}
                    direction="row"
                    sx={{
                      alignItems: "center",
                      justifyContent: "space-between",
                      p: 1.5,
                      borderRadius: "10px",
                      backgroundColor: "#F8F9FA",
                      border: "1px solid #EAECF0",
                    }}
                  >
                    <Stack
                      direction="row"
                      spacing={1.5}
                      sx={{ alignItems: "center" }}
                    >
                      <Box
                        sx={{
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          backgroundColor: COLORS.PRIMARY,
                        }}
                      />
                      <Box>
                        <Typography
                          sx={{
                            fontFamily: poppins700.style.fontFamily,
                            fontSize: "13px",
                            fontWeight: 700,
                            color: COLORS.SECONDARY,
                          }}
                        >
                          {doc.name}
                        </Typography>
                        <Typography
                          sx={{
                            fontFamily: poppins.style.fontFamily,
                            fontSize: "11px",
                            color: "#667085",
                          }}
                        >
                          {formatFileSize(doc.size)}
                        </Typography>
                      </Box>
                    </Stack>
                    <IconButton
                      size="small"
                      onClick={() => removeDoc(index)}
                      sx={{ color: "#F04438" }}
                    >
                      <DeleteOutlined fontSize="small" />
                    </IconButton>
                  </Stack>
                ))}
              </Stack>
            )}
          </Box>

          {/* Section 2: Asset Photos */}
          <Box>
            <Typography
              sx={{
                fontFamily: poppins700.style.fontFamily,
                fontSize: "11px",
                fontWeight: 700,
                color: COLORS.SECONDARY,
                letterSpacing: "0.5px",
                mb: 0.5,
              }}
            >
              ASSET PHOTOS
            </Typography>
            <Typography
              sx={{
                fontFamily: poppins.style.fontFamily,
                fontSize: "12px",
                color: "#667085",
                mb: 2,
              }}
            >
              Photos of the property, vehicle, or business space. High-quality
              photos attract 3x more inquiries.
            </Typography>

            {/* Hidden Input */}
            <input
              type="file"
              ref={photoInputRef}
              multiple
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) => handlePhotoUpload(e.target.files)}
            />

            {/* Upload Box */}
            <Box
              onClick={() => photoInputRef.current?.click()}
              onDragOver={handleDragOver}
              onDrop={handlePhotoDrop}
              sx={{
                border: "1px dashed #D0D5DD",
                borderRadius: "16px",
                backgroundColor: "#F9FAFB",
                py: 4,
                px: 2,
                textAlign: "center",
                cursor: "pointer",
                transition: "all 0.2s ease",
                "&:hover": {
                  backgroundColor: "#F2F4F7",
                  borderColor: COLORS.PRIMARY,
                },
              }}
            >
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  backgroundColor: "#F2F4F7",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 1.5,
                }}
              >
                <CloudUploadOutlined sx={{ color: "#667085", fontSize: 22 }} />
              </Box>
              <Typography
                sx={{
                  fontFamily: poppins700.style.fontFamily,
                  fontSize: "14px",
                  fontWeight: 700,
                  color: COLORS.SECONDARY,
                  mb: 0.5,
                }}
              >
                Upload property / asset photos
              </Typography>
              <Typography
                sx={{
                  fontFamily: poppins.style.fontFamily,
                  fontSize: "12px",
                  color: "#667085",
                }}
              >
                JPG, PNG accepted - Max 5MB per file - Up to 10 images
              </Typography>
            </Box>

            {/* List of uploaded photos */}
            {assetPhotos.length > 0 && (
              <Grid container spacing={2} sx={{ mt: 2 }}>
                {assetPhotos.map((photo: any, index: number) => (
                  <Grid size={{ xs: 6, sm: 4, md: 3 }} key={index}>
                    <Box
                      sx={{
                        position: "relative",
                        borderRadius: "10px",
                        border: "1px solid #EAECF0",
                        overflow: "hidden",
                        paddingTop: "75%", // 4:3 Aspect Ratio
                        backgroundColor: "#F2F4F7",
                      }}
                    >
                      {/* Thumbnail Image */}
                      <Box
                        component="img"
                        src={photo.content}
                        alt={`photo preview ${index}`}
                        sx={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                      <IconButton
                        size="small"
                        onClick={() => removePhoto(index)}
                        sx={{
                          position: "absolute",
                          top: 4,
                          right: 4,
                          backgroundColor: "rgba(255, 255, 255, 0.9)",
                          color: "#F04438",
                          "&:hover": {
                            backgroundColor: "#FFF",
                          },
                        }}
                      >
                        <DeleteOutlined fontSize="small" />
                      </IconButton>
                    </Box>
                    <Typography
                      noWrap
                      sx={{
                        fontFamily: poppins.style.fontFamily,
                        fontSize: "11px",
                        color: COLORS.SECONDARY,
                        mt: 0.5,
                        px: 0.5,
                      }}
                    >
                      {photo.name}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>

          {/* Privacy Disclaimer Box */}
          <Box
            sx={{
              backgroundColor: "#EFF8FF",
              border: "1px solid #B9E6FE",
              borderRadius: "14px",
              p: 2.5,
              display: "flex",
              alignItems: "flex-start",
              gap: 2,
            }}
          >
            <ShieldOutlined sx={{ color: "#1570EF", mt: 0.2 }} />
            <Box>
              <Typography
                sx={{
                  fontFamily: poppins700.style.fontFamily,
                  fontSize: "14px",
                  fontWeight: 700,
                  color: "#1570EF",
                  mb: 0.5,
                }}
              >
                Document Privacy Protected
              </Typography>
              <Typography
                sx={{
                  fontFamily: poppins.style.fontFamily,
                  fontSize: "12px",
                  color: "#175CD3",
                  lineHeight: 1.5,
                }}
              >
                Uploaded contract files are{" "}
                <strong>
                  only visible to registered, identity-verified users
                </strong>{" "}
                who express interest in your listing. Asset photos are publicly
                visible to attract buyers.
              </Typography>
            </Box>
          </Box>
        </Stack>

        {/* Bottom Navigation */}
        <Stack
          direction="row"
          sx={{
            alignItems: "center",
            justifyContent: "space-between",
            mt: 5,
            pt: 2,
            borderTop: "1px solid #F2F4F7",
          }}
        >
          {/* Back Button */}
          <Button
            variant="outlined"
            onClick={onBack}
            startIcon={<ArrowBack />}
            sx={{
              borderRadius: "14px",
              border: "1px solid #E4E7EC",
              color: COLORS.SECONDARY,
              px: 3,
              py: 1.5,
              textTransform: "none",
              fontFamily: poppins700.style.fontFamily,
              fontWeight: 700,
              fontSize: "14px",
              "&:hover": {
                backgroundColor: "#F9FAFB",
                borderColor: "#D0D5DD",
              },
            }}
          >
            Back
          </Button>

          {/* Continue Button */}
          <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
            {!isFormValid && (
              <Typography
                sx={{
                  fontFamily: poppins.style.fontFamily,
                  fontSize: "12px",
                  color: "#98A2B3",
                }}
              >
                Fill required fields to continue
              </Typography>
            )}
            <Button
              variant="contained"
              onClick={onNext}
              endIcon={<ArrowForward />}
              disabled={!isFormValid}
              sx={{
                borderRadius: "14px",
                backgroundColor: isFormValid ? COLORS.SECONDARY : "#E4E7EC",
                color: isFormValid ? COLORS.WHITE : "#98A2B3",
                px: 4,
                py: 1.5,
                textTransform: "none",
                fontFamily: poppins700.style.fontFamily,
                fontWeight: 700,
                fontSize: "14px",
                boxShadow: "none",
                "&:hover": {
                  backgroundColor: isFormValid
                    ? "rgba(1, 53, 71, 0.9)"
                    : "#E4E7EC",
                  boxShadow: "none",
                },
                "&.Mui-disabled": {
                  backgroundColor: "#E4E7EC",
                  color: "#98A2B3",
                },
              }}
            >
              Review Listing
            </Button>
          </Stack>
        </Stack>
      </form>
    </Box>
  );
};

export default AttachmentsForm;
