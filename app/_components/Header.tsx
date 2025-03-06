import { UserButton } from "@clerk/nextjs";
import { Bell } from "lucide-react";
import React from "react";

const Header = () => {
  return (
    <div className="flex justify-end items-center p-5 text-white bg-gray-800">
      <Bell className="mr-10" />
      <UserButton />
    </div>
  );
};

export default Header;
