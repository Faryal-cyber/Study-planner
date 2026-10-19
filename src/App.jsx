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

const INITIAL_COURSES = [
  { id: '1', title: 'Urdu', code: 'URD', color: '#EF4444' },
  { id: '2', title: 'English', code: 'ENG', color: '#8B5CF6' },
  { id: '3', title: 'Maths', code: 'MTH', color: '#10B981' },
  { id: '4', title: 'Physics', code: 'PHY', color: '#F59E0B' },
  { id: '5', title: 'Computer', code: 'CS', color: '#3B82F6' },
  { id: '6', title: 'Pak Studies', code: 'PST', color: '#EC4899' },
];

const INITIAL_ASSIGNMENTS = [
  { id: '101', title: 'Physics Chapter 4 Numerical Problems', course_id: '4', due_date: '2026-10-22', priority: 'high', completed: false },
  { id: '102', title: 'Maths Integration Exercise 3.2', course_id: '3', due_date: '2026-10-25', priority: 'medium', completed: false },
];

export default function App() {
  const { user, signOut } = useAuth();
  const [localUser, setLocalUser] = useState(null);

  const [activeTab, setActiveTab] = useState('dashboard');
  const [courses, setCourses] = useState(INITIAL_COURSES);
  const [assignments, setAssignments] = useState(INITIAL_ASSIGNMENTS);

  // Clean initial state for subject stopwatches (0s for all subjects)
  const [subjectSeconds, setSubjectSeconds] = useState({
    1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0
  });
  const [activeTimerId, setActiveTimerId] = useState(null);

  // Active stopwatch ticker
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

  const activeUser = user || localUser;

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
              // Add completed focus timer session into General Subject 1
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