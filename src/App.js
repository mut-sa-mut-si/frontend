import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//0(home)

import Header from './components/Layout';

//1(user)
import Login from './pages/user/login';
import SkinDetail from './pages/user/skin-detail';

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/skin/detail' element={<SkinDetail />} />
                <Route path='/health/detail' />
                <Route path='/nutrients/detail' />
            </Routes>
        </Router>
    );
}

export default App;
