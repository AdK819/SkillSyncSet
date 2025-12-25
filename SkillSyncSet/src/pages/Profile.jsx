import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [errors, setErrors] = useState({});

  const [editableData, setEditableData] = useState({
    skillset: '',
    nextGoal: '',
    whereToMeet: '',
    availability: '',
    mentoring: '',
    committeeAims: ''
  });

  useEffect(() => {
    // Load user data
    const savedUserData = sessionStorage.getItem('userData');
    const savedProfileData = sessionStorage.getItem('profileData');
    const savedEditableData = sessionStorage.getItem('editableData');
    const savedProfileImage = sessionStorage.getItem('profileImage');

    if (savedUserData) {
      setUserData(JSON.parse(savedUserData));
    }

    if (savedProfileData) {
      const profileDataParsed = JSON.parse(savedProfileData);
      setProfileData(profileDataParsed);

      // Initialize mentoring in editableData if it exists in profileData
      if (profileDataParsed.mentoring && !savedEditableData) {
        setEditableData(prev => ({ ...prev, mentoring: profileDataParsed.mentoring }));
      }
    }

    if (savedEditableData) {
      setEditableData(JSON.parse(savedEditableData));
    }

    if (savedProfileImage) {
      setProfileImage(savedProfileImage);
    }

    // If no profile data, redirect to setup
    if (!savedProfileData) {
      navigate('/profile-setup');
    }
  }, [navigate]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        sessionStorage.setItem('profileImage', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditableChange = (e) => {
    // If user is typing, ensure we are in edit mode so fields don't auto-disable
    if (!isEditing) {
      setIsEditing(true);
    }

    const { name, value } = e.target;
    // Limit to 100 characters
    if (value.length <= 100) {
      setEditableData(prev => ({ ...prev, [name]: value }));

      // Clear error for this field
      if (errors[name]) {
        setErrors(prev => ({ ...prev, [name]: '' }));
      }
    }
  };

  const validateEditableFields = () => {
    const newErrors = {};

    if (userData.userType === 'student') {
      if (!editableData.skillset.trim()) {
        newErrors.skillset = 'Please describe your skillset';
      }

      if (!editableData.nextGoal.trim()) {
        newErrors.nextGoal = 'Please describe what you plan to tackle next';
      }
    } else if (userData.userType === 'teacher') {
      if (!editableData.mentoring.trim()) {
        newErrors.mentoring = 'Please enter 3 mentoring fields';
      } else {
        const mentoringArray = editableData.mentoring.split(',').map(m => m.trim()).filter(m => m);
        if (mentoringArray.length !== 3) {
          newErrors.mentoring = 'Please enter exactly 3 fields separated by commas';
        }
      }

      if (!editableData.whereToMeet.trim()) {
        newErrors.whereToMeet = 'Please specify where to meet you';
      }

      if (!editableData.availability.trim()) {
        newErrors.availability = 'Please specify when you will be available';
      }
    } else if (userData.userType === 'eventOrganizer') {
      if (!editableData.committeeAims.trim()) {
        newErrors.committeeAims = 'Please describe what this committee aims for';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveChanges = () => {
    if (validateEditableFields()) {
      sessionStorage.setItem('editableData', JSON.stringify(editableData));
      setIsEditing(false);
      // Navigate to home page after saving
      navigate('/home');
    }
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  if (!userData || !profileData) {
    return (
      <div className="page-wrapper">
        <div className="card text-center">
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  const qualitiesArray = profileData.qualities
    ? profileData.qualities.split(',').map(q => q.trim()).filter(q => q)
    : [];

  const mentoringArray = profileData.mentoring
    ? profileData.mentoring.split(',').map(m => m.trim()).filter(m => m)
    : [];

  // Check if editable fields are filled based on user type
  const isProfileComplete = userData.userType === 'student'
    ? (editableData.skillset && editableData.nextGoal)
    : userData.userType === 'teacher'
      ? (editableData.mentoring && editableData.whereToMeet && editableData.availability)
      : (editableData.committeeAims);

  return (
    <div className="page-wrapper">
      <div className="card card-wide">
        {/* Edit Icon */}
        {isProfileComplete && (
          <button
            className="edit-icon"
            onClick={handleEditClick}
            aria-label="Edit profile"
          >
            Edit
          </button>
        )}

        {/* Profile Image */}
        <div className="profile-image-container">
          <div className="profile-image-wrapper">
            <label htmlFor="profile-image-input" className="profile-image-label">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="profile-image"
                  style={{ cursor: isEditing ? 'pointer' : 'default' }}
                />
              ) : (
                <div className="profile-image" style={{ cursor: isEditing ? 'pointer' : 'default', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', fontWeight: '500' }}>
                  Upload Photo
                </div>
              )}
            </label>
            {isEditing && (
              <input
                id="profile-image-input"
                type="file"
                accept="image/*"
                className="profile-image-input"
                onChange={handleImageUpload}
              />
            )}
          </div>
        </div>

        {/* Qualities - Only for students */}
        {userData.userType === 'student' && qualitiesArray.length > 0 && (
          <div className="qualities-container">
            <div className="qualities">
              {qualitiesArray.map((quality, index) => (
                <span key={index} className="quality-tag">
                  {quality}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Basic Info */}
        <div className="profile-info">
          {userData.username && (
            <div className="profile-info-item">
              <div className="profile-info-label">Name</div>
              <div className="profile-info-value">{userData.username}</div>
            </div>
          )}

          {userData.year && (
            <div className="profile-info-item">
              <div className="profile-info-label">Year</div>
              <div className="profile-info-value">{userData.year}</div>
            </div>
          )}

          {userData.department && (
            <div className="profile-info-item">
              <div className="profile-info-label">Department</div>
              <div className="profile-info-value">{userData.department}</div>
            </div>
          )}

          {userData.committeeName && (
            <div className="profile-info-item">
              <div className="profile-info-label">Committee</div>
              <div className="profile-info-value">{userData.committeeName}</div>
            </div>
          )}

          {userData.designation && (
            <div className="profile-info-item">
              <div className="profile-info-label">Designation</div>
              <div className="profile-info-value">{userData.designation}</div>
            </div>
          )}

          <div className="profile-info-item">
            <div className="profile-info-label">Email</div>
            <div className="profile-info-value">{userData.email}</div>
          </div>

          {profileData.instituteName && (
            <div className="profile-info-item">
              <div className="profile-info-label">Institute</div>
              <div className="profile-info-value">{profileData.instituteName}</div>
            </div>
          )}
        </div>

        {/* Additional Profiles */}
        {(profileData.github || profileData.linkedin || profileData.discord) && (
          <div className="profile-info">
            <h3 className="mb-2">Additional Profiles</h3>

            {profileData.github && (
              <div className="profile-info-item">
                <div className="profile-info-label">GitHub</div>
                <div className="profile-info-value">{profileData.github}</div>
              </div>
            )}

            {profileData.linkedin && (
              <div className="profile-info-item">
                <div className="profile-info-label">LinkedIn</div>
                <div className="profile-info-value">{profileData.linkedin}</div>
              </div>
            )}

            {profileData.discord && (
              <div className="profile-info-item">
                <div className="profile-info-label">Discord</div>
                <div className="profile-info-value">{profileData.discord}</div>
              </div>
            )}
          </div>
        )}

        {/* Event Organizer Social Media */}
        {userData.userType === 'eventOrganizer' && (profileData.linkedin || profileData.instagram) && (
          <div className="profile-info">
            <h3 className="mb-2">Committee Social Media</h3>

            {profileData.linkedin && (
              <div className="profile-info-item">
                <div className="profile-info-label">LinkedIn</div>
                <div className="profile-info-value">{profileData.linkedin}</div>
              </div>
            )}

            {profileData.instagram && (
              <div className="profile-info-item">
                <div className="profile-info-label">Instagram</div>
                <div className="profile-info-value">{profileData.instagram}</div>
              </div>
            )}
          </div>
        )}

        {/* Editable Section - Student Fields */}
        {userData.userType === 'student' && (
          <>
            <div className="form-group">
              <label className="form-label">What skillset I possess?</label>
              <textarea
                name="skillset"
                className="form-input"
                value={editableData.skillset}
                onChange={handleEditableChange}
                placeholder="Describe your skills (max 100 characters)"
                maxLength="100"
                disabled={!isEditing && isProfileComplete}
                style={{
                  backgroundColor: (!isEditing && isProfileComplete) ? 'var(--bg-secondary)' : 'var(--input-bg)',
                  cursor: (!isEditing && isProfileComplete) ? 'default' : 'text'
                }}
              />
              <div className="text-muted" style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>
                {editableData.skillset.length}/100 characters
              </div>
              {errors.skillset && <p className="error-message">{errors.skillset}</p>}
            </div>

            <div className="form-group">
              <label className="form-label">What do I plan on tackling next?</label>
              <textarea
                name="nextGoal"
                className="form-input"
                value={editableData.nextGoal}
                onChange={handleEditableChange}
                placeholder="Describe your next goals (max 100 characters)"
                maxLength="100"
                disabled={!isEditing && isProfileComplete}
                style={{
                  backgroundColor: (!isEditing && isProfileComplete) ? 'var(--bg-secondary)' : 'var(--input-bg)',
                  cursor: (!isEditing && isProfileComplete) ? 'default' : 'text'
                }}
              />
              <div className="text-muted" style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>
                {editableData.nextGoal.length}/100 characters
              </div>
              {errors.nextGoal && <p className="error-message">{errors.nextGoal}</p>}
            </div>
          </>
        )}

        {/* Editable Section - Teacher Fields */}
        {userData.userType === 'teacher' && (
          <>
            <div className="form-group">
              <label className="form-label">Specialized in Mentoring:</label>
              <input
                type="text"
                name="mentoring"
                className="form-input"
                value={editableData.mentoring}
                onChange={handleEditableChange}
                placeholder="e.g., Web Development, Data Science, AI"
                disabled={!isEditing && isProfileComplete}
                style={{
                  backgroundColor: (!isEditing && isProfileComplete) ? 'var(--bg-secondary)' : 'var(--input-bg)',
                  cursor: (!isEditing && isProfileComplete) ? 'default' : 'text',
                  textAlign: 'center'
                }}
              />
              <p className="text-muted mt-2" style={{ fontSize: '0.875rem', textAlign: 'center' }}>
                Enter 3 fields separated by commas
              </p>
              {errors.mentoring && <p className="error-message">{errors.mentoring}</p>}
            </div>

            <div className="form-group">
              <label className="form-label">Where to meet me?</label>
              <textarea
                name="whereToMeet"
                className="form-input"
                value={editableData.whereToMeet}
                onChange={handleEditableChange}
                placeholder="Specify where students can meet you (max 100 characters)"
                maxLength="100"
                disabled={!isEditing && isProfileComplete}
                style={{
                  backgroundColor: (!isEditing && isProfileComplete) ? 'var(--bg-secondary)' : 'var(--input-bg)',
                  cursor: (!isEditing && isProfileComplete) ? 'default' : 'text'
                }}
              />
              <div className="text-muted" style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>
                {editableData.whereToMeet.length}/100 characters
              </div>
              {errors.whereToMeet && <p className="error-message">{errors.whereToMeet}</p>}
            </div>

            <div className="form-group">
              <label className="form-label">When will I be available?</label>
              <textarea
                name="availability"
                className="form-input"
                value={editableData.availability}
                onChange={handleEditableChange}
                placeholder="Specify your availability (max 100 characters)"
                maxLength="100"
                disabled={!isEditing && isProfileComplete}
                style={{
                  backgroundColor: (!isEditing && isProfileComplete) ? 'var(--bg-secondary)' : 'var(--input-bg)',
                  cursor: (!isEditing && isProfileComplete) ? 'default' : 'text'
                }}
              />
              <div className="text-muted" style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>
                {editableData.availability.length}/100 characters
              </div>
              {errors.availability && <p className="error-message">{errors.availability}</p>}
            </div>
          </>
        )}

        {/* Editable Section - Event Organizer Fields */}
        {userData.userType === 'eventOrganizer' && (
          <>
            <div className="form-group">
              <label className="form-label">What this Committee Aims For?</label>
              <textarea
                name="committeeAims"
                className="form-input"
                value={editableData.committeeAims}
                onChange={handleEditableChange}
                placeholder="Describe the committee's goals and objectives (max 100 characters)"
                maxLength="100"
                disabled={!isEditing && isProfileComplete}
                style={{
                  backgroundColor: (!isEditing && isProfileComplete) ? 'var(--bg-secondary)' : 'var(--input-bg)',
                  cursor: (!isEditing && isProfileComplete) ? 'default' : 'text'
                }}
              />
              <div className="text-muted" style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>
                {editableData.committeeAims.length}/100 characters
              </div>
              {errors.committeeAims && <p className="error-message">{errors.committeeAims}</p>}
            </div>
          </>
        )}

        {/* Save Button - Only show when editing or profile incomplete */}
        {(isEditing || !isProfileComplete) && (
          <button
            className="btn btn-success mt-3"
            onClick={handleSaveChanges}
          >
            Finish & Save Changes
          </button>
        )}
      </div>
    </div>
  );
}

export default Profile;
