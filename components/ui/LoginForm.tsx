"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { account } from '../../lib/appwrite';
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
import { useUserContext } from '../../context/UserContext';
import { toast } from 'react-hot-toast';

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const LoginForm: React.FC = () => {
  const router = useRouter();
  const { setUser } = useUserContext();

  const form = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: any) => {
    try {
      // Create a session with email and password
      await account.createEmailPasswordSession(values.email, values.password);
      const userDetails = await account.get();
      setUser(userDetails); // Update user context
      toast.success('Login successful!');
      router.push('/'); // Redirect to the main page after login
    } catch (error: any) {
      form.setError('email', {
        type: 'manual',
        message: 'Login failed. Please check your credentials and try again.',
      });
      toast.error('Login failed. Please check your credentials and try again.');
      console.error('Login failed:', error.message);
    }
  };

  return (
    <AuthBox
      title="Login"
      subtitle="Enter your personal details and start your journey with us"
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
          <a href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-800">Forgot your password?</a>
          <Button type="submit" variant="default" size="sm" className="w-full">Login</Button>
        </form>
      </Form>
    </AuthBox>
  );
};

export default LoginForm;
