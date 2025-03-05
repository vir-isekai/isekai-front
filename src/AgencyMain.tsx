import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import './styles/Agency.css';
import AgencyList from './components/AgencyList';
import AgencyForm from './components/AgencyForm';
import AgencyDetail from './components/AgencyDetail';

function App() {
    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <h1>VTuber 에이전시 관리</h1>
                </header>

                <Routes>
                    <Route
                        path="/"
                        element={
                            <>
                                <nav className="App-nav">
                                    <Link to="/" className="nav-link active">에이전시 목록</Link>
                                    <Link to="/agencies/create" className="nav-link">에이전시 등록</Link>
                                </nav>
                                <main className="App-content">
                                    <AgencyList />
                                </main>
                            </>
                        }
                    />

                    <Route
                        path="/agencies/create"
                        element={
                            <>
                                <nav className="App-nav">
                                    <Link to="/" className="nav-link">에이전시 목록</Link>
                                    <Link to="/agencies/create" className="nav-link active">에이전시 등록</Link>
                                </nav>
                                <main className="App-content">
                                    <AgencyForm />
                                </main>
                            </>
                        }
                    />

                    <Route
                        path="/agencies/:agencyId"
                        element={

                            <main className="App-content">
                                <AgencyDetail />
                            </main>
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;