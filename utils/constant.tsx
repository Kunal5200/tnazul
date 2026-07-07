import {
  BuildOutlined,
  BusinessCenterOutlined,
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

export const SIDEBAR_LINKS: LINK_BOX[] = [
  {
    icon: HomeOutlined,
    label: "Home",
    url: "/dashboard",
  },
  {
    icon: CorporateFareOutlined,
    label: "Real Estate",
    url: "/dashboard/real-estate",
  },
  {
    icon: DirectionsCarFilledOutlined,
    label: "Vehicles",
    url: "/dashboard/vehicles",
  },
  {
    icon: BusinessCenterOutlined,
    label: "Commercial",
    url: "/dashboard/commercial",
  },
  {
    icon: PersonOutlined,
    label: "Labour",
    url: "/dashboard/labour",
  },
  {
    icon: LaptopOutlined,
    label: "Offices",
    url: "/dashboard/offices",
  },
  {
    icon: BuildOutlined,
    label: "Maintenance",
    url: "/dashboard/maintenance",
  },
  {
    icon: WorkspacePremiumOutlined,
    label: "Subscriptions",
    url: "/dashboard/subscriptions",
  },
  {
    icon: ShowChartOutlined,
    label: "Equipment",
    url: "/dashboard/equipment",
  },
];

export const SIDEBAR_PROFILE_LINKS: LINK_BOX[] = [
  {
    icon: PersonOutlined,
    label: "My Profile",
    url: "/dashboard/my-profile",
  },
  {
    icon: FavoriteBorderOutlined,
    label: "Saved",
    url: "/dashboard/saved",
  },
  {
    icon: FeedOutlined,
    label: "My Contracts",
    url: "/dashboard/my-contracts",
  },
  {
    icon: ChatBubbleOutlineOutlined,
    label: "Messages",
    url: "/dashboard/messages",
  },
  {
    icon: NotificationsNoneOutlined,
    label: "Notifications",
    url: "dashboard/notifications",
  },
  {
    icon: SettingsOutlined,
    label: "Settings",
    url: "/dashboard/settings",
  },
];
