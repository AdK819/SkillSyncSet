import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ProfileSetup() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [userType, setUserType] = useState('student');
  const [errors, setErrors] = useState({});

  const [profileData, setProfileData] = useState({
    instituteName: '',
    github: '',
    linkedin: '',
    discord: '',
    qualities: '',
    mentoring: '',
    instagram: ''
  });

  useEffect(() => {
    const savedUserData = sessionStorage.getItem('userData');
    if (savedUserData) {
      const userData = JSON.parse(savedUserData);
      setUserType(userData.userType);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));

    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep = () => {
    const newErrors = {};

    if (currentStep === 1) {
      if (!profileData.instituteName.trim()) {
        newErrors.instituteName = 'Institute name is required';
      }
    } else if (currentStep === 2 && userType === 'teacher') {
      // Validate mentoring fields for teachers
      if (!profileData.mentoring.trim()) {
        newErrors.mentoring = 'Please enter 3 mentoring fields';
      } else {
        const mentoringArray = profileData.mentoring.split(',').map(m => m.trim()).filter(m => m);
        if (mentoringArray.length !== 3) {
          newErrors.mentoring = 'Please enter exactly 3 fields separated by commas';
        }
      }
    } else if (currentStep === 3) {
      if (!profileData.qualities.trim()) {
        newErrors.qualities = 'Please enter 3 qualities';
      } else {
        const qualitiesArray = profileData.qualities.split(',').map(q => q.trim()).filter(q => q);
        if (qualitiesArray.length !== 3) {
          newErrors.qualities = 'Please enter exactly 3 qualities separated by commas';
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      if (userType === 'teacher') {
        // Teachers: Institute Name (step 1) -> Mentoring (step 2) -> Profile
        if (currentStep === 1) {
          setCurrentStep(2);
        } else if (currentStep === 2) {
          sessionStorage.setItem('profileData', JSON.stringify(profileData));
          navigate('/profile');
        }
      } else if (userType === 'eventOrganizer') {
        // Event Organizers: Institute Name (step 1) -> Social Media (step 2) -> Profile
        if (currentStep === 1) {
          setCurrentStep(2);
        } else if (currentStep === 2) {
          sessionStorage.setItem('profileData', JSON.stringify(profileData));
          navigate('/profile');
        }
      } else {
        // Students: show all 3 steps
        if (currentStep < 3) {
          setCurrentStep(currentStep + 1);
        } else {
          sessionStorage.setItem('profileData', JSON.stringify(profileData));
          navigate('/profile');
        }
      }
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="text-center">
            <h2 className="mb-4">Name of Your Institute</h2>
            <div className="form-group">
              <input
                type="text"
                name="instituteName"
                className="form-input"
                value={profileData.instituteName}
                onChange={handleInputChange}
                placeholder="COLLEGE NAME"
                style={{ textAlign: 'center' }}
              />
              {errors.instituteName && <p className="error-message">{errors.instituteName}</p>}
            </div>
            <button
              className="arrow-btn"
              onClick={handleNext}
              aria-label="Next"
            >
              →
            </button>
          </div>
        );

      case 2:
        // For teachers: show mentoring step
        if (userType === 'teacher') {
          return (
            <div className="text-center">
              <h2 className="mb-4">Specialized in Mentoring:</h2>
              <div className="form-group">
                <input
                  type="text"
                  name="mentoring"
                  className="form-input"
                  value={profileData.mentoring}
                  onChange={handleInputChange}
                  placeholder="e.g., Web Development, Data Science, AI"
                  style={{ textAlign: 'center' }}
                />
                <p className="text-muted mt-2" style={{ fontSize: '0.875rem' }}>
                  Enter 3 fields separated by commas
                </p>
                {errors.mentoring && <p className="error-message">{errors.mentoring}</p>}
              </div>
              <button
                className="arrow-btn"
                onClick={handleNext}
                aria-label="Next"
              >
                →
              </button>
            </div>
          );
        }

        // For Event Organizers: show social media step
        if (userType === 'eventOrganizer') {
          return (
            <div className="text-center">
              <h2 className="mb-4">Committee Social Media</h2>
              <div className="form-group">
                <input
                  type="text"
                  name="linkedin"
                  className="form-input"
                  value={profileData.linkedin}
                  onChange={handleInputChange}
                  placeholder="LinkedIn URL"
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="instagram"
                  className="form-input"
                  value={profileData.instagram}
                  onChange={handleInputChange}
                  placeholder="Instagram URL"
                />
              </div>
              <button
                className="arrow-btn"
                onClick={handleNext}
                aria-label="Next"
              >
                →
              </button>
            </div>
          );
        }

        // For students: show additional profiles
        if (userType !== 'student') return null;

        return (
          <div className="text-center">
            <h2 className="mb-4">Additional Profiles (If you have these):</h2>
            <div className="form-group">
              <input
                type="text"
                name="github"
                className="form-input"
                value={profileData.github}
                onChange={handleInputChange}
                placeholder="GitHub"
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="linkedin"
                className="form-input"
                value={profileData.linkedin}
                onChange={handleInputChange}
                placeholder="LinkedIn"
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="discord"
                className="form-input"
                value={profileData.discord}
                onChange={handleInputChange}
                placeholder="Discord"
              />
            </div>
            <button
              className="arrow-btn"
              onClick={handleNext}
              aria-label="Next"
            >
              →
            </button>
          </div>
        );

      case 3:
        // Only show for students
        if (userType !== 'student') return null;

        return (
          <div className="text-center">
            <h2 className="mb-4">3 Best Qualities That Describe You</h2>
            <div className="form-group">
              <input
                type="text"
                name="qualities"
                className="form-input"
                value={profileData.qualities}
                onChange={handleInputChange}
                placeholder="e.g., Creative, Analytical, Leader"
                style={{ textAlign: 'center' }}
              />
              <p className="text-muted mt-2" style={{ fontSize: '0.875rem' }}>
                Enter 3 words separated by commas
              </p>
              {errors.qualities && <p className="error-message">{errors.qualities}</p>}
            </div>
            <button
              className="arrow-btn"
              onClick={handleNext}
              aria-label="Finish"
            >
              →
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="page-wrapper">
      <div className="card">
        {renderStep()}
      </div>
    </div>
  );
}

export default ProfileSetup;
