import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { cn } from '@/lib/utils';
import { User } from '@concord/server';

interface UserAvatarProps {
  user: User;
  className?: string;
  showStatus?: boolean;
}

const UserAvatar = ({
  user,
  className,
  showStatus = true,
}: UserAvatarProps) => {
  return (
    <div className="relative">
      <Avatar className={cn('w-9 h-9', className)}>
        <AvatarImage src={user?.image || ''} />
        <AvatarFallback>{user?.name?.[0] || ''}</AvatarFallback>
      </Avatar>
      {showStatus && (
        <span
          className={cn(
            'absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-background bg-green-500'
          )}
        />
      )}
    </div>
  );
};

export default UserAvatar;
