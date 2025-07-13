"use client";

import * as React from "react";
import {
  IconCake,
  IconCamera,
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconInnerShadowTop,
  IconListDetails,
  IconMail,
  IconNotification,
  IconReport,
  IconSearch,
  IconSettings,
  IconStackFilled,
  IconUserCircle,
  IconUsers,
} from "@tabler/icons-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "Farah Mohamed",
    email: "farahmoahmed10@gmail.com",
    avatar:
      "https://i.pinimg.com/1200x/d0/45/0f/d0450fd88661c0189f473753134ed5ca.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Manage Profile",
      url: "/profile",
      icon: IconUserCircle,
    },
    {
      title: "Manage Services",
      url: "#",
      icon: IconListDetails,
    },
    {
      title: "Projects",
      url: "#",
      icon: IconFolder,
    },
    {
      title: "Education",
      url: "#",
      icon: IconCake,
    },
    { title: "Skills", url: "#", icon: IconStackFilled },
    {
      title: "Analytics",
      url: "#",
      icon: IconChartBar,
    },
    {
      title: "Tasks",
      url: "#",
      icon: IconInnerShadowTop,
    },
    {
      title: "Contacts",
      url: "#",
      icon: IconUsers,
    },

    {
      title: "Notifications",
      url: "#",
      icon: IconNotification,
    },
    {
      title: "Messages",
      url: "#",
      icon: IconMail,
    },
    {
      title: "Settings",
      url: "#",
      icon: IconSettings,
    },
  ],
  navClouds: [
    {
      title: "Capture",
      icon: IconCamera,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Proposal",
      icon: IconFileDescription,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Prompts",
      icon: IconFileAi,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <span className="text-base font-semibold">Farah Studio</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
