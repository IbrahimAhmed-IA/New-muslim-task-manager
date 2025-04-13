'use client';

import { useState } from 'react';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import TaskColumn from './task-column';
import TaskInput from './task-input';
import { useTaskContext } from '@/context/task-context';
import type { DayOfWeek } from '@/lib/types';
import CopyTaskModal from './modals/copy-task-modal';
import AzanTimes from '@/components/azan/azan-times';

export default function TaskManager() {
  const {
    getOverallProgress,
    uncheckAllTasks,
    sortTasks,
    selectedTasks,
    setSelectedTasks
  } = useTaskContext();

  const [showCopyModal, setShowCopyModal] = useState(false);

  const progressPercentage = getOverallProgress();

  const handleCopyTasks = () => {
    if (selectedTasks.length === 0) return;
    setShowCopyModal(true);
  };

  const handleCopyModalClose = () => {
    setShowCopyModal(false);
  };

  const handleUncheckAllTasks = () => {
    uncheckAllTasks();
  };

  const days: DayOfWeek[] = [
    'saturday', 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday'
  ];

  return (
    <div className="task-manager w-full fade-in">
      {/* Header */}
      <header className="page-header py-10">
        <h1 className="text-3xl font-bold mb-1">Muslim Task Manager</h1>
        <p className="text-white/80">Organize your day with purpose</p>
        <AzanTimes />
      </header>

      {/* Content */}
      <div className="container mx-auto p-6">
        {/* Progress Overview */}
        <div className="card p-6 mb-8 transition-all hover:shadow-md">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
            <div className="flex items-center mb-4 sm:mb-0">
              <div className="h-12 w-12 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center mr-4 shadow-md">
                <span className="text-white font-bold text-lg">{progressPercentage}%</span>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Overall Progress</h2>
                <p className="text-gray-500 text-sm">Keep going, you're doing great!</p>
              </div>
            </div>

            <div className="w-full sm:w-4/5">
              <Progress
                value={progressPercentage}
                className="h-3 w-full rounded-full"
              />
            </div>
          </div>

          {/* Task Input Form */}
          <div className="bg-gray-50 p-5 rounded-xl mb-6 border border-gray-100">
            <h3 className="text-lg font-medium mb-4 text-gray-700">Add New Task</h3>
            <TaskInput />
          </div>

          {/* Task Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
            <Button
              onClick={handleCopyTasks}
              disabled={selectedTasks.length === 0}
              className="btn-primary py-5"
            >
              Copy Selected Tasks ({selectedTasks.length})
            </Button>

            <Button
              onClick={handleUncheckAllTasks}
              className="btn-primary py-5"
            >
              Uncheck All Tasks
            </Button>

            <Button
              onClick={sortTasks}
              className="sm:col-span-2 bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white py-5"
            >
              Organize & Sort Tasks
            </Button>
          </div>
        </div>

        {/* Day Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {days.map((day, index) => (
            <div key={day} className="slide-up" style={{ animationDelay: `${index * 0.05}s` }}>
              <TaskColumn
                day={day}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Copy Task Modal */}
      <CopyTaskModal
        isOpen={showCopyModal}
        onClose={handleCopyModalClose}
        taskIds={selectedTasks}
        onTasksCopied={() => {
          setSelectedTasks([]);
          setShowCopyModal(false);
        }}
      />
    </div>
  );
}
