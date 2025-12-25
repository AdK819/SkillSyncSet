import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Welcome from './pages/Welcome';
import ProfileSetup from './pages/ProfileSetup';
import Profile from './pages/Profile';
import HomePage from './pages/HomePage';
import SyncPage from './pages/SyncPage';
import CreatePage from './pages/CreatePage';
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/select-type" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/profile-setup" element={<ProfileSetup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/home" element={<HomePage />} />

          {/* New Feature Routes */}
          <Route path="/my-sync" element={<SyncPage type="my-sync" />} />
          <Route path="/mentor-sync" element={<SyncPage type="mentor-sync" />} />
          <Route path="/mentee-sync" element={<SyncPage type="mentee-sync" />} />
          <Route path="/create" element={<CreatePage />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
