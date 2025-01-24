'use client';

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
  Phone,
  UserRound,
  PenLine,
  X,
  UserPlus,
  UserMinus,
  Ban,
  Copy,
  Users,
  ImagePlus,
  LogOut,
} from 'lucide-react';

interface ConversationContextMenuProps {
  children: React.ReactNode;
  isGroup: boolean;
  serverId?: string;
  channelId: string;
  userId?: string;
  onInviteToServer?: () => void;
  onLeaveGroup?: () => void;
  onRemoveFriend?: () => void;
  onBlock?: () => void;
}

const ConversationContextMenu = ({
  children,
  isGroup,
  serverId,
  channelId,
  userId,
  onInviteToServer,
  onLeaveGroup,
  onRemoveFriend,
  onBlock,
}: ConversationContextMenuProps) => {
  const servers = [
    { id: '1', name: 'Gaming Server' },
    { id: '2', name: 'Study Group' },
    { id: '3', name: 'Movie Club' },
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  if (isGroup) {
    return (
      <ContextMenu>
        <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
        <ContextMenuContent className="w-64">
          <ContextMenuItem>
            <Users className="mr-2 h-4 w-4" />
            Invite Users
          </ContextMenuItem>
          <ContextMenuItem>
            <ImagePlus className="mr-2 h-4 w-4" />
            Change Group Icon
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem onClick={onLeaveGroup} className="text-red-500">
            <LogOut className="mr-2 h-4 w-4" />
            Leave Group
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem onClick={() => copyToClipboard(channelId)}>
            <Copy className="mr-2 h-4 w-4" />
            Copy Channel ID
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    );
  }

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuItem>
          <UserRound className="mr-2 h-4 w-4" />
          Profile
        </ContextMenuItem>
        <ContextMenuItem>
          <Phone className="mr-2 h-4 w-4" />
          Call
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>
          <PenLine className="mr-2 h-4 w-4" />
          Set Nickname
        </ContextMenuItem>
        <ContextMenuItem>
          <X className="mr-2 h-4 w-4" />
          Close DM
        </ContextMenuItem>
        <ContextMenuSeparator />
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
        <ContextMenuItem onClick={onRemoveFriend} className="text-red-500">
          <UserMinus className="mr-2 h-4 w-4" />
          Remove Friend
        </ContextMenuItem>
        <ContextMenuItem onClick={onBlock} className="text-red-500">
          <Ban className="mr-2 h-4 w-4" />
          Block
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem onClick={() => copyToClipboard(userId || '')}>
          <Copy className="mr-2 h-4 w-4" />
          Copy User ID
        </ContextMenuItem>
        <ContextMenuItem onClick={() => copyToClipboard(channelId)}>
          <Copy className="mr-2 h-4 w-4" />
          Copy Channel ID
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default ConversationContextMenu;
