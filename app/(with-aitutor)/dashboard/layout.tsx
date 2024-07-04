import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard",
};

export default function DashboardPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`flex h-fit max-h-screen min-h-screen w-full items-stretch justify-between overflow-auto bg-white dark:bg-wisdome-dark-bg`}
    >
      {children}
    </div>
  );
}
