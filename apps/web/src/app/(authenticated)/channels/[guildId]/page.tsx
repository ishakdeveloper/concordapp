'use client';

import { useParams } from 'next/navigation';
import ChatBox from '../ChatBox';
import MembersList from '../MembersList';

export default function ChannelPage() {
  const params = useParams();
  const guildId = params?.guildId as string;

  // Dummy members data - this would come from your API
  const members = [
    {
      id: '1',
      name: 'Server Owner',
      status: 'online',
      role: 'owner',
    },
    {
      id: '2',
      name: 'Admin User',
      status: 'idle',
      role: 'admin',
    },
    {
      id: '3',
      name: 'Regular Member',
      status: 'offline',
      role: 'member',
    },
  ] as const;

  return (
    <div className="flex h-full">
      <div className="flex-1">
        <ChatBox />
      </div>
      <MembersList members={members} />
    </div>
  );
}
