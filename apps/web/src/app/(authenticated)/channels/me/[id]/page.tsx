'use client';

import { useParams } from 'next/navigation';
import React from 'react';
import UserAvatar from '@/components/UserAvatar';
import { authClient } from '@/lib/auth';
import ChatBox from '../../ChatBox';

const ConversationPage = () => {
  const params = useParams();
  const id = params.id as string;

  const { data: session, isPending } = authClient.useSession();

  if (isPending) return <div>Loading...</div>;

  return (
    <div className="flex flex-col h-full">
      <ChatBox />
    </div>
  );
};

export default ConversationPage;
