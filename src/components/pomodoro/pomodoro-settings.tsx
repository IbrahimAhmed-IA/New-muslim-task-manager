'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { usePomodoroContext } from '@/context/pomodoro-context';
import { FaSave, FaTimes } from 'react-icons/fa';

interface PomodoroSettingsProps {
  onClose: () => void;
}

export default function PomodoroSettings({ onClose }: PomodoroSettingsProps) {
  const { settings, updateSettings, timerType } = usePomodoroContext();

  const [workDuration, setWorkDuration] = useState(settings.workDuration);
  const [shortBreakDuration, setShortBreakDuration] = useState(settings.shortBreakDuration);
  const [longBreakDuration, setLongBreakDuration] = useState(settings.longBreakDuration);
  const [longBreakInterval, setLongBreakInterval] = useState(settings.longBreakInterval);
  const [autoStartBreaks, setAutoStartBreaks] = useState(settings.autoStartBreaks);
  const [autoStartPomodoros, setAutoStartPomodoros] = useState(settings.autoStartPomodoros);

  const handleSubmit = () => {
    updateSettings({
      workDuration,
      shortBreakDuration,
      longBreakDuration,
      longBreakInterval,
      autoStartBreaks,
      autoStartPomodoros,
    });

    onClose();
  };

  // Get border color based on timer type
  const getBorderColor = () => {
    switch (timerType) {
      case 'work':
        return 'border-purple-500';
      case 'shortBreak':
        return 'border-green-500';
      case 'longBreak':
        return 'border-blue-500';
    }
  };

  // Get header background color based on timer type
  const getHeaderBgColor = () => {
    switch (timerType) {
      case 'work':
        return 'bg-purple-50 text-purple-700';
      case 'shortBreak':
        return 'bg-green-50 text-green-700';
      case 'longBreak':
        return 'bg-blue-50 text-blue-700';
    }
  };

  // Get button background color based on timer type
  const getButtonBgColor = () => {
    switch (timerType) {
      case 'work':
        return 'bg-purple-600 hover:bg-purple-700';
      case 'shortBreak':
        return 'bg-green-500 hover:bg-green-600';
      case 'longBreak':
        return 'bg-blue-500 hover:bg-blue-600';
    }
  };

  return (
    <Card className={`w-full mt-6 border-2 shadow-lg ${getBorderColor()} transition-colors duration-300`}>
      <CardHeader className={`${getHeaderBgColor()}`}>
        <CardTitle className="flex items-center justify-between">
          <span>Timer Settings</span>
          <Button
            variant="ghost"
            onClick={onClose}
            className="h-8 w-8 p-0 rounded-full"
            aria-label="Close settings"
          >
            <FaTimes />
          </Button>
        </CardTitle>
      </CardHeader>

      <CardContent className="p-6">
        <div className="grid gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <label htmlFor="work-duration" className="text-sm font-medium">
                Focus Duration (minutes)
              </label>
              <Input
                id="work-duration"
                type="number"
                min={1}
                max={60}
                value={workDuration}
                onChange={(e) => setWorkDuration(Number.parseInt(e.target.value) || 1)}
                className="border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-200"
              />
            </div>

            <div className="grid gap-2">
              <label htmlFor="short-break-duration" className="text-sm font-medium">
                Short Break Duration (minutes)
              </label>
              <Input
                id="short-break-duration"
                type="number"
                min={1}
                max={30}
                value={shortBreakDuration}
                onChange={(e) => setShortBreakDuration(Number.parseInt(e.target.value) || 1)}
                className="border-gray-300 focus:border-green-500 focus:ring focus:ring-green-200"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <label htmlFor="long-break-duration" className="text-sm font-medium">
                Long Break Duration (minutes)
              </label>
              <Input
                id="long-break-duration"
                type="number"
                min={1}
                max={60}
                value={longBreakDuration}
                onChange={(e) => setLongBreakDuration(Number.parseInt(e.target.value) || 1)}
                className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            </div>

            <div className="grid gap-2">
              <label htmlFor="long-break-interval" className="text-sm font-medium">
                Long Break Interval (pomodoros)
              </label>
              <Input
                id="long-break-interval"
                type="number"
                min={1}
                max={10}
                value={longBreakInterval}
                onChange={(e) => setLongBreakInterval(Number.parseInt(e.target.value) || 1)}
                className="border-gray-300 focus:border-gray-500 focus:ring focus:ring-gray-200"
              />
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg space-y-4">
            <div className="flex items-center space-x-3">
              <Checkbox
                id="auto-start-breaks"
                checked={autoStartBreaks}
                onCheckedChange={(checked) => setAutoStartBreaks(!!checked)}
                className="text-purple-600 focus:ring-purple-500"
              />
              <label
                htmlFor="auto-start-breaks"
                className="text-sm font-medium cursor-pointer"
              >
                Auto-start breaks when focus time ends
              </label>
            </div>

            <div className="flex items-center space-x-3">
              <Checkbox
                id="auto-start-pomodoros"
                checked={autoStartPomodoros}
                onCheckedChange={(checked) => setAutoStartPomodoros(!!checked)}
                className="text-purple-600 focus:ring-purple-500"
              />
              <label
                htmlFor="auto-start-pomodoros"
                className="text-sm font-medium cursor-pointer"
              >
                Auto-start focus timer when break ends
              </label>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-end gap-2 p-4 bg-gray-50 border-t">
        <Button variant="outline" onClick={onClose} className="border-gray-300">
          <FaTimes className="mr-2 h-4 w-4" /> Cancel
        </Button>
        <Button onClick={handleSubmit} className={getButtonBgColor()}>
          <FaSave className="mr-2 h-4 w-4" /> Save Settings
        </Button>
      </CardFooter>
    </Card>
  );
}
