"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../providers/AuthProvider";
import api from "@/lib/api";
import AuthFormContainer from "./AuthFormContainer";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Terminal } from "lucide-react";

const formSchema = z
  .object({
    email: z.email(),
    password: z.string().min(8, "Password must be at least 8 characters."),
    confirmPassword: z.string().min(8),
    terms: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms and conditions.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const RegisterForm = () => {
  const [error, setError] = useState<String | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setError(null); //clear prevoius error
    setSuccess(null);
    try {
      const response = await api.post("/auth/register", {
        email: data.email,
        password: data.password,
      });
      setSuccess(response.data.message);
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <AuthFormContainer title="Register" subtitle="Create new account">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
          {error && (
            <Alert variant="destructive">
              <Terminal className="h-4 w-4" />
              <AlertTitle>Heads up!!</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {success && (
            <Alert variant="destructive">
              <Terminal className="h-4 w-4" />
              <AlertTitle>Heads up!!</AlertTitle>
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} type="email" />
                </FormControl>

                <FormMessage />
                <FormDescription>
                  We will never share your email with anyone else.
                </FormDescription>
              </FormItem>
            )}
          />

          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input {...field} type="password" />
                </FormControl>

                <FormMessage />
                <FormDescription>
                  Your password must be at least 8 characters long.
                </FormDescription>
              </FormItem>
            )}
          />

          <FormField
            name="confirmPassword"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input {...field} type="password" />
                </FormControl>
                <FormMessage />
                <FormDescription>
                  confirm your password to continue to your account.
                </FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="terms"
            render={({ field }) => (
              <FormItem className="">
                <div className="flex flex-row  items-center space-x-3 mb-2 text-muted-foreground">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>
                    <p className="leading-snug">
                      By creating an account, you agree to our{" "}
                      <Link
                        href="/terms"
                        className="text-primary hover:underline"
                      >
                        Terms of Use
                      </Link>{" "}
                      and{" "}
                      <Link
                        href="/privacy"
                        className="text-primary hover:underline"
                      >
                        Privacy Policy
                      </Link>{" "}
                      .
                    </p>
                  </FormLabel>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col gap-4">
            <Button
              type="submit"
              className="w-full mt-5"
              disabled={form.formState.isSubmitting}
            >
              Register
            </Button>
            <span className="text-muted-foreground text-[16px]">
              Already have an account?{" "}
              <Link
                href="./sign-in"
                className="text-primary font-semibold ml-2 hover:underline transition ease-in-out duration-300"
              >
                Sign In
              </Link>
            </span>
          </div>
        </form>
      </Form>
    </AuthFormContainer>
  );
};

export default RegisterForm;
