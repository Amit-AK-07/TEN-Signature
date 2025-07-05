import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/authSlice';
import { performLogout, checkAuthStatus } from '../apiAction/login/Index';

// Hook to initialize auth state from localStorage on app start
export const useAuthInit = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Check if we have a stored token
    const storedToken = localStorage.getItem('authToken');

    if (storedToken) {
      // Verify token is still valid by calling auth-status API
      checkAuthStatus()
        .then((data) => {
          if (data.is_authenticated) {
            // Token is valid - set fresh user data from server
            dispatch(setUser({
              user: {
                email: data.email,
                username: data.username,
                first_name: data.first_name
              },
              token: storedToken
            }));
          } else {
            // Token invalid - clear local data
            console.log('Token invalid, clearing local data');
            localStorage.removeItem('authToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('user');
          }
        })
        .catch((error) => {
          // Token expired or API error - clear local data
          console.log('Token verification failed, clearing local data:', error);
          localStorage.removeItem('authToken');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('user');
        });
    }
  }, [dispatch]);
};

// Hook to handle logout
export const useLogout = () => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await performLogout(dispatch);
  };

  return handleLogout;
};
