import { COLORS } from "@/utils/enum";
import { LINK_BOX } from "@/utils/types";
import {
  Box,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { poppins } from "@/utils/fonts";

const LinkBox = ({ data }: { data: LINK_BOX[] }) => {
  const pathname = usePathname();

  return (
    <Box sx={{ px: 1.5, py: 1 }}>
      <List sx={{ p: 0 }}>
        {data.map((val, i) => {
          const isActive = pathname === val.url;

          return (
            <Link href={val.url} key={i} style={{ textDecoration: "none" }}>
              <ListItemButton
                selected={isActive}
                sx={{
                  borderRadius: "12px",
                  mb: 0.5,
                  py: 1,
                  px: 2,
                  backgroundColor: isActive ? COLORS.SECONDARY : "transparent",
                  "&:hover": {
                    backgroundColor: isActive ? COLORS.SECONDARY : "#EEF6FA",
                  },
                  "&.Mui-selected": {
                    backgroundColor: COLORS.SECONDARY,
                    "&:hover": {
                      backgroundColor: COLORS.SECONDARY,
                    },
                  },
                }}
              >
                <ListItemAvatar sx={{ minWidth: 32, display: "flex", alignItems: "center" }}>
                  <val.icon
                    sx={{
                      color: isActive ? COLORS.WHITE : COLORS.SIDEBAR_ICON_COLOR,
                      fontSize: 22,
                    }}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={val.label}
                  slotProps={{
                    primary: {
                      sx: {
                        color: isActive ? COLORS.WHITE : COLORS.SIDEBAR_TEXT_COLOR,
                        fontFamily: poppins.style.fontFamily,
                        fontSize: "14px",
                        fontWeight: 500,
                      },
                    },
                  }}
                />
                {val.badge !== undefined && val.badge > 0 && (
                  <Box
                    sx={{
                      backgroundColor: COLORS.PRIMARY,
                      color: COLORS.WHITE,
                      borderRadius: "50%",
                      width: 20,
                      height: 20,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "11px",
                      fontWeight: 700,
                      fontFamily: poppins.style.fontFamily,
                      ml: 1,
                    }}
                  >
                    {val.badge}
                  </Box>
                )}
              </ListItemButton>
            </Link>
          );
        })}
      </List>
    </Box>
  );
};

export default LinkBox;
