import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//0(home)

import Header from './components/Layout';
import Footer from './components/footer';
import Main from './pages/main/main';

//1(user)
import Login from './pages/user/login';
import Mypage from './pages/user/mypage';
import MySubscription from './pages/user/mySubscription';
import Subscription from './pages/user/subscription';
import Cancellation from './pages/user/cancellation';
import Search from './pages/user/search';

//2(recipe)
import Write from './pages/recipe/write';
import RecipeList from './pages/recipe/recipe_list';
import RecipeDetail from './pages/recipe/recipe_detail';


//3(payment)
import Payment from './pages/payment/payments';

function App() {

  return (
    <Router>
      <div className="flex flex-col items-center min-h-screen bg-gray-100">
 
        
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/health/write" element={<Write />} />
            <Route path='/mypage' element={<Mypage/>}/>
            <Route path='/mysubscription' element={<MySubscription/>}/>
            <Route path="/redirect" element={<Login />} />
            <Route path='/subscription' element={<Subscription/>}/>
            <Route path='/cancellation' element={<Cancellation/>}/>
            <Route path='/search' element={<Search/>}/>

            <Route path='/payments' element={<Payment/>}/>
            <Route path='/main' element={<Main/>}/>
            <Route path='/recipeList' element={<RecipeList/>}/>
            <Route path='/recipeDetail/id' element={<RecipeDetail/>}/>
          </Routes>
        </div>
  
      
    </Router>
  );



}

export default App;
