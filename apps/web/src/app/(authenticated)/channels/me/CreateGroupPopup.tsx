'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Checkbox } from '@/components/ui/checkbox';
import UserAvatar from '@/components/UserAvatar';
import { X, PlusIcon } from 'lucide-react';
import { User } from '@concord/server';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

const dummyFriends = [
  {
    id: '1',
    name: 'Sarah Wilson',
    discriminator: '#1234',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
  },
  {
    id: '2',
    name: 'Michael Chen',
    discriminator: '#5678',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36',
  },
  {
    id: '3',
    name: 'Emma Davis',
    discriminator: '#9012',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
  },
];

const CreateGroupPopup = () => {
  const [selectedFriends, setSelectedFriends] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFriends = dummyFriends.filter((friend) =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleFriend = (friendId: string) => {
    setSelectedFriends((prev) =>
      prev.includes(friendId)
        ? prev.filter((id) => id !== friendId)
        : [...prev, friendId]
    );
  };

  const handleCreateGroup = () => {
    console.log('Creating group with friends:', selectedFriends);
  };

  const selectedUsers = dummyFriends.filter((friend) =>
    selectedFriends.includes(friend.id)
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="h-6 w-6">
          <PlusIcon className="w-4 h-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[425px] p-4">
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Selecteer vrienden</h2>
          <p className="text-sm text-muted-foreground">
            Je kunt nog {9 - selectedFriends.length} vrienden toevoegen.
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex flex-wrap gap-2 min-h-[40px] p-2 border rounded-md">
            {selectedUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center gap-x-1 bg-muted px-2 py-1 rounded-full text-sm"
              >
                <span>{user.name}</span>
                <button
                  onClick={() => toggleFriend(user.id)}
                  className="hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
            <Input
              placeholder="Zoek of start een gesprek"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-0 flex-1 min-w-[100px] focus-visible:ring-0"
            />
          </div>

          <ScrollArea className="h-[300px] pr-4">
            <div className="space-y-2">
              {filteredFriends.map((friend) => (
                <div
                  key={friend.id}
                  className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50 cursor-pointer"
                  onClick={() => toggleFriend(friend.id)}
                >
                  <div className="flex items-center gap-x-2">
                    <UserAvatar user={friend as unknown as User} />
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{friend.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {friend.discriminator}
                      </span>
                    </div>
                  </div>
                  <Checkbox
                    checked={selectedFriends.includes(friend.id)}
                    onCheckedChange={() => toggleFriend(friend.id)}
                  />
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="flex justify-between items-center">
            <Button
              variant="ghost"
              onClick={() => setSelectedFriends([])}
              className="text-muted-foreground"
            >
              <X className="w-4 h-4 mr-2" />
              Clear Selection
            </Button>
            <Button
              onClick={handleCreateGroup}
              disabled={selectedFriends.length === 0}
            >
              Maak groeps-DM
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default CreateGroupPopup;
