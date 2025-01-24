'use client';

import { User } from '@concord/server';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  MessageSquare,
  Phone,
  UserRound,
  PenLine,
  UserPlus,
  UserMinus,
  Ban,
  Copy,
  Check,
  X,
  MoreVertical,
  Video,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface FriendsListItemProps {
  friend: User;
  type?: 'all' | 'online' | 'pending' | 'blocked';
  isPending?: boolean;
  isIncoming?: boolean;
  onAccept?: () => void;
  onDecline?: () => void;
  onMessage?: () => void;
  onVoiceCall?: () => void;
  onVideoCall?: () => void;
  onRemoveFriend?: () => void;
  onBlock?: () => void;
}

const FriendsListItem = ({
  friend,
  type = 'all',
  isPending,
  isIncoming,
  onAccept,
  onDecline,
  onMessage,
  onVoiceCall,
  onVideoCall,
  onRemoveFriend,
  onBlock,
}: FriendsListItemProps) => {
  const servers = [
    { id: '1', name: 'Gaming Server' },
    { id: '2', name: 'Study Group' },
    { id: '3', name: 'Movie Club' },
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div className="flex items-center gap-3 p-2 hover:bg-muted/50 rounded-md transition cursor-pointer">
          <div className="relative">
            <Avatar className="w-10 h-10">
              <AvatarImage src={friend.image || ''} />
              <AvatarFallback>{friend.name?.[0]}</AvatarFallback>
            </Avatar>
            {type !== 'pending' && (
              <span
                className={cn(
                  'absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-background',
                  {
                    'bg-green-500': friend.status === 'online',
                    'bg-yellow-500': friend.status === 'idle',
                    'bg-red-500': friend.status === 'dnd',
                    'bg-gray-500': friend.status === 'offline',
                  }
                )}
              />
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="font-medium">{friend.name}</span>
              {isPending ? (
                <div className="flex items-center gap-2">
                  {isIncoming && (
                    <>
                      <Button size="sm" className="h-8" onClick={onAccept}>
                        <Check className="h-4 w-4 mr-2" />
                        Accept
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="h-8"
                        onClick={onDecline}
                      >
                        <X className="h-4 w-4 mr-2" />
                        Decline
                      </Button>
                    </>
                  )}
                  {!isIncoming && (
                    <Button
                      size="sm"
                      variant="destructive"
                      className="h-8"
                      onClick={onDecline}
                    >
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-1">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={onMessage}
                        >
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Message</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={onVoiceCall}>
                        <Phone className="h-4 w-4 mr-2" />
                        Voice Call
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={onVideoCall}>
                        <Video className="h-4 w-4 mr-2" />
                        Video Call
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={onRemoveFriend}
                        className="text-red-500"
                      >
                        <UserMinus className="h-4 w-4 mr-2" />
                        Remove Friend
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )}
            </div>
            {friend.activity && (
              <p className="text-sm text-muted-foreground">{friend.activity}</p>
            )}
          </div>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuItem>
          <UserRound className="mr-2 h-4 w-4" />
          Profile
        </ContextMenuItem>
        <ContextMenuItem onClick={onMessage}>
          <MessageSquare className="mr-2 h-4 w-4" />
          Send Message
        </ContextMenuItem>
        <ContextMenuItem onClick={onVoiceCall}>
          <Phone className="mr-2 h-4 w-4" />
          Call
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>
          <PenLine className="mr-2 h-4 w-4" />
          Set Nickname
        </ContextMenuItem>
        <ContextMenuSub>
          <ContextMenuSubTrigger>
            <UserPlus className="mr-2 h-4 w-4" />
            Invite to Server
          </ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-48">
            {servers.map((server) => (
              <ContextMenuItem key={server.id}>{server.name}</ContextMenuItem>
            ))}
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSeparator />
        <ContextMenuItem onClick={onRemoveFriend} className="text-red-500">
          <UserMinus className="mr-2 h-4 w-4" />
          Remove Friend
        </ContextMenuItem>
        <ContextMenuItem onClick={onBlock} className="text-red-500">
          <Ban className="mr-2 h-4 w-4" />
          Block
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem onClick={() => copyToClipboard(friend.id)}>
          <Copy className="mr-2 h-4 w-4" />
          Copy User ID
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default FriendsListItem;
