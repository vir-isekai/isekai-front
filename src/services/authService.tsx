// 토큰을 로컬 스토리지에 저장하는 함수
export const saveToken = (token: string) => {
    console.log("Token Save");
  localStorage.setItem('accessToken', token);
};

// 로컬 스토리지에서 토큰을 가져오는 함수
export const getToken = (): string | null => {
  return localStorage.getItem('accessToken');
};

// 로컬 스토리지에서 토큰을 제거하는 함수
export const removeToken = () => {
  localStorage.removeItem('accessToken');
};

// 토큰이 만료되었는지 확인하는 함수 (간단한 구현)
export const isTokenExpired = (token: string): boolean => {
  if (!token) return true;
  
  try {
    // JWT 토큰 디코딩 (간단한 방법)
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );

    const { exp } = JSON.parse(jsonPayload);
    return Date.now() >= exp * 1000;
  } catch (error) {
    return true;
  }
};

// 토큰 갱신 함수
export const refreshToken = async (): Promise<string | null> => {
  try {
    const response = await fetch('/api/auth/refresh', {
      method: 'POST',
      credentials: 'include', // 쿠키 포함
    });
    
    if (response.ok) {
      const data = await response.json();
      if (data.status === 200 && data.response.accessToken) {
        saveToken(data.response.accessToken);
        return data.response.accessToken;
      }
    }
    
    return null;
  } catch (error) {
    console.error('토큰 갱신 실패:', error);
    return null;
  }
};

export const getKakaoLoginUrl = (): string => {
  const KAKAO_REST_API_KEY = '70b5d2ebdeab88e65b4caa45fa39df78';
  
  let REDIRECT_URI= encodeURIComponent(window.location.origin + '/api/auth/kakao/callback');
  
  console.log('카카오 리다이렉트 URI:', decodeURIComponent(REDIRECT_URI));

  return `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
};