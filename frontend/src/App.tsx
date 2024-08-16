//src/App.tsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import AccountPage from './pages/accountpage';

<<<<<<< HEAD
=======
import ApiKey from "./pages/apikey"
>>>>>>> da86504f103971defdabc6352ca6450a585cd057

import SearchModal from './components/searchmodal';
import SubmitReport from './components/submitreport'
import UpVote from './components/upvote'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/account" element={<AccountPage />} />
<<<<<<< HEAD
        
=======

        <Route path = "/apikey" element= {<ApiKey/>}/>

        <Route path="/search" element={<SearchModal/>} />
        <Route path="/submit" element={<SubmitReport/>} />
        <Route path="/upvote" element={<UpVote/>} />

>>>>>>> da86504f103971defdabc6352ca6450a585cd057
      </Routes>
    </Router>
  );
}

export default App;
