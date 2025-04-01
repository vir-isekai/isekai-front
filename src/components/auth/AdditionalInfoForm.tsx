import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { saveToken } from '../../services/authService';
import '../../styles/AdditionalInfoForm.css';

interface AdditionalInfoFormProps {
  tempToken: string;
}

function AdditionalInfoForm({ tempToken }: AdditionalInfoFormProps) {
  const [nickname, setNickname] = useState('');
  const [bio, setBio] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const navigate = useNavigate();
  const { login } = useAuth();

  const availableInterests = [
    '음악', '영화', '게임', '독서', '여행', '요리', '스포츠', '패션', '테크', '언어'
  ];

  const handleInterestToggle = (interest: string) => {
    if (interests.includes(interest)) {
      setInterests(interests.filter(item => item !== interest));
    } else {
      setInterests([...interests, interest]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (nickname.trim() === '') {
      setError('닉네임을 입력해주세요.');
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      // 추가 정보를 서버에 전송
      const response = await fetch('/api/auth/complete-signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tempToken}` // 임시 토큰으로 인증
        },
        body: JSON.stringify({
          nickname,
          bio,
          interests
        })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        // 회원가입 완료 후 받은 새 토큰으로 로그인
        const accessToken = data.response?.accessToken || data.accessToken || data.token;
        
        if (accessToken) {
          saveToken(accessToken);
          login(accessToken);
          navigate('/');
        } else {
          setError('토큰 정보를 찾을 수 없습니다.');
        }
      } else {
        setError(data.message || '회원가입을 완료할 수 없습니다.');
      }
    } catch (err) {
      console.error('회원가입 완료 중 오류:', err);
      setError('서버 연결 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="additional-info-container">
      <h2>회원가입 완료</h2>
      <p>추가 정보를 입력하여 회원가입을 완료해주세요.</p>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nickname">닉네임 *</label>
          <input
            type="text"
            id="nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="닉네임을 입력하세요"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="bio">자기소개</label>
          <textarea
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="간단한 자기소개를 입력하세요"
            rows={3}
          />
        </div>
        
        <div className="form-group">
          <label>관심사</label>
          <div className="interests-container">
            {availableInterests.map(interest => (
              <button
                type="button"
                key={interest}
                className={`interest-tag ${interests.includes(interest) ? 'selected' : ''}`}
                onClick={() => handleInterestToggle(interest)}
              >
                {interest}
              </button>
            ))}
          </div>
        </div>
        
        <button
          type="submit"
          className="submit-button"
          disabled={isSubmitting}
        >
          {isSubmitting ? '처리 중...' : '가입 완료'}
        </button>
      </form>
    </div>
  );
}

export default AdditionalInfoForm;
