import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

//0(home)

import Header from './components/Layout';
import Footer from './components/footer';

//1(user)
import Login from './pages/user/login';

//2(write)
import HealthWrite from './pages/health/healthwrite';

function App() {
  return (
    <Router>
      
      <Header/>
    
      <Routes>
      <Route path="/login" element={<Login />} />

        
      <Route path="/health/write" element={<HealthWrite />} />
      </Routes>
      <Footer/>
    </Router>
    
  );
}

export default App;
