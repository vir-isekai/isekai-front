import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home: React.FC = () => {
    // 인기 VTuber 목록 (실제로는 API에서 가져올 수 있음)
    const popularVtubers = [
        { id: 1, name: '키즈나 아이', agency: 'Hololive', avatarUrl: 'https://via.placeholder.com/60' },
        { id: 2, name: '가우르 구라', agency: 'Hololive', avatarUrl: 'https://via.placeholder.com/60' },
        { id: 3, name: '칼리오페 모리', agency: 'Hololive EN', avatarUrl: 'https://via.placeholder.com/60' },
        { id: 4, name: '짱구', agency: 'VSHOJO', avatarUrl: 'https://via.placeholder.com/60' },
    ];

    // 최근 에이전시 활동 (실제로는 API에서 가져올 수 있음)
    const recentAgencyActivities = [
        { id: 101, name: 'Hololive', activity: '신규 멤버 모집 중', logoUrl: 'https://via.placeholder.com/40' },
        { id: 102, name: 'Nijisanji', activity: '첫 월드 투어 발표', logoUrl: 'https://via.placeholder.com/40' },
        { id: 103, name: 'VShojo', activity: '팬 페스티벌 개최', logoUrl: 'https://via.placeholder.com/40' },
    ];

    // 인기 커뮤니티 게시글 (실제로는 API에서 가져올 수 있음)
    const popularPosts = [
        { id: 501, title: 'VTuber 인기 순위 TOP 10', author: '팬덤매니아', likes: 256, comments: 78 },
        { id: 502, title: '이번 주 최고의 밈 모음 (웃음 주의)', author: '밈수집가', likes: 189, comments: 42 },
        { id: 503, title: '초보자를 위한 VTuber 용어 사전', author: 'VT마스터', likes: 320, comments: 95 },
        { id: 504, title: '다가오는 VTuber 콜라보 일정 정리', author: '일정관리자', likes: 145, comments: 38 },
        { id: 505, title: '음악 VTuber 추천 리스트', author: '음악애호가', likes: 210, comments: 62 },
    ];

    return (
        <div className="home-container">
            {/* 히어로 섹션 */}
            <section className="hero-section">
                <div className="hero-content">
                    <h1>VTuber World</h1>
                    <p>버츄얼 크리에이터의 세계를 함께 탐험하세요!</p>
                    <div className="hero-buttons">
                        <Link to="/agencies" className="hero-button primary">에이전시 탐험</Link>
                        <Link to="/vtubers" className="hero-button secondary">인기 VTuber</Link>
                    </div>
                </div>
            </section>

            {/* 커뮤니티 현황 섹션 */}
            <section className="stats-section">
                <div className="stat-card">
                    <div className="stat-number">300+</div>
                    <div className="stat-label">등록된 에이전시</div>
                </div>
                <div className="stat-card">
                    <div className="stat-number">5,000+</div>
                    <div className="stat-label">활동 중인 VTuber</div>
                </div>
                <div className="stat-card">
                    <div className="stat-number">12만+</div>
                    <div className="stat-label">커뮤니티 회원</div>
                </div>
                <div className="stat-card">
                    <div className="stat-number">1.5만+</div>
                    <div className="stat-label">오늘의 방문자</div>
                </div>
            </section>

            {/* 메인 콘텐츠 섹션 */}
            <div className="main-content">
                {/* 왼쪽 사이드바 - 인기 VTuber */}
                <aside className="sidebar">
                    <div className="sidebar-section">
                        <h3>인기 VTuber</h3>
                        <ul className="vtuber-list">
                            {popularVtubers.map(vtuber => (
                                <li key={vtuber.id}>
                                    <div className="vtuber-item">
                                        <img src={vtuber.avatarUrl} alt={vtuber.name} className="avatar" />
                                        <div className="vtuber-info">
                                            <div className="vtuber-name">{vtuber.name}</div>
                                            <div className="vtuber-agency">{vtuber.agency}</div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <Link to="/vtubers" className="view-all">모든 VTuber 보기 &rarr;</Link>
                    </div>

                    <div className="sidebar-section">
                        <h3>에이전시 활동</h3>
                        <ul className="agency-activity-list">
                            {recentAgencyActivities.map(agency => (
                                <li key={agency.id}>
                                    <div className="agency-activity-item">
                                        <img src={agency.logoUrl} alt={agency.name} className="agency-logo" />
                                        <div className="agency-activity-info">
                                            <div className="agency-name">{agency.name}</div>
                                            <div className="agency-activity">{agency.activity}</div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <Link to="/agencies" className="view-all">모든 에이전시 보기 &rarr;</Link>
                    </div>
                </aside>

                {/* 메인 콘텐츠 - 인기 게시글 */}
                <main className="content">
                    <h2>인기 커뮤니티 글</h2>
                    <div className="community-posts">
                        {popularPosts.map(post => (
                            <div key={post.id} className="post-card">
                                <h3 className="post-title">{post.title}</h3>
                                <div className="post-meta">
                                    <span className="post-author">by {post.author}</span>
                                    <div className="post-stats">
                                        <span><i className="icon-heart"></i> {post.likes}</span>
                                        <span><i className="icon-comment"></i> {post.comments}</span>
                                    </div>
                                </div>
                                <Link to={`/community/posts/${post.id}`} className="read-more">
                                    자세히 보기
                                </Link>
                            </div>
                        ))}
                    </div>
                    <div className="content-footer">
                        <Link to="/community" className="community-button">커뮤니티 입장하기</Link>
                    </div>
                </main>
            </div>

            {/* 이벤트 배너 */}
            <section className="event-banner">
                <div className="event-content">
                    <h2>다가오는 글로벌 VTuber 페스티벌</h2>
                    <p>오는 6월, 세계 각국의 인기 VTuber들이 함께하는 온라인 페스티벌이 개최됩니다.</p>
                    <button className="event-button">일정 확인하기</button>
                </div>
            </section>
        </div>
    );
};

export default Home;