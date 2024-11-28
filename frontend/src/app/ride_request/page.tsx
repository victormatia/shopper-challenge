'use client';

import RideForm from '@/components/RideForm';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import React from 'react';

function RideRquest() {
  const router = useRouter();
  return (
    <div className="flex flex-col  gap-4 justify-center items-center w-screen h-screen">
      <h3 className="text-zinc-600 font-bold">Bucar viagem</h3>
      <RideForm />
      <Button onClick={() => router.push('/history')} variant="link" className="w-[250px]">
        Ver histórico de viagem
      </Button>
    </div>
  );
}

export default RideRquest;
