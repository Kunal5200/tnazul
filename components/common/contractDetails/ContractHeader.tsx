import React from "react";
import { useRouter } from "next/navigation";
import { Box, Button, Typography, Stack, Chip } from "@mui/material";
import { ArrowBack, Check, Close, LocationOn } from "@mui/icons-material";
import { poppins, poppins700 } from "@/utils/fonts";
import { COLORS } from "@/utils/enum";

interface ContractHeaderProps {
  contractDetails: any;
  isAdmin: boolean;
  onApprove: () => void;
  onReject: () => void;
}

const ContractHeader = ({ contractDetails, isAdmin, onApprove, onReject }: ContractHeaderProps) => {
  const router = useRouter();

  return (
    <Box sx={{ mb: 4 }}>
      <Button 
        startIcon={<ArrowBack />}
        onClick={() => router.back()}
        sx={{ 
          color: "#7A9BAB", 
          textTransform: "none", 
          fontFamily: poppins700.style.fontFamily,
          fontWeight: 700,
          mb: 2,
          "&:hover": { backgroundColor: "transparent", color: COLORS.SECONDARY }
        }}
      >
        Back to Queue
      </Button>

      <Stack direction={{ xs: "column", md: "row" }} spacing={3} sx={{ justifyContent: "space-between", alignItems: { xs: "flex-start", md: "center" } }}>
        <Box>
          <Typography 
            sx={{ 
              fontFamily: poppins700.style.fontFamily, 
              fontSize: { xs: "24px", md: "32px" }, 
              color: COLORS.SECONDARY,
              lineHeight: 1.2,
              mb: 1
            }}
          >
            {contractDetails?.contractTitle || "Contract Title"}
          </Typography>
          <Stack direction="row" spacing={1.5} sx={{ alignItems: "center", flexWrap: "wrap", rowGap: 1 }}>
            <Chip 
              label={contractDetails?.contractStatus || "N/A"}
              size="small"
              sx={{ 
                backgroundColor: "rgba(35, 164, 85, 0.1)", 
                color: "#23A455",
                fontFamily: poppins700.style.fontFamily,
                fontSize: "12px",
                fontWeight: 700,
                borderRadius: "6px"
              }} 
            />
            <Typography sx={{ fontFamily: poppins.style.fontFamily, fontSize: "14px", color: "#7A9BAB", fontWeight: 500 }}>
              Contract #{contractDetails?.contractNumber || "-"}
            </Typography>
            <Typography sx={{ color: "#7A9BAB" }}>•</Typography>
            <Box sx={{ display: "flex", alignItems: "center", color: "#7A9BAB" }}>
              <LocationOn sx={{ fontSize: 16, mr: 0.5 }} />
              <Typography sx={{ fontFamily: poppins.style.fontFamily, fontSize: "14px", fontWeight: 500 }}>
                {contractDetails?.city || ""}, {contractDetails?.districtOrNeighborhood || ""}
              </Typography>
            </Box>
          </Stack>
        </Box>

        {/* Admin Actions */}
        {isAdmin && (
          <Stack direction="row" spacing={2} sx={{ width: { xs: "100%", md: "auto" } }}>
            <Button
              variant="outlined"
              startIcon={<Close />}
              onClick={onReject}
              fullWidth
              sx={{
                color: "#FF4D4D",
                borderColor: "rgba(255, 77, 77, 0.4)",
                borderRadius: "100px",
                textTransform: "none",
                fontFamily: poppins700.style.fontFamily,
                px: 3.5,
                py: 1.2,
                backgroundColor: COLORS.WHITE,
                "&:hover": {
                  borderColor: "#FF4D4D",
                  backgroundColor: "rgba(255, 77, 77, 0.05)",
                },
              }}
            >
              Reject
            </Button>
            <Button
              variant="contained"
              disableElevation
              startIcon={<Check />}
              onClick={onApprove}
              fullWidth
              sx={{
                backgroundColor: "#23A455",
                color: COLORS.WHITE,
                borderRadius: "100px",
                textTransform: "none",
                fontFamily: poppins700.style.fontFamily,
                px: 3.5,
                py: 1.2,
                "&:hover": {
                  backgroundColor: "#1E8E49",
                },
              }}
            >
              Approve
            </Button>
          </Stack>
        )}
      </Stack>
    </Box>
  );
};

export default ContractHeader;
