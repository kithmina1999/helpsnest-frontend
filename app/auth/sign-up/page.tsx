
import RegisterForm from "@/components/auth/RegisterForm";
import ThemeToggle from "@/components/common/ThemeToggle";
import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <div className="grid lg:grid-cols-2 gap-4 h-[100vh] relative">
      {/* logo */}
      <div className="absolute top-5 left-10 z-[100] flex gap-2 items-center">
          <Image
            src="/assets/logo.png"
            width={50}
            height={50}
            alt="logo"
          />
          <ThemeToggle />
      </div>
      {/* form */}
      <div className="col-span-1">
        <RegisterForm />
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
