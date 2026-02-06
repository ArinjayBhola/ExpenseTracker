import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/slice/userInfoSlice";

const ReduxProvider = ({ email, children }: { email: string | null | undefined; children: React.ReactNode }) => {
  const [userInfo, setUserInfo] = React.useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!email) return;
    axios
      .post("api/get-user", {
        email: email,
      })
      .then((response) => {
        setUserInfo(response.data.message);
      })
      .catch((error) => console.error(error));
  }, [email, dispatch]);
  useEffect(() => {
    if (!userInfo) return;
    dispatch(setUser(userInfo));
  }, [dispatch, userInfo]);
  return <div>{children}</div>;
};

export default ReduxProvider;
