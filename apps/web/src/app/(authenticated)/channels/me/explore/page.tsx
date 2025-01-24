'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Users, Search } from 'lucide-react';

export default function ExplorePage() {
  // Mock data - replace with real data
  const guilds = [
    {
      id: 1,
      name: 'Gaming Community',
      description: 'A place for gamers to connect and play together',
      members: 1234,
    },
    {
      id: 2,
      name: 'Book Club',
      description: 'Discuss your favorite books with fellow readers',
      members: 567,
    },
    {
      id: 3,
      name: 'Tech Hub',
      description: 'Stay updated with the latest in technology',
      members: 890,
    },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b">
        <h1 className="text-2xl font-bold mb-2">Explore Communities</h1>
        <p className="text-muted-foreground">
          Discover and join communities that match your interests
        </p>
      </div>

      <div className="p-4 border-b">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search communities..." className="pl-9 w-full" />
        </div>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {guilds.map((guild) => (
            <Card key={guild.id}>
              <CardHeader>
                <CardTitle>{guild.name}</CardTitle>
                <CardDescription>{guild.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Users className="h-4 w-4 mr-1" />
                  {guild.members.toLocaleString()} members
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Join Community</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
