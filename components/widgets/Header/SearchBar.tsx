import { Search } from "@mui/icons-material";
import { InputAdornment, TextField } from "@mui/material";
import React from "react";
import { poppins } from "@/utils/fonts";

const SearchBar = () => {
  return (
    <TextField
      placeholder="Search contracts by type, location, or keyword..."
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start" sx={{ mr: 0.5 }}>
              <Search sx={{ color: "#7A9BAB", fontSize: 22 }} />
            </InputAdornment>
          ),
        },
      }}
      sx={{
        width: "100%",
        maxWidth: 480,
        minWidth: 200,
        backgroundColor: "#EEF6FA",
        borderRadius: "100px",
        "& .MuiOutlinedInput-root": {
          borderRadius: "100px",
          height: "46px",
          fontFamily: poppins.style.fontFamily,
          fontSize: "14px",
          fontWeight: 500,
          color: "#013547",
          paddingLeft: "16px",
          "& fieldset": {
            border: "none",
          },
          "&.Mui-focused fieldset": {
            border: "none",
          },
        },
        "& .MuiInputBase-input::placeholder": {
          color: "#7A9BAB",
          opacity: 1,
        },
      }}
    />
  );
};

export default SearchBar;

