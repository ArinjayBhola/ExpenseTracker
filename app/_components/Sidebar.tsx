"use client";

import { BadgeIndianRupee, HandCoinsIcon, HomeIcon, SidebarCloseIcon, SidebarOpenIcon, Zap } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const sidebarItem = [
    { id: 1, name: "Home", icon: <HomeIcon />, path: "/" },
    { id: 2, name: "Insights", icon: <Zap />, path: "/dashboard" },
    { id: 3, name: "Transaction", icon: <HandCoinsIcon />, path: "/mytransaction" },
  ];

  return (
    <>
      <div
        className={`h-full bg-gray-900 shadow-lg z-50 transition-all duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full opacity-0"
        }`}>
        <div className="flex justify-between items-center p-4">
          <BadgeIndianRupee
            className="text-white"
            size={40}
          />
          <SidebarCloseIcon
            className=" text-white cursor-pointer sm:hidden"
            size={20}
            onClick={() => setIsOpen(!isOpen)}
          />
        </div>
        <div className="mt-4">
          {sidebarItem.map((item) => {
            return (
              <div key={item.id}>
                <div
                  className={`${
                    pathname === item.path ? "bg-gray-700" : "bg-gray-900 hover:bg-gray-700"
                  } flex items-center p-4 cursor-pointer mx-2 my-4 rounded-xl`}
                  onClick={() => router.push(item.path)}>
                  <div className={`${pathname === item.path ? "text-white" : "text-gray-500"} mr-4`}>{item.icon}</div>
                  <div className={`${pathname === item.path ? "text-white" : "text-gray-500"}`}>{item.name}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div
        className={`${isOpen ? "hidden" : "block fixed top-0 left-0 bg-opacity-50"}  `}
        onClick={() => setIsOpen(true)}>
        <SidebarOpenIcon
          className="cursor-pointer"
          size={20}
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>
    </>
  );
};

export default Sidebar;
