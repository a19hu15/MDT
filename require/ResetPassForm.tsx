'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { IoEye as EyeOn } from 'react-icons/io5';
import { IoEyeOff as EyeOff } from 'react-icons/io5';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader,CardTitle  } from '../ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';

// Register form schema, used to define all properties, types, validation etc
const FormSchema = z
  .object({
    email: z.string().email('Please enter a valid email address🙏'),

    password: z
      .string()
      .min(6, 'Password must be at least 6 characters')
      .max(50, 'Password must less than 50 characters'),

    confirmPassword: z
      .string()
      .min(6, 'Password must be at least 6 characters')
      .max(50, 'Password must less than 50 characters'),
  })
  .refine(
    (data) => {
      return data.password === data.confirmPassword;
    },
    {
      message: 'Both passwords do not match☹️!',
      path: ['confirmPassword'],
    }
  );

const ResetPassForm = () => {
  // Use form hook
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  // Handle form submit
  const handleSubmit = () => {
    // use this function to handle the entered values from the form
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
        <CardTitle className="text-3xl font-bold">Reset Password</CardTitle>
        <CardDescription>
          <span className="flex items-center gap-1 font-normal">
            Set your new password below
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
                    <FormMessage className="text-red-500" />
                  </FormItem>
                );
              }}
            />

            {/*-------------------------------CONFIRM PASSWORD------------------------------------ */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className="font-semibold">
                      Confirm Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          type={visible ? 'text' : 'password'}
                          placeholder="Confirm Password"
                        />
                        {visible ? (
                          <EyeOff
                            className="absolute cursor-pointer right-3 top-3 hover:text-primary hover:text-primaryBlue transition-colors"
                            onClick={handlePasswordVisibility}
                          />
                        ) : (
                          <EyeOn
                            className="absolute cursor-pointer right-3 top-3 hover:text-primary hover:text-primaryBlue transition-colors"
                            onClick={handlePasswordVisibility}
                          />
                        )}
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                );
              }}
            />
            <Button
              type="submit"
              className="bg-primaryBlue mt-2 text-whiteBlue hover:bg-lightBlue hover:text-darkBlue w-full"
            >
              Reset
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ResetPassForm;
