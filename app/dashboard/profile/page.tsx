import ManageProfile from "@/components/dashboard/Profile/ManageProfile";
import Crumb from "@/components/layout/Crumb";
import TextHeader from "@/components/layout/TextHeader";
import { Separator } from "@/components/ui/separator";
import { getUserDataDashboard } from "@/lib/fetcher";
import { User } from "@/types/user.types";

// metadata 
export const metadata = {
  title: "Manage Profile",
  description: "Manage your profile and update your information.",
  openGraph: {
    title: "Manage Profile",
    description: "Manage your profile and update your information.",
  },
  twitter: {
    title: "Manage Profile",
    description: "Manage your profile and update your information.",
  },
};

const page = async () => {

  const user: User = await getUserDataDashboard(
    "/dashboard/user/profile",
    "user-profile"
  );

  if (!user) {
    return (
      <div className="flex h-dvh items-center justify-center">
        <p className="text-lg font-semibold">Unauthorized</p>
      </div>
    );
  }

  return (
    <>
      <Crumb title="Manage Profile" />
      <TextHeader
        isDashboard
        title="Manage Profile"
        description="Update your personal information, account settings, and customize your profile to suit your preferences."
      />
      <Separator className="mb-4" />
      <ManageProfile user={user} />
    </>
  );
};

export default page;
