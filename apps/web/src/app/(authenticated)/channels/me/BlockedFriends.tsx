'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import FriendsListItem from './FriendsListItem';
import { User } from '@concord/server';

interface BlockedFriendsProps {
  blocked: User[];
  searchQuery: string;
}

const BlockedFriends = ({ blocked, searchQuery }: BlockedFriendsProps) => {
  const filteredBlocked = blocked.filter((friend) =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ScrollArea className="h-full">
      <div className="space-y-2">
        {filteredBlocked.map((friend) => (
          <FriendsListItem
            key={friend.id}
            friend={friend}
            type="blocked"
            onRemoveFriend={() => {}}
          />
        ))}
        {filteredBlocked.length === 0 && (
          <div className="text-center text-muted-foreground py-4">
            No blocked users
          </div>
        )}
      </div>
    </ScrollArea>
  );
};

export default BlockedFriends;
