import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import agencyService from '../services/agencyService';
import { CreateAgencyDto, Nation, ChannelType } from '../types/agency';

const AgencyForm: React.FC = () => {
    const navigate = useNavigate();

    const initialState: CreateAgencyDto = {
        name: '',
        logoImageUrl: '',
        nation: Nation.KOREA,
        establishedDate: new Date().toISOString().split('T')[0],
        channels: []
    };

    const [formData, setFormData] = useState<CreateAgencyDto>(initialState);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // 채널 입력 관리
    const [channelType, setChannelType] = useState<ChannelType>(ChannelType.YOUTUBE);
    const [channelUrl, setChannelUrl] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleAddChannel = () => {
        if (channelUrl.trim()) {
            setFormData((prev) => ({
                ...prev,
                channels: [...(prev.channels || []), { type: channelType, url: channelUrl }]
            }));
            setChannelUrl('');
        }
    };

    const handleRemoveChannel = (index: number) => {
        setFormData((prev) => ({
            ...prev,
            channels: prev.channels.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setLoading(true);
            setError(null);
            const newAgency = await agencyService.createAgency(formData);

            // 성공 시 새로 생성된 에이전시 상세 페이지로 이동
            navigate(`/agencies/${newAgency.agencyId}`);
        } catch (err: any) {
            setError(err.response?.data?.message || '에이전시 생성에 실패했습니다.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="agency-form">
            <h2>에이전시 등록</h2>
            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">에이전시 이름</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="logoImageUrl">로고 이미지 URL</label>
                    <input
                        type="text"
                        id="logoImageUrl"
                        name="logoImageUrl"
                        value={formData.logoImageUrl}
                        onChange={handleChange}
                        required
                    />
                    {formData.logoImageUrl && (
                        <div className="logo-preview">
                            <img
                                src={formData.logoImageUrl}
                                alt="로고 미리보기"
                                style={{ width: '100px', height: '100px', objectFit: 'contain' }}
                            />
                        </div>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="nation">국가</label>
                    <select
                        id="nation"
                        name="nation"
                        value={formData.nation}
                        onChange={handleChange}
                        required
                    >
                        {Object.values(Nation).map(nation => (
                            <option key={nation} value={nation}>{nation}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="establishedDate">설립일</label>
                    <input
                        type="date"
                        id="establishedDate"
                        name="establishedDate"
                        value={formData.establishedDate}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="closedDate">폐업일 (선택사항)</label>
                    <input
                        type="date"
                        id="closedDate"
                        name="closedDate"
                        value={formData.closedDate || ''}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label>채널 정보</label>

                    <div className="channel-inputs">
                        <select
                            value={channelType}
                            onChange={(e) => setChannelType(e.target.value as ChannelType)}
                        >
                            {Object.values(ChannelType).map(type => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>

                        <input
                            type="text"
                            value={channelUrl}
                            onChange={(e) => setChannelUrl(e.target.value)}
                            placeholder="채널 URL"
                        />

                        <button type="button" onClick={handleAddChannel}>채널 추가</button>
                    </div>

                    {formData.channels && formData.channels.length > 0 && (
                        <ul className="channel-list">
                            {formData.channels.map((channel, index) => (
                                <li key={index}>
                                    <strong>{channel.type}:</strong> {channel.url}
                                    <button type="button" onClick={() => handleRemoveChannel(index)}>삭제</button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <button type="submit" disabled={loading} className="submit-button">
                    {loading ? '처리 중...' : '에이전시 등록'}
                </button>
            </form>
        </div>
    );
};

export default AgencyForm;