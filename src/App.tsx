import React, { useState } from 'react';
import './App.css';
import './styles/Agency.css';
import AgencyList from './components/AgencyList';
import AgencyForm from './components/AgencyForm';
import AgencyDetail from './components/AgencyDetail';

type AppTab = 'list' | 'create' | 'detail';

function App() {
    const [activeTab, setActiveTab] = useState<AppTab>('list');
    const [selectedAgencyId, setSelectedAgencyId] = useState<number | null>(null);

    // Agency 선택 핸들러
    const handleAgencySelect = (agencyId: number) => {
        setSelectedAgencyId(agencyId);
        setActiveTab('detail');
    };

    // 목록으로 돌아가기 핸들러
    const handleBackToList = () => {
        setActiveTab('list');
        setSelectedAgencyId(null);
    };

    // 현재 표시할 컴포넌트 결정
    const renderContent = () => {
        switch (activeTab) {
            case 'list':
                return <AgencyList onAgencySelect={handleAgencySelect} />;
            case 'create':
                return <AgencyForm />;
            case 'detail':
                return selectedAgencyId ? (
                    <AgencyDetail agencyId={selectedAgencyId} onBack={handleBackToList} />
                ) : (
                    <div className="error-message">선택된 Agency가 없습니다.</div>
                );
            default:
                return <AgencyList onAgencySelect={handleAgencySelect} />;
        }
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>VTuber 에이전시 관리</h1>
            </header>

            {activeTab !== 'detail' && (
                <nav className="App-nav">
                    <button
                        className={activeTab === 'list' ? 'active' : ''}
                        onClick={() => setActiveTab('list')}
                    >
                        에이전시 목록
                    </button>
                    <button
                        className={activeTab === 'create' ? 'active' : ''}
                        onClick={() => setActiveTab('create')}
                    >
                        에이전시 등록
                    </button>
                </nav>
            )}

            <main className="App-content">
                {renderContent()}
            </main>
        </div>
    );
}

export default App;