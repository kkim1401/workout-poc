import { LoginForm } from '@/features/account/components';
import { signInWithEmail } from './actions';

export default function LoginPage() {
  return <LoginForm loginAction={signInWithEmail} />;
}
