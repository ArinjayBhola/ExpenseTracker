"use client";

import { useSession } from "next-auth/react";
import axios from "axios";
import { useEffect } from "react";
import { Toaster } from "sonner";
import { Provider } from "react-redux";
import appStore from "../redux/appStore";
import ReduxProvider from "../ReduxProvider";

const SessionWrapper = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { data: session } = useSession();
  const email = session?.user?.email;

  useEffect(() => {
    if (email) {
      axios.post("/api/check-user", { email });
    }
  }, [email]);

  return (
    <div>
      <Provider store={appStore}>
        <ReduxProvider email={email}>
          {children} <Toaster />
        </ReduxProvider>
      </Provider>
    </div>
  );
};
export default SessionWrapper;
