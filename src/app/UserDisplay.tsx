"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";

export const UserDisplay = () => {
  const [points, setPoints] = useState<number>(0);
  const { data, status } = useSession();

  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
      {status === "authenticated" ? (
        <div className="flex flex-col">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
              {data.user?.name?.charAt(0) || "U"}
            </div>
            <div className="ml-3">
              <p className="font-medium text-gray-900 dark:text-white">{data.user?.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{data.user?.email}</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-600 dark:text-gray-300">Universe Points</span>
            <span className="text-sm font-semibold">{points}</span>
          </div>
          
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-4">
            <div 
              className="bg-blue-600 h-2 rounded-full" 
              style={{ width: `${Math.min(points * 10, 100)}%` }}
            ></div>
          </div>
          
          <button
            className="w-full bg-blue-100 hover:bg-blue-200 text-blue-800 text-sm font-medium py-2 px-4 rounded-lg transition-colors"
            onClick={() => setPoints(points + 1)}
          >
            Earn More Points
          </button>
          
          <div className="mt-4 flex justify-between text-xs">
            <Link href="/profile" className="text-blue-600 hover:underline dark:text-blue-400">
              View Profile
            </Link>
            <Link href="/api/auth/signout" className="text-gray-600 hover:underline dark:text-gray-400">
              Sign Out
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center py-2">
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
            Sign in to see your profile and track your points
          </p>
          <Link 
            href="/api/auth/signin"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-2 px-4 rounded-lg transition-colors"
          >
            Sign In
          </Link>
        </div>
      )}
    </div>
  );
};