//src/App.tsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import AccountPage from './pages/accountpage';
import SearchModal from './components/searchmodal';
import SubmitReport from './components/submitreport';
import UpVote from './components/upvote';
import Login from './pages/auth/login';
import Signup from './pages/auth/signup';
import RecoverPassword from './pages/auth/recoverPassword';
import Verification from './pages/auth/verification';
import SetNewPassword from './pages/auth/newPassword';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/search" element={<SearchModal />} />
        <Route path="/submit" element={<SubmitReport />} />
        <Route path="/upvote" element={<UpVote />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<RecoverPassword />} />
        <Route path="/verification" element={<Verification />} />
        <Route path="/new-password" element={<SetNewPassword />} />

      </Routes>
    </Router>
  );
}

export default App;