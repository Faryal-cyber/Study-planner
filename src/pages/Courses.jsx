import React, { useState } from 'react';
import { BookOpen, Plus, Trash2 } from 'lucide-react';

export default function Courses({ courses, setCourses }) {
  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');
  const [color, setColor] = useState('#FF6B00');

  const addCourse = (e) => {
    e.preventDefault();
    if (!title) return;

    const newCourse = {
      id: crypto.randomUUID(),
      title,
      code,
      color,
      target_hours_per_week: 5,
    };

    setCourses([...courses, newCourse]);
    setTitle('');
    setCode('');
  };

  const deleteCourse = (id) => {
    setCourses(courses.filter((c) => c.id !== id));
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Subjects & Courses</h1>

      <form onSubmit={addCourse} className="bg-[#1A1A1E] border border-[#2A2A30] p-4 rounded-2xl flex flex-wrap gap-3">
        <input
          type="text"
          placeholder="Course Name (e.g. Physics)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="bg-[#0F0F10] border border-[#2A2A30] rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#FF6B00] flex-1 min-w-[200px]"
        />
        <input
          type="text"
          placeholder="Code (e.g. PHY101)"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="bg-[#0F0F10] border border-[#2A2A30] rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#FF6B00] w-36"
        />
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="h-10 w-12 bg-[#0F0F10] border border-[#2A2A30] rounded-xl p-1 cursor-pointer"
        />
        <button
          type="submit"
          className="bg-[#FF6B00] text-white rounded-xl py-2 px-5 font-semibold text-sm flex items-center gap-2 hover:bg-[#FF6B00]/90 transition"
        >
          <Plus className="w-4 h-4" /> Add Subject
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map((course) => (
          <div key={course.id} className="bg-[#1A1A1E] border border-[#2A2A30] rounded-2xl p-5 flex justify-between items-start">
            <div className="flex gap-3">
              <div className="w-4 h-12 rounded-full" style={{ backgroundColor: course.color }} />
              <div>
                <h3 className="font-bold text-white text-lg">{course.title}</h3>
                <p className="text-xs text-gray-400">{course.code || 'No code'}</p>
              </div>
            </div>
            <button onClick={() => deleteCourse(course.id)} className="text-gray-500 hover:text-red-400 p-1">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}