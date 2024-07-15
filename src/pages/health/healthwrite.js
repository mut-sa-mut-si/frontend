import React, { useState } from "react";
import picAdd from '../../assets/img/picadd.png';
import back from '../../assets/img/back.png';
import ReactMarkdown from "react-markdown";
import Header from "../../components/Layout";
import Footer from "../../components/footer";

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

    const handleClick = () => {
        setView(!view);
    }

    return (
        
           
    
        <div className="relative w-[50vw] max-w-[512px] bg-white shadow-lg rounded-lg p-6 mb-[70px] mt-[90px] flex-grow">
            <Header/>
                <div className="flex items-center mb-6">
                    <button className="w-8 h-8">
                        <img src={back} alt="Back" />
                    </button>
                    <h1 className="text-2xl font-bold ml-4">피부 레시피 등록하기</h1>
                </div>

                <p className="font-semibold text-gray-600 mb-4">특별한 레시피를 공유해주세요</p>

                <input
                    type="text"
                    placeholder="제목을 입력하세요"
                    className="w-full p-3 mb-4 border rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-main-color"
                    style={{ fontSize: '14px' }}
                />

                <textarea
                    placeholder="레시피를 입력하세요"
                    value={content}
                    onKeyDown={handleKeyPress}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full p-3 mb-4 border rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-main-color resize-none"
                    style={{ fontSize: '14px', height: '30vh' }}
                />
                 
                <p className="font-semibold text-gray-600 mb-4">해시태그를 추가해 레시피를 알려보세요</p>

                <input
                    type="text"
                    placeholder="태그를 입력하세요"
                    className="w-full p-3 mb-4 border rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-main-color"
                    style={{ fontSize: '14px' }}
                />

                <div className="flex justify-between mb-4">
                    <button className="w-1/4 h-24 bg-gray-100 rounded-lg flex items-center justify-center border border-dashed border-gray-400">
                        <img src={picAdd} alt="Add" className="w-12 h-12" />
                    </button>
                </div>

                <div className="flex justify-between mb-4">
                    <button
                        className="w-[45%] p-3 border border-main-color text-main-color font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-main-color"
                        onClick={handleClick}
                        style={{ fontSize: '14px' }}
                    >
                        {view ? "공개" : "비공개"}
                    </button>

                    <button className="w-[45%] p-3 bg-main-color text-white font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-main-color" style={{ fontSize: '14px' }}>
                        등록하기
                    </button>
                </div>
                <Footer/>
            </div>
      
    );
}

export default HealthWrite;
