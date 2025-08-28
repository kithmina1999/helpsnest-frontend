import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import Logo from "@/components/common/Logo";
import ThemeToggle from "@/components/common/ThemeToggle";
import ClientOnly from "@/components/providers/ClientOnly";
import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <div className="flex justify-center items-center h-[100vh] relative">
      <ClientOnly>
        <ForgotPasswordForm />
      </ClientOnly>

      <div className="absolute top-5 left-10 z-[100] flex gap-2 items-center">
       <Logo />
        <ThemeToggle />
    </div>
    </div>
  );
};

export default page;
