import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState('student');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    username: '',
    year: '',
    department: '',
    committeeName: '',
    designation: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  useEffect(() => {
    const savedUserType = sessionStorage.getItem('userType');
    if (savedUserType) {
      setUserType(savedUserType);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // For password fields, only allow 6 digits
    if (name === 'password' || name === 'confirmPassword') {
      const numericValue = value.replace(/\D/g, '').slice(0, 6);
      setFormData(prev => ({ ...prev, [name]: numericValue }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }

    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Common validations
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (formData.password.length !== 6) {
      newErrors.password = 'Password must be exactly 6 digits';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // User type specific validations
    if (userType === 'student') {
      if (!formData.username.trim()) newErrors.username = 'Username is required';
      if (!formData.year) newErrors.year = 'Year is required';
      if (!formData.department) newErrors.department = 'Department is required';
    } else if (userType === 'teacher') {
      if (!formData.username.trim()) newErrors.username = 'Username is required';
      if (!formData.department) newErrors.department = 'Department is required';
    } else if (userType === 'eventOrganizer') {
      if (!formData.committeeName.trim()) newErrors.committeeName = 'Committee name is required';
      if (!formData.designation.trim()) newErrors.designation = 'Designation is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Store user data in sessionStorage
      const userData = {
        userType,
        ...formData
      };
      sessionStorage.setItem('userData', JSON.stringify(userData));

      // Navigate to welcome page
      navigate('/welcome');
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="page-wrapper">
      <div className="card">
        <button className="back-btn" onClick={handleBack}>
          ← Back
        </button>

        <h2 className="text-center mb-2">Sign Up</h2>
        <p className="text-center text-muted mb-4">
          {userType === 'student' ? 'Student' : userType === 'teacher' ? 'Teacher' : 'Event Organizer'}
        </p>

        <form onSubmit={handleSubmit}>
          {/* Student Fields */}
          {userType === 'student' && (
            <>
              <div className="form-group">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  name="username"
                  className="form-input"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="Enter username"
                />
                {errors.username && <p className="error-message">{errors.username}</p>}
              </div>

              <div className="form-group">
                <label className="form-label">Year</label>
                <select
                  name="year"
                  className="form-select"
                  value={formData.year}
                  onChange={handleInputChange}
                >
                  <option value="">Select Year</option>
                  <option value="FE">FE</option>
                  <option value="SE">SE</option>
                  <option value="TE">TE</option>
                  <option value="BE">BE</option>
                </select>
                {errors.year && <p className="error-message">{errors.year}</p>}
              </div>

              <div className="form-group">
                <label className="form-label">Department</label>
                <select
                  name="department"
                  className="form-select"
                  value={formData.department}
                  onChange={handleInputChange}
                >
                  <option value="">Select Department</option>
                  <option value="Computer">Computer</option>
                  <option value="IT">IT</option>
                  <option value="AI/DS">AI/DS</option>
                  <option value="EXTC">EXTC</option>
                </select>
                {errors.department && <p className="error-message">{errors.department}</p>}
              </div>
            </>
          )}

          {/* Teacher Fields */}
          {userType === 'teacher' && (
            <>
              <div className="form-group">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  name="username"
                  className="form-input"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="Enter username"
                />
                {errors.username && <p className="error-message">{errors.username}</p>}
              </div>

              <div className="form-group">
                <label className="form-label">Department</label>
                <select
                  name="department"
                  className="form-select"
                  value={formData.department}
                  onChange={handleInputChange}
                >
                  <option value="">Select Department</option>
                  <option value="Computer">Computer</option>
                  <option value="IT">IT</option>
                  <option value="AI/DS">AI/DS</option>
                  <option value="EXTC">EXTC</option>
                </select>
                {errors.department && <p className="error-message">{errors.department}</p>}
              </div>
            </>
          )}

          {/* Event Organizer Fields */}
          {userType === 'eventOrganizer' && (
            <>
              <div className="form-group">
                <label className="form-label">Committee Name</label>
                <input
                  type="text"
                  name="committeeName"
                  className="form-input"
                  value={formData.committeeName}
                  onChange={handleInputChange}
                  placeholder="Enter committee name"
                />
                {errors.committeeName && <p className="error-message">{errors.committeeName}</p>}
              </div>

              <div className="form-group">
                <label className="form-label">Designation</label>
                <input
                  type="text"
                  name="designation"
                  className="form-input"
                  value={formData.designation}
                  onChange={handleInputChange}
                  placeholder="Enter designation"
                />
                {errors.designation && <p className="error-message">{errors.designation}</p>}
              </div>
            </>
          )}

          {/* Common Fields */}
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-input"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter email"
            />
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                className="form-input"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="6 digits"
                maxLength="6"
                inputMode="numeric"
              />
              {formData.password && (
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
                      <line x1="2" y1="2" x2="22" y2="22" />
                    </svg>
                  )}
                </button>
              )}
            </div>
            {errors.password && <p className="error-message">{errors.password}</p>}
          </div>

          <div className="form-group">
            <label className="form-label">Confirm Password</label>
            <div className="password-input-wrapper">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                className="form-input"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="6 digits"
                maxLength="6"
                inputMode="numeric"
              />
              {formData.confirmPassword && (
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label="Toggle confirm password visibility"
                >
                  {showConfirmPassword ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
                      <line x1="2" y1="2" x2="22" y2="22" />
                    </svg>
                  )}
                </button>
              )}
            </div>
            {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
          </div>

          <button type="submit" className="btn btn-primary mt-3">
            Sign Up
          </button>

          <p className="text-center text-muted mt-3">
            Already have an account? <a href="/login" className="link">Login</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
