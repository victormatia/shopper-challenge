import { redirect } from 'next/navigation';

export default function Home() {
  return redirect('/ride_request');
}
