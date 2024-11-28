'use client';

import DriverCard from '@/components/DriverCard';
import StaticMap from '@/components/StaticMap';
import { TEstimateResponse } from '@/types';
import { useEffect, useState } from 'react';

function SelectDriver() {
  const [estimate, setEstimate] = useState<TEstimateResponse | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const estimateOnLocalStorage = localStorage.getItem('estimate');
    if (estimateOnLocalStorage) setEstimate(JSON.parse(estimateOnLocalStorage));
    const userIdOnLocalStorage = localStorage.getItem('userId');
    if (userIdOnLocalStorage) setUserId(userIdOnLocalStorage);
  }, []);

  return (
    <div className="w-screen h-screen flex justify-center items-center gap-16">
      {estimate && (
        <StaticMap
          origin={{ lat: estimate.origin.latitude, lng: estimate.origin.longitude }}
          destination={{ lat: estimate.destination.latitude, lng: estimate.destination.longitude }}
        />
      )}
      <div className="flex flex-col gap-4">
        <h3 className="font-bold text-zinc-600">Escolha o seu motorista</h3>
        <ul className="h-[300px] overflow-y-scroll">
          {estimate?.options.map((driver) => (
            <li className="mb-2" key={driver.id}>
              {!!userId && <DriverCard userId={userId} driver={driver} routeResponse={estimate.routeResponse} />}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SelectDriver;
