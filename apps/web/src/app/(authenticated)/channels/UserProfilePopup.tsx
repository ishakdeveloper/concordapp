'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  MessageSquare,
  MoreVertical,
  UserPlus,
  UserMinus,
  Ban,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface UserProfilePopupProps {
  user: {
    name: string;
    image?: string;
    id: string;
    status?: 'online' | 'idle' | 'dnd' | 'offline';
    customStatus?: string;
    mutualServers?: Array<{
      id: string;
      name: string;
      icon?: string;
    }>;
    mutualFriends?: number;
  };
}

const UserProfilePopup = ({ user }: UserProfilePopupProps) => {
  return (
    <div className="overflow-hidden">
      {/* Banner - can be customized with user's banner */}
      <div className="h-20 bg-gradient-to-r from-blue-500 to-purple-500" />

      {/* Main content */}
      <div className="p-4">
        {/* Avatar and actions */}
        <div className="flex justify-between items-start">
          <Avatar className="h-20 w-20 border-4 border-background -mt-12">
            <AvatarImage src={user.image} />
            <AvatarFallback>{user.name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm">
              <MessageSquare className="h-4 w-4 mr-2" />
              Message
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add Friend
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-500">
                  <UserMinus className="h-4 w-4 mr-2" />
                  Remove Friend
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-500">
                  <Ban className="h-4 w-4 mr-2" />
                  Block
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* User info */}
        <div className="mt-4">
          <h2 className="text-xl font-bold">{user.name}</h2>
          {user.customStatus && (
            <p className="text-sm text-muted-foreground mt-1">
              {user.customStatus}
            </p>
          )}
        </div>

        {/* Divider */}
        <div className="h-[1px] bg-border my-4" />

        {/* Mutual info */}
        {(user.mutualServers?.length || user.mutualFriends) && (
          <div className="space-y-3">
            {user.mutualServers?.length && (
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase">
                  Mutual Servers
                </h3>
                <div className="flex gap-2 mt-2">
                  {user.mutualServers.map((server) => (
                    <Avatar key={server.id} className="h-8 w-8">
                      <AvatarImage src={server.icon} />
                      <AvatarFallback>{server.name[0]}</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
              </div>
            )}
            {user.mutualFriends && (
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase">
                  Mutual Friends
                </h3>
                <p className="text-sm mt-1">
                  {user.mutualFriends} mutual friends
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfilePopup;
