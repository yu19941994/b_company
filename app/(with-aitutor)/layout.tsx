import Navbar from "@/components/dashboard/Navbar";
import AITutor from "@/components/AITutor/AITutor";
import OnBoarding from "@/components/newUser/onBoarding";
import Assesment from "@/components/newUser/assesment/Assesment"

export default function AuthedPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
      <AITutor />
      <Assesment />
      {/* <OnBoarding /> */}
    </>
  );
}
