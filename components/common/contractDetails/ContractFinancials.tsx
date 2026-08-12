import React from "react";
import { Box, Typography, Stack, Paper, Divider } from "@mui/material";
import { poppins, poppins700 } from "@/utils/fonts";
import { COLORS } from "@/utils/enum";

interface ContractFinancialsProps {
  contractDetails: any;
}

const ContractFinancials = ({ contractDetails }: ContractFinancialsProps) => {
  const currency = contractDetails?.currency || "SAR";

  return (
    <Paper elevation={0} sx={{ p: 4, borderRadius: "24px", border: "1px solid #0135470F", mb: 4, transition: "box-shadow 0.2s ease", "&:hover": { boxShadow: "0px 8px 24px rgba(1, 53, 71, 0.04)" } }}>
      <Typography sx={{ fontFamily: poppins700.style.fontFamily, fontSize: "18px", color: COLORS.SECONDARY, mb: 3 }}>
        Financial Overview
      </Typography>
      
      <Box sx={{ mb: 3 }}>
        <Typography sx={{ fontFamily: poppins.style.fontFamily, fontSize: "14px", color: "#7A9BAB", mb: 0.5, fontWeight: 500 }}>
          Total Contract Value
        </Typography>
        <Typography sx={{ fontFamily: poppins700.style.fontFamily, fontSize: "28px", color: COLORS.PRIMARY }}>
          {currency} {contractDetails?.totalContractValue?.toLocaleString() || "0"}
        </Typography>
      </Box>

      <Stack spacing={2.5}>
        <Stack direction="row" sx={{ justifyContent: "space-between" }}>
          <Typography sx={{ fontFamily: poppins.style.fontFamily, fontSize: "14px", color: "#5A7A8A", fontWeight: 500 }}>
            Monthly Amount
          </Typography>
          <Typography sx={{ fontFamily: poppins700.style.fontFamily, fontSize: "15px", color: COLORS.SECONDARY }}>
            {currency} {contractDetails?.monthlyAmount?.toLocaleString() || "0"}
          </Typography>
        </Stack>
        <Divider sx={{ borderColor: "#0135470F" }} />
        <Stack direction="row" sx={{ justifyContent: "space-between" }}>
          <Typography sx={{ fontFamily: poppins.style.fontFamily, fontSize: "14px", color: "#5A7A8A", fontWeight: 500 }}>
            Security Deposit
          </Typography>
          <Typography sx={{ fontFamily: poppins700.style.fontFamily, fontSize: "15px", color: COLORS.SECONDARY }}>
            {currency} {contractDetails?.securityDeposit?.toLocaleString() || "0"}
          </Typography>
        </Stack>
        <Divider sx={{ borderColor: "#0135470F" }} />
        <Stack direction="row" sx={{ justifyContent: "space-between" }}>
          <Typography sx={{ fontFamily: poppins.style.fontFamily, fontSize: "14px", color: "#5A7A8A", fontWeight: 500 }}>
            Transfer Fee
          </Typography>
          <Typography sx={{ fontFamily: poppins700.style.fontFamily, fontSize: "15px", color: COLORS.SECONDARY }}>
            {currency} {contractDetails?.transferFee?.toLocaleString() || "0"}
          </Typography>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default ContractFinancials;
