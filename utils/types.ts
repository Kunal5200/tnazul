import { SvgIconProps } from "@mui/material";
import React from "react";

export interface LINK_BOX {
  icon: React.ComponentType<SvgIconProps>;
  label: string;
  url: string;
  badge?: number;
}

