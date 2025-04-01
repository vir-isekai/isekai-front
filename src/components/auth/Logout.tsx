import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

function Logout() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/'); // 로그아웃 후 홈페이지로 이동
  };
  
  return (
    <button 
      onClick={handleLogout}
      className="nav-link logout-btn"
      style={{ 
        background: 'none', 
        border: 'none', 
        cursor: 'pointer', 
        padding: '0.5rem 0',
        marginLeft: 'auto' // 로그인 버튼과 같은 위치에 정렬
      }}
    >
      로그아웃
    </button>
  );
}

export default Logout;