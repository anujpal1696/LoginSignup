'use client';

import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Loader2, Sparkles, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CardHeader, CardContent, Card } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import * as z from 'zod';
import { ApiResponse } from '@/types/ApiResponse';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { messageSchema } from '@/schemas/messageSchema';
import { toast } from 'sonner';

const specialChar = '||';

const parseStringMessages = (messageString: string): string[] => {
  return messageString.split(specialChar);
};

const initialMessageString =
  "What's your favorite movie?||Do you have any pets?||What's your dream job?";

export default function SendMessage() {
  const params = useParams<{ username: string }>();
  const username = params.username;

  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
  });

  const messageContent = form.watch('content');

  const handleMessageClick = (message: string) => {
    form.setValue('content', message);
  };

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: z.infer<typeof messageSchema>) => {
    setIsLoading(true);
    try {
      const response = await axios.post<ApiResponse>('/api/send-message', {
        ...data,
        username,
      });
      toast.success(response.data.message);
      form.reset({ ...form.getValues(), content: '' });
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error(axiosError.response?.data.message ?? 'Failed to send message');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-purple-600 via-pink-500 to-orange-400 overflow-hidden flex items-center justify-center px-6 py-16">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-pink-400/30 via-purple-500/20 to-orange-400/30 blur-3xl animate-pulse" />

      <div className="relative w-full max-w-2xl">
        {/* Main Glass Card */}
        <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl rounded-3xl overflow-hidden">
          <CardHeader className="text-center pt-12 pb-8">
            <h1 className="text-5xl md:text-6xl font-black text-white drop-shadow-2xl mb-4">
              Send Anon to
            </h1>
            <p className="text-4xl md:text-5xl font-bold text-yellow-300">
              @{username}
            </p>
            <p className="mt-6 text-xl text-white/90">
              Say anything. Stay hidden. Spill the tea 😏
            </p>
          </CardHeader>

          <CardContent className="px-10 pb-12">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-2xl font-bold text-white">
                        Your Anonymous Message
                      </FormLabel>
                      <FormControl>
                        <textarea
                          placeholder="Write whatever's on your mind... no one will know it's you 🔥"
                          className="w-full min-h-48 bg-white/20 border-white/30 text-white placeholder:text-white/60 text-lg rounded-2xl px-6 py-5 resize-none focus:outline-none focus:ring-4 focus:ring-white/50"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-pink-200 text-lg" />
                    </FormItem>
                  )}
                />

                <div className="flex justify-center">
                  <Button
                    type="submit"
                    disabled={isLoading || !messageContent}
                    size="lg"
                    className="bg-white text-purple-600 hover:bg-yellow-300 font-black text-2xl px-12 py-8 rounded-full shadow-2xl transform hover:scale-105 transition flex items-center gap-4"
                  >
                    {isLoading ? (
                      <Loader2 className="h-8 w-8 animate-spin" />
                    ) : (
                      <Send className="h-8 w-8" />
                    )}
                    Send It
                  </Button>
                </div>
              </form>
            </Form>

            {/* Commented suggestion section kept but hidden - ready if you enable later */}
            {/* <div className="mt-12">
              <Button
                onClick={fetchSuggestedMessages}
                disabled={isSuggestLoading}
                className="w-full bg-white/20 hover:bg-white/30 text-white font-bold text-xl py-6 rounded-2xl backdrop-blur border border-white/30 flex items-center justify-center gap-3"
              >
                <Sparkles className="h-7 w-7" />
                Get Message Ideas
              </Button>
            </div> */}
          </CardContent>
        </Card>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-2xl font-bold text-white mb-6">
            Want your own anonymous inbox?
          </p>
          <Link href="/sign-up">
            <Button className="bg-white text-purple-600 hover:bg-yellow-300 font-black text-2xl px-12 py-8 rounded-full shadow-2xl transform hover:scale-105 transition">
              Create Your NoCap Link
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}