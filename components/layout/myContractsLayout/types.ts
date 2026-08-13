import React from "react";

export interface ContractItem {
  id: string;
  title: string;
  image: string;
  status: "active" | "draft" | "expired";
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
