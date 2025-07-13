import SignInForm from "@/components/forms/SignInForm";
import ContainerLayout from "@/components/layout/ContainerLayout";
import TextHeader from "@/components/layout/TextHeader";

const page = () => {
  return (
    <ContainerLayout>
      <TextHeader
        title="Login to Farah Studio"
        description="Log in to Farah Studio to access your personalized dashboard, manage your projects, and unlock exclusive features to enhance your creative journey."
      />
      <SignInForm />
    </ContainerLayout>
  );
};
export default page;
