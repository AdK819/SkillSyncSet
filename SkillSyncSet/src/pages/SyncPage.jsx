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
            case 'organizer-sync': return 'My Sync';
            default: return 'Sync';
        }
    };

    const getMockData = () => {
        return [
            { id: 1, name: 'Alice Johnson', role: 'Student', institute: 'ABC College' },
            { id: 2, name: 'Bob Williams', role: 'Student', institute: 'ABC College' },
            { id: 3, name: 'Dr. Smith', role: 'Teacher', institute: 'XYZ University' },
            { id: 4, name: 'Prof. Davis', role: 'Teacher', institute: 'Tech Institute' },
            { id: 5, name: 'Charlie Brown', role: 'Student', institute: 'Tech Institute' },
            { id: 6, name: 'Ms. Wilson', role: 'Teacher', institute: 'ABC College' }
        ];
    };

    const renderContent = () => {
        // Event Organizer "My Sync"
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

        // Filter Logic
        const allData = getMockData();
        let filteredData = [];

        if (userType === 'student') {
            if (type === 'my-sync') {
                // Student My Sync -> Show STUDENTS
                filteredData = allData.filter(p => p.role === 'Student');
            } else if (type === 'mentor-sync') {
                // Student Mentor Sync -> Show TEACHERS
                filteredData = allData.filter(p => p.role === 'Teacher');
            }
        } else if (userType === 'teacher') {
            if (type === 'my-sync') {
                // Teacher My Sync -> Show TEACHERS
                filteredData = allData.filter(p => p.role === 'Teacher');
            } else if (type === 'mentee-sync') {
                // Teacher Mentee Sync -> Show STUDENTS
                filteredData = allData.filter(p => p.role === 'Student');
            }
        } else {
            // Default fallback
            filteredData = allData;
        }

        return (
            <div className="profiles-grid">
                {filteredData.length === 0 ? (
                    <p>No profiles found.</p>
                ) : (
                    filteredData.map(profile => (
                        <div key={profile.id} className="profile-card card mb-3">
                            <h4>{profile.name}</h4>
                            <p className="text-muted">{profile.role} at {profile.institute}</p>
                            <button className="btn btn-primary btn-sm">Following</button>
                        </div>
                    ))
                )}
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
