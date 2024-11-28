'use client';

import Image from 'next/image';
import React, { useState, useEffect } from 'react';

type TProps = {
  origin: { lat: number; lng: number };
  destination: { lat: number; lng: number };
};

function StaticMap(props: TProps) {
  const [mapUrl, setMapUrl] = useState<string>('');

  useEffect(() => {
    const originLat = props.origin.lat;
    const originLng = props.origin.lng;
    const destinationLat = props.destination.lat;
    const destinationLng = props.destination.lng;

    const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
    console.log(API_KEY);

    const googleMapsUrl = `https://maps.googleapis.com/maps/api/staticmap?size=600x400&markers=color:red%7Clabel:A%7C${originLat},${originLng}&markers=color:blue%7Clabel:B%7C${destinationLat},${destinationLng}&path=color:0x0000ff%7Cweight:5%7C${originLat},${originLng}%7C${destinationLat},${destinationLng}&key=${API_KEY}`;

    setMapUrl(googleMapsUrl);
  }, [props.origin, props.destination]);

  return (
    <div className="flex flex-col gap-2 bg-zinc-50 rounded-lg p-4 border-2 border-border">
      <h3 className="font-bold text-zinc-600">Seu percurso</h3>
      <Image className="rounded-lg" src={mapUrl} alt="Mapa com a rota" width={400} height={400} />
    </div>
  );
}

export default StaticMap;
