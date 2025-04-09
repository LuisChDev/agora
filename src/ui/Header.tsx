"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

export default () => {
  const { data: session, status } = useSession();

  const text =
    status === "unauthenticated" ? <div>
      <Link href="/api/auth/signin">
        log in
      </Link>
    </div> : <div>
      welcome
    </div>

  return (
    <div>
      {text}
    </div>
  );
};
