import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "../../components/searchBar";
import History from "../../components/history";
import Back from '../../assets/img/back_.png';
import Side from "../../components/side";

function Search(){

     //string은 map을 사용 할 수 없기때문에 object 형태로 변환 시키기 위해 parsing을 해줘야함
  const [keywords, setKeywords] = useState(
    JSON.parse(localStorage.getItem('keywords') || '[]'),
  )

  //키워드에 변화가 일어날때만 렌더링
  useEffect(()=> {
    localStorage.setItem('keywords', JSON.stringify(keywords))
  }, [keywords])

  //검색어 추가
  const handleAddKeyword = (text) => {
    if(keywords.length < 6&&text.length<=12){
      console.log('text', text)
      const newKeyword = {
          text: text,
          id: Date.now(),
        }
        setKeywords([newKeyword, ...keywords])
    }
   
  }

  //검색어 삭제
  const handleRemoveKeyword = (id) => {
    const nextKeyword = keywords.filter((thisKeyword) => {
        return thisKeyword.id != id
      })
      setKeywords(nextKeyword)
  }

 

    //자식 컴포넌트에서 setState를 못하기때문에 그거를 바꿔주는 함수를 선언후 그 함수를 넘겨야함
    return (
      <div className="relative w-screen h-screen overflow-hidden">
      {/* 배경 디자인 컴포넌트 */}
      <Side />
      
    <div className="fixed top-0 left-[670px] w-[512px] h-[calc(100vh-3px)] bg-[#F9F8F8] shadow-2xl rounded-[30px] p-6 overflow-y-auto no-scrollbar z-10">
          <div className="flex items-center  justify-between">
                <button className="w-6 h-6 mr-2 mb-4">
                    <img src={Back} alt="Back" />
                </button>
                <SearchBar onAddKeyword={handleAddKeyword} />
                </div>
        
          <div className="font-bold text-[18px]">
              현재 뜨는 검색어
          </div>



        <History
          keywords={keywords}
      
          onRemoveKeyword={handleRemoveKeyword}
        />
      </div>
      </div>
    );
  
}
export default Search;