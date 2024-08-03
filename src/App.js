import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//0(home)

import Header from '../../frontend/src/components/Layout';
import Footer from '../../frontend/src/components/footer';
import Main from '../../frontend/src/pages/main/main';

//1(user)
import Login from './pages/user/login';
import HandleLoginInfo from './pages/user/loginInfo';
import Mypage from './pages/user/mypage';
import MySubscription from './pages/user/mySubscription';
import Subscription from './pages/user/subscription';
import Cancellation from './pages/user/cancellation';
import Search from './pages/user/search';

//2(write)
import Write from './pages/recipe/write';

//3(payment)
import Payment from './pages/payment/payments';

//4(qna)
import UnLoginQnAHandler from './pages/unLoginQnA/unLoginQnAHandler';
import UnLoginSearchPage from './pages/unLoginQnA/unLoginSearchPage';
import UnLoginQnADetail from './pages/unLoginQnA/unLoginQnADetail';
import QnAHandler from './pages/QnA/qnaHandler';
import WriteQuestion from './pages/QnA/WriteQuestion';
import MyQuestion from './pages/QnA/MyQuestion';
import SearchPage from './pages/QnA/SearchPage';
import OnboardingHandler from './pages/onboarding/onboardingHandler';
import QnADetail from './pages/QnA/qnaDetail';

//5(manage)
import MyPageSub from './pages/manage/mypagesub';
import SubPurchase from './pages/manage/subpurchase';

function App() {
    return (
        <Router>
            <div className='flex flex-col items-center min-h-screen bg-gray-100'>
                <Routes>
                    <Route path='/login' element={<Login />} />
                    <Route path='/login/info' element={<HandleLoginInfo />} />

                    <Route path='/onboarding' element={<OnboardingHandler />} />
                    <Route path='/health/write' element={<Write />} />
                    <Route path='/mypage' element={<Mypage />} />
                    <Route path='/mysubscription' element={<MySubscription />} />
                    <Route path='/redirect' element={<Login />} />
                    <Route path='/subscription' element={<Subscription />} />
                    <Route path='/cancellation' element={<Cancellation />} />
                    <Route path='/search' element={<Search />} />

                    <Route path='/payments' element={<Payment />} />
                    <Route path='/main' element={<Main />} />

                    {/* QnA */}
                    <Route path='/unloginqna' element={<UnLoginQnAHandler />} />
                    <Route path='/qna/unathentication/search' element={<UnLoginSearchPage />} />
                    <Route path='/qna/unathentication/:id' element={<UnLoginQnADetail />} />

                    <Route path='/qna' element={<QnAHandler />} />
                    <Route path='/writequestion' element={<WriteQuestion />} />
                    <Route path='/myquestion' element={<MyQuestion />} />
                    <Route path='/qna/search' element={<SearchPage />} />
                    <Route path='/qna/:id' element={<QnADetail />} />

                    {/* MyPage */}
                    <Route path='managesub' element={<MyPageSub />} />
                    <Route path='subpurchase' element={<SubPurchase />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
