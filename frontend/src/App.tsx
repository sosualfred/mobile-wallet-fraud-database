
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import AccountPage from './pages/accountpage';
import ApiKey from "./pages/apikey"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path = "/apikey" element= {<ApiKey/>}/>
      </Routes>
    </Router>
  );
}

export default App;
