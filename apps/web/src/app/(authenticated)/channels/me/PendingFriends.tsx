'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import FriendsListItem from './FriendsListItem';
import { User } from '@concord/server';

interface PendingFriendsProps {
  incoming: User[];
  outgoing: User[];
  searchQuery: string;
}

const PendingFriends = ({
  incoming,
  outgoing,
  searchQuery,
}: PendingFriendsProps) => {
  const filteredIncoming = incoming.filter((friend) =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredOutgoing = outgoing.filter((friend) =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ScrollArea className="h-full">
      <div className="space-y-4">
        {filteredIncoming.length > 0 && (
          <div>
            <h3 className="font-semibold text-sm text-muted-foreground mb-2">
              INCOMING FRIEND REQUESTS
            </h3>
            <div className="space-y-2">
              {filteredIncoming.map((friend) => (
                <FriendsListItem
                  key={friend.id}
                  friend={friend}
                  type="pending"
                  isPending
                  isIncoming
                  onAccept={() => {}}
                  onDecline={() => {}}
                />
              ))}
            </div>
          </div>
        )}

        {filteredOutgoing.length > 0 && (
          <div>
            <h3 className="font-semibold text-sm text-muted-foreground mb-2">
              OUTGOING FRIEND REQUESTS
            </h3>
            <div className="space-y-2">
              {filteredOutgoing.map((friend) => (
                <FriendsListItem
                  key={friend.id}
                  friend={friend}
                  type="pending"
                  isPending
                  onDecline={() => {}}
                />
              ))}
            </div>
          </div>
        )}

        {filteredIncoming.length === 0 && filteredOutgoing.length === 0 && (
          <div className="text-center text-muted-foreground py-4">
            No pending requests
          </div>
        )}
      </div>
    </ScrollArea>
  );
};

export default PendingFriends;
