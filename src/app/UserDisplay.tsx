"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";

export const UserDisplay = () => {
  const [apple, setApple] = useState<number>(0);
  const { data, status } = useSession();

  return (
    <>
      <p>
        currently {data?.user?.name ? `logged in as ${data.user.name}` : `not logged in`}.
      </p>

      <p>
        there are currently {apple} apples.
      </p>


      <div>
        click
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => { console.log("that's a click"); setApple(apple + 1) }}
        > here
        </button>
        to increase them.
      </div>
    </>
  );
}
