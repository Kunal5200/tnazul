import { SvgIconProps } from "@mui/material";
import React from "react";

export interface LINK_BOX {
  icon: React.ComponentType<SvgIconProps>;
  label: string;
  url: string;
  badge?: number;
}

export interface RegisterPayload {
  email: string;
  password: string;
  name: string;
  phoneNo: string;
  countryCode: string;
  accountType: string;
}

export interface LoginPayload {
  identity: string;
  password: string;
}

export interface VerifyOtpPayload {
  otp: string;
  referenceId: string;
}

export interface RenewTokenPayload {
  accessToken: string;
  refreshToken: string;
}




