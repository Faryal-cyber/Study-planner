import React from 'react';

export default function CalendarView({ assignments }) {
  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Monthly Planner</h1>

      <div className="bg-[#1A1A1E] border border-[#2A2A30] rounded-2xl p-6">
        <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-gray-400 mb-4">
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
          <div>Sun</div>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {daysInMonth.map((day) => {
            const dateStr = `2026-10-${day < 10 ? '0' + day : day}`;
            const dayAssignments = assignments.filter((a) => a.due_date === dateStr);

            return (
              <div key={day} className="min-h-[90px] bg-[#0F0F10] border border-[#2A2A30] rounded-xl p-2 flex flex-col justify-between">
                <span className="text-xs font-semibold text-gray-400">{day}</span>
                <div className="space-y-1">
                  {dayAssignments.map((a) => (
                    <div key={a.id} className="bg-[#FF6B00]/20 text-[#FF6B00] text-[10px] p-1 rounded font-medium truncate">
                      {a.title}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}