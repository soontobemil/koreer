import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useCookieFunctions } from './hooks/useCookieFunctions';
import { setAuthUser } from '../../slice/signInSlice';
import { jwtDecode } from 'jwt-decode';

interface AuthProviderProps {
  children: React.ReactNode;
}

interface DecodedToken {
  user_email: string;
  username: string;
  exp: number;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const dispatch = useDispatch();
  const { getCookie } = useCookieFunctions();

  useEffect(() => {
    const accessToken = getCookie('accessToken');
    if (accessToken) {
      try {
        const decoded = jwtDecode(accessToken) as DecodedToken;
        const currentTime = Date.now() / 1000;

        if (decoded.exp > currentTime) {
          dispatch(setAuthUser({
            user_email: decoded.user_email,
          }));
        }
      } catch (error) {
        console.error('Token decode error:', error);
      }
    }
  }, [dispatch, getCookie]);

  return <>{children}</>;
}
