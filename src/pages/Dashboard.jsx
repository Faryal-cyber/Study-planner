import React from 'react';
import { BookOpen, CheckCircle, Clock, AlertTriangle } from 'lucide-react';

export default function Dashboard({ assignments, courses, totalFocusSeconds = 0 }) {
  const pendingAssignments = assignments.filter((a) => !a.completed);
  const completedAssignments = assignments.filter((a) => a.completed);

  // Format real-time seconds into exact HH:MM:SS format matching the Statistics page
  const formatHMS = (secs = 0) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard Overview</h1>
          <p className="text-xs text-gray-400 mt-1">Track your courses, tasks, and study progress</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#1A1A1E] border border-[#2A2A30] rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Pending Tasks</span>
            <AlertTriangle className="w-5 h-5 text-amber-500" />
          </div>
          <div className="mt-2 text-3xl font-extrabold text-white">{pendingAssignments.length}</div>
        </div>

        <div className="bg-[#1A1A1E] border border-[#2A2A30] rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Completed Tasks</span>
            <CheckCircle className="w-5 h-5 text-emerald-500" />
          </div>
          <div className="mt-2 text-3xl font-extrabold text-white">{completedAssignments.length}</div>
        </div>

        <div className="bg-[#1A1A1E] border border-[#2A2A30] rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Active Courses</span>
            <BookOpen className="w-5 h-5 text-[#FF6B00]" />
          </div>
          <div className="mt-2 text-3xl font-extrabold text-white">{courses.length}</div>
        </div>

        {/* Real-time Total Study Time formatted as exact 00:00:00 */}
        <div className="bg-[#1A1A1E] border border-[#2A2A30] rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Study Time</span>
            <Clock className="w-5 h-5 text-[#FF6B00]" />
          </div>
          <div className="mt-2 text-3xl font-extrabold font-mono text-white">
            {formatHMS(totalFocusSeconds)}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Deadlines */}
        <div className="bg-[#1A1A1E] border border-[#2A2A30] rounded-2xl p-6">
          <h2 className="text-lg font-bold text-white mb-4">Upcoming Deadlines</h2>
          <div className="space-y-3">
            {pendingAssignments.length === 0 ? (
              <p className="text-sm text-gray-500">No pending assignments!</p>
            ) : (
              pendingAssignments.slice(0, 5).map((a) => {
                const course = courses.find((c) => c.id === a.course_id);
                return (
                  <div key={a.id} className="flex items-center justify-between p-3.5 rounded-xl bg-[#0F0F10] border border-[#2A2A30]">
                    <div>
                      <div className="text-sm font-semibold text-white">{a.title}</div>
                      <div className="text-xs text-gray-400">{course?.title || 'General'}</div>
                    </div>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-[#FF6B00]/10 text-[#FF6B00] font-semibold">
                      Due: {a.due_date}
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Enrolled Courses */}
        <div className="bg-[#1A1A1E] border border-[#2A2A30] rounded-2xl p-6">
          <h2 className="text-lg font-bold text-white mb-4">Enrolled Courses</h2>
          <div className="space-y-3">
            {courses.map((course) => (
              <div key={course.id} className="flex items-center justify-between p-3.5 rounded-xl bg-[#0F0F10] border border-[#2A2A30]">
                <div className="flex items-center gap-3">
                  <div className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: course.color }} />
                  <div>
                    <div className="text-sm font-semibold text-white">{course.title}</div>
                    <div className="text-xs text-gray-400">{course.code}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}