import { useNavigate } from 'react-router-dom';

function CreatePage() {
    const navigate = useNavigate();

    return (
        <div className="page-wrapper">
            <div className="card card-wide">
                <button onClick={() => navigate('/home')} className="back-btn mb-3">← Back to Home</button>
                <h2 className="mb-4">Create</h2>

                <div className="create-actions d-flex justify-content-around mb-5">
                    <button className="btn btn-primary create-btn">
                        <span style={{ fontSize: '1.5rem', display: 'block' }}>+</span>
                        Make a Post
                    </button>
                    <button className="btn btn-secondary create-btn">
                        <span style={{ fontSize: '1.5rem', display: 'block' }}>+</span>
                        Make a Poll
                    </button>
                </div>

                <div className="history-section">
                    <h3 className="mb-3">History</h3>
                    <div className="history-item card mb-2 p-3" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                        <p className="mb-1"><strong>Workshop on React</strong> - Post</p>
                        <small className="text-muted">Posted on Oct 20, 2025</small>
                    </div>
                    <div className="history-item card mb-2 p-3" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                        <p className="mb-1"><strong>Best tooling for 2025?</strong> - Poll</p>
                        <small className="text-muted">Posted on Oct 15, 2025</small>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreatePage;
