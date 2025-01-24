'use client';

import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Check, Copy, LogOut, PenSquare, UserPlus } from 'lucide-react';
import { useState } from 'react';

interface ServerListItemProps {
  server: {
    id: string;
    name: string;
    imageUrl: string;
  };
}

const ServerListItem = ({ server }: ServerListItemProps) => {
  const router = useRouter();
  const [showCopied, setShowCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="relative flex items-center">
                <div
                  className={cn(
                    'absolute -left-[10px] w-1 h-8 bg-black rounded-r-full transition-all duration-200',
                    'scale-100'
                  )}
                  style={{ top: 'calc(50% - 16px)' }}
                />
                <button
                  className={cn(
                    'w-12 h-12 rounded-[24px] group hover:rounded-[16px] transition-all duration-200 overflow-hidden ml-1',
                    'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground'
                  )}
                  onClick={() => router.push(`/channels/${server.id}`)}
                >
                  <img
                    src={server.imageUrl}
                    alt={server.name}
                    className="w-full h-full object-cover"
                  />
                </button>
              </div>
            </TooltipTrigger>
            <TooltipContent side="right">{server.name}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-56">
        <ContextMenuItem onClick={() => {}}>
          <Check className="mr-2 h-4 w-4" />
          Mark As Read
        </ContextMenuItem>
        <ContextMenuItem onClick={() => {}}>
          <UserPlus className="mr-2 h-4 w-4" />
          Invite People
        </ContextMenuItem>
        <ContextMenuItem onClick={() => {}}>
          <PenSquare className="mr-2 h-4 w-4" />
          Server Settings
        </ContextMenuItem>
        <ContextMenuItem onClick={() => copyToClipboard(server.id)}>
          <div className="flex items-center">
            <Copy className="mr-2 h-4 w-4" />
            {showCopied ? 'Copied!' : 'Copy Server ID'}
          </div>
        </ContextMenuItem>
        <ContextMenuItem className="text-red-500" onClick={() => {}}>
          <LogOut className="mr-2 h-4 w-4" />
          Leave Server
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default ServerListItem;
