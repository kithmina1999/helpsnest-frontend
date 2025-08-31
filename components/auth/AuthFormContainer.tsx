"use client"
import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import SocialAuth from "./SocialAuth";
import { Separator } from "../ui/separator";

interface AuthFormContainerProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

const AuthFormContainer = ({
  children,
  title,
  subtitle,
}: AuthFormContainerProps) => {
  return (
    <div className="flex justify-center items-center h-full">
      <Card className="lg:w-[550px] w-[80vw] relative">
        <CardHeader>
          <div className="text-center mb-5 space-y-2">
            <p className="text-3xl font-bold ">{title}</p>
            <p className="text-muted-foreground text-sm">{subtitle}</p>
          </div>
        </CardHeader>
        <CardContent>{children}</CardContent>
        <Separator className="my-1" />
        <CardFooter>
          <SocialAuth />
        </CardFooter>
      </Card>
    </div>
  );
};

export default AuthFormContainer;
