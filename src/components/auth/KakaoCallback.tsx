import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { saveToken } from '../../services/authService';
import AdditionalInfoForm from './AdditionalInfoForm';

// 컴포넌트 외부에 플래그 선언 (더 강력한 중복 방지)
let globalIsProcessing = false;
let processedCode: string | null = null; // 이미 처리한 코드 저장

function KakaoCallback() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isNewUser, setIsNewUser] = useState(false);
  const [tempToken, setTempToken] = useState<string | null>(null);
  const isProcessing = useRef(false); // useRef로 변경하여 렌더링 간 값 유지
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
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

      // 이미 처리한 코드인지 확인
      if (processedCode === code) {
        console.log('이미 처리한 코드입니다. 중복 처리를 방지합니다.');
        return;
      }

      // 이미 처리 중이면 종료 (중복 호출 방지 - 전역 플래그와 ref 둘 다 체크)
      if (globalIsProcessing || isProcessing.current) {
        console.log('이미 처리 중입니다. 중복 호출을 방지합니다.');
        return;
      }
      
      console.log('KakaoCallback 컴포넌트가 마운트됨');
      
      // 처리 시작 플래그 설정 (전역 변수와 useRef 둘 다 설정)
      globalIsProcessing = true;
      isProcessing.current = true;
      processedCode = code; // 처리 중인 코드 저장
      
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
        // isProcessing.current = false를 의도적으로 하지 않음
        // 한 번 처리가 시작되면 컴포넌트가 언마운트될 때까지 재처리를 방지
      }
    };
    
    fetchToken();

    // Cleanup: 컴포넌트 언마운트 시 전역 플래그 리셋
    return () => {
      globalIsProcessing = false;
    };
  }, []); // 빈 배열로 변경 - 컴포넌트 마운트 시 단 한 번만 실행

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
