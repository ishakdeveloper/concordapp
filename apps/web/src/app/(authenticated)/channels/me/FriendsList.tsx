'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Mail,
  MessageSquare,
  MoreVertical,
  Phone,
  Settings,
  Users,
  Video,
  Search,
  UserPlus,
  UserMinus,
  Check,
  X,
} from 'lucide-react';
import {
  ContextMenu,
  ContextMenuItem,
  ContextMenuContent,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import OnlineFriends from './OnlineFriends';
import AllFriends from './AllFriends';
import PendingFriends from './PendingFriends';
import BlockedFriends from './BlockedFriends';
import AddFriend from './AddFriend';

const FriendsList = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const friends = [
    {
      id: '1',
      name: 'Sarah Wilson',
      status: 'online',
      activity: 'Playing Valorant',
      avatar:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=32&h=32&q=80',
    },
    {
      id: '2',
      name: 'Michael Chen',
      status: 'idle',
      activity: 'Spotify',
      avatar:
        'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=32&h=32&q=80',
    },
    {
      id: '3',
      name: 'Emma Davis',
      status: 'dnd',
      activity: 'Visual Studio Code',
      avatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=32&h=32&q=80',
    },
    {
      id: '4',
      name: 'Alex Johnson',
      status: 'offline',
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=32&h=32&q=80',
    },
  ];

  const pendingRequests = {
    incoming: [
      {
        id: 'p1',
        name: 'John Smith',
        avatar:
          'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=32&h=32&q=80',
      },
      {
        id: 'p2',
        name: 'Alice Brown',
        avatar:
          'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=32&h=32&q=80',
      },
    ],
    outgoing: [
      {
        id: 'p3',
        name: 'David Lee',
        avatar:
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=32&h=32&q=80',
      },
    ],
  };

  const blocked = [
    /* ... blocked users ... */
  ];

  const SearchInput = () => (
    <div className="relative mb-4">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search friends..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="pl-9"
      />
    </div>
  );

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 p-4">
        <Tabs defaultValue="online" className="h-full">
          <div className="flex items-center justify-between mb-4">
            <TabsList>
              <TabsTrigger value="online">Online</TabsTrigger>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="pending" className="relative">
                Pending
                <span className="absolute -right-1 -top-1 bg-red-500 text-white text-xs rounded-full min-w-[1rem] h-4 flex items-center justify-center px-1">
                  {pendingRequests.incoming.length +
                    pendingRequests.outgoing.length}
                </span>
              </TabsTrigger>
              <TabsTrigger value="blocked">Blocked</TabsTrigger>
              <TabsTrigger value="add">Add Friend</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="online" className="h-[calc(100%-60px)]">
            <SearchInput />
            <OnlineFriends friends={friends} searchQuery={searchQuery} />
          </TabsContent>

          <TabsContent value="all" className="h-[calc(100%-60px)]">
            <SearchInput />
            <AllFriends friends={friends} searchQuery={searchQuery} />
          </TabsContent>

          <TabsContent value="pending" className="h-[calc(100%-60px)]">
            <SearchInput />
            <PendingFriends
              incoming={pendingRequests.incoming}
              outgoing={pendingRequests.outgoing}
              searchQuery={searchQuery}
            />
          </TabsContent>

          <TabsContent value="blocked" className="h-[calc(100%-60px)]">
            <SearchInput />
            <BlockedFriends blocked={blocked} searchQuery={searchQuery} />
          </TabsContent>

          <TabsContent value="add">
            <AddFriend />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default FriendsList;
