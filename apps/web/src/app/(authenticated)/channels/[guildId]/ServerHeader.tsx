'use client';

import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, Settings, UserPlus, Trash, Image } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ServerHeaderProps {
  name: string;
  bannerUrl?: string;
}

const ServerHeader = ({ name, bannerUrl }: ServerHeaderProps) => {
  return (
    <div className="relative w-full">
      {bannerUrl && (
        <div
          className="absolute inset-0 h-16 w-full bg-cover bg-center"
          style={{
            backgroundImage: `url(${bannerUrl})`,
          }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>
      )}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="relative w-full">
            <div
              className={cn(
                'relative px-4 py-3 flex items-center justify-between',
                bannerUrl ? 'text-white' : 'text-foreground'
              )}
            >
              <h1 className="font-semibold text-base">{name}</h1>
              <ChevronDown className="h-4 w-4" />
            </div>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem className="gap-2">
            <Settings className="h-4 w-4" />
            Server Settings
          </DropdownMenuItem>
          <DropdownMenuItem className="gap-2">
            <UserPlus className="h-4 w-4" />
            Invite People
          </DropdownMenuItem>
          <DropdownMenuItem className="gap-2">
            <Image className="h-4 w-4" />
            Change Server Profile
          </DropdownMenuItem>
          <DropdownMenuItem className="gap-2 text-red-600">
            <Trash className="h-4 w-4" />
            Delete Server
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ServerHeader;
