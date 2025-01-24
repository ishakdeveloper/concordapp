'use client';

import React from 'react';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import LoggedInUserBox from './LoggedInUserBox';
import { Button } from '@/components/ui/button';
import { Compass, Users, Inbox } from 'lucide-react';
import ServerHeader from './[guildId]/ServerHeader';
import Channels from './[guildId]/Channels';
import Conversations from './me/Conversations';

const MainSidebar = () => {
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const serverId = params?.guildId as string;

  const friends = [
    {
      id: '1',
      name: 'Sarah Wilson',
      status: 'online',
      activity: 'Playing Valorant',
      image:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=32&h=32&q=80',
    },
    {
      id: '2',
      name: 'Michael Chen',
      status: 'idle',
      activity: 'Spotify',
      image:
        'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=32&h=32&q=80',
    },
    {
      id: '3',
      name: 'Emma Davis',
      status: 'dnd',
      activity: 'Visual Studio Code',
      image:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=32&h=32&q=80',
    },
    {
      id: '4',
      name: 'Alex Johnson',
      status: 'offline',
      image:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=32&h=32&q=80',
    },
  ];

  return (
    <div className="flex flex-col h-full w-60 bg-background border-r overflow-hidden">
      {serverId ? (
        <div className="flex flex-col h-full">
          <ServerHeader name="Server Name" />
          <Channels />
          <LoggedInUserBox />
        </div>
      ) : (
        <div className="flex flex-col h-full">
          <div className="px-3 pt-3">
            <Input placeholder="Find a conversation..." className="w-full" />
          </div>
          <div className="flex flex-col gap-y-2 px-2 mt-3">
            <div className="flex flex-col">
              <Button
                variant="ghost"
                className={`w-full gap-x-2 flex items-center hover:bg-muted/50 transition px-2 py-1.5 rounded-sm justify-start ${
                  pathname === '/channels/me' ? 'bg-muted' : ''
                }`}
                onClick={() => router.push('/channels/me')}
              >
                <Users className="w-4 h-4" />
                <span className="font-medium text-sm">Friends</span>
              </Button>
              <Button
                variant="ghost"
                className={`w-full gap-x-2 flex items-center hover:bg-muted/50 transition px-2 py-1.5 rounded-sm justify-start ${
                  pathname === '/channels/me/inbox' ? 'bg-muted' : ''
                }`}
                onClick={() => router.push('/channels/me/inbox')}
              >
                <Inbox className="w-4 h-4" />
                <span className="font-medium text-sm">Inbox</span>
              </Button>
            </div>
          </div>
          <Conversations friends={friends} />
          <LoggedInUserBox />
        </div>
      )}
    </div>
  );
};

export default MainSidebar;
