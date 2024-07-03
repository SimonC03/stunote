'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { account } from '../../lib/appwrite';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import AuthBox from './AuthBox';
import { toast } from 'react-hot-toast';

const resetPasswordSchema = z.object({
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string().min(8, 'Password must be at least 8 characters'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

const ResetPasswordForm: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get('userId');
  const secret = searchParams.get('secret');

  const form = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values: any) => {
    if (!userId || !secret) {
      toast.error('Invalid reset link');
      return;
    }

    try {
      await account.updateRecovery(userId, secret, values.password);
      toast.success('Password reset successful');
      router.push('/sign-in');
    } catch (error: any) {
      toast.error('Password reset failed');
      console.error('Password reset failed:', error.message);
    }
  };

  return (
    <AuthBox
      title="Reset Password"
      subtitle="Enter your new password"
      linkText="Sign In"
      linkHref="/sign-in"
      buttonText="Sign In"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Confirm Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" variant="default" size="sm" className="w-full">Reset Password</Button>
        </form>
      </Form>
    </AuthBox>
  );
};

export default ResetPasswordForm;
