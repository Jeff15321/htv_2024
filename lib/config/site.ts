import { Folder, Home, LucideIcon, Users } from "lucide-react";

export const siteConfig = {
  title: "WGFSS",
  description: "DescWorld's Greatest File Storage System",
  author: "HTV 2024",
  github: "https://github.com/Jeff15321/htv_2024",
};

export type NavLink = {
  href: string;
  label: string;
  icon: LucideIcon;
};

export const navLinks: NavLink[] = [
  { href: "/dashboard", label: "Home", icon: Home },
  { href: "/files", label: "Files", icon: Folder },
  { href: "/shared", label: "Shared", icon: Users },
];

export const serverUrl = process.env.SERVER_URL;
