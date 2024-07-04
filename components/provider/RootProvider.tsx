// redux
import { Providers as ReduxProvider } from "@/components/provider/ReduxProvider";
import GoogleOAuthProvider from "./GoogleOAuthProvider";
import ThemeProvider from "./ThemeProvider";
import TanstackQueryProvider from "./TanstackQueryProvider";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const RootProvider = ({ children }: Props) => {
  return (
    <TanstackQueryProvider>
      <GoogleOAuthProvider>
        <ThemeProvider
          defaultTheme="dark"
          enableSystem={false}
          attribute="class"
        >
          <ReduxProvider>{children}</ReduxProvider>
        </ThemeProvider>
      </GoogleOAuthProvider>
    </TanstackQueryProvider>
  );
};

export default RootProvider;
