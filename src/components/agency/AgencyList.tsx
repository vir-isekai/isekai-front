import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import agencyService from '../../services/agencyService';
import {AgencyInfo} from '../../types/agency';

const AgencyList: React.FC = () => {
    const [agencies, setAgencies] = useState<AgencyInfo[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAgencies = async () => {
            try {
                setLoading(true);
                const data = await agencyService.getAgencies();
                setAgencies(data || []);
                setError(null);
            } catch (err) {
                setError('에이전시 목록을 불러오는데 실패했습니다.');
            } finally {
                setLoading(false);
            }
        };

        void fetchAgencies();
    }, []);

    if (loading) {
        return <div className="loading">로딩 중...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="agency-list">
            <h2>에이전시 목록</h2>
            {!agencies || agencies.length === 0 ?
                (
                    <p>등록된 에이전시가 없습니다.</p>
                ) :
                (
                    <div className="agency-grid">
                        {agencies.map((agency) => (
                            <div key={agency.agencyId} className="agency-card">
                                <div className="agency-logo">
                                    <img src={agency.logoImageUrl} alt={`${agency.name} 로고`}/>
                                </div>
                                <div className="agency-info">
                                    <Link to={`/agencies/${agency.agencyId}`}>
                                        <h3 className="agency-name clickable">
                                            {agency.name}
                                        </h3>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
        </div>
    );
};

export default AgencyList;