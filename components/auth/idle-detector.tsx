'use client';

import { useEffect, useRef } from 'react';
import { signOut } from 'next-auth/react';
import { toast } from 'sonner';
import { AlertCircle } from 'lucide-react';

const IDLE_TIMEOUT = 5 * 60 * 1000; // 5 minutes in milliseconds
const WARNING_TIMEOUT = 4.5 * 60 * 1000; // Show warning 30 seconds before logout

export function IdleDetector() {
  const timeoutRef = useRef<NodeJS.Timeout>();
  const warningTimeoutRef = useRef<NodeJS.Timeout>();

  const resetTimer = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (warningTimeoutRef.current) {
      clearTimeout(warningTimeoutRef.current);
    }

    // Set warning timeout
    warningTimeoutRef.current = setTimeout(() => {
      toast.warning('Session expiring soon', {
        description: 'You will be logged out in 30 seconds due to inactivity',
        icon: <AlertCircle className="h-5 w-5" />,
        duration: 10000, // Show for 10 seconds
      });
    }, WARNING_TIMEOUT);

    // Set logout timeout
    timeoutRef.current = setTimeout(async () => {
      toast.error('Session expired', {
        description: 'You have been logged out due to inactivity',
        icon: <AlertCircle className="h-5 w-5" />,
      });
      await signOut({ redirect: true, callbackUrl: '/' });
    }, IDLE_TIMEOUT);
  };

  useEffect(() => {
    // Events to track user activity
    const events = [
      'mousemove',
      'mousedown',
      'keydown',
      'touchstart',
      'scroll',
      'click',
    ];

    // Reset timer on any user activity
    const handleUserActivity = () => {
      resetTimer();
    };

    // Add event listeners
    events.forEach((event) => {
      window.addEventListener(event, handleUserActivity);
    });

    // Initial timer setup
    resetTimer();

    // Cleanup
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (warningTimeoutRef.current) {
        clearTimeout(warningTimeoutRef.current);
      }
      events.forEach((event) => {
        window.removeEventListener(event, handleUserActivity);
      });
    };
  }, []);

  return null; // This component doesn't render anything
} 