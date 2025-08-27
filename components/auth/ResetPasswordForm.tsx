"use client";
import AuthFormContainer from "@/components/auth/AuthFormContainer";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";

const formSchema = z.object({
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(32, "Password must be at most 32 characters"),
  confirmPassword: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(32, "Password must be at most 32 characters"),
});

const ResetPasswordForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
  return (
    <AuthFormContainer
      title="New Password"
      subtitle="Set new password for your account"
    >
      <Form {...form}>
        <form className="space-y-7">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="New password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
                <FormDescription>
                  Your password must be at least 6 characters long
                </FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm New Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Confirm New password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
                <FormDescription>Confirm your password</FormDescription>
              </FormItem>
            )}
          />
          <div>
            <Button className="w-full" type="submit">
                Reset Password
            </Button>
          </div>
        </form>
      </Form>
    </AuthFormContainer>
  );
};

export default ResetPasswordForm;
