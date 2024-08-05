import React, { useState } from 'react';
import SearchImg from '../assets/img/side_search.png';
import { useNavigate } from 'react-router-dom';

function SearchBar({ onAddKeyword }) {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();

  const handleKeyword = (e) => {
    setKeyword(e.target.value);
  };


  const handleEnter = (e) => {
    if (keyword && e.keyCode === 13) {
      onAddKeyword(keyword);
      setKeyword('');
      setTimeout(() => {
        navigate(`/recipesearch?keyword=${encodeURIComponent(keyword)}`);
      }, 0);
    }
  };

  const handleSearchClick = () => {
    if (keyword) {
      onAddKeyword(keyword);
      setKeyword('');
      setTimeout(() => {
        navigate(`/recipesearch?keyword=${encodeURIComponent(keyword)}`);
      }, 0);
    }
  };


  const hasKeyword = !!keyword;
  console.log(keyword)
  return (
    <div className="flex items-center relative">
      <input
        type="text"
        placeholder="검색어를 입력하세요..."
        className={`w-[380px] p-3 mb-4 border rounded-l-[15px] focus:outline-none text-bold focus:ring-2 bg-[#E7F2EC] font-bold focus:ring-[#56C08C] text-[#969696] ${hasKeyword ? 'pl-8' : ''}`}
        style={{ fontSize: '14px' }}
        value={keyword}
        onChange={handleKeyword}
        onKeyDown={handleEnter}
      />
      <button
        onClick={handleSearchClick}
        className="w-12 h-12 mb-4 flex items-center justify-center bg-[#56C08C] text-white rounded-r-[15px] hover:bg-[#3e9b6b] transition duration-300"
      >
        <img src={SearchImg} alt="search" className="w-6 h-6" />
      </button>
      {keyword && (
        <button
          onClick={() => setKeyword('')}
          className="absolute right-16 top-2 text-gray-500"
        >
          &times;
        </button>
      )}
    </div>
  );
}

export default SearchBar;
