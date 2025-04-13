'use client';

import { useTaskContext } from '@/context/task-context';
import type { DayOfWeek } from '@/lib/types';
import TaskItem from './task-item';

interface TaskColumnProps {
  day: DayOfWeek;
}

export default function TaskColumn({
  day,
}: TaskColumnProps) {
  const { getTasksByDay, getDayProgress, selectedTasks, toggleSelectTask } = useTaskContext();

  const tasks = getTasksByDay(day);
  const progress = getDayProgress(day);

  // Format the day name to title case
  const formatDayName = (day: string) => {
    return day.charAt(0).toUpperCase() + day.slice(1);
  };

  // Get gradient color based on day
  const getDayGradient = (day: DayOfWeek) => {
    const gradients = {
      'saturday': 'from-indigo-600 to-purple-600',
      'sunday': 'from-blue-600 to-indigo-600',
      'monday': 'from-sky-500 to-blue-600',
      'tuesday': 'from-teal-500 to-cyan-500',
      'wednesday': 'from-emerald-500 to-green-600',
      'thursday': 'from-orange-500 to-amber-500',
      'friday': 'from-rose-500 to-red-600',
    };
    return gradients[day] || 'from-indigo-600 to-purple-600';
  };

  const dayGradient = getDayGradient(day);

  return (
    <div className="day-column h-full flex flex-col">
      <h3 className={`bg-gradient-to-r ${dayGradient}`}>{formatDayName(day)}</h3>

      <div className="mb-4">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-medium text-gray-700">
            Progress
          </span>
          <span className="text-sm font-medium text-gray-700">
            {progress}%
          </span>
        </div>

        <div className="progress-bar">
          <div
            className={`progress-value bg-gradient-to-r ${dayGradient}`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="task-list flex-1 overflow-auto">
        {tasks.length === 0 ? (
          <div className="text-gray-400 text-center p-6 border-2 border-dashed border-gray-200 rounded-lg">
            <p className="text-sm">No tasks for {formatDayName(day)}</p>
            <p className="text-xs text-gray-400 mt-1">Add tasks using the form above</p>
          </div>
        ) : (
          <div className="space-y-2">
            {tasks.map((task, index) => (
              <div
                key={task.id}
                className="fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <TaskItem
                  task={task}
                  isSelected={selectedTasks.includes(task.id)}
                  onSelect={toggleSelectTask}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
