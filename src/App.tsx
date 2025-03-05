import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import './styles/Agency.css';
import './styles/Home.css';
import Home from './pages/Home';
import AgencyList from './components/AgencyList';
import AgencyForm from './components/AgencyForm';
import AgencyDetail from './components/AgencyDetail';

function App() {
    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <div className="header-content">
                        <Link to="/" className="logo">VTuber World</Link>
                        <nav className="main-nav">
                            <Link to="/" className="nav-link">홈</Link>
                            <Link to="/agencies" className="nav-link">에이전시</Link>
                            <Link to="/vtubers" className="nav-link">VTuber</Link>
                            <Link to="/community" className="nav-link">커뮤니티</Link>
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
                                <Link to="/" className="footer-link">홈</Link>
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
        </Router>
    );
}

export default App;