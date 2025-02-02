"use client";

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';

export function AuthToast() {
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user) {
      const provider = session.user.provider;
      const name = session.user.name || 'User';

      // Only show toast if provider exists (means it's a social login)
      if (provider) {
        const messages = {
          google: `Welcome ${name}! You've successfully signed in with Google 🎉`,
          facebook: `Welcome ${name}! You've successfully signed in with Facebook 🎉`,
        };

        const message = messages[provider as keyof typeof messages];
        if (message) {
          toast.success(message, {
            duration: 5000,
            position: 'top-center',
            style: {
              background: '#4CAF50',
              color: '#fff',
              padding: '16px',
              borderRadius: '10px',
            },
          });
        }
      }
    }
  }, [session]);

  return null;
} 