import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import './App.css';

import Main from './pages/main/main';
import Footer from './components/footer';
import MainAuth from './pages/main/main_auth';

import Login from './pages/user/login';
import HandleLoginInfo from './pages/user/loginInfo';
import Mypage from './pages/user/mypage';
import Search from './pages/user/search';

import Write from './pages/recipe/write';
import RecipeListAuth from './pages/recipe/recipe_list_auth';
import RecipeList from './pages/recipe/recipe_list';

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
import ManageSub from './pages/manage/managesub';
import SubPurchase from './pages/manage/subpurchase';

import MyRecipes from './pages/mypage/myrecipes';
import MyScraps from './pages/mypage/myscraps';
import RecipeDetail from './pages/recipe/recipe_detail';
import RecipeDetailAuth from './pages/recipe/recipe_detail_auth';
import RecipeSearch from './pages/recipe/recipe_search';

import Chatroom from './pages/chat/chatroom';
import ChatroomList from './pages/chat/chatroomList';

import MyMain from './pages/mypage/mymain';
import MymainOther from './pages/mypage/mymain_other';

import LoginComplete from './pages/user/loginComplete';

import Notification from './pages/mypage/notification';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'GmarketSansBold', sans-serif;
  }

  @font-face {
    font-family: 'GmarketSansBold';
    src: url('/assets/fonts/GmarketSansTTFBold.ttf') format('truetype');
    font-weight: bold;
    font-style: normal;
  }
`;

function App() {
    const isAuthenticated = !!localStorage.getItem('jwt');
    return (
        <Router>
            <div className='flex flex-col items-center min-h-screen bg-gray-100'>
                <Routes>
                    <Route path='/login' element={<Login />} />
                    <Route path='/login/info' element={<HandleLoginInfo />} />
                    <Route path='/logincomplete' element={<LoginComplete />} />

                    <Route path='/onboarding' element={<OnboardingHandler />} />
                    <Route path='/write' element={<Write />} />
                    <Route path='/mypage' element={<Mypage />} />
                    <Route path='/redirect' element={<Login />} />
                    <Route path='/search' element={<Search />} />

                    {/* QnA */}
                    <Route path='/writequestion' element={<WriteQuestion />} />
                    <Route path='/myquestion' element={<MyQuestion />} />

                    <Route path='/qna' element={isAuthenticated ? <QnAHandler /> : <UnLoginQnAHandler />} />
                    <Route path='/qna/search' element={isAuthenticated ? <SearchPage /> : <UnLoginSearchPage />} />
                    <Route path='qna/:id' element={isAuthenticated ? <QnADetail /> : <UnLoginQnADetail />} />

                    {/* MyPage */}
                    <Route path='/managesub/:id' element={<ManageSub />} />
                    <Route path='subpurchase/:id' element={<SubPurchase />} />

                    <Route path='/login' element={<Login />} />
                    <Route path='/health/write' element={<Write />} />
                    <Route path='/mypage' element={<Mypage />} />
                    <Route path='/redirect' element={<Login />} />
                    <Route path='/search' element={<Search />} />
                    <Route path='/main' element={isAuthenticated ? <MainAuth /> : <Main />} />
                    <Route path='/recipeList' element={isAuthenticated ? <RecipeListAuth /> : <RecipeList />} />
                    <Route
                        path='/recipeDetail/:id'
                        element={isAuthenticated ? <RecipeDetailAuth /> : <RecipeDetail />}
                    />
                    <Route path='/chatroom/:id' element={<Chatroom />} />
                    <Route path='/chatroom' element={<ChatroomList />} />
                    <Route path='/mymain' element={<MyMain />} />
                    <Route path='/mymain/:id' element={<MymainOther />} />
                    <Route path='/recipesearch' element={<RecipeSearch />} />
                    <Route path='/mypage/recipes' element={<MyRecipes />} />
                    <Route path='/mypage/scraps' element={<MyScraps />} />
                    <Route path='/notifications' element={<Notification />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
