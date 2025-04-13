'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import type { DayOfWeek, Priority } from '@/lib/types';
import { useTaskContext } from '@/context/task-context';
import { FaPlus } from 'react-icons/fa';

export default function TaskInput() {
  const { addTask } = useTaskContext();

  const [title, setTitle] = useState<string>('');
  const [day, setDay] = useState<DayOfWeek>('saturday');
  const [priority, setPriority] = useState<Priority>('low');

  const handleAddTask = () => {
    if (title.trim()) {
      addTask(title, day, priority);
      setTitle('');
    }
  };

  // Define colors for priority selection
  const priorityColors = {
    low: 'text-blue-600',
    medium: 'text-yellow-600',
    high: 'text-red-600'
  };

  return (
    <div className="flex flex-col md:flex-row gap-3">
      <Input
        type="text"
        placeholder="Add a new task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleAddTask();
          }
        }}
        className="md:flex-1 py-6 shadow-sm border-gray-200 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-lg"
      />

      <select
        value={day}
        onChange={(e) => setDay(e.target.value as DayOfWeek)}
        className="px-4 py-2 rounded-lg border border-gray-200 shadow-sm focus:border-indigo-300 focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-opacity-50 bg-white capitalize"
      >
        <option value="saturday">Saturday</option>
        <option value="sunday">Sunday</option>
        <option value="monday">Monday</option>
        <option value="tuesday">Tuesday</option>
        <option value="wednesday">Wednesday</option>
        <option value="thursday">Thursday</option>
        <option value="friday">Friday</option>
      </select>

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value as Priority)}
        className={`px-4 py-2 rounded-lg border border-gray-200 shadow-sm focus:border-indigo-300 focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-opacity-50 bg-white font-medium ${priorityColors[priority]}`}
      >
        <option value="low" className="text-blue-600">Low priority</option>
        <option value="medium" className="text-yellow-600">Medium priority</option>
        <option value="high" className="text-red-600">High priority</option>
      </select>

      <Button
        onClick={handleAddTask}
        className="btn-primary py-6 px-6"
      >
        <FaPlus className="mr-2" /> Add Task
      </Button>
    </div>
  );
}
