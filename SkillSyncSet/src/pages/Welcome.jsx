import { useNavigate } from 'react-router-dom';

function Welcome() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/profile-setup');
  };

  return (
    <div className="page-wrapper">
      <div className="card text-center">
        <h1 className="mb-3">Welcome!</h1>
        <p className="text-muted mb-4" style={{ fontSize: '1.125rem' }}>
          Let's get started with your profile
        </p>

        <button
          className="arrow-btn"
          onClick={handleGetStarted}
          aria-label="Get started"
        >
          →
        </button>
      </div>
    </div>
  );
}

export default Welcome;
