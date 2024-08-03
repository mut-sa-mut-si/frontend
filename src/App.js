import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components'; // ?��?��: styled-components?�� createGlobalStyle 추�??
import './App.css';

import Footer from './components/footer';
import Main from './pages/main/main'; // 로그?�� ?��
import MainAuth from './pages/main/main_auth'; // 로그?�� ?��

import Login from './pages/user/login';
import Mypage from './pages/user/mypage';
import Search from './pages/user/search';

import Write from './pages/recipe/write';
import RecipeListAuth from './pages/recipe/recipe_list_auth';
import RecipeList from './pages/recipe/recipe_list';

import MyRecipes from './pages/mypage/myrecipes';
import MyScraps from './pages/mypage/myscraps';
import RecipeDetail from './pages/recipe/recipe_detail';
import RecipeSearch from './pages/recipe/recipe_search';

import Payment from './pages/payment/payments';

import Chatroom from './pages/chat/chatroom';
import ChatroomList from './pages/chat/chatroomList';

import MyMain from './pages/mypage/mymain';
import MymainOther from './pages/mypage/mymain_other';


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
      <GlobalStyle />
      <div className="flex flex-col items-center min-h-screen bg-gray-100">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/health/write" element={<Write />} />
          <Route path='/mypage' element={<Mypage />} />
          <Route path="/redirect" element={<Login />} />
          <Route path='/search' element={<Search />} />
          <Route path='/payments' element={<Payment />} />
          <Route path='/main' element={isAuthenticated ? <Main /> : <Main />} />
          <Route path='/recipeList' element={isAuthenticated ? <RecipeListAuth />: <RecipeList/>} />
          <Route path='/recipeDetail/:id' element={<RecipeDetail />} />
          <Route path='/chatroom/:id' element={<Chatroom />} />
          <Route path='/chatroom' element={<ChatroomList />} />
          <Route path='/mymain' element={isAuthenticated ? <MymainOther />:<MymainOther/> }/>
          <Route path='/recipesearch' element={<RecipeSearch />} />
          <Route path='/mypage/recipes' element={<MyRecipes />} />
          <Route path='/mypage/scraps' element={<MyScraps />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
