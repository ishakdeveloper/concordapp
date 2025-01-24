'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import FriendsListItem from './FriendsListItem';
import { User } from '@concord/server';

interface AllFriendsProps {
  friends: User[];
  searchQuery: string;
}

const AllFriends = ({ friends, searchQuery }: AllFriendsProps) => {
  const filteredFriends = friends.filter((friend) =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ScrollArea className="h-full">
      <div className="space-y-2">
        {filteredFriends.map((friend) => (
          <FriendsListItem
            key={friend.id}
            friend={friend}
            type="all"
            onMessage={() => {}}
            onCall={() => {}}
            onRemoveFriend={() => {}}
            onBlock={() => {}}
          />
        ))}
        {filteredFriends.length === 0 && (
          <div className="text-center text-muted-foreground py-4">
            No friends found
          </div>
        )}
      </div>
    </ScrollArea>
  );
};

export default AllFriends;
