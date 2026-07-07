import { Box, IconButton, Stack } from "@mui/material";
import Image from "next/image";
import React from "react";
import logo from "@/logo/logo.png";
import { COLORS } from "@/utils/enum";
import { ArrowBackIosNew } from "@mui/icons-material";

const LogoBox = () => {
  return (
    <div>
      <Stack
        direction={"row"}
        sx={{ alignItems: "center", justifyContent: "space-between", p: 1 }}
      >
        <Image src={logo} alt="" />
        <IconButton
          sx={{
            width: 27,
            height: 27,
            borderRadius: "5px",
            backgroundColor: COLORS.lightGray,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ArrowBackIosNew sx={{ width: 12, height: 12 }} />
        </IconButton>
      </Stack>
      <Box sx={{ borderBottom: "1px solid #01354717" }}></Box>
    </div>
  );
};

export default LogoBox;
