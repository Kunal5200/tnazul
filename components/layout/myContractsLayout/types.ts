import React from "react";
import { CONTRACT_STATUS } from "@/utils/enum";

export interface ContractItem {
  id: string;
  title: string;
  image: string;
  status: CONTRACT_STATUS;
  contractStatus?: string;
  location: string;
  price: string;
  views: number;
  timeLeft?: string;
  contractNumber?: string;
  contractType?: string;
  category?: string;
  monthlyAmount?: string;
  currency?: string;
  steps?: {
    label: string;
    icon: (isActive: boolean) => React.ReactNode;
    isActive: boolean;
    color: string;
  }[];
  subtext?: string;
  subtextColor?: string;
}
