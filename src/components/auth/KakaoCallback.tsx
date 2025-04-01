import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { saveToken } from '../../services/authService';
import AdditionalInfoForm from './AdditionalInfoForm';

function KakaoCallback() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isNewUser, setIsNewUser] = useState(false);
  const [tempToken, setTempToken] = useState<string | null>(null);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log('KakaoCallback 컴포넌트가 마운트됨');
    
    const fetchToken = async () => {
      // URL에서 인증 코드 추출
      const searchParams = new URLSearchParams(location.search);
      const code = searchParams.get('code');
      
      console.log('인증 코드 찾음:', code ? '있음' : '없음');
      
      if (!code) {
        setError('인증 코드를 찾을 수 없습니다.');
        setLoading(false);
        return;
      }
      
      try {
        console.log("백엔드 API 호출 시작");

        // 백엔드 API로 인증 코드 GET 방식으로 전송
        const response = await fetch(`/api/auth/login?code=${encodeURIComponent(code)}`, {
          method: 'GET',
          credentials: 'include', // 쿠키 포함
        });
        
        const data = await response.json();
        
        if (!response.ok) {
          setError('서버 응답 오류: ' + (data.message || response.statusText));
          setLoading(false);
          return;
        }
        
        // 서버 응답 구조 검사 및 로깅
        console.log('서버 응답:', data);
        
        // 다양한 응답 구조 처리
        const accessToken = data.response?.accessToken || data.accessToken || data.token || data.access_token;
        const isNewUserFlag = data.response?.isNewUser || data.isNewUser || false;
        
        if (accessToken) {
          if (isNewUserFlag) {
            // 새 사용자인 경우 추가 정보 입력 화면으로
            console.log('새 사용자 확인됨, 추가 정보 입력 화면으로 이동');
            setIsNewUser(true);
            setTempToken(accessToken);
          } else {
            // 기존 사용자인 경우 로그인 처리 후 홈으로
            saveToken(accessToken);
            login(accessToken);
            
            // 홈페이지로 리다이렉트
            navigate('/');
          }
        } else {
          console.error('토큰을 찾을 수 없습니다:', data);
          setError('응답에서 액세스 토큰을 찾을 수 없습니다.');
        }
      } catch (err) {
        console.error('로그인 처리 중 오류:', err);
        setError('로그인 처리 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchToken();
  }, [location, login, navigate]);

  if (loading) {
    return (
      <div className="login-loading">
        <h2>로그인 처리 중...</h2>
        <p>잠시만 기다려주세요.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="login-error">
        <h2>로그인 오류</h2>
        <p>{error}</p>
        <button onClick={() => navigate('/login')}>다시 시도</button>
      </div>
    );
  }

  // 새 사용자면 추가 정보 입력 폼 표시
  if (isNewUser && tempToken) {
    return <AdditionalInfoForm tempToken={tempToken} />;
  }

  // 이 부분은 실행되지 않아야 함 (모든 케이스가 위에서 처리됨)
  return null;
}

export default KakaoCallback;
