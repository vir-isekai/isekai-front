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

// 카카오 로그인 URL 생성 함수 (실제 구현에서는 설정에서 가져올 수 있음)
export const getKakaoLoginUrl = (): string => {
  // 이 값들은 실제 카카오 개발자 계정의 앱에서 가져와야 합니다
  const KAKAO_CLIENT_ID = '70b5d2ebdeab88e65b4caa45fa39df78';
  
  // 카카오 개발자 콘솔에 등록된 URI와 일치해야 함
  // 개발 환경에 따라 리다이렉트 URI를 결정
  let REDIRECT_URI;
  
  // 로컬 개발 환경일 경우
  if (window.location.hostname === 'localhost') {
    console.log('로컬 개발 환경에서 카카오 로그인 사용');
    // React 라우트와 일치하는 경로
    REDIRECT_URI = encodeURIComponent(window.location.origin + '/api/auth/kakao/callback');
  } else {
    // 프로덕션 환경
    console.log('프로덕션 환경에서 카카오 로그인 사용');
    REDIRECT_URI = encodeURIComponent(window.location.origin + '/oauth/callback/kakao');
  }
  
  console.log('카카오 리다이렉트 URI:', decodeURIComponent(REDIRECT_URI));
  
  return `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
};
