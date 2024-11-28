'use client';

import { useQuery } from '@tanstack/react-query';
import React from 'react';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useMutation } from '@tanstack/react-query';
import axiosCustomInstance from '@/lib/axios';
import { TEstimateRequestInput } from '@/types';
import { useRouter } from 'next/navigation';
import queryClient from '@/lib/queryClient';
import { Button } from '@/components/ui/button';

const formSchema = z.object({
  userId: z.coerce.number().min(1, { message: 'O ID do usuário deve ser maior que 0.' }),
  driver: z.string().min(2).max(50),
});

function History() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userId: 0,
      driver: '',
    },
  });

  // const {} = useQuery({
  //   queryKey: ['history'],
  //   queryFn: async () => {
  //     const { data } = await axiosCustomInstance.get(`/ride/${userId}`, {
  //       params: { driver_id: driverId },
  //     });

  //     return data;
  //   },
  // });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center gap-16">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 border-border border-2 rounded-lg p-4">
          <FormField
            control={form.control}
            name="userId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Id de usuário</FormLabel>
                <FormControl>
                  <Input placeholder="Ex.: 1" {...field} type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="driver"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Origem</FormLabel>
                <FormControl>{/* <Input placeholder="Ex: Itapipoca, Ce" {...field} /> */}</FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Buscar histórico</Button>
        </form>
      </Form>
    </div>
  );
}

export default History;
