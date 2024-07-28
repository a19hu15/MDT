'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { IoEye as EyeOn } from 'react-icons/io5';
import { IoEyeOff as EyeOff } from 'react-icons/io5';
import { doSignInWithEmailAndPassword } from '@/lib/firebase/auth';

import Link from 'next/link';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader,CardTitle  } from '../ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Separator } from '../ui/separator';
import { Input } from '../ui/input';

import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

// Register form schema, used to define all properties, types, validation etc
const FormSchema = z.object({
  email: z.string().email('Please enter a valid email address🙏'),
  password: z.string({
    required_error: 'Please enter a valid password',
  }),
});

const LoginForm = () => {
  // Use form hook
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const [loading, setLoading] = useState(false);

  // Errors
  const errors = form.formState.errors;

  // Handle form submit
  const handleSubmit = async (values: z.infer<typeof FormSchema>) => {
    setLoading(true);
    // use this function to handle the entered values from the form
    try {
      const userCredential = await doSignInWithEmailAndPassword(values.email, values.password);
      console.log(userCredential);
      if(userCredential.user){
        if (userCredential.user.emailVerified) {
          router.push('/hospital/abhaNumberCreation');
        } else {
          // Handle authentication failure
          alert("First verify your email");
        }
      }
    } catch (error) {
      console.error('Error signing in:', error);
      toast.error('The supplied auth credential is incorrect.');
      // Handle error display or logging here
    }
    setLoading(false);
  };

  // Visibility of the password
  const [visible, setVisible] = useState(false);

  // Handle password visibility
  const handlePasswordVisibility = () => {
    setVisible(!visible);
  };
  return (
    <Card className="bg-white grid grid-cols-1 p-4 gap-4 lg:w-1/3">
      <CardHeader>
        <CardTitle className="text-3xl font-bold">Welcome Back!</CardTitle>
        <CardDescription>
          <span className="flex items-center gap-1 font-normal">
            <span>Don&apos;t have an account? </span>
            <Link
              href={'/auth/register'}
              className="text-primaryBlue underline hover:cursor-pointer hover:text-lightBlue"
            >
              Register Now
            </Link>
          </span>
        </CardDescription>
      </CardHeader>

      <CardContent className="gap-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            {/*-------------------------------EMAIL ID------------------------------------ */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className="font-semibold">Email ID</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="johndoe@example.com"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                );
              }}
            />

            {/*-------------------------------PASSWORD------------------------------------ */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className="font-semibold">Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          type={visible ? 'text' : 'password'}
                          placeholder="Password"
                        />
                        {visible ? (
                          <EyeOff
                            className="absolute cursor-pointer right-3 top-3 hover:text-primary"
                            onClick={handlePasswordVisibility}
                          />
                        ) : (
                          <EyeOn
                            className="absolute cursor-pointer right-3 top-3 hover:text-primary"
                            onClick={handlePasswordVisibility}
                          />
                        )}
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-500">
                      {errors.password && <p>{errors.password.message}</p>}
                    </FormMessage>
                  </FormItem>
                );
              }}
            />
            {
              loading ? 
              <Button
                type="submit"
                className="w-full bg-primaryBlue text-white"
                disabled={loading}
              >
                Logining...
              </Button>
              :
              <Button
                type="submit"
                className="bg-primaryBlue mt-2 text-whiteBlue hover:bg-lightBlue hover:text-darkBlue w-full"
              >
                Login
              </Button>
            }
          </form>
        </Form>

        <Separator className="my-4" />
        {/*-------------------------------FORGOT PASSWORD BUTTON------------------------------- */}
        <div className="flex items-center justify-center gap-1 font-normal">
          <Link href={'/auth/forgotPassword'}>
            <span className="hover:underline hover:text-primaryBlue">
              Forgot your Password?
            </span>
          </Link>
        </div>
      </CardContent>
      <Toaster />
    </Card>
  );
};

export default LoginForm;
