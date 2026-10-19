import React from 'react';
import { Play, Pause, RotateCcw, Clock, BarChart2 } from 'lucide-react';

export default function Statistics({ courses, subjectSeconds, setSubjectSeconds, activeTimerId, setActiveTimerId }) {
  
  const toggleStopwatch = (id) => {
    if (activeTimerId === id) {
      setActiveTimerId(null);
    } else {
      setActiveTimerId(id);
    }
  };

  const resetSubjectStopwatch = (id) => {
    if (activeTimerId === id) setActiveTimerId(null);
    setSubjectSeconds((prev) => ({ ...prev, [id]: 0 }));
  };

  const formatHMS = (secs = 0) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const totalTimeSeconds = Object.values(subjectSeconds).reduce((a, b) => a + b, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Live Study Statistics</h1>
          <p className="text-xs text-gray-400">Track subject focus time with live stopwatches & real-time graphs</p>
        </div>
      </div>

      {/* Top Cumulative Summary */}
      <div className="bg-[#1A1A1E] border border-[#2A2A30] rounded-2xl p-6 flex justify-between items-center">
        <div>
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Cumulative Time</span>
          <div className="text-4xl font-extrabold text-white mt-1">{formatHMS(totalTimeSeconds)}</div>
        </div>
        <div className="p-3 bg-[#FF6B00]/10 text-[#FF6B00] rounded-2xl">
          <Clock className="w-8 h-8" />
        </div>
      </div>

      {/* Real-time Subject Ratio Bar Graph */}
      <div className="bg-[#1A1A1E] border border-[#2A2A30] rounded-2xl p-6">
        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <BarChart2 className="w-5 h-5 text-[#FF6B00]" /> Real-time Subject Ratio Graph
        </h2>
        <div className="space-y-4">
          {courses.map((course) => {
            const time = subjectSeconds[course.id] || 0;
            const percentage = totalTimeSeconds > 0 ? ((time / totalTimeSeconds) * 100).toFixed(1) : '0';

            return (
              <div key={course.id} className="space-y-1">
                <div className="flex justify-between text-xs text-gray-300">
                  <span className="font-semibold">{course.title}</span>
                  <span>{formatHMS(time)} ({percentage}%)</span>
                </div>
                <div className="w-full h-3 bg-[#0F0F10] rounded-full overflow-hidden border border-[#2A2A30]">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{ width: `${percentage}%`, backgroundColor: course.color }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Subject Stopwatches Section */}
      <div className="bg-[#1A1A1E] border border-[#2A2A30] rounded-2xl p-6">
        <h2 className="text-lg font-bold text-white mb-4">Subject Stopwatches</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {courses.map((course) => {
            const isRunning = activeTimerId === course.id;
            const time = subjectSeconds[course.id] || 0;

            return (
              <div
                key={course.id}
                className={`p-4 rounded-xl bg-[#0F0F10] border transition-all flex items-center justify-between ${
                  isRunning ? 'border-[#FF6B00] shadow-md shadow-[#FF6B00]/10' : 'border-[#2A2A30]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: course.color }} />
                  <div>
                    <h3 className="text-sm font-semibold text-white">{course.title}</h3>
                    <div className="text-lg font-mono font-bold text-gray-200 mt-0.5">{formatHMS(time)}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleStopwatch(course.id)}
                    className={`p-2.5 rounded-xl font-semibold text-xs flex items-center gap-1 transition cursor-pointer ${
                      isRunning ? 'bg-red-500 text-white' : 'bg-[#FF6B00] text-white'
                    }`}
                  >
                    {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => resetSubjectStopwatch(course.id)}
                    className="p-2.5 rounded-xl bg-[#1A1A1E] border border-[#2A2A30] text-gray-400 hover:text-white cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}