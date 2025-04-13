'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { FaPlay, FaPause, FaRedo, FaForward, FaCog, FaCheck } from 'react-icons/fa';
import { usePomodoroContext } from '@/context/pomodoro-context';
import PomodoroSettings from './pomodoro-settings';

export default function PomodoroTimer() {
  const {
    isRunning,
    timerType,
    timeLeft,
    completedPomodoros,
    settings,
    startTimer,
    pauseTimer,
    resetTimer,
    skipTimer,
    changeTimerType,
    pomodoroCount
  } = usePomodoroContext();

  const [showSettings, setShowSettings] = useState(false);
  const [documentTitle, setDocumentTitle] = useState<string | null>(null);

  // Update document title with timer
  useEffect(() => {
    const originalTitle = document.title;
    setDocumentTitle(originalTitle);

    // Update title when timer is running
    if (isRunning) {
      document.title = `${formatTime(timeLeft)} - ${getTimerTitle()}`;
    }

    // Reset title when component unmounts
    return () => {
      if (documentTitle) {
        document.title = documentTitle;
      }
    };
  }, [timeLeft, isRunning, timerType]);

  // Format time as mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Calculate progress percentage
  const calculateProgress = () => {
    let totalTime = 0;

    switch (timerType) {
      case 'work':
        totalTime = settings.workDuration * 60;
        break;
      case 'shortBreak':
        totalTime = settings.shortBreakDuration * 60;
        break;
      case 'longBreak':
        totalTime = settings.longBreakDuration * 60;
        break;
    }

    return ((totalTime - timeLeft) / totalTime) * 100;
  };

  // Get timer title based on type
  const getTimerTitle = () => {
    switch (timerType) {
      case 'work':
        return 'Focus Time';
      case 'shortBreak':
        return 'Short Break';
      case 'longBreak':
        return 'Long Break';
    }
  };

  // Get background color based on timer type
  const getTimerColor = () => {
    switch (timerType) {
      case 'work':
        return 'bg-gradient-to-r from-purple-600 to-blue-600';
      case 'shortBreak':
        return 'bg-gradient-to-r from-green-500 to-teal-400';
      case 'longBreak':
        return 'bg-gradient-to-r from-blue-500 to-cyan-400';
    }
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

  // Get timer button colors
  const getTimerButtonColor = () => {
    switch (timerType) {
      case 'work':
        return 'bg-purple-600 hover:bg-purple-700';
      case 'shortBreak':
        return 'bg-green-500 hover:bg-green-600';
      case 'longBreak':
        return 'bg-blue-500 hover:bg-blue-600';
    }
  };

  // Request notification permission if not granted
  const requestNotificationPermission = () => {
    if ('Notification' in window && Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  };

  return (
    <div className="py-6 w-full">
      <header className={`py-8 ${getTimerColor()} text-white text-center rounded-lg shadow-lg mb-8 mx-4`}>
        <h1 className="text-3xl font-bold">Pomodoro Timer</h1>
        <p className="mt-2 opacity-90">Stay focused and productive</p>
      </header>

      <div className="container mx-auto p-4">
        <div className="flex flex-col items-center justify-center max-w-md mx-auto">
          {/* Timer Type Selector */}
          <div className="grid grid-cols-3 gap-2 w-full mb-8">
            <Button
              onClick={() => changeTimerType('work')}
              variant={timerType === 'work' ? 'default' : 'outline'}
              className={`${timerType === 'work' ? 'bg-purple-600 hover:bg-purple-700' : 'hover:border-purple-500 hover:text-purple-500'} font-medium transition-all duration-200`}
            >
              Focus
            </Button>
            <Button
              onClick={() => changeTimerType('shortBreak')}
              variant={timerType === 'shortBreak' ? 'default' : 'outline'}
              className={`${timerType === 'shortBreak' ? 'bg-green-500 hover:bg-green-600' : 'hover:border-green-500 hover:text-green-500'} font-medium transition-all duration-200`}
            >
              Short Break
            </Button>
            <Button
              onClick={() => changeTimerType('longBreak')}
              variant={timerType === 'longBreak' ? 'default' : 'outline'}
              className={`${timerType === 'longBreak' ? 'bg-blue-500 hover:bg-blue-600' : 'hover:border-blue-500 hover:text-blue-500'} font-medium transition-all duration-200`}
            >
              Long Break
            </Button>
          </div>

          {/* Timer Card */}
          <Card className={`w-full shadow-xl border-2 ${getBorderColor()} transition-colors duration-300`}>
            <CardHeader className={`text-white ${getTimerColor()} rounded-t-lg transition-colors duration-300`}>
              <CardTitle className="text-center text-2xl">{getTimerTitle()}</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="text-center">
                <h2 className="text-7xl font-bold mb-8 font-mono tracking-widest">{formatTime(timeLeft)}</h2>

                <Progress
                  value={calculateProgress()}
                  className={`h-3 mb-8 ${
                    timerType === 'work'
                      ? 'bg-purple-100'
                      : timerType === 'shortBreak'
                        ? 'bg-green-100'
                        : 'bg-blue-100'
                  }`}
                />

                <div className="flex justify-center gap-4 mb-8">
                  {isRunning ? (
                    <Button
                      onClick={pauseTimer}
                      size="lg"
                      className={`${getTimerButtonColor()} px-6 py-6 text-white`}
                    >
                      <FaPause className="mr-2" /> Pause
                    </Button>
                  ) : (
                    <Button
                      onClick={startTimer}
                      size="lg"
                      className={`${getTimerButtonColor()} px-6 py-6 text-white`}
                    >
                      <FaPlay className="mr-2" /> Start
                    </Button>
                  )}

                  <Button
                    onClick={resetTimer}
                    variant="outline"
                    size="icon"
                    className="h-12 w-12 border-gray-300 hover:border-gray-400"
                  >
                    <FaRedo />
                  </Button>

                  <Button
                    onClick={skipTimer}
                    variant="outline"
                    size="icon"
                    className="h-12 w-12 border-gray-300 hover:border-gray-400"
                  >
                    <FaForward />
                  </Button>
                </div>

                <div className="space-y-2 bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-600">
                    Session: <span className="font-semibold">{completedPomodoros}</span> pomodoro{completedPomodoros !== 1 && 's'} completed
                  </p>

                  <p className="text-gray-600">
                    Weekly total: <span className="font-semibold">{pomodoroCount}</span> pomodoro{pomodoroCount !== 1 && 's'}
                  </p>
                </div>

                <div className="mt-6 flex justify-between">
                  <Button
                    onClick={requestNotificationPermission}
                    variant="outline"
                    size="sm"
                    className="text-xs"
                  >
                    <FaCheck className="mr-1 h-3 w-3" /> Allow notifications
                  </Button>

                  <Button
                    onClick={() => setShowSettings(!showSettings)}
                    variant="outline"
                    className="text-gray-600 hover:text-gray-800"
                  >
                    <FaCog className="mr-2" /> Settings
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Settings */}
          {showSettings && <PomodoroSettings onClose={() => setShowSettings(false)} />}
        </div>
      </div>
    </div>
  );
}
