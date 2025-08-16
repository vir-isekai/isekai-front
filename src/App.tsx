import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import './styles/Agency.css';
import './styles/Home.css';
import './styles/LoginPage.css';
import './styles/KakaoLoginButton.css';
import Home from './components/Home';
import AgencyList from './components/agency/AgencyList';
import AgencyForm from './components/agency/AgencyForm';
import AgencyDetail from './components/agency/AgencyDetail';
import LoginPage from './components/auth/LoginPage';
import KakaoCallback from './components/auth/KakaoCallback';
import Logout from './components/auth/Logout';
import { AuthProvider, useAuth } from './contexts/AuthContext';

function AppContent() {
    const { isAuthenticated } = useAuth();

    return (
        <div className="App">
                <header className="App-header">
                    <div className="header-content">
                        <nav className="main-nav">
                            <Link to="/" className="nav-link">홈</Link>
                            <Link to="/agencies" className="nav-link">에이전시</Link>
                            <Link to="/vtubers" className="nav-link">버튜버</Link>
                            <Link to="/community" className="nav-link">커뮤니티</Link>
                            <Link to="/stores" className="nav-link">스토어</Link>
                            {isAuthenticated ? (
                                <Logout />
                            ) : (
                                <Link to="/login" className="nav-link login-link">로그인</Link>
                            )}
                        </nav>
                    </div>
                </header>

                <Routes>
                    {/* 홈 화면 */}
                    <Route path="/" element={<Home />} />

                    {/* 에이전시 관련 라우트 */}
                    <Route path="/agencies" element={<AgencyList />} />
                    <Route path="/agencies/create" element={<AgencyForm />} />
                    <Route path="/agencies/:agencyId" element={<AgencyDetail />} />

                    {/* 로그인 관련 라우트 */}
                    <Route path="/login" element={<LoginPage />} />
                    {/* 카카오 로그인 콜백 처리 */}
                    <Route path="/api/auth/kakao/callback" element={<KakaoCallback />} />

                    {/* 향후 추가될 VTuber, 커뮤니티 라우트를 위한 자리 */}
                </Routes>

                <footer className="App-footer">
                    <div className="footer-content">
                        <div className="footer-left">
                            <h3>VTuber World</h3>
                            <p>버츄얼 크리에이터 커뮤니티</p>
                        </div>
                        <div className="footer-center">
                            <nav className="footer-nav">
                                <Link to="/agencies" className="footer-link">에이전시</Link>
                                <Link to="/vtubers" className="footer-link">VTuber</Link>
                                <Link to="/community" className="footer-link">커뮤니티</Link>
                            </nav>
                        </div>
                        <div className="footer-right">
                            <p>&copy; 2025 VTuber World. All rights reserved.</p>
                        </div>
                    </div>
                </footer>
            </div>
    );
}

function App() {
    return (
        <AuthProvider>
            <Router>
                <AppContent />
            </Router>
        </AuthProvider>
    );
}

export default App;