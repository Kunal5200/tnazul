import React from "react";
import { Box, Typography, Stack, Paper, Avatar } from "@mui/material";
import { Phone, Email } from "@mui/icons-material";
import { poppins, poppins700 } from "@/utils/fonts";
import { COLORS } from "@/utils/enum";

interface ContractSellerProps {
  contractDetails: any;
}

const ContractSeller = ({ contractDetails }: ContractSellerProps) => {
  return (
    <Paper elevation={0} sx={{ p: 4, borderRadius: "24px", border: "1px solid #0135470F", transition: "box-shadow 0.2s ease", "&:hover": { boxShadow: "0px 8px 24px rgba(1, 53, 71, 0.04)" } }}>
      <Typography sx={{ fontFamily: poppins700.style.fontFamily, fontSize: "18px", color: COLORS.SECONDARY, mb: 3 }}>
        Seller Information
      </Typography>
      
      <Stack direction="row" spacing={2} sx={{ alignItems: "center", mb: 3 }}>
        <Avatar sx={{ width: 56, height: 56, backgroundColor: "rgba(231, 186, 73, 0.1)", color: COLORS.PRIMARY, fontFamily: poppins700.style.fontFamily, fontSize: "20px" }}>
          {contractDetails?.createdBy?.name?.charAt(0) || "U"}
        </Avatar>
        <Box>
          <Typography sx={{ fontFamily: poppins700.style.fontFamily, fontSize: "16px", color: COLORS.SECONDARY }}>
            {contractDetails?.createdBy?.name || "Unknown User"}
          </Typography>
          <Typography sx={{ fontFamily: poppins.style.fontFamily, fontSize: "13px", color: "#7A9BAB", fontWeight: 500 }}>
            Member since {contractDetails?.createdAt ? new Date(contractDetails.createdAt).getFullYear() : "N/A"}
          </Typography>
        </Box>
      </Stack>

      <Stack spacing={2.5}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Phone sx={{ color: "#7A9BAB", fontSize: 20 }} />
          <Typography sx={{ fontFamily: poppins.style.fontFamily, fontSize: "14px", color: "#5A7A8A", fontWeight: 500 }}>
            +{contractDetails?.createdBy?.countryCode || "966"} {contractDetails?.createdBy?.phoneNo || "N/A"}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Email sx={{ color: "#7A9BAB", fontSize: 20 }} />
          <Typography sx={{ fontFamily: poppins.style.fontFamily, fontSize: "14px", color: "#5A7A8A", fontWeight: 500, wordBreak: "break-word" }}>
            {contractDetails?.createdBy?.email || "N/A"}
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
};

export default ContractSeller;
