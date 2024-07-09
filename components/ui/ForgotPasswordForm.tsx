'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
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

const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

const ForgotPasswordForm: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (values: any) => {
    setLoading(true);
    try {
      await account.createRecovery(values.email, `${window.location.origin}/reset-password`);
      toast.success('Password reset link sent to your email');
      setLoading(false);
      router.push('/sign-in');
    } catch (error: any) {
      if (error.code === 404) {
        toast.error('Email not registered');
      } else {
        toast.error('Password recovery failed');
      }
      console.error('Password recovery failed:', error.message);
      setLoading(false);
    }
  };

  return (
    <AuthBox
      title="Forgot Password"
      subtitle="Enter your email to reset your password"
      linkText="Sign Up"
      linkHref="/sign-up"
      buttonText="Sign Up"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" variant="default" size="sm" loading={loading} className="w-full">Reset Password</Button>
        </form>
      </Form>
    </AuthBox>
  );
};

export default ForgotPasswordForm;
