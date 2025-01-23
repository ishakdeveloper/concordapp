'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Apple, Chrome, Linkedin, Loader } from 'lucide-react';
import { cn } from '@/lib/utils';
import { authClient } from '@/lib/auth';
import { useRouter } from 'next/navigation';

interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  async function onSubmit(data: LoginFormData) {
    setIsLoading(true);
    try {
      await authClient.signIn.email({
        email: data.email,
        password: data.password,
        fetchOptions: {
          onSuccess: () => {
            router.push('/aanbod');
          },
        },
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Card className="w-[400px]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">Sign in</CardTitle>
          <CardDescription className="text-center">
            Choose your preferred sign in method
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-3 gap-4">
            <Button variant="outline" disabled={isLoading}>
              <Chrome className="mr-2 h-4 w-4" />
              Google
            </Button>
            <Button variant="outline" disabled={isLoading}>
              <Apple className="mr-2 h-4 w-4" />
              Apple
            </Button>
            <Button variant="outline" disabled={isLoading}>
              <Linkedin className="mr-2 h-4 w-4" />
              LinkedIn
            </Button>
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-2">
              <div className="grid gap-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  disabled={isLoading}
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address',
                    },
                  })}
                  className={cn(errors.email && 'border-red-500')}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>
              <div className="grid gap-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  disabled={isLoading}
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 8,
                      message: 'Password must be at least 8 characters',
                    },
                  })}
                  className={cn(errors.password && 'border-red-500')}
                />
                {errors.password && (
                  <p className="text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <Button className="mt-4" disabled={isLoading}>
                {isLoading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
                Sign In
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-muted-foreground text-center">
            <a
              className="hover:text-primary underline underline-offset-4"
              href="#"
            >
              Forgot your password?
            </a>
          </div>
          <div className="text-sm text-muted-foreground text-center">
            Don&apos;t have an account?{' '}
            <a
              className="hover:text-primary underline underline-offset-4"
              href="/register"
            >
              Sign up
            </a>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
