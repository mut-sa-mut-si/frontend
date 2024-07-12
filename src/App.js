import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

//0(home)

import Header from './components/Layout';

function App() {
  return (
    <Router>
      <div>
          <div className='App bg-main-color' >

          </div>
        </div>
 
      <Header/>
      <Routes>
        
      </Routes>
    </Router>
    
  );
}

export default App;
