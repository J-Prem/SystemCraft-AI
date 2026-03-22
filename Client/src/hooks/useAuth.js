import useAuthStore from '../store/useAuthStore';

const useAuth = () => {
  const { token, isAuthenticated, logout, setToken, setUser, user } = useAuthStore();
  
  return {
    token,
    isAuthenticated,
    user,
    setToken,
    setUser,
    logout
  };
};

export default useAuth;
