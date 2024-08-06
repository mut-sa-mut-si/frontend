import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SliderFamous from '../../components/slide_famous';
import SliderRecommend from '../../components/slide_recommend';
import './main.css'; // CSS 파일이 필요한 경우
import Side from '../../components/side';
import Footer from '../../components/footer';
import grwmy from '../../assets/img/grwmy.png';
import afterLogin from '../../assets/img/afterLogin.png';
import SliderReview from '../../components/slide_review';
import qnaClickButton from '../../assets/img/qnaClickButton.png';

function Main() {
    const api = 'default-grwm-server-serv-1ac37-25678670-9aceb4885941.kr.lb.naverncp.com:8080';
    const navigate = useNavigate();
    const token = localStorage.getItem('jwt');
    const cleanToken = token ? token.replace('Token: ', '') : '';
    console.log('JWT Token:', cleanToken);
    const [maindata, setMaindata] = useState('');

    useEffect(() => {
        const mainData = async () => {
            try {
                const response = await axios.get(`http://${api}/api/v1/main/authentication`, {
                    headers: {
                        Authorization: `${cleanToken}`,
                    },
                });

                console.log(response.data);
                setMaindata(response.data);
            } catch (error) {
                console.error('There was an error', error);
            }
        };

        mainData();
    }, []);

    console.log(maindata);

    const handleQnA = () => {
        navigate(`/qna`);
    };

    const handleAlarm = () => {
        navigate(`/notifications`);
    };

    return (
        <div className='relative w-screen h-screen overflow-hidden'>
            {/* 배경 디자인 컴포넌트 */}
            <Side />

            <div className='fixed top-0 left-[765px] w-[512px] h-[calc(100vh-88px)] bg-[#F9F8F8] shadow-2xl rounded-[30px] p-6 overflow-y-auto no-scrollbar z-10'>
             
                <div className='absolute top-0 left-0 w-full h-[340px] bg-[#24A064] rounded-[30px] p-6'>
                    <div className='text-white text-[28px] mt-8 font-base'>{maindata.profileMemberName} 님,</div>

                    <div className='text-white text-[32px] mt-2 font-bold'>그룸과 함께 하신 지</div>
                    <div className='text-white text-[28px] mt-2 font-base'>{maindata.joinDate}일 됐어요</div>

                    <div className='mt-[-140px] ml-[340px] absolute w-28 h-28'>
                        <img src={grwmy} alt='mainIcon' />
                    </div>

                    <div className='mt-[20px] ml-[7px] absolute w-[450px] h-[102px]' onClick={handleAlarm}>
                        <button>
                            <img src={afterLogin} alt='mainLogin' />
                        </button>
                    </div>

                    <div className='absolute top-0  w-[460px] ml-[27px] items-center left-0 mt-[370px] h-[220px] bg-white rounded-[30px] p-6'>
                        <SliderFamous maindata={maindata} />
                    </div>

                    <div className='absolute top-0  w-[460px] ml-[27px] items-center left-0 mt-[625px] h-auto bg-white rounded-[30px] p-6'>
                        <SliderRecommend maindata={maindata} />
                    </div>

                    <div className='absolute top-0  w-[460px] ml-[27px] items-center left-0 mt-[1155px] h-auto bg-white rounded-[30px] p-6'>
                        <SliderReview maindata={maindata} />
                    </div>

                    <div className='flex flex-col fixed z-20 items-center bottom-20 right-30'>
                        <button onClick={handleQnA}>
                            <img src={qnaClickButton} className='w-20 h-20' />
                        </button>
                    </div>
                    <div className='flex flex-col flxed items-center justify-between'>
                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Main;
