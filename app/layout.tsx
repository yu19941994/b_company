// css
import "./globals.css";
// fonts
import { inter } from "@/util/fonts";
// libs
import { Suspense } from "react";
import type { Metadata } from "next";
import Script from "next/script";
import { GoogleTagManager, GoogleAnalytics } from "@next/third-parties/google";

// provider
import RootProvider from "@/components/provider/RootProvider";

// components
import NavigationEvents from "@/components/common/NavigationEvent";

export const metadata: Metadata = {
  title: "BrainBox",
  description: "Brain Box",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //
  return (
    <html lang="en">
      <head>
        <title>BrainBox</title>
        <link
          rel="icon"
          href="/icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
        <link
          rel="apple-touch-icon"
          href="/apple-icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
        <link rel="manifest" href="/manifest.json" />

        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
        <Script
          src="/scripts/HackTimer.js"
          // strategy="beforeInteractive"
        ></Script>
      </head>
      <body className={`${inter.className} h-dvh w-dvw overflow-y-hidden`}>
        {/* <WebVitals /> */}
        <RootProvider>
          <div
            className={`flex h-dvh min-h-dvh w-full items-stretch justify-between overflow-hidden bg-white dark:bg-wisdome-dark-bg`}
          >
            {children}
          </div>
          {/* <Assistant /> */}
          {/* <DarkmodeButton /> */}
          <Suspense fallback={null}>
            <NavigationEvents />
          </Suspense>
        </RootProvider>
      </body>
      <GoogleAnalytics gaId="G-E837KTR9KE" />
      <GoogleTagManager gtmId="GTM-WGQ96DHB" />
    </html>
  );
}
