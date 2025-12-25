import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Home() {
  const navigate = useNavigate();
  const [selectedUserType, setSelectedUserType] = useState(null);

  const handleUserTypeSelection = (userType) => {
    setSelectedUserType(userType);
    // Store user type in sessionStorage for use in signup
    sessionStorage.setItem('userType', userType);
    navigate('/signup');
  };

  return (
    <div className="page-wrapper">
      <div className="card">
        <h2 className="text-center mb-4">Select User Type</h2>
        
        <button 
          className="user-type-btn"
          onClick={() => handleUserTypeSelection('student')}
        >
          Student
        </button>
        
        <button 
          className="user-type-btn"
          onClick={() => handleUserTypeSelection('teacher')}
        >
          Teacher
        </button>
        
        <button 
          className="user-type-btn"
          onClick={() => handleUserTypeSelection('eventOrganizer')}
        >
          Event Organizer
        </button>
      </div>
    </div>
  );
}

export default Home;
