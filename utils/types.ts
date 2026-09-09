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

export interface UpdateProfilePayload {
  name?: string;
  cityOrRegion?: string;
  languagePreference?: string;
}

export interface ChangePasswordPayload {
  oldPassword: string;
  newPassword: string;
}

export interface ContractPayload {
  _id?: string;
  contractNumber?: string;
  contractType?: string;
  contractTitle?: string;
  contractDescription?: string;
  city?: string;
  districtOrNeighborhood?: string;
  category?: string;

  // Financial and others
  totalContractValue?: number;
  monthlyAmount?: number;
  transferFee?: number;
  securityDeposit?: number;
  priceNegotiable?: boolean;
  startDate?: string;
  endDate?: string;
  transferExpiryDate?: string;
  remainingDuration?: string;
  transferReason?: string;
  TransferTermsConditions?: string;
  contractStatus?: "Draft" | "Published" | string;
  asset?: any[];
  contract?: any;
}

export interface GET_API_REQUEST_RESPONSE {
  page?: string | number;
  limit?: string | number;
  status?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  minDuration?: number;
  maxDuration?: number;
  contractType?: string;
  city?: string;
  categories?: string[];
  search?: string;
  [key: string]: any;
}

export interface ASSEST_INFO {
  contractNumber: string;
  asset?: File[];
  contract?: File[];
}

export interface QueueItemData {
  _id: string;
  contractType: string;
  contractTitle: string;
  contractDescription: string;
  contractNumber: string;
  city: string;
  districtOrNeighborhood: string;
  category: string;
  totalContractValue: number;
  monthlyAmount: number;
  transferFee: number;
  securityDeposit: number;
  priceNegotiable: boolean;
  startDate: string;
  endDate: string;
  transferExpiryDate: string;
  remainingDuration: string;
  transferReason: string;
  TransferTermsConditions: string;
  contractDocuments: any[];
  assetImages: string[];
  contractStatus: string;
  currency: string;
  createdBy: {
    _id: string;
    phoneNo: string;
    countryCode: string;
    email: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
  __v: number;
  isSaved: boolean;
  sellerVerified?: boolean;
}

export interface IMAGE_CAROUSEL_DATA {
  data: string[];
}

export interface APPLY_TRANSFER {
  contractId: string;
  transferId?: string;
  status: string;
  documents: File[];
  signtaure: File;
}

export interface SENDMESSAGE {
  receiverId: string;
  message: string;
}
