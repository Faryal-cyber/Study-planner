import React, { useState } from 'react';
import { Plus, Trash2, CheckSquare, Square } from 'lucide-react';

export default function Assignments({ assignments, setAssignments, courses }) {
  const [title, setTitle] = useState('');
  const [courseId, setCourseId] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('medium');

  const addAssignment = (e) => {
    e.preventDefault();
    if (!title || !dueDate) return;

    const newAssignment = {
      id: crypto.randomUUID(),
      title,
      course_id: courseId,
      due_date: dueDate,
      priority,
      completed: false,
    };

    setAssignments([newAssignment, ...assignments]);
    setTitle('');
    setCourseId('');
    setDueDate('');
  };

  const toggleComplete = (id) => {
    setAssignments(assignments.map((a) => (a.id === id ? { ...a, completed: !a.completed } : a)));
  };

  const deleteAssignment = (id) => {
    setAssignments(assignments.filter((a) => a.id !== id));
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Assignments & To-Dos</h1>

      {/* Add Form */}
      <form onSubmit={addAssignment} className="bg-[#1A1A1E] border border-[#2A2A30] p-4 rounded-2xl grid grid-cols-1 md:grid-cols-5 gap-3">
        <input
          type="text"
          placeholder="Assignment title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="bg-[#0F0F10] border border-[#2A2A30] rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#FF6B00]"
        />
        <select
          value={courseId}
          onChange={(e) => setCourseId(e.target.value)}
          className="bg-[#0F0F10] border border-[#2A2A30] rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#FF6B00]"
        >
          <option value="">Select Subject/Course</option>
          {courses.map((c) => (
            <option key={c.id} value={c.id}>{c.title}</option>
          ))}
        </select>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="bg-[#0F0F10] border border-[#2A2A30] rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#FF6B00]"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="bg-[#0F0F10] border border-[#2A2A30] rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#FF6B00]"
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
        <button
          type="submit"
          className="bg-[#FF6B00] text-white rounded-xl py-2 px-4 font-semibold text-sm flex items-center justify-center gap-2 hover:bg-[#FF6B00]/90 transition"
        >
          <Plus className="w-4 h-4" /> Add Task
        </button>
      </form>

      {/* Assignment Cards List */}
      <div className="space-y-3">
        {assignments.map((item) => {
          const course = courses.find((c) => c.id === item.course_id);
          return (
            <div
              key={item.id}
              className={`p-4 rounded-2xl border transition-all flex items-center justify-between ${
                item.completed
                  ? 'bg-[#1A1A1E]/40 border-[#2A2A30]/50 opacity-60'
                  : 'bg-[#1A1A1E] border-[#2A2A30]'
              }`}
            >
              <div className="flex items-center gap-4">
                <button onClick={() => toggleComplete(item.id)} className="text-[#FF6B00]">
                  {item.completed ? <CheckSquare className="w-5 h-5" /> : <Square className="w-5 h-5 text-gray-500" />}
                </button>
                <div>
                  <div className={`text-base font-semibold ${item.completed ? 'line-through text-gray-400' : 'text-white'}`}>
                    {item.title}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                    <span className="px-2 py-0.5 rounded bg-[#2A2A30]">{course?.title || 'General'}</span>
                    <span>• Due {item.due_date}</span>
                    <span className={`capitalize ${item.priority === 'high' ? 'text-red-400' : item.priority === 'medium' ? 'text-amber-400' : 'text-emerald-400'}`}>
                      • {item.priority}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => deleteAssignment(item.id)}
                className="text-gray-500 hover:text-red-400 p-2"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}