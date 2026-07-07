import { Search } from "@mui/icons-material";
import { InputAdornment, TextField } from "@mui/material";
import React from "react";

const SearchBar = () => {
  return (
    <div>
      <TextField
        placeholder="Search contracts by type, location, or keyword..."
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          },
        }}
        sx={{
          width: 660,
          backgroundColor: "#EEF6FA",
          "& fieldset": {
            border: "none",
            borderRadius: "20px",
          },
          borderRadius: "20px",
        }}
      />
    </div>
  );
};

export default SearchBar;
