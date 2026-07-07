import { Button, SvgIcon, SvgIconProps } from "@mui/material";
import React from "react";
import { poppins700 } from "@/utils/fonts";

const WhatsAppIcon = (props: SvgIconProps) => (
  <SvgIcon {...props} viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 001.37 5.054L2 22l5.077-1.331a9.92 9.92 0 004.93 1.317h.004c5.505 0 9.988-4.478 9.99-9.986A9.97 9.97 0 0012.012 2zm5.82 14.183c-.32.905-1.6 1.634-2.285 1.73-.666.096-1.528.163-2.484-.145-3.754-1.21-6.195-5.01-6.38-5.258-.184-.247-1.5-1.993-1.5-3.805 0-1.812.946-2.704 1.285-3.053.339-.348.74-.436.985-.436.247 0 .495.002.71.011.23.01.536-.089.84.646.31.748 1.058 2.585 1.15 2.771.093.186.155.403.031.65-.124.248-.186.372-.372.588-.186.217-.39.484-.557.65-.186.186-.38.389-.164.76.216.372.96 1.583 2.057 2.558 1.415 1.26 2.607 1.65 2.978 1.835.372.186.588.155.805-.093.217-.248.928-1.082 1.176-1.453.247-.372.495-.31.826-.186.33.124 2.106 1.021 2.467 1.201.36.18.6.268.68.412.083.145.083.826-.237 1.73z"
    />
  </SvgIcon>
);

const WhatsAppButton = () => {
  return (
    <Button
      variant="contained"
      startIcon={<WhatsAppIcon sx={{ width: 20, height: 20 }} />}
      sx={{
        position: "fixed",
        bottom: 24,
        right: 24,
        backgroundColor: "#25D366",
        color: "#ffffff",
        borderRadius: "30px",
        px: 3,
        py: 1.5,
        textTransform: "none",
        fontFamily: poppins700.style.fontFamily,
        fontWeight: 700,
        fontSize: "14px",
        boxShadow: "0px 8px 24px rgba(37, 211, 102, 0.3)",
        zIndex: 1000,
        "&:hover": {
          backgroundColor: "#20ba56",
          boxShadow: "0px 10px 28px rgba(37, 211, 102, 0.4)",
        },
      }}
    >
      Chat with Us
    </Button>
  );
};

export default WhatsAppButton;
