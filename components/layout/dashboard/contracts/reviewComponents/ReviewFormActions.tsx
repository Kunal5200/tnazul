import React from "react";
import { Box, Button, CircularProgress, Grid, Stack, Typography } from "@mui/material";
import { ArrowBack, DescriptionOutlined } from "@mui/icons-material";
import { COLORS } from "@/utils/enum";
import { poppins, poppins700 } from "@/utils/fonts";

interface ReviewFormActionsProps {
  onBack: () => void;
  onPublish: () => void;
  onSaveDraft: () => void;
  loading: boolean;
}

export const ReviewFormActions: React.FC<ReviewFormActionsProps> = ({
  onBack,
  onPublish,
  onSaveDraft,
  loading,
}) => {
  return (
    <Box sx={{ mt: 5, pt: 3, borderTop: "1px solid #F2F4F7" }}>
      <Grid container spacing={2} sx={{ alignItems: "center" }}>
        {/* Back Button */}
        <Grid size={{ xs: 12, sm: 3 }}>
          <Button
            variant="outlined"
            onClick={onBack}
            startIcon={<ArrowBack />}
            fullWidth
            sx={{
              borderRadius: "14px",
              border: "1px solid #E4E7EC",
              color: COLORS.SECONDARY,
              py: 1.8,
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
        </Grid>

        {/* Action Buttons: Publish & Save Draft */}
        <Grid size={{ xs: 12, sm: 9 }}>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            {/* Publish Button */}
            <Button
              variant="contained"
              fullWidth
              disabled={loading}
              onClick={onPublish}
              startIcon={
                loading ? <CircularProgress size={18} color="inherit" /> : null
              }
              sx={{
                borderRadius: "14px",
                backgroundColor: COLORS.SECONDARY,
                color: COLORS.WHITE,
                py: 1.8,
                textTransform: "none",
                fontFamily: poppins700.style.fontFamily,
                fontWeight: 700,
                fontSize: "14px",
                boxShadow: "none",
                "&:hover": {
                  backgroundColor: "rgba(1, 53, 71, 0.9)",
                  boxShadow: "none",
                },
              }}
            >
              {loading ? "Publishing..." : "Publish Contract"}
            </Button>

            {/* Save Draft Button */}
            <Button
              variant="outlined"
              fullWidth
              disabled={loading}
              startIcon={
                loading ? (
                  <CircularProgress size={18} color="inherit" />
                ) : (
                  <DescriptionOutlined />
                )
              }
              onClick={onSaveDraft}
              sx={{
                borderRadius: "14px",
                border: "1px solid #E4E7EC",
                color: COLORS.SECONDARY,
                py: 1.8,
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
              {loading ? "Saving..." : "Save Draft"}
            </Button>
          </Stack>
        </Grid>
      </Grid>

      <Typography
        sx={{
          fontFamily: poppins.style.fontFamily,
          fontSize: "11px",
          color: "#98A2B3",
          textAlign: "center",
          mt: 3,
          lineHeight: 1.5,
        }}
      >
        By publishing you agree to the Tnazul Listing Terms. Your listing will
        not appear publicly until reviewed and approved.
      </Typography>
    </Box>
  );
};

export default ReviewFormActions;
