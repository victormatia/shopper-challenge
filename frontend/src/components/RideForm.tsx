'use client';

import React from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from './ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useMutation } from '@tanstack/react-query';
import axiosCustomInstance from '@/lib/axios';
import { TEstimateRequestInput } from '@/types';

const formSchema = z.object({
  userId: z.coerce.number().min(1, { message: 'O ID do usuário deve ser maior que 0.' }),
  origin: z.string().min(2).max(50),
  destination: z.string().min(2).max(50),
});

function RideForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userId: 0,
      origin: '',
      destination: '',
    },
  });

  const estimateRideMutation = useMutation({
    mutationKey: ['estimateRide'],
    mutationFn: async (input: TEstimateRequestInput) => {
      const { data } = await axiosCustomInstance.post('/ride/estimate', input);
      return data;
    },
    onSuccess: () => {
      form.reset({
        userId: 0,
        origin: '',
        destination: '',
      });
    },
    onError: (e) => {
      console.error(e);
      form.reset({
        userId: 0,
        origin: '',
        destination: '',
      });
    },
  });

  const onSubmit = async ({ userId, origin, destination }: z.infer<typeof formSchema>) => {
    await estimateRideMutation.mutateAsync({ customer_id: userId, origin, destination });
  };

  return (
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
          name="origin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Origem</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Itapipoca, Ce" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="destination"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Destino</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Fortaleza, Ce" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Buscar motoristas</Button>
      </form>
    </Form>
  );
}

export default RideForm;
