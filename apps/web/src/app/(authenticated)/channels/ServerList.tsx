'use client';

import { Compass, Download, Home, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useRouter } from 'next/navigation';
import { Separator } from '@/components/ui/separator';
import CreateServerDialog from './CreateServerDialog';
import ServerListItem from './ServerListItem';

const ServerList = () => {
  const [isCreateServerOpen, setIsCreateServerOpen] = useState(false);
  const router = useRouter();

  const servers = [
    {
      id: '1',
      name: 'Gaming Hub',
      imageUrl:
        'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=64&h=64&q=80',
    },
    {
      id: '2',
      name: 'Design Community',
      imageUrl:
        'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=64&h=64&q=80',
    },
    {
      id: '3',
      name: 'Book Club',
      imageUrl:
        'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=64&h=64&q=80',
    },
  ];

  return (
    <div className="w-[72px] h-full border-r flex flex-col items-center py-3 gap-2">
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                'w-12 h-12 rounded-[24px] hover:rounded-[16px] transition-all duration-200',
                'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground'
              )}
              onClick={() => router.push('/channels/me')}
            >
              <Home className="w-5 h-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">Home</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Separator className="w-8 mx-auto" />

      {servers.map((server) => (
        <ServerListItem key={server.id} server={server} />
      ))}

      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="w-12 h-12 rounded-[24px] hover:rounded-[16px] transition-all duration-200 border-dashed"
              onClick={() => setIsCreateServerOpen(true)}
            >
              <Plus className="w-5 h-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">Add Server</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <CreateServerDialog
        isOpen={isCreateServerOpen}
        onClose={() => setIsCreateServerOpen(false)}
      />

      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="w-12 h-12 rounded-[24px] hover:rounded-[16px] transition-all duration-200"
            >
              <Compass className="w-5 h-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">Explore Servers</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Separator className="w-8 mx-auto" />

      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="w-12 h-12 rounded-[24px] hover:rounded-[16px] transition-all duration-200"
            >
              <Download className="w-5 h-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">Download Apps</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default ServerList;
