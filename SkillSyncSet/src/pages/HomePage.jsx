import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showSettingsOptions, setShowSettingsOptions] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userType, setUserType] = useState('');

    useEffect(() => {
        // Check if user is authenticated by checking sessionStorage
        const userDataStr = sessionStorage.getItem('userData');
        const profileDataStr = sessionStorage.getItem('profileData');
        const editableDataStr = sessionStorage.getItem('editableData');

        // User is authenticated if they have completed their profile
        const isAuth = !!(userDataStr && profileDataStr && editableDataStr);
        setIsAuthenticated(isAuth);

        if (isAuth && userDataStr) {
            const userData = JSON.parse(userDataStr);
            setUserType(userData.userType);
        }
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        setShowSettingsOptions(false); // Reset settings submenu on close
    };

    const handleMenuClick = (path) => {
        // If clicking "My Profile" and not authenticated, go to user type selection
        if (path === '/profile' && !isAuthenticated) {
            setIsMenuOpen(false);
            navigate('/select-type');
            return;
        }

        if (path === 'settings-toggle') {
            setShowSettingsOptions(!showSettingsOptions);
            return;
        }

        if (path === 'logout') {
            // Clear session and go to landing page
            sessionStorage.clear();
            setIsAuthenticated(false);
            setUserType('');
            setIsMenuOpen(false);
            navigate('/');
            return;
        }

        if (path === 'delete-account') {
            if (window.confirm("Are you sure you want to delete your account? This cannot be undone.")) {
                sessionStorage.clear();
                setIsAuthenticated(false);
                setUserType('');
                setIsMenuOpen(false);
                navigate('/');
            }
            return;
        }

        setIsMenuOpen(false);
        navigate(path);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        console.log('Searching for:', searchQuery);
    };

    // Icons
    const LogoutIcon = () => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
        </svg>
    );

    const TrashIcon = () => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            <line x1="10" y1="11" x2="10" y2="17"></line>
            <line x1="14" y1="11" x2="14" y2="17"></line>
        </svg>
    );

    return (
        <div className="home-page">
            {/* Navigation Bar */}
            <nav className="navbar">
                {/* Hamburger Menu */}
                <div className="menu-container">
                    <button
                        className="hamburger-btn"
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="3" y1="12" x2="21" y2="12"></line>
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <line x1="3" y1="18" x2="21" y2="18"></line>
                        </svg>
                    </button>

                    {/* Dropdown Menu */}
                    {isMenuOpen && (
                        <div className="dropdown-menu">
                            <button onClick={() => handleMenuClick('/profile')} className="menu-item">
                                My Profile
                            </button>

                            {/* Authenticated Menu Items */}
                            {isAuthenticated && (
                                <>
                                    {userType === 'student' && (
                                        <>
                                            <button onClick={() => handleMenuClick('/my-sync')} className="menu-item">My Sync</button>
                                            <button onClick={() => handleMenuClick('/mentor-sync')} className="menu-item">Mentor Sync</button>
                                        </>
                                    )}
                                    {userType === 'teacher' && (
                                        <>
                                            <button onClick={() => handleMenuClick('/my-sync')} className="menu-item">My Sync</button>
                                            <button onClick={() => handleMenuClick('/mentee-sync')} className="menu-item">Mentee Sync</button>
                                        </>
                                    )}
                                    {userType === 'eventOrganizer' && (
                                        <>
                                            <button onClick={() => handleMenuClick('/my-sync')} className="menu-item">My Sync</button>
                                            <button onClick={() => handleMenuClick('/create')} className="menu-item">Create</button>
                                        </>
                                    )}
                                </>
                            )}

                            {/* Settings Toggle */}
                            <button onClick={() => handleMenuClick('settings-toggle')} className="menu-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                Settings
                                <span style={{ fontSize: '0.8em', transform: showSettingsOptions ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>▼</span>
                            </button>

                            {/* Settings Submenu */}
                            {showSettingsOptions && (
                                <div style={{ backgroundColor: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)' }}>
                                    <button onClick={() => handleMenuClick('logout')} className="menu-item" style={{ display: 'flex', alignItems: 'center', paddingLeft: '2rem' }}>
                                        <LogoutIcon /> Logout
                                    </button>
                                    <button onClick={() => handleMenuClick('delete-account')} className="menu-item" style={{ display: 'flex', alignItems: 'center', paddingLeft: '2rem', color: 'var(--error-color)' }}>
                                        <TrashIcon /> Delete Account
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Search Bar */}
                <form className="search-container" onSubmit={handleSearch}>
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button type="submit" className="search-btn" aria-label="Search">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="m21 21-4.35-4.35"></path>
                        </svg>
                    </button>
                </form>

                {/* Logo on the right - Only show for authenticated users */}
                {isAuthenticated && (
                    <div className="navbar-logo">
                        <img src="/logo.png" alt="SkillSyncSet Logo" className="logo-image" />
                    </div>
                )}

                {/* Spacer for unauthenticated users to balance navbar */}
                {!isAuthenticated && <div className="navbar-spacer"></div>}
            </nav>

            {/* Main Content */}
            <div className="home-content">
                {/* Show logo and welcome only for unauthenticated users */}
                {!isAuthenticated && (
                    <>
                        <img src="/logo.png" alt="SkillSyncSet Logo" className="welcome-logo" />
                        <h1 className="welcome-title">Welcome to SkillSyncSet!!</h1>
                    </>
                )}

                {/* Authenticated users see empty/plain content */}
            </div>
        </div>
    );
}

export default HomePage;
