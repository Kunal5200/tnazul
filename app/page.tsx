"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { Box } from "@mui/material";
import Dashboard from "@/components/layout/dashboard/Index";

export default function Home() {
  return (
    <Box>
      <Dashboard />
    </Box>
  );
}
