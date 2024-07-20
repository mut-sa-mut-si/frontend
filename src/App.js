import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

//0(home)

import Header from './components/Layout';
import Footer from './components/footer';

//1(user)
import Login from './pages/user/login';
import Mypage from './pages/user/mypage';
import MySubscription from './pages/user/mySubscription';
import Subscription from './pages/user/subscription';
import Cancellation from './pages/user/cancellation';
import Search from './pages/user/search';

//2(write)
import HealthWrite from './pages/health/healthwrite';

function App() {
  return (
    <Router>
      <div className="flex flex-col items-center min-h-screen bg-gray-100">
 
        
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/health/write" element={<HealthWrite />} />
            <Route path='/mypage' element={<Mypage/>}/>
            <Route path='/mysubscription' element={<MySubscription/>}/>

            <Route path='/subscription' element={<Subscription/>}/>
            <Route path='/cancellation' element={<Cancellation/>}/>
            <Route path='/search' element={<Search/>}/>
          </Routes>
        </div>
  
      
    </Router>
  );
}

export default App;
