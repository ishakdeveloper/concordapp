'use client';

import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRouter, useParams } from 'next/navigation';

interface Channel {
  id: string;
  name: string;
  type: 'TEXT' | 'VOICE';
}

interface Category {
  id: string;
  name: string;
  channels: Channel[];
}

// Dummy data - replace with real data later
const categories: Category[] = [
  {
    id: '1',
    name: 'Text Channels',
    channels: [
      { id: '1', name: 'general', type: 'TEXT' },
      { id: '2', name: 'off-topic', type: 'TEXT' },
    ],
  },
  {
    id: '2',
    name: 'Voice Channels',
    channels: [
      { id: '3', name: 'General Voice', type: 'VOICE' },
      { id: '4', name: 'Gaming', type: 'VOICE' },
    ],
  },
];

const Channels = () => {
  const router = useRouter();
  const params = useParams();
  const guildId = params?.guildId as string;

  return (
    <ScrollArea className="flex-1">
      <div className="flex flex-col gap-y-2 px-2">
        {categories.map((category) => (
          <Collapsible key={category.id} defaultOpen>
            <CollapsibleTrigger className="w-full">
              <div className="flex items-center justify-between px-1 py-2 hover:text-foreground/80 transition group">
                <span className="text-xs font-semibold uppercase text-muted-foreground group-hover:text-foreground/80">
                  {category.name}
                </span>
                <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform duration-200 group-hover:text-foreground/80" />
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="flex flex-col gap-y-1">
                {category.channels.map((channel) => (
                  <button
                    key={channel.id}
                    onClick={() =>
                      router.push(`/channels/${guildId}/${channel.id}`)
                    }
                    className={cn(
                      'w-full text-left px-2 py-1 rounded-md hover:bg-muted/50 transition',
                      'flex items-center gap-x-2 text-muted-foreground hover:text-foreground',
                      params?.channelId === channel.id &&
                        'bg-muted text-foreground'
                    )}
                  >
                    <span className="text-sm">
                      {channel.type === 'TEXT' ? '#' : '🔊'} {channel.name}
                    </span>
                  </button>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>
    </ScrollArea>
  );
};

export default Channels;
