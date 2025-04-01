import React from 'react';
import '../../styles/KakaoLoginButton.css';
import { getKakaoLoginUrl } from '../../services/authService';

function KakaoLoginButton() {
  const handleKakaoLogin = () => {
    // 카카오 로그인 URL로 리다이렉트
    window.location.href = getKakaoLoginUrl();
  };

  return (
    <button className="kakao-login-btn" onClick={handleKakaoLogin}>
      <img 
        src="https://developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_medium.png" 
        alt="카카오 로그인" 
        className="kakao-icon" 
      />
      카카오로 시작하기
    </button>
  );
}

export default KakaoLoginButton;
