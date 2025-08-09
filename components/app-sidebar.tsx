"use client";

import * as React from "react";
import {
  IconAddressBook,
  IconBriefcase2,
  IconCake,
  IconCamera,
  IconCertificate,
  IconChartBar,
  IconDashboard,
  IconExternalLink,
  IconFileAi,
  IconFileDescription,
  IconFolder,
  IconInnerShadowTop,
  IconListDetails,
  IconMail,
  IconNotification,
  IconRobotFace,
  IconSettings,
  IconStackFilled,
  IconStar,
  IconTools,
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
import { User } from "@/types/user.types";
import { usePathname } from "next/navigation";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Manage Profile",
      url: "/dashboard/profile",
      icon: IconUserCircle,
    },
    {
      title: "Work Experience",
      url: "/dashboard/work",
      icon: IconBriefcase2,
    },
    {
      title: "Services",
      url: "/dashboard/services",
      icon: IconListDetails,
    },
    {
      title: "Clients",
      url: "/dashboard/clients",
      icon: IconUsers,
    },
    {
      title: "Projects",
      url: "#",
      icon: IconFolder,
    },
    {
      title: "Education",
      url: "/dashboard/education",
      icon: IconCake,
    },
    { title: "Skills", url: "/dashboard/skills", icon: IconStackFilled },
    { title: "Tools", url: "/dashboard/tools", icon: IconTools },
    {
      title: "Courses",
      url: "/dashboard/courses",
      icon: IconCertificate,
    },
    {
      title: "Resume",
      url: "/dashboard/resume",
      icon: IconFileDescription,
    },
    {
      title: "Analytics",
      url: "/dashboard/analytics",
      icon: IconChartBar,
    },
    {
      title: "Tasks",
      url: "/dashboard/tasks",
      icon: IconInnerShadowTop,
    },
    {
      title: "Contacts",
      url: "/dashboard/contacts",
      icon: IconAddressBook,
    },

    {
      title: "Testimonials",
      url: "/dashboard/testimonials",
      icon: IconStar,
    },
    {
      title: "Messages",
      url: "/dashboard/messages",
      icon: IconMail,
    },
    {
      title: "Settings",
      url: "#",
      icon: IconSettings,
    },
  ],
};

const aiData = {
  navMain: [
    {
      title: "Generate Content",
      url: "/dashboard/generate-content",
      icon: IconRobotFace,
    },
    {
      title: "Generate Images",
      url: "/dashboard/generate-images",
      icon: IconCamera,
    },
    {
      title: "Generate Keywords",
      url: "/dashboard/generate-keywords",
      icon: IconFileAi,
    },
  ]
}

const marketingData = {
  navMain: [
    {
      title: "AI Marketing Chat Agent",
      url: "/dashboard/marketing-plan",
      icon: IconExternalLink,
    },
    {
      title: "Content Calendar Generator",
      url: "/dashboard/content-calendar",
      icon: IconExternalLink,
    },
    {
      title: "Social Media Post Generator",
      url: "/dashboard/social-media-posts",
      icon: IconExternalLink,
    }
  ]
}

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  user: User;
}

export function AppSidebar({ user, ...props }: AppSidebarProps) {
  const path = usePathname();
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
        <NavMain navTitle="Main Navigation" items={data.navMain} />
        <NavMain navTitle="Ai Assistant" items={aiData.navMain} />
        <NavMain navTitle="Marketing Assistant" items={marketingData.navMain} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
