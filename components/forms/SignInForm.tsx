"use client";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { signInAction } from "@/app/actions/auth/signIn.action";
import { signInInitialState } from "@/lib/initialState";
import { useActionState, useEffect } from "react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircleIcon, LogIn } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { triggerConfetti } from "@/Helpers/ConfettiFireworks";
import { Label } from "../ui/label";

const SignInForm = () => {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(
    signInAction,
    signInInitialState as any
  );

  useEffect(() => {

    if (state.success && state.message) {
      toast.success(state.message, {
        description: "Redirecting to dashboard...",
        duration: 2000,
        position: "top-center",
      });
      triggerConfetti();

      setTimeout(() => {
        router.push("/dashboard");
      }, 2300);
    }
  }, [state]);

  return (
    <>
      <div className="my-6">
        <form
          action={formAction}
          className="flex mx-auto flex-col gap-2 mt-6 lg:w-9/12 lg:mx-auto"
        >
          <Label htmlFor="email">
            Email
          </Label>
          <Input
            name="email"
            type="email"
            placeholder="Enter your Email"
            id="email"
            autoComplete="email"
            required
          />
          <Label htmlFor="password">
            Password
          </Label>
          <Input
            name="password"
            type="password"
            placeholder="Enter your Password"
            id="password"
            required
          />
          {state.message && (
            <Alert variant={state.success ? "default" : "destructive"}>
              <AlertTitle>
                {state.success ? "Signed in successfully" : "Sign-in failed"}
              </AlertTitle>
              <AlertDescription>
                <p>
                  {state.success
                    ? "You have successfully signed in."
                    : state.message}
                </p>
              </AlertDescription>
            </Alert>
          )}
          <Button
            disabled={isPending}
            type="submit"
            className="w-full mt-4"
            variant="default"
          >
            <LogIn /> {isPending ? "Signing in..." : "Sign In"}
          </Button>
        </form>
      </div>
    </>
  );
};

export default SignInForm;
