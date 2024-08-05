import React, { useEffect, useState } from "react";
import axios from "axios";
import Side from "../../components/side";
import Back from '../../assets/img/back_.png';
import Profile from '../../assets/img/profile.png';
import { useNavigate } from 'react-router-dom';
import './Notification.css'; // 추가

const api = 'http://default-grwm-server-serv-1ac37-25678670-9aceb4885941.kr.lb.naverncp.com:8080';

function Notification() {
    const [reviewNotices, setReviewNotices] = useState([]);
    const [recipeNotices, setRecipeNotices] = useState([]);
    const [answerNotices, setAnswerNotices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [skeletonCount, setSkeletonCount] = useState(4); // 기본 스켈레톤 수

    const navigate = useNavigate();

    useEffect(() => {
        // 화면 높이에 따라 스켈레톤 UI의 개수 설정
        const updateSkeletonCount = () => {
            const containerHeight = window.innerHeight - 120; // 상단 및 하단 패딩을 고려한 높이
            const skeletonHeight = 80; // 각 스켈레톤 항목의 높이
            const count = Math.ceil(containerHeight / skeletonHeight);
            setSkeletonCount(count);
        };

        updateSkeletonCount();
        window.addEventListener('resize', updateSkeletonCount);

        findNotifications();

        return () => {
            window.removeEventListener('resize', updateSkeletonCount);
        };
    }, []);

    const findNotifications = async () => {
        const cleanToken = localStorage.getItem('jwt') ? localStorage.getItem('jwt').replace('Token: ', '') : '';
        try {
            const response = await axios.get(`${api}/api/v1/notifications`, {
                headers: {
                    'Authorization': `${cleanToken}`,
                },
            });
            setReviewNotices(response.data.reviewNotices);
            setRecipeNotices(response.data.recipeNotices);
            setAnswerNotices(response.data.answerNotices);
            setTimeout(() => {
                setLoading(false);
            }, 1000); // 1초 동안 스켈레톤 UI를 유지
            console.log(response);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    const handleBackClick = () => {
        navigate(-1);
    };

    const handleNoticeClick = async (type, id, noticeId) => {
        const cleanToken = localStorage.getItem('jwt') ? localStorage.getItem('jwt').replace('Token: ', '') : '';
        try {
            await axios.delete(`${api}/api/v1/notifications/${noticeId}`, {
                headers: {
                    'Authorization': `${cleanToken}`,
                },
                params: {
                    type: type
                }
            });
            findNotifications();
            if (type === 'review' || type === 'recipe') {
                navigate(`/recipeDetail/${id}`);
            } else if (type === 'answer') {
                navigate(`/qna/${id}`);
            }
        } catch (error) {
            console.error("Error deleting notification:", error);
        }
    };

    const renderNotices = (notices, type) => {
        return notices.map((notice) => (
            <div key={notice.id} className="flex flex-col items-start mb-6 cursor-pointer bg-white p-4 rounded-[20px] shadow-md" onClick={() => handleNoticeClick(type, type === 'answer' ? notice.question.id : notice.recipe.id, notice.id)}>
                <div className="flex items-center">
                    <img src={Profile} alt="Profile" className="w-12 h-12 rounded-full mr-4" />
                    <div>
                        <p className="font-bold">{notice.member.name}</p>
                        <p>
                            {type === 'review' && (
                                <>
                                    {notice.member.name}님이 <span style={{ color: '#0E7B46' }}>{notice.recipe.title}</span> 레시피에 후기를 남겼습니다.
                                </>
                            )}
                            {type === 'recipe' && (
                                <>
                                    {notice.member.name}님이 <span style={{ color: '#0E7B46' }}>{notice.recipe.title}</span> 레시피를 업로드했습니다.
                                </>
                            )}
                            {type === 'answer' && (
                                <>
                                    {notice.member.name}님이 <span style={{ color: '#0E7B46' }}>{notice.question.title}</span> 질문에 답변했습니다.
                                </>
                            )}
                        </p>
                    </div>
                </div>
            </div>
        ));
    };

    return (
        <div className="fixed w-screen h-screen overflow-hidden cursor-pointer">
            <Side />
            <div name="a" className="fixed top-0 left-[670px] w-[512px] h-[calc(100vh-3px)] bg-[#F9F8F8] shadow-2xl rounded-[30px] overflow-y-auto no-scrollbar z-10">
                <div className="sticky top-0 bg-[#F9F8F8] z-20 w-full p-6">
                    <div name="b" className="flex items-center mb-6 w-full">
                        <button className="w-8 h-8 rounded-[30px]">
                            <img src={Back} alt="Back" onClick={handleBackClick} />
                        </button>
                        <h1 className="text-2xl font-bold ml-4">알림</h1>
                    </div>
                </div>
                <div className="p-6">
                    {loading ? (
                        <div className="space-y-4">
                            {Array.from({ length: skeletonCount }).map((_, index) => (
                                <div key={index} className="bg-white rounded-[20px] p-4 shadow-md">
                                    <div className="flex items-center">
                                        <div className="w-12 h-12 rounded-full mr-4 animate-skeleton" />
                                        <div className="ml-4 flex-1">
                                            <div className="h-[24px] bg-[#e0e0e0] rounded animate-skeleton" />
                                            <div className="h-[16px] bg-[#e0e0e0] rounded animate-skeleton mt-2" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <>
                            {reviewNotices.length === 0 && recipeNotices.length === 0 && answerNotices.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full">
                                    <p className="text-lg font-bold text-gray-700 mb-4">다음에 알려드림</p>
                                    <button 
                                        onClick={() => navigate('/main')}
                                        className="bg-[#56C08C] text-white font-bold py-2 px-4 rounded-[30px]"
                                    >
                                        메인으로 돌아가기
                                    </button>
                                </div>
                            ) : (
                                <>
                                    {renderNotices(reviewNotices, 'review')}
                                    {renderNotices(recipeNotices, 'recipe')}
                                    {renderNotices(answerNotices, 'answer')}
                                </>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Notification;
