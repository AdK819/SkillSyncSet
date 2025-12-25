import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function SyncPage({ type }) {
    const navigate = useNavigate();
    const [userType, setUserType] = useState('');

    useEffect(() => {
        const userData = JSON.parse(sessionStorage.getItem('userData') || '{}');
        setUserType(userData.userType);
    }, []);

    const getTitle = () => {
        switch (type) {
            case 'my-sync': return 'My Sync';
            case 'mentor-sync': return 'Mentor Sync';
            case 'mentee-sync': return 'Mentee Sync';
            case 'organizer-sync': return 'My Sync'; // For organizer
            default: return 'Sync';
        }
    };

    const getMockData = () => {
        // Return mock profiles
        return [
            { id: 1, name: 'Jane Doe', role: 'Student', institute: 'ABC College' },
            { id: 2, name: 'John Smith', role: 'Teacher', institute: 'XYZ University' },
            { id: 3, name: 'Debug Club', role: 'Event Organizer', institute: 'Tech Institute' }
        ];
    };

    const renderContent = () => {
        // If event organizer and viewing "My Sync", show specific layout
        if (userType === 'eventOrganizer' && type === 'my-sync') {
            return (
                <div className="sync-container">
                    <div className="section mb-4">
                        <h3>Teachers Following</h3>
                        <div className="dropdown-mock card p-3" style={{ backgroundColor: 'var(--bg-secondary)', cursor: 'pointer' }}>
                            <p className="mb-0">▼ 5 Teachers</p>
                        </div>
                    </div>
                    <div className="section">
                        <h3>Students Following</h3>
                        <div className="dropdown-mock card p-3" style={{ backgroundColor: 'var(--bg-secondary)', cursor: 'pointer' }}>
                            <p className="mb-0">▼ 120 Students</p>
                        </div>
                    </div>
                </div>
            );
        }

        const data = getMockData();

        return (
            <div className="profiles-grid">
                {data.map(profile => (
                    <div key={profile.id} className="profile-card card mb-3">
                        <h4>{profile.name}</h4>
                        <p className="text-muted">{profile.role} at {profile.institute}</p>
                        <button className="btn btn-primary btn-sm">Follow Back</button>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="page-wrapper">
            <div className="card card-wide">
                <button onClick={() => navigate('/home')} className="back-btn mb-3">← Back to Home</button>
                <h2 className="mb-4">{getTitle()}</h2>
                {renderContent()}
            </div>
        </div>
    );
}

export default SyncPage;
