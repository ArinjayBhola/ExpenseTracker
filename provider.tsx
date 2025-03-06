"use client";

import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { useEffect } from "react";
import { Toaster } from "sonner";

const Provider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { user } = useUser();
  const email = user?.primaryEmailAddress?.emailAddress;
  useEffect(() => {
    if (email) {
      axios.post("/api/check-user", { email });
      return;
    } else {
      return;
    }
  }, [email]);
  return (
    <div>
      {children} <Toaster />
    </div>
  );
};
export default Provider;
