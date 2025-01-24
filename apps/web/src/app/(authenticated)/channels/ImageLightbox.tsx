'use client';

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  src: string;
  type: 'image' | 'gif';
}

const ImageLightbox = ({ isOpen, onClose, src, type }: ImageLightboxProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[90vw] max-h-[90vh] p-0 overflow-hidden border-none bg-transparent shadow-none">
        <DialogTitle className={cn('sr-only')}>
          {type === 'gif' ? 'GIF Preview' : 'Image Preview'}
        </DialogTitle>
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2 z-10 bg-background/50 hover:bg-background/80"
            onClick={onClose}
            aria-label="Close preview"
          >
            <X className="h-4 w-4" />
          </Button>
          <img
            src={src}
            alt={type === 'gif' ? 'GIF' : 'Image'}
            className="w-full h-full object-contain max-h-[90vh]"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageLightbox;
