import { UserDisplay } from './UserDisplay';
import MapComponent from "./Map";
import prisma from "../lib/prisma";
import Header from "@/ui/Header";
import { Suspense } from 'react';

export default async () => {
  const users = await prisma.user.findMany({ take: 10 });

  return (
    <div className="flex flex-col h-screen w-full bg-white dark:bg-gray-900">
      {/* Top Navbar */}
      <header className="flex justify-between items-center px-4 py-2 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
        <div className="flex items-center space-x-2">
          <h1 className="text-xl font-bold text-blue-600 dark:text-blue-400">AgorApp</h1>
        </div>
        <div className="flex items-center space-x-4">
          <Header />
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex flex-col md:flex-row flex-grow overflow-hidden">
        {/* Sidebar - Hidden on mobile, visible on tablet/desktop */}
        <aside className="hidden md:flex md:flex-col w-64 bg-gray-100 dark:bg-gray-800 p-4 overflow-y-auto">
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Nearby Friends</h2>
            <div className="space-y-2">
              <Suspense fallback={<div>Loading friends...</div>}>
                <NearbyFriends />
              </Suspense>
            </div>
          </div>
          
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Active Events</h2>
            <div className="space-y-2">
              <Suspense fallback={<div>Loading events...</div>}>
                <ActiveEvents />
              </Suspense>
            </div>
          </div>
          
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Universes</h2>
            <div className="space-y-2">
              <Suspense fallback={<div>Loading universes...</div>}>
                <UniverseSelector />
              </Suspense>
            </div>
          </div>
          
          <div className="mt-auto">
            <UserDisplay />
          </div>
        </aside>

        {/* Main Map Area */}
        <main className="flex-grow relative overflow-hidden">
          <MapComponent />
          
          {/* Mobile-only bottom navigation */}
          <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex justify-around py-2">
            <button className="flex flex-col items-center justify-center p-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span className="text-xs">Map</span>
            </button>
            <button className="flex flex-col items-center justify-center p-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="text-xs">Friends</span>
            </button>
            <button className="flex flex-col items-center justify-center p-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-xs">Events</span>
            </button>
            <button className="flex flex-col items-center justify-center p-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-xs">Settings</span>
            </button>
          </nav>
        </main>
      </div>
      
      {/* Footer with user count */}
      <footer className="p-2 text-xs text-center text-gray-500">
        There are currently {users.length} users on AgorApp
      </footer>
    </div>
  );
};

// Placeholder components that would fetch and display real data in production
const NearbyFriends = () => {
  return (
    <div className="space-y-2">
      <div className="flex items-center p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700">
        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">JD</div>
        <div className="ml-2">
          <p className="text-sm font-medium">John Doe</p>
          <p className="text-xs text-gray-500">500m away</p>
        </div>
      </div>
      <div className="flex items-center p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700">
        <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white">JS</div>
        <div className="ml-2">
          <p className="text-sm font-medium">Jane Smith</p>
          <p className="text-xs text-gray-500">1.2km away</p>
        </div>
      </div>
    </div>
  );
};

const ActiveEvents = () => {
  return (
    <div className="space-y-2">
      <div className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700">
        <p className="text-sm font-medium">Park Concert</p>
        <p className="text-xs text-gray-500">Central Park • 2km away</p>
        <p className="text-xs text-gray-500">Starting in 30 minutes</p>
      </div>
      <div className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700">
        <p className="text-sm font-medium">Outdoor Yoga</p>
        <p className="text-xs text-gray-500">Riverside • 1.5km away</p>
        <p className="text-xs text-gray-500">Going on now</p>
      </div>
    </div>
  );
};

const UniverseSelector = () => {
  return (
    <div className="space-y-2">
      <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900 flex justify-between items-center">
        <span className="text-sm font-medium">Public</span>
        <span className="text-xs px-2 py-1 bg-blue-200 dark:bg-blue-800 rounded">Active</span>
      </div>
      <div className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700">
        <span className="text-sm">Sports Fans</span>
      </div>
      <div className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700">
        <span className="text-sm">Art Gallery Hopping</span>
      </div>
    </div>
  );
};