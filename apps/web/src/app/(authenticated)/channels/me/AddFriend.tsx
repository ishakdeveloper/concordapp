'use client';

import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const AddFriend = () => {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-2">Add Friend</h3>
      <p className="text-muted-foreground mb-4">
        You can add friends with their Discord username.
      </p>
      <div className="flex gap-2">
        <Input placeholder="Enter a username" className="flex-1" />
        <Button>Send Friend Request</Button>
      </div>
    </Card>
  );
};

export default AddFriend;
