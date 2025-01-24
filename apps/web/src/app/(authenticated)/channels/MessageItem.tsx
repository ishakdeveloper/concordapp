'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  MoreVertical,
  SmilePlus,
  MessageSquareQuote,
  Pencil,
  Copy,
  Pin,
  Link2,
  Hash,
  Trash2,
  Eye,
  EyeOff,
  FileText,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import UserProfilePopup from './UserProfilePopup';
import ImageLightbox from './ImageLightbox';
import MessageContextMenu from './MessageContextMenu';

interface MessageItemProps {
  message: {
    id: number;
    content: string;
    type: 'text' | 'gif' | 'attachment';
    sender: string;
    timestamp: string;
    avatar: string;
    isGroup?: boolean;
    groupMembers?: {
      name: string;
      image?: string;
    }[];
    attachments?: {
      id: string;
      url: string;
      name: string;
      size: number;
      type: 'image' | 'file';
    }[];
    replyTo?: {
      id: number;
      content: string;
      sender: string;
    };
  };
  onReply: (message: Pick<Message, 'id' | 'content' | 'sender'>) => void;
}

const MessageItem = ({ message, onReply }: MessageItemProps) => {
  const [lightboxContent, setLightboxContent] = useState<{
    isOpen: boolean;
    src: string;
    type: 'image' | 'gif';
  }>({
    isOpen: false,
    src: '',
    type: 'image',
  });
  const isOwnMessage = message.sender === 'You';
  const recentEmojis = ['👍', '❤️', '😂', '🎉', '🤔', '👀'];

  const handleAddReaction = () => {
    // Handle adding reaction
  };

  const handleEdit = () => {
    // Handle edit message
  };

  const handleDelete = () => {
    // Handle delete message
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleReply = () => {
    // Create a user-friendly preview for different message types
    let previewContent = message.content;

    switch (message.type) {
      case 'gif':
        previewContent = '📱 GIF';
        break;
      case 'attachment':
        if (message.attachments && message.attachments.length > 0) {
          const fileCount = message.attachments.length;
          const fileTypes = message.attachments.map((a) =>
            a.type === 'image' ? '📷' : '📎'
          );
          const uniqueTypes = [...new Set(fileTypes)];
          previewContent = `${uniqueTypes.join('')} ${fileCount} ${fileCount === 1 ? 'attachment' : 'attachments'}`;

          // Add message content if it exists
          if (message.content) {
            previewContent = `${message.content} (${previewContent})`;
          }
        }
        break;
    }

    onReply({
      id: message.id,
      content: previewContent,
      sender: message.sender,
    });
  };

  const renderContent = () => {
    return (
      <div className="flex flex-col gap-y-1">
        {message.replyTo && (
          <div className="flex items-center gap-x-2 text-sm text-muted-foreground">
            <MessageSquareQuote className="h-4 w-4" />
            <span>
              Replying to{' '}
              <span className="font-medium">{message.replyTo.sender}</span>
            </span>
            <span className="line-clamp-1">{message.replyTo.content}</span>
          </div>
        )}
        {message.type === 'gif' && (
          <div className="mt-1 max-w-[300px]">
            <button
              className="w-full rounded-md overflow-hidden hover:ring-2 ring-primary transition-all"
              onClick={() =>
                setLightboxContent({
                  isOpen: true,
                  src: message.content,
                  type: 'gif',
                })
              }
            >
              <img
                src={message.content}
                alt="GIF"
                className="w-full rounded-md"
                loading="lazy"
              />
            </button>
          </div>
        )}
        {message.type === 'attachment' && (
          <div className="mt-2 space-y-2">
            {message.content && (
              <p className="text-[15px] leading-[22px] text-foreground/90 whitespace-pre-wrap break-words">
                {message.content}
              </p>
            )}
            <div className="flex flex-wrap gap-2">
              {message.attachments?.map((attachment) => (
                <div
                  key={attachment.id}
                  className="flex-shrink-0 w-48 rounded-md bg-muted/50 overflow-hidden"
                >
                  {attachment.type === 'image' ? (
                    <button
                      className="w-full"
                      onClick={() =>
                        setLightboxContent({
                          isOpen: true,
                          src: attachment.url,
                          type: 'image',
                        })
                      }
                    >
                      <div className="relative w-48 h-32">
                        <img
                          src={attachment.url}
                          alt={attachment.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="p-2 bg-background/90">
                        <p className="text-sm font-medium truncate">
                          {attachment.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {(attachment.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </button>
                  ) : (
                    <div className="p-3 flex items-center gap-x-3">
                      <FileText className="h-10 w-10 text-muted-foreground" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">
                          {attachment.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {(attachment.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const MessageActions = () => (
    <>
      <DropdownMenuItem onSelect={() => handleCopy(message.content)}>
        <Copy className="mr-2 h-4 w-4" />
        Copy text
      </DropdownMenuItem>
      <DropdownMenuSub>
        <DropdownMenuSubTrigger>
          <SmilePlus className="mr-2 h-4 w-4" />
          Add Reaction
        </DropdownMenuSubTrigger>
        <DropdownMenuSubContent className="p-2">
          <div className="grid grid-cols-4 gap-2">
            {recentEmojis.map((emoji) => (
              <button
                key={emoji}
                className="h-8 w-8 flex items-center justify-center hover:bg-muted rounded-md text-lg"
                onClick={() => handleAddReaction()}
              >
                {emoji}
              </button>
            ))}
          </div>
        </DropdownMenuSubContent>
      </DropdownMenuSub>
      <DropdownMenuItem onSelect={handleReply}>
        <MessageSquareQuote className="mr-2 h-4 w-4" />
        Reply
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <Pin className="mr-2 h-4 w-4" />
        Pin Message
      </DropdownMenuItem>
      <DropdownMenuItem>
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
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <Link2 className="mr-2 h-4 w-4" />
        Copy Message Link
      </DropdownMenuItem>
      <DropdownMenuItem>
        <Hash className="mr-2 h-4 w-4" />
        Copy Message ID
      </DropdownMenuItem>
      {isOwnMessage && (
        <>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={handleEdit}>
            <Pencil className="mr-2 h-4 w-4" />
            Edit Message
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={handleDelete}
            className="text-destructive focus:text-destructive"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Message
          </DropdownMenuItem>
        </>
      )}
    </>
  );

  return (
    <>
      <MessageContextMenu
        isOwnMessage={isOwnMessage}
        onAddReaction={handleAddReaction}
        onEdit={handleEdit}
        onDelete={handleDelete}
      >
        <div className="group hover:bg-muted/50 p-2 rounded-md relative">
          <div className="flex items-start gap-x-4">
            <Popover>
              <PopoverTrigger asChild>
                <button className="hover:drop-shadow-md transition flex-shrink-0">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={message.avatar} />
                    <AvatarFallback>{message.sender[0]}</AvatarFallback>
                  </Avatar>
                </button>
              </PopoverTrigger>
              <PopoverContent side="left" align="start" className="w-80 p-0">
                <UserProfilePopup
                  user={{
                    name: message.sender,
                    image: message.avatar,
                    id: message.id.toString(),
                  }}
                />
              </PopoverContent>
            </Popover>

            <div className="flex flex-col flex-1 min-w-0">
              <div className="flex items-center gap-x-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="hover:underline font-semibold text-base">
                      {message.sender}
                    </button>
                  </PopoverTrigger>
                  <PopoverContent
                    side="left"
                    align="start"
                    className="w-80 p-0"
                  >
                    <UserProfilePopup
                      user={{
                        name: message.sender,
                        image: message.avatar,
                        id: message.id.toString(),
                      }}
                    />
                  </PopoverContent>
                </Popover>
                <span className="text-xs text-muted-foreground">
                  {message.timestamp}
                </span>
              </div>
              {renderContent()}
            </div>

            {/* Hover Action Buttons */}
            <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 flex items-center gap-x-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:bg-muted"
                onClick={handleAddReaction}
              >
                <SmilePlus className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:bg-muted"
              >
                <MessageSquareQuote className="h-4 w-4" />
              </Button>
              {isOwnMessage && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 hover:bg-muted"
                  onClick={handleEdit}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
              )}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 hover:bg-muted"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64">
                  <MessageActions />
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </MessageContextMenu>

      <ImageLightbox
        isOpen={lightboxContent.isOpen}
        onClose={() =>
          setLightboxContent((prev) => ({ ...prev, isOpen: false }))
        }
        src={lightboxContent.src}
        type={lightboxContent.type}
      />
    </>
  );
};

export default MessageItem;
