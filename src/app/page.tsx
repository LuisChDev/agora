import { UserDisplay } from './UserDisplay';
import MapComponent from "./Map";

import prisma from "../lib/prisma";
import Header from "@/ui/Header";

export default async () => {
  const users = await prisma.user.findMany({ take: 10 });

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center
                    justify-items-center min-h-screen p-8 pb-20
                    gap-16 sm:p-20
                    font-[family-name:var(--font-geist-sans)]">
      <Header />
      <h1>
        Welcome to AgorApp
      </h1>

      <UserDisplay />

      <MapComponent />

      <div>
        There are currently {users.length} users.
      </div>
    </div>
  );
}
