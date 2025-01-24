'use client';

import { useRef, useEffect, useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import UserAvatar from '@/components/UserAvatar';
import MessageItem from './MessageItem';
import MessageInput from './MessageInput';

interface Message {
  id: number;
  content: string;
  type: 'text' | 'gif' | 'attachment';
  sender: string;
  timestamp: string;
  avatar: string;
  replyTo?: {
    id: number;
    content: string;
    sender: string;
  };
  attachments?: {
    id: string;
    url: string;
    name: string;
    size: number;
    type: 'image' | 'file';
  }[];
}

const ChatBox = () => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'text',
      content: "Hey there! How's it going? 👋",
      sender: 'Sarah Wilson',
      timestamp: 'Today at 2:30 PM',
      avatar:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=32&h=32&q=80',
    },
    {
      id: 2,
      type: 'text',
      content: 'Pretty good! Working on that new feature 💻',
      sender: 'You',
      timestamp: 'Today at 2:31 PM',
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=32&h=32&q=80',
    },
    {
      id: 3,
      type: 'gif',
      content:
        'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcDd6Y2E4NHF3dWV1M3J1OTRyemN4Ynl1d2x4Ymp4ZDR4amdxbWxxbiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3oKIPnAiaMCws8nOsE/giphy.gif',
      sender: 'Sarah Wilson',
      timestamp: 'Today at 2:32 PM',
      avatar:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=32&h=32&q=80',
    },
  ]);

  const isDM = true;
  const channelName = 'general';
  const dmUser = 'Sarah Wilson';
  const channelDescription =
    'Welcome to the general channel. This is the place for general discussion.';

  const [replyTo, setReplyTo] =
    useState<Pick<Message, 'id' | 'content' | 'sender'>>();

  const CURRENT_USER = {
    id: 'you',
    name: 'You',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=32&h=32&q=80',
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Only set dragging to false if the cursor leaves the boundaries
    if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
      setIsDragging(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      // Find the MessageInput component's handleFileSelect function
      const messageInputComponent = document.querySelector(
        '[data-message-input]'
      );
      if (messageInputComponent) {
        const event = new CustomEvent('files-dropped', {
          detail: { files },
        });
        messageInputComponent.dispatchEvent(event);
      }
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleMessageSubmit = async (
    content: string,
    files?: FileList | File[],
    replyTo?: Pick<Message, 'id' | 'content' | 'sender'>
  ) => {
    const isGif = content.includes('giphy.com');
    let attachments;

    if (files && files.length > 0) {
      attachments = await Promise.all(
        Array.from(files).map(async (file) => {
          const id = Math.random().toString(36).substring(7);
          const isImage = file.type.startsWith('image/');
          const url = isImage ? URL.createObjectURL(file) : '';

          return {
            id,
            url,
            name: file.name,
            size: file.size,
            type: isImage ? 'image' : 'file',
          };
        })
      );
    }

    const newMessage: Message = {
      id: Date.now(),
      type: isGif ? 'gif' : attachments ? 'attachment' : 'text',
      content,
      sender: CURRENT_USER.name,
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      avatar: CURRENT_USER.avatar,
      attachments,
      replyTo,
    };

    setMessages((prev) => [...prev, newMessage]);
  };

  const handleReply = (message: Pick<Message, 'id' | 'content' | 'sender'>) => {
    setReplyTo(message);
  };

  return (
    <div
      className="flex flex-col h-full relative"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {isDragging && (
        <div className="absolute inset-0 bg-primary/10 border-2 border-dashed border-primary rounded-md pointer-events-none z-50 flex items-center justify-center">
          <div className="bg-background p-4 rounded-lg shadow-lg">
            <p className="text-lg font-medium">Drop files to upload</p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="px-4 py-3 border-b flex items-center gap-x-3">
        {isDM ? (
          <>
            <UserAvatar
              user={{
                name: dmUser,
                image:
                  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=32&h=32&q=80',
              }}
              className="h-8 w-8"
            />
            <div>
              <h1 className="font-semibold">{dmUser}</h1>
              <p className="text-xs text-muted-foreground">Online</p>
            </div>
          </>
        ) : (
          <div>
            <div className="flex items-center gap-x-2">
              <h1 className="font-semibold">#{channelName}</h1>
              <span className="text-muted-foreground">|</span>
              <p className="text-sm text-muted-foreground">
                {channelDescription}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1 px-4">
        <div className="flex flex-col h-full justify-end py-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <MessageItem
                key={message.id}
                message={message}
                onReply={handleReply}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </ScrollArea>

      {/* Typing Indicator */}
      <div className="px-4 h-6 text-sm text-muted-foreground">
        Sarah Wilson is typing...
      </div>

      {/* Chat Input */}
      <div className="p-4 border-t">
        <MessageInput
          isDM={isDM}
          recipientName={dmUser}
          channelName={channelName}
          onSubmit={handleMessageSubmit}
          replyTo={replyTo}
          onCancelReply={() => setReplyTo(undefined)}
        />
      </div>
    </div>
  );
};

export default ChatBox;
