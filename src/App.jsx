import React, { useState, useEffect } from 'react';
import { useAuth } from './context/AuthContext';
import AuthScreen from './component/AuthModal';
import Navbar from './component/Navbar';
import Dashboard from './pages/Dashboard';
import Assignments from './pages/Assignments';
import Courses from './pages/Courses';
import CalendarView from './pages/CalendarView';
import FocusTimer from './pages/FocusTimer';
import Statistics from './pages/Statistics';

export default function App() {
  const { user, signOut } = useAuth();
  
  // Persistent local user session
  const [localUser, setLocalUser] = useState(() => {
    const saved = localStorage.getItem('syncademics_user');
    return saved ? JSON.parse(saved) : null;
  });

  const activeUser = user || localUser;
  const userId = activeUser?.id || activeUser?.email || 'guest';

  const [activeTab, setActiveTab] = useState('dashboard');

  // Load saved courses or start with empty/clean state for end-users
  const [courses, setCourses] = useState(() => {
    const saved = localStorage.getItem(`syncademics_courses_${userId}`);
    if (saved) return JSON.parse(saved);
    // Clean default user courses
    return [
      { id: '1', title: 'Urdu', code: 'URD', color: '#EF4444' },
      { id: '2', title: 'English', code: 'ENG', color: '#8B5CF6' },
      { id: '3', title: 'Maths', code: 'MTH', color: '#10B981' },
      { id: '4', title: 'Physics', code: 'PHY', color: '#F59E0B' },
      { id: '5', title: 'Computer', code: 'CS', color: '#3B82F6' },
      { id: '6', title: 'Pak Studies', code: 'PST', color: '#EC4899' },
    ];
  });

  // Load saved assignments (starts empty so only user-created tasks exist)
  const [assignments, setAssignments] = useState(() => {
    const saved = localStorage.getItem(`syncademics_assignments_${userId}`);
    return saved ? JSON.parse(saved) : [];
  });

  // Load saved stopwatch and focus times
  const [subjectSeconds, setSubjectSeconds] = useState(() => {
    const saved = localStorage.getItem(`syncademics_seconds_${userId}`);
    return saved ? JSON.parse(saved) : { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
  });

  const [activeTimerId, setActiveTimerId] = useState(null);

  // Automatically save state changes to localStorage whenever the user makes modifications
  useEffect(() => {
    if (activeUser) {
      localStorage.setItem('syncademics_user', JSON.stringify(activeUser));
    } else {
      localStorage.removeItem('syncademics_user');
    }
  }, [activeUser]);

  useEffect(() => {
    localStorage.setItem(`syncademics_courses_${userId}`, JSON.stringify(courses));
  }, [courses, userId]);

  useEffect(() => {
    localStorage.setItem(`syncademics_assignments_${userId}`, JSON.stringify(assignments));
  }, [assignments, userId]);

  useEffect(() => {
    localStorage.setItem(`syncademics_seconds_${userId}`, JSON.stringify(subjectSeconds));
  }, [subjectSeconds, userId]);

  // Real-time stopwatch ticker
  useEffect(() => {
    let interval = null;
    if (activeTimerId !== null) {
      interval = setInterval(() => {
        setSubjectSeconds((prev) => ({
          ...prev,
          [activeTimerId]: (prev[activeTimerId] || 0) + 1,
        }));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [activeTimerId]);

  const totalCumulativeSeconds = Object.values(subjectSeconds).reduce((a, b) => a + b, 0);

  // If user is not authenticated, show login screen
  if (!activeUser) {
    return <AuthScreen onLoginSuccess={(userData) => setLocalUser(userData)} />;
  }

  return (
    <div className="min-h-screen bg-[#0F0F10] text-gray-100 flex flex-col font-sans pb-16 md:pb-0">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        user={activeUser}
        onSignOut={() => {
          setLocalUser(null);
          localStorage.removeItem('syncademics_user');
          signOut();
        }}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {activeTab === 'dashboard' && (
          <Dashboard
            assignments={assignments}
            courses={courses}
            totalFocusSeconds={totalCumulativeSeconds}
          />
        )}
        {activeTab === 'assignments' && (
          <Assignments assignments={assignments} setAssignments={setAssignments} courses={courses} />
        )}
        {activeTab === 'courses' && <Courses courses={courses} setCourses={setCourses} />}
        {activeTab === 'calendar' && <CalendarView assignments={assignments} />}
        {activeTab === 'timer' && (
          <FocusTimer
            onSaveLog={(addedSecs) => {
              setSubjectSeconds((prev) => ({ ...prev, 1: (prev[1] || 0) + addedSecs }));
            }}
          />
        )}
        {activeTab === 'statistics' && (
          <Statistics
            courses={courses}
            subjectSeconds={subjectSeconds}
            setSubjectSeconds={setSubjectSeconds}
            activeTimerId={activeTimerId}
            setActiveTimerId={setActiveTimerId}
          />
        )}
      </main>
    </div>
  );
}