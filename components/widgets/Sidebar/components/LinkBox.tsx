import { COLORS } from "@/utils/enum";
import { LINK_BOX } from "@/utils/types";
import {
  Box,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Tooltip,
} from "@mui/material";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { poppins } from "@/utils/fonts";
import { useSidebarStore } from "@/store/sidebarStore";

const LinkBox = ({ data }: { data: LINK_BOX[] }) => {
  const pathname = usePathname();
  const { isCollapsed } = useSidebarStore();

  return (
    <Box
      sx={{
        px: isCollapsed ? 1 : 1.5,
        py: 1,
        transition: "padding 0.3s ease",
      }}
    >
      <List sx={{ p: 0 }}>
        {data.map((val, i) => {
          const isActive = pathname === val.url;

          const buttonContent = (
            <ListItemButton
              selected={isActive}
              sx={{
                borderRadius: "12px",
                mb: 0.5,
                py: 1,
                px: isCollapsed ? 0 : 2,
                justifyContent: isCollapsed ? "center" : "flex-start",
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
                transition: "all 0.2s ease",
              }}
            >
              <ListItemAvatar
                sx={{
                  minWidth: isCollapsed ? 0 : 32,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <val.icon
                  sx={{
                    color: isActive ? COLORS.WHITE : COLORS.SIDEBAR_ICON_COLOR,
                    fontSize: 22,
                  }}
                />
              </ListItemAvatar>
              {!isCollapsed && (
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
              )}
              {!isCollapsed && val.badge !== undefined && val.badge > 0 && (
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
          );

          return (
            <Link href={val.url} key={i} style={{ textDecoration: "none" }}>
              {isCollapsed ? (
                <Tooltip title={val.label} placement="right" arrow>
                  {buttonContent}
                </Tooltip>
              ) : (
                buttonContent
              )}
            </Link>
          );
        })}
      </List>
    </Box>
  );
};

export default LinkBox;
