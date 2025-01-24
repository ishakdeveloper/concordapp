'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import FriendsList from './FriendsList';

export default function DirectMessagesPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to first DM conversation if exists
    // For now just show empty state
  }, [router]);

  return (
    <div className="flex h-full w-full">
      <FriendsList />
    </div>
  );
}
