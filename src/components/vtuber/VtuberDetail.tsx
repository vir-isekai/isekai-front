import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import agencyService from '../../services/agencyService';
import { AgencyDetail as AgencyDetailType } from '../../types/agency';

const VtuberDetail: React.FC = () => {
    // URL 파라미터에서 agencyId 추출
    const { vtuberId } = useParams<{ vtuberId: string }>();
    const navigate = useNavigate();

    const [agency, setAgency] = useState<AgencyDetailType | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAgencyDetail = async () => {
            if (!vtuberId) {
                setError('유효하지 않은 에이전시 ID입니다.');
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const id = parseInt(vtuberId, 10);
                const data = await agencyService.getAgency(id);
                console.log("Agency 상세 정보:", data);
                setAgency(data);
                setError(null);
            } catch (err) {
                console.error('Agency 상세 조회 오류:', err);
                setError('Agency 상세 정보를 불러오는데 실패했습니다.');
            } finally {
                setLoading(false);
            }
        };

        fetchAgencyDetail();
    }, [vtuberId]);

    // 목록으로 돌아가기
    const handleBackToList = () => {
        navigate('/');
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

    if (!agency) {
        return (
            <div className="error-container">
                <div className="error-message">Agency 정보를 찾을 수 없습니다.</div>
                <button className="back-button" onClick={handleBackToList}>
                    목록으로 돌아가기
                </button>
            </div>
        );
    }

    return (
        <div className="agency-detail">
            <button className="back-button" onClick={handleBackToList}>
                &larr; 목록으로 돌아가기
            </button>

            <div className="agency-detail-header">
                <div className="agency-detail-logo">
                    <img src={agency.logoImageUrl} alt={`${agency.name} 로고`} />
                </div>
                <div className="agency-detail-title">
                    <h2>{agency.name}</h2>
                    <p className="agency-nation">{agency.nation}</p>
                </div>
            </div>

            <div className="agency-detail-info">
                <div className="info-section">
                    <h3>일반 정보</h3>
                    <p><strong>설립일:</strong> {new Date(agency.establishedDate).toLocaleDateString()}</p>
                    {agency.closedDate && (
                        <p><strong>폐업일:</strong> {new Date(agency.closedDate).toLocaleDateString()}</p>
                    )}
                </div>

                {agency.vtuberInfos && agency.vtuberInfos.length > 0 && (
                    <div className="info-section">
                        <h3>소속 VTuber</h3>
                        <ul className="vtuber-detail-list">
                            {agency.vtuberInfos.map((vtuber) => (
                                <li key={vtuber.vtuberId}>
                                    <span className="vtuber-name">{vtuber.name}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {agency.fandomInfo && (
                    <div className="info-section">
                        <h3>팬덤 정보</h3>
                        <p><strong>팬덤명:</strong> {agency.fandomInfo.name}</p>
                    </div>
                )}

                {agency.channelInfos && agency.channelInfos.length > 0 && (
                    <div className="info-section">
                        <h3>공식 채널</h3>
                        <ul className="channel-detail-list">
                            {agency.channelInfos.map((channel, index) => (
                                <li key={index}>
                                    <strong>{channel.type}:</strong>{' '}
                                    <a href={channel.url} target="_blank" rel="noopener noreferrer">
                                        {channel.url}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VtuberDetail;