"use client";
import React from "react";
import AuthFormContainer from "./AuthFormContainer";
import {
  Form,
  FormControl,
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
import Link from "next/link";
import { Button } from "../ui/button";

const formSchema = z.object({
  email: z.email(),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

const LoginForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };
  return (
    <AuthFormContainer title="Login" subtitle="Login to your account">
      <Form {...form}>
        <form className="space-y-7" onSubmit={form.handleSubmit(onSubmit)}>
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
              </FormItem>
            )}
          />
          <div className="flex items-center justify-between">
            <div className="flex gap-2 items-center">
              <Checkbox />
              <span className="text-muted-foreground ml-2">Remember me</span>
            </div>
            <div className="me-2">
              <Link
                href="/auth/forgot-password"
                className="text-sm text-muted-foreground hover:underline"
              >
                Forgot password?
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <Button
              type="submit"
              className="btn btn-primary w-full"
              disabled={form.formState.isSubmitting}
            >
              Login
            </Button>
            <span className="text-muted-foreground text-[16px]">
              Don&apos;t have an account?{" "}
              <Link
                href="./sign-up"
                className="text-primary font-semibold ml-2 hover:underline transition ease-in-out duration-300"
              >
                Sign Up
              </Link>
            </span>
          </div>
        </form>
      </Form>
    </AuthFormContainer>
  );
};

export default LoginForm;
