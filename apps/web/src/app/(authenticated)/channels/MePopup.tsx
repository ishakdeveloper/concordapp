'use client';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import UserAvatar from '@/components/UserAvatar';
import {
  User,
  UserRound,
  Settings,
  Moon,
  Sun,
  BellRing,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { useTheme } from 'next-themes';

interface MePopupProps {
  user: {
    id: string;
    name: string;
    email: string;
    image?: string;
    status?: string;
  };
}

const MePopup = ({ user }: MePopupProps) => {
  const { theme, setTheme } = useTheme();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-12 w-full flex items-center gap-x-2 px-2 hover:bg-muted/50 rounded-none"
        >
          <UserAvatar user={user} />
          <div className="flex flex-col items-start flex-1 max-w-[80px]">
            <span className="font-semibold text-sm truncate w-full">
              {user.name}
            </span>
            <span className="text-xs text-muted-foreground">
              {user.status || 'Online'}
            </span>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-80 p-0"
        align="start"
        alignOffset={-60}
        sideOffset={10}
      >
        <div className="p-4 bg-accent/50">
          <UserAvatar user={user} className="h-20 w-20 mb-2" />
          <div className="font-semibold truncate">{user.name}</div>
          <div className="text-sm text-muted-foreground truncate">
            {user.email}
          </div>
        </div>

        <div className="p-2 space-y-1">
          <Button
            variant="ghost"
            className="w-full justify-start gap-x-2"
            size="sm"
          >
            <UserRound className="h-4 w-4" />
            Set Status
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start gap-x-2"
            size="sm"
          >
            <User className="h-4 w-4" />
            Edit Profile
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start gap-x-2"
            size="sm"
          >
            <Settings className="h-4 w-4" />
            User Settings
          </Button>
        </div>

        <Separator />

        <div className="p-2 space-y-2">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-x-2">
              {theme === 'dark' ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
              <span className="text-sm">Theme</span>
            </div>
            <Switch
              checked={theme === 'dark'}
              onCheckedChange={(checked) =>
                setTheme(checked ? 'dark' : 'light')
              }
            />
          </div>

          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-x-2">
              <BellRing className="h-4 w-4" />
              <span className="text-sm">Notifications</span>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-x-2">
              {true ? (
                <Volume2 className="h-4 w-4" />
              ) : (
                <VolumeX className="h-4 w-4" />
              )}
              <span className="text-sm">Sounds</span>
            </div>
            <Switch defaultChecked />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default MePopup;
