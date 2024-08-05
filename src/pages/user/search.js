import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "../../components/searchBar";
import History from "../../components/history";
import Back from '../../assets/img/back_.png';
import { useNavigate } from 'react-router-dom';
import Side from "../../components/side";
import SliderSearch from "../../components/slide_search";
import Footer from "../../components/footer";
function Search() {
  const [popular, setPopular] = useState([]);
  const token = localStorage.getItem('jwt');
  const cleanToken = token ? token.replace('Token: ', '') : '';
  const api = 'default-grwm-server-serv-1ac37-25678670-9aceb4885941.kr.lb.naverncp.com:8080';
  const navigate = useNavigate();
  const [keywords, setKeywords] = useState(
    JSON.parse(localStorage.getItem('keywords') || '[]')
  );

  useEffect(() => {
    localStorage.setItem('keywords', JSON.stringify(keywords));
  }, [keywords]);

  const handleAddKeyword = (text) => {
    if (keywords.length < 6 && text.length <= 12) {
      console.log('text', text);
      const newKeyword = {
        text: text,
        id: Date.now(),
      };
      setKeywords([newKeyword, ...keywords]);
      console.log(keywords);
    }
  };
  const handleBackClick = () => {
    navigate(-1);
};

  const handleRemoveKeyword = (id) => {
    const nextKeyword = keywords.filter((thisKeyword) => {
      return thisKeyword.id !== id;
    });
    setKeywords(nextKeyword);
  };

  useEffect(() => {
    const popularKey = async () => {
      try {
        const response = await axios.get(`http://${api}/api/v1/search`, {
          headers: {
            'Authorization': `${cleanToken}`,
          },
        });
        console.log(response.data.popularKeywords);
        setPopular(response.data.popularKeywords);
      } catch (error) {
        console.error('There was an error', error);
      }
    };

    popularKey();
  }, [cleanToken, api]);

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <Side />
      <div className="fixed top-0 left-[670px] max-w-[512px] h-[calc(100vh-3px)] bg-[#F9F8F8] shadow-2xl rounded-[30px] p-6 overflow-y-auto no-scrollbar z-10">
        <div className="flex items-center justify-between">
          <button className="w-6 h-6 mr-2 mb-4" onClick={handleBackClick}>
            <img src={Back} alt="Back" />
          </button>
          <SearchBar onAddKeyword={handleAddKeyword} />
        </div>
        <div className="font-bold text-[18px]">
          현재 뜨는 검색어
          <SliderSearch popular={popular} />
        </div>
        <History
          keywords={keywords}
          onRemoveKeyword={handleRemoveKeyword}
        />

<div className='flex flex-col flxed items-center justify-between'>
        <Footer/>
        </div>
      </div>
    </div>
  );
}

export default Search;
