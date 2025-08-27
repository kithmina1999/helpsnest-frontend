import ResetPasswordForm from "@/components/auth/ResetPasswordForm";
import ClientOnly from "@/components/providers/ClientOnly";
import React from "react";

const page = () => {
  return (
    <div className="h-[100vh] flex justify-center items-center">
      <ClientOnly>
        <ResetPasswordForm />
      </ClientOnly>
    </div>
  );
};

export default page;
