import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default function ProfilePage() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('access_token');

  if (!accessToken) {
    redirect('/login');
  }

  return <> <h1>home</h1> </>;
}