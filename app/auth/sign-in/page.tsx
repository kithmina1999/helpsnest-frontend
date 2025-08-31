"use client";
import LoginForm from "@/components/auth/LoginForm";
import Logo from "@/components/common/Logo";
import ThemeToggle from "@/components/common/ThemeToggle";
import ClientOnly from "@/components/providers/ClientOnly";
import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <div className="grid lg:grid-cols-2 gap-4 h-[100vh] relative">
      {/* logo */}
      <div className="absolute top-5 left-10 z-[100] flex gap-2 items-center">
        <Logo />
        <ThemeToggle />
      </div>
      {/* form */}
      <div className="col-span-1">
        <ClientOnly>
          <LoginForm />
        </ClientOnly>
      </div>
      {/* image */}
      <div className="col-span-1 relative hidden lg:block">
        <Image
          src="/assets/call-center.jpg"
          fill
          alt="signup"
          className="object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
};

export default page;
