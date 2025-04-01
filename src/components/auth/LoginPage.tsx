import React from 'react';
import KakaoLoginButton from './KakaoLoginButton';
import '../../styles/LoginPage.css';

function LoginPage() {
  return (
    <div className="login-container">
      <div className="login-wrapper">
        <h1>로그인</h1>
        <p>서비스를 이용하려면 로그인해주세요.</p>
        <div className="login-buttons">
          <KakaoLoginButton />
          {/* 필요에 따라 다른 로그인 버튼을 추가할 수 있습니다 */}
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
