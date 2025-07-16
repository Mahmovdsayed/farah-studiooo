import { SectionCards } from "@/components/section-cards";

export const metadata = {
  title: "Dashboard",
  description: "Dashboard page for managing your account and settings.",
  openGraph: {
    title: "Dashboard",
    description: "Dashboard page for managing your account and settings.",
  },
  twitter: {
    title: "Dashboard",
    description: "Dashboard page for managing your account and settings.",
  },
};

export default function page() {
  return <SectionCards />;
}
