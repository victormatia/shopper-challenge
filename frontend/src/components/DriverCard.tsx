'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { TDriver, TEstimateResponse, TRouteResponse } from '@/types';
import { Car, DollarSign, MessageSquareText, Star } from 'lucide-react';
import { Button } from './ui/button';
import { useMutation } from '@tanstack/react-query';
import axiosCustomInstance from '@/lib/axios';
import { useRouter } from 'next/navigation';

type TProps = {
  userId: string;
  driver: TDriver;
  routeResponse: TRouteResponse;
};

function DriverCard({ driver, routeResponse, userId }: TProps) {
  const router = useRouter();

  const confirmRideMudation = useMutation({
    mutationFn: async () => {
      const { data } = await axiosCustomInstance.patch('/ride/confirm', {
        customer_id: +userId,
        origin: routeResponse.routes[0].legs[0].start_address,
        destination: routeResponse.routes[0].legs[0].end_address,
        distance: routeResponse.routes[0].legs[0].distance.value,
        duration: routeResponse.routes[0].legs[0].duration.text,
        driver: {
          id: driver.id,
          name: driver.name,
        },
        value: driver.value,
      });

      return data;
    },
    onError: (e) => console.error(e),
    onSuccess: () => router.replace('/'),
  });

  const onClick = async () => {
    confirmRideMudation.mutateAsync();
  };

  return (
    <Card className="w-[600px] p-4 rounded-lg">
      <CardHeader>
        <div className="flex items-center justify-between mb-1">
          <CardTitle>{driver.name}</CardTitle>
          <div className="flex items-center gap-1">
            {Array.from({ length: driver.review[0].rating }, (_, i) => i).map((e, i) => (
              <Star key={i} size={16} fill="true" className="text-zinc-800" />
            ))}
          </div>
        </div>
        <CardDescription>{driver.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 w-full">
          <li className="flex gap-4 items-center">
            <Car size={20} className="text-zinc-800" />
            <p className="text-sm text-muted-foreground">{driver.vehicle}</p>
          </li>
          <li className="flex gap-4 items-center">
            <DollarSign size={20} className="text-zinc-800" />
            <p className="text-sm text-muted-foreground">{driver.value.toFixed(2)}</p>
          </li>
          <li className="flex gap-4 items-center">
            <div className="shrink-0">
              <MessageSquareText size={20} className="text-zinc-800" />
            </div>
            <p className="text-sm text-muted-foreground">{driver.review[0].comment}</p>
          </li>
        </ul>
      </CardContent>
      <CardFooter>
        <Button onClick={onClick}>Escolher</Button>
      </CardFooter>
    </Card>
  );
}

export default DriverCard;
