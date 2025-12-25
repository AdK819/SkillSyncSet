import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Check if user is authenticated by checking sessionStorage
        const userData = sessionStorage.getItem('userData');
        const profileData = sessionStorage.getItem('profileData');
        const editableData = sessionStorage.getItem('editableData');

        // User is authenticated if they have completed their profile
        setIsAuthenticated(!!(userData && profileData && editableData));
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleMenuClick = (path) => {
        setIsMenuOpen(false);

        // If clicking "My Profile" and not authenticated, go to user type selection
        if (path === '/profile' && !isAuthenticated) {
            navigate('/select-type');
        } else {
            navigate(path);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        // Search functionality will be implemented later
        console.log('Searching for:', searchQuery);
    };

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

                            {/* Show additional menu items only for authenticated users */}
                            {isAuthenticated && (
                                <>
                                    <button onClick={() => handleMenuClick('/mentor-alert')} className="menu-item">
                                        Mentor Alert
                                    </button>
                                    <button onClick={() => handleMenuClick('/my-sync')} className="menu-item">
                                        My Sync
                                    </button>
                                </>
                            )}

                            <button onClick={() => handleMenuClick('/settings')} className="menu-item">
                                Settings
                            </button>
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

                {/* Logo on the right */}
                <div className="navbar-logo">
                    <img src="/logo.png" alt="SkillSyncSet Logo" className="logo-image" />
                </div>
            </nav>

            {/* Main Content */}
            <div className="home-content">
                <h1 className="welcome-title">Welcome to SkillSyncSet!!</h1>
            </div>
        </div>
    );
}

export default HomePage;
