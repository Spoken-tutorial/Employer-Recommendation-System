import GridViewIcon from "@mui/icons-material/GridView";
import SchoolIcon from "@mui/icons-material/School";
import DataArrayIcon from "@mui/icons-material/DataArray";
import EventIcon from "@mui/icons-material/Event";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import AddIcon from "@mui/icons-material/Add";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import ViewStreamOutlinedIcon from "@mui/icons-material/ViewStreamOutlined";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import ForwardToInboxOutlinedIcon from "@mui/icons-material/ForwardToInboxOutlined";
import PendingOutlinedIcon from "@mui/icons-material/PendingOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import VignetteOutlinedIcon from "@mui/icons-material/VignetteOutlined";
import PageviewOutlinedIcon from "@mui/icons-material/PageviewOutlined";
import ThumbUpOffAltOutlinedIcon from "@mui/icons-material/ThumbUpOffAltOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";

const navItemsHomepage = [
  { text: "Home", url: "/#home" },
  { text: "About", url: "/#about-us", scroll: "about-us" },
  { text: "Events", url: "/#events" },
  { text: "Companies", url: "/#companies" },
  { text: "Gallery", url: "/#gallery" },
  { text: "Testimonials", url: "/#testimonials" },
];

const navItemsStudent = [
  { text: "Dashboard", url: "dashboard" },
  { text: "Jobs", url: "jobs" },
  { text: "Profile", url: "profile" },
];
const navItemsManager = [
  {
    nested: false,
    text: "Manager Dashboard",
    url: "",
    icon: <GridViewIcon sx={{ color: "#ffffff" }} />,
  },
  {
    nested: false,
    text: "Data",
    url: "",
    icon: <DataArrayIcon sx={{ color: "#ffffff" }} />,
  },
  {
    nested: false,
    text: "Degree",
    url: "",
    icon: <SchoolIcon sx={{ color: "#ffffff" }} />,
  },
  {
    nested: false,
    text: "Discipline",
    url: "",
    icon: <CategoryOutlinedIcon sx={{ color: "#ffffff" }} />,
  },
  {
    nested: false,
    text: "Domain",
    url: "",
    icon: <VignetteOutlinedIcon sx={{ color: "#ffffff" }} />,
  },
  {
    nested: false,
    text: "Job Type",
    url: "",
    icon: <PageviewOutlinedIcon sx={{ color: "#ffffff" }} />,
  },
  {
    nested: true,
    text: "Company",
    icon: <AccountBalanceOutlinedIcon sx={{ color: "#ffffff" }} />,
    children: [
      {
        text: "Add Company",
        url: "",
        icon: <AddIcon sx={{ color: "#FFA500CC" }} />,
      },
      {
        text: "View Companies",
        url: "",
        icon: <ViewStreamOutlinedIcon sx={{ color: "#FFA500CC" }} />,
      },
    ],
  },
  {
    nested: true,
    text: "Job",
    icon: <WorkOutlineIcon sx={{ color: "#ffffff" }} />,
    children: [
      {
        text: "Add Job",
        url: "",
        icon: <AddIcon sx={{ color: "#FFA500CC" }} />,
      },
      {
        text: "View Jobs (Quick View)",
        url: "",
        icon: <RemoveRedEyeOutlinedIcon sx={{ color: "#FFA500CC" }} />,
      },
      {
        text: "View Jobs",
        url: "",
        icon: <ViewStreamOutlinedIcon sx={{ color: "#FFA500CC" }} />,
      },
    ],
  },
  {
    nested: true,
    text: "Event",
    icon: <EventIcon sx={{ color: "#ffffff" }} />,
    children: [
      {
        text: "Add Event",
        url: "",
        icon: <AddIcon sx={{ color: "#FFA500CC" }} />,
      },
      {
        text: "View Events",
        url: "",
        icon: <ViewStreamOutlinedIcon sx={{ color: "#FFA500CC" }} />,
      },
    ],
  },
  {
    nested: false,
    text: "Student List",
    url: "",
    icon: <GroupOutlinedIcon sx={{ color: "#ffffff" }} />,
  },
  {
    nested: false,
    text: "Student Grade Filter",
    url: "",
    icon: <FilterAltOutlinedIcon sx={{ color: "#ffffff" }} />,
  },
  {
    nested: false,
    text: "Mass Email",
    url: "",
    icon: <ForwardToInboxOutlinedIcon sx={{ color: "#ffffff" }} />,
  },
  {
    nested: false,
    text: "Job Application Status",
    url: "",
    icon: <PendingOutlinedIcon sx={{ color: "#ffffff" }} />,
  },
  {
    nested: false,
    text: "Image Gallery",
    url: "",
    icon: <ImageOutlinedIcon sx={{ color: "#ffffff" }} />,
  },
  {
    nested: false,
    text: "Testimonials",
    url: "",
    icon: <ThumbUpOffAltOutlinedIcon sx={{ color: "#ffffff" }} />,
  },
];
const navItemsEmployer = [
  { text: "Dashboard", url: "dashboard" },
  { text: "Jobs", url: "jobs" },
  { text: "Profile", url: "profile" },
];

export { navItemsHomepage, navItemsEmployer, navItemsManager, navItemsStudent };
