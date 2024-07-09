"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { account, databases } from '../../lib/appwrite';
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import AuthBox from './AuthBox';
import { toast } from 'react-hot-toast';

const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  username: z.string().min(2).max(50),
});

const SignUpForm: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      password: '',
      username: '',
    },
  });

  const onSubmit = async (values: any) => {
    setLoading(true);
    try {
      // Create user account
      const user = await account.create('unique()', values.email, values.password, values.username);

      // Save user data to database
      await databases.createDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || '',
        process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID || '',
        'unique()', // Generate a unique ID for the document
        {
          email: values.email,
          username: values.username,
          userId: user.$id, // Store the user ID
        }
      );

      toast.success('Registration successful! Please login.');
      setLoading(false)
      router.push('/sign-in');
    } catch (error: any) {
      form.setError('email', {
        type: 'manual',
        message: 'Registration failed. Please try again.',
      });
      toast.error('Registration failed. Please try again.');
      console.error('Registration failed:', error.message);
      setLoading(false)
    }
  };

  return (
    <AuthBox
      title="Create Your Account"
      subtitle="Enter your personal details and start your journey with us"
      linkText="Login"
      linkHref="/sign-in"
      buttonText="Login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="email" placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" variant="default" size="sm" className="w-full" loading={loading}>Sign Up</Button>
        </form>
      </Form>
    </AuthBox>
  );
};

export default SignUpForm;
