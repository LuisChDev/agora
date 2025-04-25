"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export default () => {
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="flex items-center gap-4">
      {/* Links visible on larger screens */}
      <div className="hidden md:flex items-center gap-4">
        <Link href="/intake" className="text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
          Interests
        </Link>
        <Link href="/animation" className="text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
          Animation
        </Link>
      </div>
      
      {/* Notification icon */}
      <button className="relative text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
      </button>
      
      {/* User menu or login button */}
      {status === "authenticated" ? (
        <div className="relative">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center gap-2 focus:outline-none"
          >
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
              {session.user?.name?.charAt(0) || "U"}
            </div>
          </button>
          
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-20">
              <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                Your Profile
              </Link>
              <Link href="/settings" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                Settings
              </Link>
              <Link href="/api/auth/signout" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                Sign out
              </Link>
            </div>
          )}
        </div>
      ) : (
        <Link 
          href="/api/auth/signin" 
          className="inline-flex items-center justify-center px-4 py-1.5 text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          Sign in
        </Link>
      )}
    </div>
  );
};