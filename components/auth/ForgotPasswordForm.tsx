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
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const formSchema = z.object({
  email: z.email("Invalid email address"),
});

const ForgotPasswordForm = () => {
  const [disable, setDisable] = React.useState(false);
  const [count, setCount] = React.useState(0);
  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    if (disable && count > 0) {
      timer = setTimeout(() => {
        setCount((prev) => prev - 1);
      }, 1000);
    } else if (count === 0) {
      setDisable(false);
    }
    return () => clearTimeout(timer);
  }, [disable, count]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
    setDisable(true);
    setCount(60);
  };
  return (
    <AuthFormContainer
      title="Reset Password"
      subtitle="Enter your email address to reset your password"
    >
      <Form {...form}>
        <form className="space-y-7" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Registered Email Adress</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    placeholder="Enter your Registered Email Address"
                    className="input input-bordered w-full"
                  />
                </FormControl>
                <FormMessage />
                <FormDescription>
                  We will send you a link to reset your password
                </FormDescription>
              </FormItem>
            )}
          />
          {disable && (
            <div className="">
              <p className="text-muted-foreground text-sm">
                Send link again in
                <span className="text-primary"> {count}s</span>{" "}
              </p>
            </div>
          )}

          <div>
            <Button disabled={disable} className="w-full" type="submit">
              Verify Email Addess
            </Button>
          </div>
        </form>
      </Form>
    </AuthFormContainer>
  );
};

export default ForgotPasswordForm;
