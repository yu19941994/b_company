import Link from "next/link";
import NotFoundBright from "/public/not-found/oops_bright.svg";
import NotFoundDark from "/public/not-found/oops_dark.svg";
export default function NotFound() {
  return (
    <div className="flex h-dvh w-dvw flex-col items-center justify-center bg-white dark:bg-[#252525]">
      <h2 className="mb-6 text-5xl font-bold text-[#AEA5CCCC]">OOPS</h2>

      <NotFoundBright className="text-9xl dark:hidden" />
      <NotFoundDark className="hidden text-9xl dark:block" />
      <p className="my-10 text-center text-lg text-[#252525] dark:text-[#CACACA]">
        Something went wrong. <br />
        Please return to the dashboard.
      </p>
      <Link
        prefetch
        href="/dashboard"
        className="rounded-full bg-[#785FBB] px-4 py-3  text-white "
      >
        Return
      </Link>
    </div>
  );
}
