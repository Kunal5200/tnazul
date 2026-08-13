"use client";

import React from "react";
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
} from "@mui/material";
import {
  GridView,
  FactCheck,
  People,
  Report,
  AttachMoney,
  ArrowBack,
} from "@mui/icons-material";
import { COLORS } from "@/utils/enum";
import { poppins, poppins700 } from "@/utils/fonts";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarItemProps {
  label: string;
  icon: React.ReactNode;
  href: string;
  badge?: number;
  badgeColor?: string;
  isActive?: boolean;
}

const SidebarItem = ({
  label,
  icon,
  href,
  badge,
  badgeColor,
  isActive,
}: SidebarItemProps) => {
  return (
    <Link href={href} style={{ textDecoration: "none" }}>
      <ListItemButton
        sx={{
          borderRadius: "12px",
          mb: 0.5,
          py: 1.5,
          px: 2.5,
          backgroundColor: isActive
            ? "rgba(255, 255, 255, 0.08)"
            : "transparent",
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.12)",
          },
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <ListItemIcon
            sx={{ minWidth: 36, color: isActive ? "#FFFFFF" : "#7A9BAB" }}
          >
            {icon}
          </ListItemIcon>
          <ListItemText
            primary={label}
            slotProps={{
              primary: {
                sx: {
                  color: isActive ? "#FFFFFF" : "#7A9BAB",
                  fontFamily: poppins.style.fontFamily,
                  fontSize: "15px",
                  fontWeight: isActive ? 600 : 500,
                },
              },
            }}
          />
        </Box>
        {badge !== undefined && badge > 0 && (
          <Box
            sx={{
              backgroundColor: badgeColor || COLORS.PRIMARY,
              color: "#FFFFFF",
              borderRadius: "50%",
              minWidth: 22,
              height: 22,
              px: 0.5,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "11px",
              fontWeight: 700,
              fontFamily: poppins.style.fontFamily,
            }}
          >
            {badge}
          </Box>
        )}
      </ListItemButton>
    </Link>
  );
};

const AdminSidebar = ({
  approval_number = 0,
  report_number,
}: {
  approval_number?: number;
  report_number?: number;
}) => {
  const pathname = usePathname();

  // Highlight Overview for /admin path
  const isOverviewActive =
    pathname === "/admin" || pathname === "/admin/overview";

  return (
    <Box
      sx={{
        width: 276,
        background: COLORS.SECONDARY, // Dark navy
        position: "fixed",
        borderRight: "1px solid rgba(255, 255, 255, 0.08)",
        left: 0,
        top: 0,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxSizing: "border-box",
        py: 3,
        px: 2,
      }}
    >
      <Box sx={{ flexGrow: 1 }}>
        <Box sx={{ py: 2, px: 2, mb: 3 }}>
          <Typography
            sx={{
              fontFamily: poppins700.style.fontFamily,
              fontWeight: 800,
              fontSize: "20px",
              color: "#FFFFFF",
              letterSpacing: "0.5px",
            }}
          >
            Tnazul
          </Typography>
          <Typography
            sx={{
              fontFamily: poppins.style.fontFamily,
              fontSize: "11px",
              fontWeight: 500,
              color: "#7A9BAB",
              textTransform: "uppercase",
              letterSpacing: "1px",
              mt: 0.5,
            }}
          >
            Admin Panel
          </Typography>
        </Box>

        {/* Sidebar Items */}
        <List sx={{ p: 0 }}>
          <SidebarItem
            label="Overview"
            icon={<GridView sx={{ fontSize: 22 }} />}
            href="/admin"
            isActive={isOverviewActive}
          />
          <SidebarItem
            label="Approvals"
            icon={<FactCheck sx={{ fontSize: 22 }} />}
            href="/admin/approvals"
            badge={approval_number}
            badgeColor="#E78B49" // Orange/amber badge
            isActive={pathname === "/admin/approvals"}
          />
          <SidebarItem
            label="Users"
            icon={<People sx={{ fontSize: 22 }} />}
            href="/admin/users"
            isActive={pathname === "/admin/users"}
          />
          <SidebarItem
            label="Reports"
            icon={<Report sx={{ fontSize: 22 }} />}
            href="/admin/reports"
            badge={2}
            badgeColor="#FF4D4D" // Red badge
            isActive={pathname === "/admin/reports"}
          />
          <SidebarItem
            label="Revenue"
            icon={<AttachMoney sx={{ fontSize: 22 }} />}
            href="/admin/revenue"
            isActive={pathname === "/admin/revenue"}
          />
        </List>
      </Box>

      {/* Bottom Link section */}
      <Box>
        <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.08)", mb: 2 }} />
        <Link href="/dashboard" style={{ textDecoration: "none" }}>
          <ListItemButton
            sx={{
              borderRadius: "12px",
              py: 1.5,
              px: 2.5,
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.05)",
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 36, color: "#7A9BAB" }}>
              <ArrowBack sx={{ fontSize: 20 }} />
            </ListItemIcon>
            <ListItemText
              primary="Back to Marketplace"
              slotProps={{
                primary: {
                  sx: {
                    color: "#7A9BAB",
                    fontFamily: poppins.style.fontFamily,
                    fontSize: "14px",
                    fontWeight: 500,
                  },
                },
              }}
            />
          </ListItemButton>
        </Link>
      </Box>
    </Box>
  );
};

export default AdminSidebar;
