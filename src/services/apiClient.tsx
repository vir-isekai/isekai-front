import { getToken, isTokenExpired, refreshToken } from './authService';

/**
 * 인증이 필요한 API 요청을 위한 fetch 래퍼 함수
 */
export const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  // 토큰 가져오기
  let token = getToken();
  
  // 토큰이 만료되었으면 갱신 시도
  if (token && isTokenExpired(token)) {
    const newToken = await refreshToken();
    if (newToken) {
      token = newToken;
    } else {
      // 갱신 실패 시 로그인 페이지로 리다이렉트 등의 처리 가능
      console.error('토큰 갱신 실패');
      window.location.href = '/login';
      return null;
    }
  }
  
  // 헤더에 Authorization 추가
  const headers = new Headers(options.headers || {});
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  
  // 요청 전송
  const response = await fetch(url, {
    ...options,
    headers,
  });
  
  // 응답 처리
  if (response.status === 401) {
    // 401 Unauthorized, 토큰 갱신 시도
    const newToken = await refreshToken();
    if (newToken) {
      // 갱신 성공 시 요청 재시도
      headers.set('Authorization', `Bearer ${newToken}`);
      return fetch(url, {
        ...options,
        headers,
      });
    } else {
      // 갱신 실패 시 로그인 페이지로 리다이렉트
      console.error('토큰 갱신 실패');
      window.location.href = '/login';
      return null;
    }
  }
  
  return response;
};

/**
 * 인증이 필요한 API 요청을 JSON으로 처리하는 래퍼 함수
 */
export const fetchWithAuthJson = async <T,>(url: string, options: RequestInit = {}): Promise<T | null> => {
  const response = await fetchWithAuth(url, options);
  if (!response) return null;
  
  try {
    return await response.json() as T;
  } catch (error) {
    console.error('JSON 파싱 오류:', error);
    return null;
  }
};
