import React from 'react';
import { LayoutDashboard, CheckSquare, BookOpen, Calendar, Timer, BarChart3, LogOut } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, user, onSignOut }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'assignments', label: 'Assignments', icon: CheckSquare },
    { id: 'courses', label: 'Courses', icon: BookOpen },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'timer', label: 'Timer', icon: Timer },
    { id: 'statistics', label: 'Stats', icon: BarChart3 },
  ];

  const displayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User';
  const avatarUrl = user?.user_metadata?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150';

  return (
    <>
      {/* Top Header Bar (Desktop & Mobile Header) */}
      <header className="border-b border-[#2A2A30] bg-[#1A1A1E]/80 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-[#FF6B00] text-white shadow-lg shadow-[#FF6B00]/20">
                <Timer className="w-5 h-5" />
              </div>
              <span className="font-bold text-lg text-white tracking-wide">StudyFlow</span>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                      isActive
                        ? 'bg-[#FF6B00] text-white shadow-md shadow-[#FF6B00]/20'
                        : 'text-gray-400 hover:text-white hover:bg-[#2A2A30]'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </button>
                );
              })}
            </nav>

            {/* Profile & Logout (Top Right Corner) */}
            <div className="flex items-center gap-2.5">
              <div className="flex items-center gap-2 bg-[#0F0F10] border border-[#2A2A30] px-2.5 py-1 rounded-full">
                <img
                  src={avatarUrl}
                  alt="PFP"
                  className="w-6 h-6 rounded-full object-cover border border-[#FF6B00]"
                />
                <span className="text-xs font-bold text-white max-w-[80px] sm:max-w-[120px] truncate">
                  {displayName}
                </span>
              </div>
              <button
                onClick={onSignOut}
                className="p-2 text-gray-400 hover:text-white hover:bg-[#2A2A30] rounded-xl transition"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation Bar (Visible on Mobile Screens) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#1A1A1E]/95 backdrop-blur border-t border-[#2A2A30] px-2 py-1.5 flex justify-around items-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center gap-1 px-2.5 py-1.5 rounded-xl transition-all ${
                isActive ? 'text-[#FF6B00]' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className={`text-[10px] ${isActive ? 'font-bold' : 'font-medium'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </>
  );
}