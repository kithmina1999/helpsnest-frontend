import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const Logo = () => {
  return (
    <Link href="/">
      <Avatar>
        <AvatarImage src="/assets/logo.png" />
        <AvatarFallback>HN</AvatarFallback>
      </Avatar>
    </Link>
  );
};

export default Logo;
