'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { authClient } from '@/lib/auth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, LogOut, Settings, Heart } from 'lucide-react';
import { CreditCard, FileText } from 'lucide-react';
import { Skeleton } from './ui/skeleton';

export function Header() {
  const { data: session, isPending } = authClient.useSession();

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        credentials: 'include',
      },
    });
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b">
      <div className="flex items-center gap-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/horzeplaza-logo.png"
            alt="Logo"
            width={148}
            height={148}
          />
          {/* <span className="font-medium">Brand</span> */}
        </Link>

        {/* Navigation */}
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/over-ons" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Over Ons
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/aanbod" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Aanbod
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>Menu</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <Link
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        href="/"
                      >
                        <div className="mb-2 mt-4 text-lg font-medium">
                          Features
                        </div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          Discover all our amazing features and capabilities.
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        href="/pricing"
                      >
                        <div className="text-sm font-medium leading-none">
                          Pricing
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Check out our competitive pricing plans
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        href="/contact"
                      >
                        <div className="text-sm font-medium leading-none">
                          Contact
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Get in touch with our support team
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <div className="flex items-center gap-6">
        {/* Search */}
        <div className="relative">
          <Input type="search" placeholder="Search..." className="w-64" />
        </div>

        {/* Auth buttons */}
        {isPending ? (
          <Skeleton className="h-10 w-20" />
        ) : session ? (
          <>
            <Link href="/favorieten" className="flex items-center gap-1">
              <Heart className="h-5 w-5" />
              <span className="text-sm">0</span>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative">
                  {session.user.name}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {session.user.name}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {session.user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem asChild>
                    <Link href="/my-ads">
                      <FileText className="mr-2 h-4 w-4" />
                      My Ads
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/subscription">
                      <CreditCard className="mr-2 h-4 w-4" />
                      My Subscription
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/logout">
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button onClick={handleLogout}>Logout</Button>
          </>
        ) : (
          <>
            <Button asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/register">Register</Link>
            </Button>
          </>
        )}
      </div>
    </header>
  );
}
