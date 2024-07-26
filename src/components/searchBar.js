import { Link } from 'react-router-dom'
import React, { useState } from 'react'
import Search from '../pages/user/search';
import History from './history';

function SearchBar({onAddKeyword}){

    const [keyword, setKeyword] = useState('');

    const handleKeyword = (e) => {
        setKeyword(e.target.value)
    }

    const handleEnter = (e)=> {
        if (keyword && e.keyCode === 13) {
            //엔터일때 부모의 addkeyword에 전달
            onAddKeyword(keyword)
            setKeyword('')
          }
    }


    //느낌표로 키워드를 갖고있냐 없냐로 boolean 형태로 나옴
  //키워드를 가지고 있다면 active가 발생하여 padding이 발생함. // 패딩이 없으면 x 아이콘까지 글자가 침법하기 때문
  const hasKeyword = !!keyword

  {
    //keyword가 있으면 true, 없으면 false가 리턴이 되는 것을 확인 할 수 있습니다
    console.log(!!keyword)
  }

   
  return (
    <div>
      <input
        type="text"
        placeholder="검색어를 입력하세요..."
        className={`w-[400px] mr-[30px] p-3 mb-4 border rounded-[15px] focus:outline-none text-bold focus:ring-2 bg-[#E7F2EC]  font-bold focus:ring-[#56C08C] text-[#969696] ${hasKeyword ? 'pl-8' : ''}`}
        style={{ fontSize: '14px' }}
        value={keyword}
        onChange={handleKeyword}
        onKeyDown={handleEnter}
      />
      {keyword && (
        <button
      
          className="absolute right-4 top-4 text-gray-500"
        >
          &times;
        </button>
      )}
    </div>
  );
};


export default SearchBar;