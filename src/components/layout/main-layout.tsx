import type React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaList, FaClock, FaStickyNote, FaPray, FaChartLine } from 'react-icons/fa';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-20 bg-gradient-to-b from-indigo-600 to-purple-700 flex flex-col items-center py-8 fixed left-0 top-0 h-full z-10 shadow-xl">
        <div className="flex flex-col items-center justify-center mb-10">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md">
            <span className="text-indigo-700 text-lg font-bold">M</span>
          </div>
          <span className="text-white text-xs mt-2 opacity-75">Tasks</span>
        </div>

        <div className="flex flex-col items-center space-y-6">
          <Link href="/">
            <button
              className={`sidebar-btn w-12 h-12 rounded-xl mb-1 flex items-center justify-center text-white ${
                pathname === '/'
                  ? 'bg-white/20 shadow-lg scale-110 border border-white/20'
                  : 'hover:bg-white/10'
              }`}
              aria-label="Task Manager"
            >
              <FaList size={20} />
            </button>
            <span className="text-white/70 text-xs">Tasks</span>
          </Link>

          <Link href="/pomodoro" className="flex flex-col items-center">
            <button
              className={`sidebar-btn w-12 h-12 rounded-xl mb-1 flex items-center justify-center text-white ${
                pathname === '/pomodoro'
                  ? 'bg-white/20 shadow-lg scale-110 border border-white/20'
                  : 'hover:bg-white/10'
              }`}
              aria-label="Pomodoro Timer"
            >
              <FaClock size={20} />
            </button>
            <span className="text-white/70 text-xs">Pomodoro</span>
          </Link>

          <Link href="/worship-tasks" className="flex flex-col items-center">
            <button
              className={`sidebar-btn w-12 h-12 rounded-xl mb-1 flex items-center justify-center text-white ${
                pathname === '/worship-tasks'
                  ? 'bg-white/20 shadow-lg scale-110 border border-white/20'
                  : 'hover:bg-white/10'
              }`}
              aria-label="Muslim's Worship Tasks"
            >
              <FaPray size={20} />
            </button>
            <span className="text-white/70 text-xs">Worship</span>
          </Link>

          <Link href="/notes" className="flex flex-col items-center">
            <button
              className={`sidebar-btn w-12 h-12 rounded-xl mb-1 flex items-center justify-center text-white ${
                pathname === '/notes'
                  ? 'bg-white/20 shadow-lg scale-110 border border-white/20'
                  : 'hover:bg-white/10'
              }`}
              aria-label="Notes"
            >
              <FaStickyNote size={20} />
            </button>
            <span className="text-white/70 text-xs">Notes</span>
          </Link>

          <Link href="/mithaq" className="flex flex-col items-center">
            <button
              className={`sidebar-btn w-12 h-12 rounded-xl mb-1 flex items-center justify-center text-white ${
                pathname === '/mithaq'
                  ? 'bg-white/20 shadow-lg scale-110 border border-white/20'
                  : 'hover:bg-white/10'
              }`}
              aria-label="Mithaq Al-Tatwir"
            >
              <FaChartLine size={20} />
            </button>
            <span className="text-white/70 text-xs">Mithaq</span>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 pl-20 bg-gray-50 min-h-screen">
        {children}
      </main>
    </div>
  );
}
