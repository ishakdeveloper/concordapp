'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import FriendsListItem from './FriendsListItem';
import { User } from '@concord/server';

interface OnlineFriendsProps {
  friends: User[];
  searchQuery: string;
}

const OnlineFriends = ({ friends, searchQuery }: OnlineFriendsProps) => {
  const filteredFriends = friends.filter(
    (friend) =>
      friend.status === 'online' &&
      friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ScrollArea className="h-full">
      <div className="space-y-2">
        {filteredFriends.map((friend) => (
          <FriendsListItem
            key={friend.id}
            friend={friend}
            type="online"
            onMessage={() => {}}
            onCall={() => {}}
            onRemoveFriend={() => {}}
            onBlock={() => {}}
          />
        ))}
        {filteredFriends.length === 0 && (
          <div className="text-center text-muted-foreground py-4">
            No online friends found
          </div>
        )}
      </div>
    </ScrollArea>
  );
};

export default OnlineFriends;
