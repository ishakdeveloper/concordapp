'use client';

import { useRef, useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  PlusCircle,
  Smile,
  Paperclip,
  GiftIcon,
  FileUp,
  BarChart2,
  MessageSquareQuote,
  X,
} from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import EmojiGifPicker from './EmojiGifPicker';
import MessageAttachments from './MessageAttachments';

interface Attachment {
  id: string;
  file: File;
  previewUrl?: string;
  type: 'image' | 'file';
}

interface MessageInputProps {
  isDM: boolean;
  recipientName: string;
  channelName?: string;
  onSubmit: (
    message: string,
    attachments?: File[],
    replyTo?: Pick<Message, 'id' | 'content' | 'sender'>
  ) => void;
  replyTo?: Pick<Message, 'id' | 'content' | 'sender'>;
  onCancelReply?: () => void;
}

const MessageInput = ({
  isDM,
  recipientName,
  channelName,
  onSubmit,
  replyTo,
  onCancelReply,
}: MessageInputProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileSelect = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const newAttachments: Attachment[] = await Promise.all(
      Array.from(files).map(async (file) => {
        const id = Math.random().toString(36).substring(7);
        const isImage = file.type.startsWith('image/');
        let previewUrl: string | undefined;

        if (isImage) {
          previewUrl = URL.createObjectURL(file);
        }

        return {
          id,
          file,
          previewUrl,
          type: isImage ? 'image' : 'file',
        };
      })
    );

    setAttachments((prev) => [...prev, ...newAttachments]);
  };

  const handleRemoveAttachment = (id: string) => {
    setAttachments((prev) => {
      const attachment = prev.find((a) => a.id === id);
      if (attachment?.previewUrl) {
        URL.revokeObjectURL(attachment.previewUrl);
      }
      return prev.filter((a) => a.id !== id);
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = formRef.current?.message;
    const newMessage = input?.value.trim();
    const files = attachments.map((a) => a.file);

    if (newMessage || files.length > 0) {
      onSubmit(newMessage || '', files.length > 0 ? files : undefined, replyTo);
      input!.value = '';
      setAttachments([]);
      onCancelReply?.();
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    handleFileSelect(files);
  };

  const handleEmojiSelect = (value: string, type: 'emoji' | 'gif') => {
    if (!inputRef.current) return;

    const start = inputRef.current.selectionStart || 0;
    const end = inputRef.current.selectionEnd || 0;
    const before = inputRef.current.value.substring(0, start);
    const after = inputRef.current.value.substring(end);

    if (type === 'emoji') {
      inputRef.current.value = before + value + after;
      const newCursorPos = start + value.length;
      inputRef.current.setSelectionRange(newCursorPos, newCursorPos);
    } else {
      onSubmit(value);
    }

    inputRef.current.focus();
  };

  useEffect(() => {
    const element = document.querySelector('[data-message-input]');
    const handleFilesDropped = (e: CustomEvent) => {
      handleFileSelect(e.detail.files);
    };

    element?.addEventListener(
      'files-dropped',
      handleFilesDropped as EventListener
    );
    return () => {
      element?.removeEventListener(
        'files-dropped',
        handleFilesDropped as EventListener
      );
    };
  }, []);

  return (
    <div
      data-message-input
      className={`flex flex-col relative ${isDragging ? 'after:absolute after:inset-0 after:bg-primary/10 after:border-2 after:border-dashed after:border-primary after:rounded-md after:pointer-events-none' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {replyTo && (
        <div className="px-4 py-2 bg-muted/50 flex items-center justify-between">
          <div className="flex items-center gap-x-2 text-sm text-muted-foreground">
            <MessageSquareQuote className="h-4 w-4" />
            <span>
              Replying to <span className="font-medium">{replyTo.sender}</span>
            </span>
            <span className="line-clamp-1 max-w-[300px] overflow-hidden text-ellipsis">
              {replyTo.content}
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={onCancelReply}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
      <MessageAttachments
        attachments={attachments}
        onRemove={handleRemoveAttachment}
      />
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="flex items-center gap-x-2 bg-muted rounded-md"
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          className="hidden"
          onChange={(e) => handleFileSelect(e.target.files)}
          accept="image/*,.pdf,.doc,.docx,.txt"
        />
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="h-10 w-10">
              <PlusCircle className="h-5 w-5" />
            </Button>
          </PopoverTrigger>
          <PopoverContent side="top" align="start" className="w-48">
            <div className="flex flex-col space-y-1">
              <Button
                variant="ghost"
                className="w-full justify-start gap-x-2"
                onClick={() => fileInputRef.current?.click()}
              >
                <FileUp className="h-4 w-4" />
                Upload a File
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start gap-x-2"
                onClick={() => {
                  // Handle poll creation
                }}
              >
                <BarChart2 className="h-4 w-4" />
                Create Poll
              </Button>
            </div>
          </PopoverContent>
        </Popover>

        <Input
          ref={inputRef}
          name="message"
          placeholder={`Message ${isDM ? recipientName : '#' + channelName}`}
          className="border-0 focus-visible:ring-0 bg-transparent"
        />

        <div className="flex items-center gap-x-2 px-2">
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <GiftIcon className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">Send a gift</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Paperclip className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">Attach files</TooltipContent>
            </Tooltip>

            <Tooltip>
              <Popover>
                <TooltipTrigger asChild>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Smile className="h-5 w-5" />
                    </Button>
                  </PopoverTrigger>
                </TooltipTrigger>
                <PopoverContent
                  side="top"
                  align="end"
                  className="w-full p-0"
                  sideOffset={20}
                >
                  <EmojiGifPicker onSelect={handleEmojiSelect} />
                </PopoverContent>
              </Popover>
              <TooltipContent side="top">Select emoji</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </form>
    </div>
  );
};

export default MessageInput;
