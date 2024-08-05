import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Import images
import skinIcon from '../../assets/img/skinIcon.png';
import healthIcon from '../../assets/img/healthIcon.png';
import vitaminIcon from '../../assets/img/vitaminIcon.png';
import grwmProfile from '../../assets/img/grwmProfile.png';
import writeQuestion from '../../assets/img/questionMark.png';
import myQuestion from '../../assets/img/myQuestion.png';
import footerSearch from '../../assets/img/footer_search.png';

// Import Component
import LoginPopup from '../../components/login_popup';

function UnLoginQnAHeader({ category, setCategory }) {
    const [keyword, setKeyword]=useState('');
    const [showLoginInfo, setShowLoginInfo] = useState(false);
    const navigate=useNavigate();

    const handleSearch = () => {
        if (keyword) {
            navigate(`/qna/unathentication/search?keyword=${encodeURIComponent(keyword)}`);
        }
    };

    const handleUnLogin = () => {
        setShowLoginInfo(true);
    }
    
    return (
        <div className="w-full bg-[#F9F8F8] rounded-lg text-gray-800">
            <div className='w-full bg-[#24A064] p-5 rounded-t-lg'>
                <div className="mb-5">
                    <h1 className="text-2xl text-white font-bold">무엇이든 물어보세요</h1>
                </div>
                <div className="flex items-center mb-5 justify-between">
                    <img src={grwmProfile} alt='Profile' className='w-20 h-20 ml-20 ' />
                    <div className="space-y-2">
                        <button className='flex items-center bg-green-700 py-2 px-4 rounded-lg text-white'
                                onClick={handleUnLogin}>
                            <img src={writeQuestion} className='w-5 h-5 mr-2' alt='writeQuestion' />
                            <p>질문 작성하기</p>
                        </button>
                        <button className='flex items-center bg-green-700 py-2 px-4 rounded-lg text-white'
                                onClick={handleUnLogin}>
                            <img src={myQuestion} className='w-5 h-5 mr-2' alt='myQuestion' />
                            <p>내 질문</p>
                        </button>
                    </div>
                </div>
                <div className="flex items-center bg-white p-2 rounded-lg">
                    <input type="text" placeholder='Q&A 게시판 검색하기' className='flex-1 border-none outline-none text-gray-800'
                            value={keyword}
                            onChange={(e)=>setKeyword(e.target.value)}/>
                    <button onClick={handleSearch}>
                        <img src={footerSearch} className='w-5 h-5' alt='Search' />
                    </button>
                </div>
            </div>

            {/* 피부/헬스/영양제 카테고리 버튼 */}
            <div className="flex justify-center mt-4 mb-4 p-3 space-x-4">
                <button  className={`flex items-center justify-center w-1/3 border py-2 px-4 rounded-full bg-white ${category === 'skin' ? 'border-green-500' : 'border-gray-300'}`}
                        onClick={()=>setCategory('skin')}>
                    <img src={skinIcon} alt="skinIcon" className="w-10 h-10 mr-2" />
                    <span>피부</span>
                </button>
                <button  className={`flex items-center justify-center w-1/3 border py-2 px-4 rounded-full bg-white ${category === 'health' ? 'border-green-500' : 'border-gray-300'}`}
                        onClick={()=>setCategory('health')}>
                    <img src={healthIcon} alt="healthIcon" className="w-10 h-10 mr-2" />
                    <span>헬스</span>
                </button>
                <button  className={`flex items-center justify-center w-1/3 border py-2 px-4 rounded-full bg-white ${category === 'nutrients' ? 'border-green-500' : 'border-gray-300'}`}
                        onClick={()=>setCategory('nutrients')}>
                    <img src={vitaminIcon} alt="vitaminIcon" className="w-10 h-10 mr-2" />
                    <span>영양제</span>
                </button>
            </div>
            {showLoginInfo && <LoginPopup />}
        </div>
    );
}



export default UnLoginQnAHeader;
