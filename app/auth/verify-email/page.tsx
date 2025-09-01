"use client";

import React, { useEffect, useState, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import api from "@/lib/api";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Terminal } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const VerifyEmailPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [status, setStatus] = useState<"verifying" | "success" | "error">("verifying");
  const [message, setMessage] = useState("Verifying your email address...");

  const verificationAttempted = useRef(false);

  useEffect(() => {
    if (token && !verificationAttempted.current) {
      verificationAttempted.current = true;

      const verifyToken = async () => {
        try {
          const response = await api.post("/auth/verify-email", { token });
          setStatus("success");
          setMessage(response.data.message || "Your email has been successfully verified!");

          setTimeout(() => {
            router.push("/auth/sign-in");
          }, 3000);
        } catch (err: any) {
          setStatus("error");
          if (err.response && err.response.data && err.response.data.error) {
            setMessage(err.response.data.error);
          } else {
            setMessage("An unexpected error occurred. Please try again.");
          }
        }
      };

      verifyToken();
    } else if (!token) {
      setStatus("error");
      setMessage("Verification token not found. Please check your link.");
    }
  }, [token, router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-[450px] text-center">
        <CardHeader>
          <CardTitle className="flex justify-center items-center gap-2">
            <Terminal />
            Email Verification
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert variant={status === "success" ? "default" : "destructive"}>
            <Terminal className="h-4 w-4" />
            <AlertDescription>{message}</AlertDescription>
          </Alert>
          {status === "success" && (
            <p className="text-sm text-muted-foreground mt-4">
              You will be redirected to the sign-in page shortly...
            </p>
          )}
          {status === "error" && (
            <Button asChild className="mt-4">
              <Link href="/auth/sign-in">Go to Sign In</Link>
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyEmailPage;
