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
  Copy,
  MessageSquareQuote,
  SmilePlus,
  Pin,
  Link2,
  Hash,
  Pencil,
  Trash2,
  Check,
  Eye,
  EyeOff,
} from 'lucide-react';

interface MessageContextMenuProps {
  children: React.ReactNode;
  isOwnMessage: boolean;
  onAddReaction: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  recentEmojis?: string[];
}

const MessageContextMenu = ({
  children,
  isOwnMessage,
  onAddReaction,
  onEdit,
  onDelete,
  recentEmojis = ['👍', '❤️', '😂', '🎉', '🤔', '👀'],
}: MessageContextMenuProps) => {
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuItem onSelect={() => handleCopy('Message content')}>
          <Copy className="mr-2 h-4 w-4" />
          Copy text
        </ContextMenuItem>
        <ContextMenuSub>
          <ContextMenuSubTrigger>
            <SmilePlus className="mr-2 h-4 w-4" />
            Add Reaction
          </ContextMenuSubTrigger>
          <ContextMenuSubContent className="p-2">
            <div className="grid grid-cols-4 gap-2">
              {recentEmojis.map((emoji) => (
                <button
                  key={emoji}
                  className="h-8 w-8 flex items-center justify-center hover:bg-muted rounded-md text-lg"
                  onClick={() => onAddReaction()}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuItem>
          <MessageSquareQuote className="mr-2 h-4 w-4" />
          Reply
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>
          <Pin className="mr-2 h-4 w-4" />
          Pin Message
        </ContextMenuItem>
        <ContextMenuItem>
          {true ? (
            <>
              <EyeOff className="mr-2 h-4 w-4" />
              Mark as Unread
            </>
          ) : (
            <>
              <Eye className="mr-2 h-4 w-4" />
              Mark as Read
            </>
          )}
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>
          <Link2 className="mr-2 h-4 w-4" />
          Copy Message Link
        </ContextMenuItem>
        <ContextMenuItem>
          <Hash className="mr-2 h-4 w-4" />
          Copy Message ID
        </ContextMenuItem>
        {isOwnMessage && (
          <>
            <ContextMenuSeparator />
            <ContextMenuItem onSelect={onEdit}>
              <Pencil className="mr-2 h-4 w-4" />
              Edit Message
            </ContextMenuItem>
            <ContextMenuItem
              onSelect={onDelete}
              className="text-destructive focus:text-destructive"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Message
            </ContextMenuItem>
          </>
        )}
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default MessageContextMenu;
