import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import ProfileContent from './ProfileContent';

export default function ProfilePage() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('access_token');

  if (!accessToken) {
    redirect('/login');
  }

  return <ProfileContent />;
}