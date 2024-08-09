
<<<<<<< HEAD
import Home from "./pages/home"
import Api from "./pages/apikey"


=======
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import AccountPage from './pages/accountpage';
>>>>>>> d6d0db38cc9f6ab13a35ab58f15b01c19b03930b

function App() {
  return (
<<<<<<< HEAD

    <div>

      <Home/>
      <Api/>
      
      
    </div>

  )
=======
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/account" element={<AccountPage />} />
      </Routes>
    </Router>
  );
>>>>>>> d6d0db38cc9f6ab13a35ab58f15b01c19b03930b
}

export default App;
