import { Add, NotificationsNoneOutlined, Search } from "@mui/icons-material";
import {
  Box,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import SearchBar from "./SearchBar";
import FilledButton from "../FilledButton";
import { COLORS } from "@/utils/enum";
import { poppins, poppins700 } from "@/utils/fonts";
import Link from "next/link";

const Header = () => {
  return (
    <div>
      <Box
        sx={{
          left: "276px",
          position: "fixed",
          top: 0,
          width: "calc(97.7% - 276px)",
          background: "#F9F8F6EB",
          py: 1,
          borderBottom: "1px solid #01354714",
          px: 2,
        }}
      >
        <Stack
          direction={"row"}
          sx={{ alignItems: "center", justifyContent: "space-between" }}
        >
          <SearchBar />
          <Link href={"/dashboard/contracts/create"}>
            <FilledButton
              startIcon={<Add />}
              sx={{
                backgroundColor: COLORS.PRIMARY,

                borderRadius: "20px",
                padding: "13px 21px",
                textTransform: "none",
                color: COLORS.BLACK,
              }}
            >
              <Typography
                sx={{
                  fontFamily: poppins700.style.fontFamily,
                  fontWeight: 700,
                  color: COLORS.BLACK,
                }}
              >
                Add Contract
              </Typography>
            </FilledButton>
          </Link>
          <IconButton
            sx={{
              borderRadius: "20px",
              height: 50,
              width: 50,
              backgroundColor: "#0135470A",
            }}
          >
            <NotificationsNoneOutlined />
          </IconButton>
        </Stack>
      </Box>
    </div>
  );
};

export default Header;
