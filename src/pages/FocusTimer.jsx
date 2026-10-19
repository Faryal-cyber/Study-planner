import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Plus, Minus, Sliders } from 'lucide-react';

export default function FocusTimer({ onSaveLog }) {
  const [customMinutes, setCustomMinutes] = useState(25);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      onSaveLog(customMinutes * 60);
      alert('Focus session completed!');
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, customMinutes, onSaveLog]);

  const handleAdjustMinutes = (delta) => {
    if (isRunning) return;
    const newMins = Math.max(1, Math.min(180, customMinutes + delta));
    setCustomMinutes(newMins);
    setTimeLeft(newMins * 60);
  };

  const handleSelectPreset = (mins) => {
    if (isRunning) return;
    setCustomMinutes(mins);
    setTimeLeft(mins * 60);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(customMinutes * 60);
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-xl mx-auto space-y-6 text-center">
      <div>
        <h1 className="text-2xl font-bold text-white">Focus Flow Timer</h1>
        <p className="text-xs text-gray-400 mt-1">Adjust session duration and focus on your goals</p>
      </div>

      <div className="bg-[#1A1A1E] border border-[#2A2A30] rounded-3xl p-8 flex flex-col items-center shadow-2xl">
        {/* Preset Selector */}
        <div className="flex gap-2 mb-6 bg-[#0F0F10] p-1.5 rounded-2xl border border-[#2A2A30]">
          {[15, 25, 45, 60, 90].map((mins) => (
            <button
              key={mins}
              disabled={isRunning}
              onClick={() => handleSelectPreset(mins)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                customMinutes === mins
                  ? 'bg-[#FF6B00] text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {mins}m
            </button>
          ))}
        </div>

        {/* Circular Timer Display with Controls */}
        <div className="relative w-64 h-64 rounded-full border-4 border-[#FF6B00] flex flex-col items-center justify-center my-2 shadow-inner">
          <span className="text-xs uppercase tracking-widest text-[#FF6B00] font-bold">Focus Phase</span>
          <span className="text-5xl font-extrabold text-white mt-2">{formatTime(timeLeft)}</span>

          {/* Time Adjustment Controls (+ / -) */}
          {!isRunning && (
            <div className="flex items-center gap-3 mt-4">
              <button
                onClick={() => handleAdjustMinutes(-5)}
                className="p-1.5 rounded-lg bg-[#0F0F10] text-gray-400 hover:text-white border border-[#2A2A30]"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="text-xs font-medium text-gray-400">{customMinutes} min</span>
              <button
                onClick={() => handleAdjustMinutes(5)}
                className="p-1.5 rounded-lg bg-[#0F0F10] text-gray-400 hover:text-white border border-[#2A2A30]"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Play/Pause/Reset Controls */}
        <div className="flex gap-4 mt-6">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="flex items-center gap-2 bg-[#FF6B00] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#FF6B00]/90 transition shadow-lg shadow-[#FF6B00]/20"
          >
            {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            {isRunning ? 'Pause' : 'Start Focus'}
          </button>
          <button
            onClick={resetTimer}
            className="p-3 bg-[#0F0F10] border border-[#2A2A30] rounded-xl text-gray-400 hover:text-white transition"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}