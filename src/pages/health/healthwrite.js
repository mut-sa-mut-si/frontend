import React, { useEffect, useState } from "react";
import axios from "axios";
import picAdd from '../../assets/img/picadd.png';
import back from '../../assets/img/back.png';
import Search from '../../assets/img/search.png';
import ReactMarkdown from "react-markdown";




function HealthWrite() {
    const [view, setView] = useState(true);
    const [content, setContent] = useState('');

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const newValue = content + `\n• `;
            setContent(newValue);
        }
    };

    const handleClick = (e) => {
        setView(!view);
    }

    return (
        <div className="flex items-center justify-center ml-[70px]">
            <div className="relative w-[512px] h-[932px] ">
                <button className="w-[100px] h-[100px] absolute top-[103px] right-[405px]">
                    <img src={back} alt="Back" />
                </button>

                <div className="text-[32px] absolute font-bold top-[130px] right-[160px]">헬스 레시피 등록하기</div>

                <div className="absolute font-bold text-[#D9D9D9] top-[190px] right-[75px]">헬스 목적을 바꿔 여러가지 레시피를 공유할 수 있어요</div>

                <input 
                    type="text" 
                    placeholder="제목을 입력하세요"
                    className="rounded absolute top-[270px] right-[72px] w-[428px] h-[57px] bg-main-color bg-opacity-30 p-2" 
                />

                <textarea
                    placeholder="글을 입력하세요"
                    value={content}
                    onKeyDown={handleKeyPress}
                    onChange={(e) => setContent(e.target.value)}
                    className="absolute top-[350px] right-[72px] w-[428px] h-[446px] rounded bg-main-color bg-opacity-30 p-2 resize-none"
                />
                   <div>
                <ReactMarkdown>{content}</ReactMarkdown>
            </div>

                <div className="absolute top-[815px] right-[170px] font-bold text-[#D9D9D9]">사진을 추가해 더 좋은 레시피를 공유해주세요</div>

                <button className="w-[100px] h-[100px] absolute top-[860px] right-[400px]">
                    <img src={picAdd} alt="picAdd" />
                </button>

                <div className="absolute top-[990px] right-[80px] font-bold text-[#D9D9D9]">해시태그를 추가하면 다른 유저에게 레시피 노출이 잘 돼요</div>

                <input 
                    type="text" 
                    placeholder="태그를 입력하세요"
                    className="rounded absolute top-[1050px] right-[72px] w-[428px] h-[43px] bg-opacity-30 p-2 border border-main-color bold"
                />

                <button className="absolute rounded top-[1200px] right-[390px] w-[110px] h-[52px] p-2 border border-main-color text-main-color text-[18px] flex items-center justify-center cursor-pointer" onClick={handleClick}>
                  {view ? "공개" : "비공개"}
                </button>

                <button className="absolute rounded top-[1200px] right-[70px] w-[300px] h-[52px] p-2 bg-main-color border border-main-color text-white text-bold text-[18px] flex items-center justify-center cursor-pointer">
                    등록하기
                </button>
                 
              
            </div>
        </div>
    );
}

export default HealthWrite;