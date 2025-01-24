'use client';

import { X, FileText, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface Attachment {
  id: string;
  file: File;
  previewUrl?: string;
  type: 'image' | 'file';
}

interface MessageAttachmentsProps {
  attachments: Attachment[];
  onRemove: (id: string) => void;
}

const MessageAttachments = ({
  attachments,
  onRemove,
}: MessageAttachmentsProps) => {
  if (attachments.length === 0) return null;

  return (
    <div className="px-4 py-2 border-t">
      <div className="flex flex-wrap gap-2">
        {attachments.map((attachment) => (
          <div
            key={attachment.id}
            className="group relative flex-shrink-0 w-48 bg-muted/50 rounded-md overflow-hidden"
          >
            {attachment.type === 'image' ? (
              <div className="relative w-full h-32">
                <Image
                  src={attachment.previewUrl || ''}
                  alt={attachment.file.name}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="h-32 flex items-center justify-center bg-background">
                <FileText className="h-12 w-12 text-muted-foreground" />
              </div>
            )}

            <div className="p-2 bg-background/90">
              <p className="text-sm font-medium truncate">
                {attachment.file.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {(attachment.file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="absolute top-1 right-1 h-6 w-6 bg-background/90 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => onRemove(attachment.id)}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessageAttachments;
