// src/App.tsx

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Home from './pages/home';
import AccountPage from './pages/accountpage';

// import ApiKey from "./pages/apikey"n

import SearchModal from './components/searchmodal';
import SubmitReport from './components/submitreport';
import UpVote from './components/upvote';
import Login from './pages/auth/login';
import Signup from './pages/auth/signup';
import RecoverPassword from './pages/auth/recoverPassword';
import Verification from './pages/auth/verification';
import SetNewPassword from './pages/auth/newPassword';
import ReportedNumber from './pages/reported/ReportedNumber'
function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/search" element={<SearchModal />} />
          <Route path="/submit/:phoneNumber" element={<SubmitReport />} />
          <Route path="/upvote" element={<UpVote />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<RecoverPassword />} />
          <Route path="/verification" element={<Verification />} />
          <Route path="/new-password" element={<SetNewPassword />} />
          <Route path="/reported-number" element={<ReportedNumber/>}/>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;