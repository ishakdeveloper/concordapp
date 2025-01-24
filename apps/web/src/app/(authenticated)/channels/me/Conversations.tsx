'use client';

import { User } from '@concord/server';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { X } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useRouter } from 'next/navigation';
import UserAvatar from '@/components/UserAvatar';
import CreateGroupPopup from './CreateGroupPopup';
import ConversationContextMenu from './ConversationContextMenu';

interface ConversationsProps {
  friends: User[];
}

const Conversations = ({ friends }: ConversationsProps) => {
  const router = useRouter();

  const conversations = [
    {
      id: '1',
      user: friends[0],
      lastMessage: "Let's play something later!",
      timestamp: '5m ago',
      unread: 2,
      isGroup: false,
    },
    {
      id: '2',
      user: friends[1],
      lastMessage: 'Check out this new song!',
      timestamp: '2h ago',
      unread: 0,
      isGroup: false,
    },
    {
      id: '3',
      users: [friends[0], friends[1], friends[2]],
      lastMessage: 'Game night tonight?',
      timestamp: '30m ago',
      unread: 3,
      isGroup: true,
    },
    {
      id: '4',
      users: [friends[1], friends[3]],
      lastMessage: 'Project meeting at 3pm',
      timestamp: '1h ago',
      unread: 0,
      isGroup: true,
    },
  ];

  const truncateMessage = (message: string, maxLength: number = 23) => {
    if (message.length <= maxLength) return message;
    return message.slice(0, maxLength) + '...';
  };

  return (
    <ScrollArea className="flex-1">
      <div className="flex flex-col gap-y-2 px-2 mt-3">
        <div className="flex items-center justify-between px-2 mt-2">
          <h2 className="font-medium text-muted-foreground uppercase text-xs">
            Direct Messages
          </h2>
          <CreateGroupPopup friends={friends} />
        </div>

        {conversations.map((conv) => (
          <ConversationContextMenu
            key={conv.id}
            isGroup={conv.isGroup}
            channelId={conv.id}
            userId={conv.user?.id}
            onInviteToServer={() => {
              // Handle invite to server
            }}
            onLeaveGroup={() => {
              // Handle leave group
            }}
            onRemoveFriend={() => {
              // Handle remove friend
            }}
            onBlock={() => {
              // Handle block
            }}
          >
            <div
              role="button"
              tabIndex={0}
              className="w-full gap-x-2 flex items-center hover:bg-muted/50 transition group relative px-2 py-2 rounded-sm cursor-pointer"
              onClick={() => router.push(`/channels/me/${conv.id}`)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  router.push(`/channels/me/${conv.id}`);
                }
              }}
            >
              {conv.isGroup ? (
                <div className="relative w-8 h-8">
                  {conv.users?.slice(0, 3).map((user, index) => (
                    <Avatar
                      key={user.id}
                      className={`absolute w-6 h-6 border-2 border-background ${
                        index === 0
                          ? 'top-0 left-0'
                          : index === 1
                            ? 'bottom-0 right-0'
                            : 'bottom-0 left-2'
                      }`}
                    >
                      <AvatarImage src={user.image || ''} />
                      <AvatarFallback>{user.name?.[0] || ''}</AvatarFallback>
                    </Avatar>
                  ))}
                  {conv.users && conv.users.length > 3 && (
                    <div className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full text-[10px] px-1">
                      +{conv.users.length - 3}
                    </div>
                  )}
                </div>
              ) : (
                <UserAvatar user={conv.user as User} />
              )}
              <div className="flex flex-col items-start">
                <span className="font-medium text-[14px] truncate">
                  {truncateMessage(
                    conv.isGroup
                      ? conv.users?.map((u) => u.name).join(', ')
                      : conv.user?.name
                  )}
                </span>
                {!conv.isGroup && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="text-[12px] text-muted-foreground">
                          {truncateMessage(conv.lastMessage)}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{conv.lastMessage}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
                {conv.isGroup && (
                  <span className="text-[12px] text-muted-foreground">
                    {`${conv.users?.length} Members`}
                  </span>
                )}
              </div>

              <div className="absolute right-2 flex items-center gap-2">
                {conv.unread > 0 && (
                  <div className="bg-red-500 text-primary-foreground text-xs font-medium rounded-full px-2 py-0.5">
                    {conv.unread}
                  </div>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 opacity-0 group-hover:opacity-100 transition"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Handle remove conversation
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </ConversationContextMenu>
        ))}
      </div>
    </ScrollArea>
  );
};

export default Conversations;
