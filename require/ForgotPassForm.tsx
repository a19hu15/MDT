'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { passwordReset } from '@/lib/firebase/auth';

import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader,CardTitle  } from '../ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';



// Register form schema, used to define all properties, types, validation etc
const FormSchema = z.object({
  email: z.string().email('Please enter a valid email address🙏'),
});

const ForgotPassForm = () => {
  // Use form hook
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  // Handle form submit
  const handleSubmit = async (values: z.infer<typeof FormSchema>) => {
    // use this function to handle the entered values from the form
    try {
      await passwordReset(values.email);
      alert('Email Sent Successfully with link to reset password!');
    } catch (error:any) {    
      if (error.code === 'auth/user-not-found') {
        alert('User not found, try again!');

      }
    }
    console.log('Submitted');
  };

  return (
    <Card className="bg-white grid grid-cols-1 p-4 gap-4 lg:w-1/3">
      <CardHeader>
        <CardTitle className="text-3xl font-bold">Forgot Password?</CardTitle>
        <CardDescription>
          <span className="flex items-center gap-1 font-normal">
            Enter your email for reset link
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
            <Button
              type="submit"
              className="bg-primaryBlue mt-2 text-whiteBlue hover:bg-lightBlue hover:text-darkBlue w-full"
            >
              Submit
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ForgotPassForm;
