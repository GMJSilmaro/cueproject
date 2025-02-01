'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getSession } from 'next-auth/react';
import type { Session } from 'next-auth';
import type { ExtendedMix, ExtendedProfile } from '@/types';

interface DashboardContextType {
  session: Session | null;
  mixes: ExtendedMix[];
  allUsers: ExtendedProfile[];
  totalUsers: number;
  totalDJs: number;
  totalMixes: number;
  isLoading: boolean;
  refreshData: () => Promise<void>;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
}

interface DashboardProviderProps {
  children: ReactNode;
}

export function DashboardProvider({ children }: DashboardProviderProps) {
  const [session, setSession] = useState<Session | null>(null);
  const [mixes, setMixes] = useState<ExtendedMix[]>([]);
  const [allUsers, setAllUsers] = useState<ExtendedProfile[]>([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalDJs, setTotalDJs] = useState(0);
  const [totalMixes, setTotalMixes] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      console.log('Fetching dashboard data...');
      const [mixesRes, usersRes, statsRes] = await Promise.all([
        fetch('/api/mixes'),
        fetch('/api/users'),
        fetch('/api/stats')
      ]);

      if (!mixesRes.ok || !usersRes.ok || !statsRes.ok) {
        console.error('API responses:', {
          mixes: mixesRes.status,
          users: usersRes.status,
          stats: statsRes.status
        });
        throw new Error('Failed to fetch data');
      }

      const [mixesData, usersData, statsData] = await Promise.all([
        mixesRes.json(),
        usersRes.json(),
        statsRes.json()
      ]);

      console.log('Fetched data:', { mixesData, usersData, statsData });

      setMixes(mixesData.mixes);
      setAllUsers(usersData.users);
      setTotalUsers(statsData.totalUsers);
      setTotalDJs(statsData.totalDJs);
      setTotalMixes(statsData.totalMixes);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const initializeData = async () => {
      console.log('Initializing dashboard data...');
      const session = await getSession();
      console.log('Session:', session);
      
      if (!session) {
        console.log('No session found, redirecting to login...');
        window.location.href = '/login';
        return;
      }
      setSession(session);
      fetchData();
    };

    initializeData();
  }, []);

  const value = {
    session,
    mixes,
    allUsers,
    totalUsers,
    totalDJs,
    totalMixes,
    isLoading,
    refreshData: fetchData
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
} 