'use client';

import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import type { Task } from '@/lib/types';
import { useTaskContext } from '@/context/task-context';
import { FaTrash, FaEdit, FaRegCircle, FaRegCheckCircle } from 'react-icons/fa';
import EditTaskModal from './modals/edit-task-modal';
import { EffortWeights } from '@/lib/types';

interface TaskItemProps {
  task: Task;
  isSelected: boolean;
  onSelect: (taskId: string, selected: boolean) => void;
}

export default function TaskItem({ task, isSelected, onSelect }: TaskItemProps) {
  const { toggleTask, deleteTask } = useTaskContext();
  const [showEditModal, setShowEditModal] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const priorityClass = `task-${task.priority}`;
  const priorityColors = {
    low: 'text-blue-500 bg-blue-50',
    medium: 'text-yellow-600 bg-yellow-50',
    high: 'text-red-500 bg-red-50'
  };

  const handleToggle = () => {
    toggleTask(task.id);
  };

  const handleDelete = () => {
    deleteTask(task.id);
  };

  const handleSelectChange = (checked: boolean) => {
    onSelect(task.id, checked);
  };

  return (
    <>
      <div
        className={`task-item ${priorityClass} ${task.completed ? 'completed bg-gray-50' : ''}`}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <Checkbox
          checked={isSelected}
          onCheckedChange={handleSelectChange}
          className="mr-1"
          aria-label="Select task for batch actions"
        />

        <div
          onClick={handleToggle}
          className="flex items-center cursor-pointer flex-1 py-1"
        >
          {task.completed ? (
            <FaRegCheckCircle className="text-green-500 mr-2 flex-shrink-0" />
          ) : (
            <FaRegCircle className="text-gray-400 mr-2 flex-shrink-0" />
          )}

          <div className="flex-1">
            <span className={`flex items-center gap-2 ${task.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
              {task.title}
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${priorityColors[task.priority]} ml-2`}>
                {task.priority}
              </span>
            </span>
          </div>
        </div>

        <div className={`flex gap-1 transition-opacity duration-200 ${isHovering ? 'opacity-100' : 'opacity-50'}`}>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowEditModal(true)}
            className="p-1 h-auto hover:bg-blue-50 hover:text-blue-600 rounded-lg"
          >
            <FaEdit className="text-blue-500" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleDelete}
            className="p-1 h-auto hover:bg-red-50 hover:text-red-600 rounded-lg"
          >
            <FaTrash className="text-red-500" />
          </Button>
        </div>
      </div>

      <EditTaskModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        task={task}
      />
    </>
  );
}
