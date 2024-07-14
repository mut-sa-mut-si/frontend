import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

//0(home)

import Header from './components/Layout';

//1(user)
import Login from './pages/user/login';

function App() {
  return (
    <Router>
      
      <Header/>
      <Routes>
      <Route path="/login" element={<Login />} />
        
      </Routes>
    </Router>
    
  );
}

export default App;
