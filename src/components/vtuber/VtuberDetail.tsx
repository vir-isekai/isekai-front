import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import vtuberService from '../../services/vtuberService';
import { VtuberDetail as VtuberDetailType } from '../../types/vtuber';
import '../styles/VtuberDetail.css';

const VtuberDetail: React.FC = () => {
    const { vtuberId } = useParams<{ vtuberId: string }>();
    const navigate = useNavigate();

    const [vtuber, setVtuber] = useState<VtuberDetailType | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchVtuberDetail = async () => {
            if (!vtuberId) {
                setError('유효하지 않은 VTuber ID입니다.');
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const id = parseInt(vtuberId, 10);
                const data = await vtuberService.getVtuber(id);
                console.log("VTuber 상세 정보:", data);
                setVtuber(data);
                setError(null);
            } catch (err) {
                console.error('VTuber 상세 조회 오류:', err);
                setError('VTuber 상세 정보를 불러오는데 실패했습니다.');
            } finally {
                setLoading(false);
            }
        };

        void fetchVtuberDetail();
    }, [vtuberId]);

    // 목록으로 돌아가기
    const handleBackToList = () => {
        navigate('/vtubers');
    };

    // 채널 아이콘 매핑
    const getChannelIcon = (type: string) => {
        switch (type) {
            case 'YOUTUBE':
                return '📺';
            case 'TWITCH':
                return '🎮';
            case 'TWITTER':
                return '🐦';
            case 'INSTAGRAM':
                return '📸';
            case 'DISCORD':
                return '💬';
            default:
                return '🔗';
        }
    };

    if (loading) {
        return <div className="loading">상세 정보 로딩 중...</div>;
    }

    if (error) {
        return (
            <div className="error-container">
                <div className="error-message">{error}</div>
                <button className="back-button" onClick={handleBackToList}>
                    목록으로 돌아가기
                </button>
            </div>
        );
    }

    if (!vtuber) {
        return (
            <div className="error-container">
                <div className="error-message">VTuber 정보를 찾을 수 없습니다.</div>
                <button className="back-button" onClick={handleBackToList}>
                    목록으로 돌아가기
                </button>
            </div>
        );
    }

    return (
        <div className="vtuber-detail-container">
            <button className="back-button" onClick={handleBackToList}>
                &larr; 목록으로 돌아가기
            </button>

            <div className="vtuber-profile-header">
                <div className="vtuber-avatar-large">
                    <img src={vtuber.profileImageUrl} alt={vtuber.name} />
                </div>
                <div className="vtuber-header-info">
                    <h1>{vtuber.name}</h1>

                    {vtuber.agencyInfo && (
                        <div className="vtuber-agency-badge">
                            <img
                                src={vtuber.agencyInfo.logoImageUrl}
                                alt={vtuber.agencyInfo.name}
                                className="agency-logo-small"
                            />
                            <Link to={`/agencies/${vtuber.agencyInfo.agencyId}`}>
                                {vtuber.agencyInfo.name}
                            </Link>
                        </div>
                    )}

                    <div className="vtuber-stats">
                        <div className="stat-item">
                            <span className="stat-label">데뷔일</span>
                            <span className="stat-value">{new Date(vtuber.debutDate).toLocaleDateString()}</span>
                        </div>

                        {vtuber.graduateDate && (
                            <div className="stat-item">
                                <span className="stat-label">졸업일</span>
                                <span className="stat-value">{new Date(vtuber.graduateDate).toLocaleDateString()}</span>
                            </div>
                        )}

                        {vtuber.height && (
                            <div className="stat-item">
                                <span className="stat-label">키</span>
                                <span className="stat-value">{vtuber.height}cm</span>
                            </div>
                        )}

                        {vtuber.fandomInfo && (
                            <div className="stat-item">
                                <span className="stat-label">팬 이름</span>
                                <span className="stat-value">{vtuber.fandomInfo.name}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="vtuber-content-grid">

                <div className="vtuber-channels-card">
                    <h2>채널 목록</h2>
                    <ul className="channels-list">
                        {vtuber.channelInfos.map((channel, idx) => (
                            <li key={idx} className="channel-item">
                                <span className="channel-icon">{getChannelIcon(channel.type)}</span>
                                <span className="channel-type">{channel.type}</span>
                                <a href={channel.url} target="_blank" rel="noopener noreferrer" className="channel-link">
                                    {channel.url.replace(/^https?:\/\/(www\.)?/, '').split('/')[0]}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {vtuber.agencyInfo && (
                    <div className="vtuber-agency-card">
                        <h2>소속 에이전시</h2>
                        <div className="agency-card-content">
                            <img src={vtuber.agencyInfo.logoImageUrl} alt={vtuber.agencyInfo.name} className="agency-logo" />
                            <div className="agency-info">
                                <h3>{vtuber.agencyInfo.name}</h3>
                                <Link to={`/agencies/${vtuber.agencyInfo.agencyId}`} className="view-agency-link">
                                    에이전시 상세 정보
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VtuberDetail;