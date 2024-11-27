'use client';

import queryClient from '@/lib/queryClient';
import { QueryClientProvider } from '@tanstack/react-query';

export default function TanStackProvider({ children }: { children: React.ReactNode }) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
