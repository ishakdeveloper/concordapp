'use client';

import React from 'react';
import { Mic, Headphones, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import UserAvatar from '@/components/UserAvatar';
import { authClient } from '@/lib/auth';
import MePopup from './MePopup';

const LoggedInUserBox = () => {
  const { data: session } = authClient.useSession();

  if (!session) return null;

  return (
    <div className="h-[52px] bg-secondary/50 border-t flex items-center justify-between px-2">
      <div className="w-[120px]">
        <MePopup
          user={{
            id: session.user.id,
            name: session.user.name || 'User',
            email: session.user.email || '',
            image: session.user.image || undefined,
            status: session.user.status || 'Online',
          }}
        />
      </div>

      <div className="flex items-center gap-x-1">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 hover:bg-muted/50 shrink-0"
          title="Mute"
        >
          <Mic className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 hover:bg-muted/50 shrink-0"
          title="Deafen"
        >
          <Headphones className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 hover:bg-muted/50 shrink-0"
          title="User Settings"
        >
          <Settings className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default LoggedInUserBox;
