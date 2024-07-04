"use client";
import { GoogleOAuthProvider as Provider } from "@react-oauth/google";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const GoogleOAuthProvider = (props: Props) => {
  return (
    <Provider clientId={`${process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID}`}>
      {props.children}
    </Provider>
  );
};

export default GoogleOAuthProvider;
