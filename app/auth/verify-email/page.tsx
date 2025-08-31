"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import api from "@/lib/api";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Terminal } from "lucide-react";

const page = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [status, setStatus] = useState<"verifying" | "success" | "error">(
    "verifying"
  );
  const [message, setMessage] = useState("Verifying your email address...");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("Verification token not found. Please check your link.");
      return;
    }
    const verifyToken = async () => {
      try {
        const response = await api.post("/auth/verify-email", { token });
        setStatus("success");
        setMessage(
          response.data.message ||
            "Your email address has been verified. You can now login."
        );
        // Redirect to sign-in page after a short delay
        setTimeout(() => {
          router.push("/sign-in");
        }, 3000);
      } catch (error: any) {
        setStatus("error");
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          setMessage(error.response.data.message);
        } else {
          setMessage("An unexpected error occurred. Please try again.");
        }
      }
    };
    verifyToken();
  }, [token, router]);

  return <div className="flex items-center justify-center min-h-screen"> 
    <Card className="w-[450px] text-center">
        <CardHeader>
            <CardTitle className="flex justify-center items-center gap-2">
                <Terminal />
                Email Verification
            </CardTitle>
        </CardHeader>
        <CardContent>
            <div>
                
            </div>
        </CardContent>
    </Card>
  </div>;
};

export default page;
