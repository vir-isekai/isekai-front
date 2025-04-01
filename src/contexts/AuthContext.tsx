import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getToken, removeToken, isTokenExpired, refreshToken } from '../services/authService';

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  loading: boolean;
  login: (token: string) => void;
  logout: () => void;
  refreshUserToken: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // 처음 마운트될 때 로컬 스토리지에서 토큰 확인
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = getToken();
      
      if (storedToken && !isTokenExpired(storedToken)) {
        setToken(storedToken);
      } else if (storedToken) {
        // 토큰이 만료되었다면 갱신 시도
        const newToken = await refreshToken();
        if (newToken) {
          setToken(newToken);
        } else {
          removeToken();
        }
      }
      
      setLoading(false);
    };
    
    initAuth();
  }, []);

  // 로그인 처리
  const login = (newToken: string) => {
    setToken(newToken);
  };

  // 로그아웃 처리
  const logout = () => {
    removeToken();
    setToken(null);
  };

  // 토큰 갱신
  const refreshUserToken = async () => {
    const newToken = await refreshToken();
    if (newToken) {
      setToken(newToken);
      return newToken;
    }
    
    logout();
    return null;
  };

  const value = {
    isAuthenticated: !!token,
    token,
    loading,
    login,
    logout,
    refreshUserToken
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// 커스텀 훅으로 사용하기 쉽게 함
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
