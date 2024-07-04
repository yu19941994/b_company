"use client";
// libs
import { useEffect } from "react";

import { useRouter, usePathname, useParams } from "next/navigation";

export default function TheIndexPage() {
  // const player = useRef(null);
  const router = useRouter();
  useEffect(() => {
    router.replace("/dashboard");
  }, []);
  return <></>;
}
