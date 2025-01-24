'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import UserAvatar from '@/components/UserAvatar';

interface Member {
  id: string;
  name: string;
  image?: string;
  status: 'online' | 'offline' | 'idle' | 'dnd';
  role: 'owner' | 'admin' | 'member';
}

interface MembersListProps {
  members: Member[];
}

const MembersList = ({ members }: MembersListProps) => {
  // Group members by role
  const groupedMembers = members.reduce(
    (acc, member) => {
      const role = member.role;
      if (!acc[role]) {
        acc[role] = [];
      }
      acc[role].push(member);
      return acc;
    },
    {} as Record<string, Member[]>
  );

  // Order of roles to display
  const roleOrder = ['owner', 'admin', 'member'];

  const getStatusColor = (status: Member['status']) => {
    switch (status) {
      case 'online':
        return 'bg-green-500';
      case 'idle':
        return 'bg-yellow-500';
      case 'dnd':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="w-60 border-l bg-background">
      <ScrollArea className="h-full">
        <div className="p-3">
          {roleOrder.map((role) => {
            if (!groupedMembers[role]?.length) return null;

            return (
              <div key={role} className="mb-6">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase mb-2">
                  {role === 'owner'
                    ? 'Owner'
                    : role === 'admin'
                      ? 'Admins'
                      : 'Members'}{' '}
                  — {groupedMembers[role].length}
                </h3>
                <div className="space-y-2">
                  {groupedMembers[role].map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center gap-x-2 p-2 rounded-md hover:bg-muted/50 cursor-pointer group"
                    >
                      <div className="relative">
                        <UserAvatar
                          user={{
                            name: member.name,
                            image: member.image,
                          }}
                          className="h-8 w-8"
                        />
                        <div
                          className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background ${getStatusColor(
                            member.status
                          )}`}
                        />
                      </div>
                      <span className="text-sm font-medium group-hover:text-primary transition">
                        {member.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
};

export default MembersList;
