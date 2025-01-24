'use client';

import { useState } from 'react';
import { Bell, Mail, User } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function InboxPage() {
  const [notifications] = useState([
    {
      id: 1,
      type: 'friend_request',
      user: {
        name: 'John Doe',
        image: null,
      },
      time: '2 hours ago',
      read: false,
    },
    {
      id: 2,
      type: 'message',
      user: {
        name: 'Jane Smith',
        image: null,
      },
      message: 'Hey, how are you?',
      time: '3 hours ago',
      read: true,
    },
  ]);

  return (
    <div className="h-full flex flex-col">
      <div className="border-b px-6 py-4">
        <h1 className="text-2xl font-bold">Inbox</h1>
      </div>

      <Tabs defaultValue="all" className="flex-1">
        <div className="border-b px-6">
          <TabsList>
            <TabsTrigger value="all" className="gap-2">
              <Bell className="h-4 w-4" />
              All
            </TabsTrigger>
            <TabsTrigger value="mentions" className="gap-2">
              <Mail className="h-4 w-4" />
              Mentions
            </TabsTrigger>
            <TabsTrigger value="requests" className="gap-2">
              <User className="h-4 w-4" />
              Friend Requests
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="all" className="flex-1 p-0">
          <ScrollArea className="h-[calc(100vh-8rem)]">
            <div className="px-6 py-4 space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`flex items-center gap-4 p-4 rounded-lg ${
                    notification.read ? 'bg-background' : 'bg-muted'
                  }`}
                >
                  <Avatar>
                    <AvatarImage src={notification.user.image || ''} />
                    <AvatarFallback>
                      {notification.user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm">
                      <span className="font-medium">
                        {notification.user.name}
                      </span>
                      {notification.type === 'friend_request'
                        ? ' sent you a friend request'
                        : ` sent you a message: ${notification.message}`}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {notification.time}
                    </p>
                  </div>
                  {notification.type === 'friend_request' && (
                    <div className="flex gap-2">
                      <Button size="sm" variant="default">
                        Accept
                      </Button>
                      <Button size="sm" variant="outline">
                        Decline
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="mentions" className="flex-1">
          <div className="p-6">
            <p className="text-center text-muted-foreground">No mentions yet</p>
          </div>
        </TabsContent>

        <TabsContent value="requests" className="flex-1">
          <div className="p-6">
            <p className="text-center text-muted-foreground">
              No friend requests
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
