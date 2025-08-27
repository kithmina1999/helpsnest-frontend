"use client";
import React from "react";
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

const formSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
});

const RegisterForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };

  return (
    <AuthFormContainer title="Register" subtitle="Create new account">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
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

          <div className="text-muted-foreground text-sm flex flex-col gap-2">
            <div className="flex gap-2">
              <Checkbox />
              <span className="ml-2">
                By creating an account, you agree to our
                <span className="text-primary"> Terms of Service</span> and{" "}
                <span className="text-primary">Privacy Policy</span>.
              </span>
            </div>
            <div className="flex gap-2">
              <Checkbox />
              <span className="ml-2">Remember password</span>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-muted-foreground text-[16px]">
              Already have an account?{" "}
              <Link href="./sign-in" className="text-primary font-semibold">
                Sign In
              </Link>
            </span>
            <Button
              type="submit"
              className="w-full mt-5"
              disabled={form.formState.isSubmitting}
            >
              Register
            </Button>
          </div>
        </form>
      </Form>
    </AuthFormContainer>
  );
};

export default RegisterForm;
