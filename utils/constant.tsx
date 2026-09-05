import {
  BuildOutlined,
  BusinessCenterOutlined,
  BusinessOutlined,
  ChatBubbleOutlineOutlined,
  CorporateFareOutlined,
  DirectionsCarFilledOutlined,
  FavoriteBorderOutlined,
  FeedOutlined,
  HomeOutlined,
  LaptopOutlined,
  NotificationsNoneOutlined,
  PersonOutlined,
  SettingsOutlined,
  ShowChartOutlined,
  WorkspacePremium,
  WorkspacePremiumOutlined,
} from "@mui/icons-material";
import { LINK_BOX } from "./types";
import { ACCOUNT_TYPE, CONTRACT_TYPES } from "./enum";

export const SIDEBAR_LINKS: LINK_BOX[] = [
  {
    icon: HomeOutlined,
    label: "Home",
    url: "/dashboard",
  },
  {
    icon: CorporateFareOutlined,
    label: CONTRACT_TYPES.REAL_ESTATE,
    url: "/dashboard/marketplace?type=real-estate",
  },
  {
    icon: DirectionsCarFilledOutlined,
    label: CONTRACT_TYPES.VEHICLES,
    url: "/dashboard/marketplace?type=vehicles",
  },
  {
    icon: BusinessCenterOutlined,
    label: CONTRACT_TYPES.COMMERCIAL,
    url: "/dashboard/marketplace?type=commercial",
  },
  {
    icon: PersonOutlined,
    label: CONTRACT_TYPES.LABOUR,
    url: "/dashboard/marketplace?type=labour",
  },
  {
    icon: LaptopOutlined,
    label: CONTRACT_TYPES.OFFICES,
    url: "/dashboard/marketplace?type=offices",
  },
  {
    icon: BuildOutlined,
    label: CONTRACT_TYPES.MAINTENANCE,
    url: "/dashboard/marketplace?type=maintenance",
  },
  {
    icon: WorkspacePremiumOutlined,
    label: CONTRACT_TYPES.SUBSCRIPTIONS,
    url: "/dashboard/marketplace?type=subscriptions",
  },
  {
    icon: ShowChartOutlined,
    label: CONTRACT_TYPES.EQUIPMENT,
    url: "/dashboard/marketplace?type=equipment",
  },
];

export const SIDEBAR_PROFILE_LINKS: LINK_BOX[] = [
  {
    icon: PersonOutlined,
    label: "My Profile",
    url: "/dashboard/profile/my-profile",
  },
  {
    icon: FavoriteBorderOutlined,
    label: "Saved",
    url: "/dashboard/profile/saved",
  },
  {
    icon: FeedOutlined,
    label: "My Contracts",
    url: "/dashboard/profile/my-contracts",
  },
  {
    icon: ChatBubbleOutlineOutlined,
    label: "Messages",
    url: "/dashboard/profile/messages",
    badge: 5,
  },
  {
    icon: NotificationsNoneOutlined,
    label: "Notifications",
    url: "/dashboard/profile/notifications",
    badge: 5,
  },
  {
    icon: SettingsOutlined,
    label: "Settings",
    url: "/dashboard/profile/settings/edit-profile",
  },
];

export const ACCOUNT_TYPE_OPTIONS = [
  {
    type: ACCOUNT_TYPE.INDIVIDUAL,
    label: "Individual Account",
    desc: "For personal contracts",
    Icon: PersonOutlined,
  },
  {
    type: ACCOUNT_TYPE.BUSINESS,
    label: "Business Account",
    desc: "For registered companies",
    Icon: BusinessOutlined,
  },
];

export const CONTRACT_TYPE = [
  CONTRACT_TYPES.REAL_ESTATE,
  CONTRACT_TYPES.VEHICLES,
  CONTRACT_TYPES.COMMERCIAL,
  CONTRACT_TYPES.LABOUR,
  CONTRACT_TYPES.OFFICES,
  CONTRACT_TYPES.MAINTENANCE,
  CONTRACT_TYPES.SUBSCRIPTIONS,
  CONTRACT_TYPES.EQUIPMENT,
];

export const CONTRACT_CATEGORY = [
  "Apartment",
  "Villa",
  "Land",
  "Building",
  "Office",
];

export const TRANSER_REASON = [
  "Financial Reasons",
  "Relocation",
  "Upgrade",
  "Downsize",
  "Other",
];
