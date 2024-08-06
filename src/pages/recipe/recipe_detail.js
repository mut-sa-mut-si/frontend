import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Side from '../../components/side';
import Sidebar from '../../components/sidebar';
import Back from '../../assets/img/back_.png';
import Slider from 'react-slick'; // Import Slider
import 'slick-carousel/slick/slick.css'; // Import slick styles
import 'slick-carousel/slick/slick-theme.css';
import profile from '../../assets/img/profile.png';
import styled from 'styled-components';
import LoginPopup from '../../components/login_popup';
import numcomment from '../../assets/img/numcomment.png';
import ChatPopup from '../../components/chat_popup';
import { FaStar } from 'react-icons/fa';
import imgDetail from '../../assets/img/img_detail.png';
import Review from '../../components/review';
import scrapTrue from '../../assets/img/scrapTrue.png';
import lockIcon from '../../assets/img/lockIcon.png';
import scrapFalse from '../../assets/img/scrapFalse.png';
import MymainOther from '../mypage/mymain_other';
import Footer from '../../components/footer';

const ReviewContainer = styled.div`
    width: 100%;
    height: 600px; /* Adjust height as needed */
    border-radius: 8px;
    padding: 16px;

    margin-top: 20px; /* Adjust margin as needed */
    overflow-y: auto;
    scrollbar-width: none; /* For Firefox */
    -ms-overflow-style: none; /* For Internet Explorer and Edge */

    &::-webkit-scrollbar {
        display: none; /* For Chrome, Safari, and Opera */
    }
`;

function RecipeDetail() {
    const { id } = useParams();

    const [detail, setDetail] = useState({});
    const [score, setScore] = useState([false, false, false, false, false]); //별점
    const Array = [0, 1, 2, 3, 4];
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(0); // 별점 값
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isScraped, setIsScraped] = useState(false);
    const [memberId, setMemberId] = useState(null); // memberId 상태 추가
    const api = 'default-grwm-server-serv-1ac37-25678670-9aceb4885941.kr.lb.naverncp.com:8080';
    const token = localStorage.getItem('jwt');
    const cleanToken = token ? token.replace('Token: ', '') : '';

    const navigate = useNavigate();
    console.log('JWT Token:', cleanToken);

    useEffect(() => {
        const localScrapStatus = localStorage.getItem(`scrapStatus-${id}`);
        if (localScrapStatus) {
            setIsScraped(localScrapStatus === 'true');
        }
        recipeDetail();
    }, [id]);

    const saveReview = (e) => {
        setReview(e.target.value);
    };

    const handleClick = () => {
        if (token) {
            setIsLoginPopupOpen(true);
        }
    };

    const closeLoginPopup = () => {
        setIsLoginPopupOpen(false);
    };

    const [isLoginPopupOpen, setIsLoginPopupOpen] = React.useState(false);

    const buttonClick = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const pushReviewList = async () => {
        if (review.trim()) {
            try {
                const response = await axios.post(
                    `http://${api}/api/v1/recipes/${id}/reviews`,
                    {
                        content: review.trim(),
                        rating: rating,
                    },
                    {
                        headers: {
                            Authorization: `${cleanToken}`,
                        },
                    }
                );

                console.log('Review posted:', response.data);
                setDetail((prevDetail) => ({
                    ...prevDetail,
                    reviews: [...prevDetail.reviews, response.data],
                }));
                setReview('');
                setScore([false, false, false, false, false]);
                setRating(0);
                recipeDetail();
            } catch (error) {
                console.error('There was an error posting the review', error);
            }
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            pushReviewList();
        }
    };

    const starScore = (index) => {
        let star = [...score];
        for (let i = 0; i < 5; i++) {
            star[i] = i <= index ? true : false;
        }
        setScore(star);
        setRating(index + 1);
    };
    const handleProfileClick = (memberId) => {
        navigate(`/mymain/${memberId}`);
    };

    //상세조회
    const recipeDetail = async () => {
        try {
            const response = await axios.get(`http://${api}/api/v1/recipes/${id}/authentication`, {
                headers: {
                    Authorization: `${cleanToken}`,
                },
            });
            console.log(response.data);
            setIsScraped(response.data.scraped);
            setDetail(response.data);
        } catch (error) {
            console.error('There was an error', error);
        }
    };

    useEffect(() => {
        recipeDetail();
    }, []);

    const toggleScrap = async () => {
        try {
            if (isScraped) {
                await axios.delete(`http://${api}/api/v1/recipes/${id}/scraps`, {
                    headers: {
                        Authorization: `${cleanToken}`,
                    },
                });
            } else {
                await axios.post(
                    `http://${api}/api/v1/recipes/${id}/scraps`,
                    {},
                    {
                        headers: {
                            Authorization: `${cleanToken}`,
                        },
                    }
                );
            }
            setIsScraped(!isScraped); // 스크랩 상태를 토글
        } catch (error) {
            console.error('There was an error toggling the scrap status', error);
        }
    };
    const settings = {
        dots: true,
        infinite: detail.images && detail.images.length > 1,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: detail.images && detail.images.length > 1,
        autoplaySpeed: 3000,
    };

    return (
        <div className='relative w-screen h-screen overflow-hidden'>
            {/* 배경 디자인 컴포넌트 */}
            <Side className='hidden sm:block' />
            <div className='fixed top-0 left-0 sm:left-[765px] sm:w-[512px] h-[calc(100vh-3px)] w-full bg-[#F9F8F8] shadow-2xl rounded-[30px] p-6 overflow-y-auto no-scrollbar z-10'>
                <div className='flex items-center  justify-between'>
                    <button className='w-6 h-6 mr-2 mb-4'>
                        <img src={Back} alt='Back' onClick={() => navigate(-1)} />
                    </button>
                </div>

                <div>
                    <div className='font-bold text-[22px] mt-4'>{detail.title}</div>

                    <Slider {...settings} key={detail.images ? detail.images.length : 0}>
                        {detail.images &&
                            detail.images.map((img, index) => (
                                <div key={index}>
                                    <img
                                        src={img.src}
                                        alt={`Slide ${index}`}
                                        className='w-full h-[300px] object-cover rounded-[20px]'
                                    />
                                </div>
                            ))}
                    </Slider>

                    <div className='font-bold text-[18px] flex items-center justify-between h-12 mt-4 rounded-[10px] px-2'>
                        {detail.member && (
                            <>
                                <div onClick={() => handleProfileClick(detail.member.id)}>
                                    <img src={profile} alt='profile' className='w-12 h-12' />
                                    <span className='mr-52'>{detail.member.name}</span>
                                </div>
                            </>
                        )}
                        <button
                            onClick={buttonClick}
                            className='flex items-center justify-center w-20 h-12 rounded-[20px] bg-[#E7F2EC]'
                        >
                            1:1채팅
                        </button>
                    </div>

                    <div className='ml-20 text-[16px] font-bold text-[#A9A9A9]'>{detail.recipeCount}개의 레시피</div>

                    <div className='font-bold text-[15px] flex items-center justify-center w-200 min-h-40 mt-4  border bg-[#E7F2EC] rounded-[10px]'>
                        {detail.content}
                    </div>

                    <div className='flex flex-wrap mt-4'>
                        {detail.hashtags && detail.hashtags.length > 0 ? (
                            detail.hashtags.map((tag, index) => (
                                <div
                                    key={tag.id}
                                    className='font-bold text-[15px] flex items-center justify-center w-auto h-12 px-4 mr-2 mb-2 border bg-[#E7F2EC] rounded-[15px]'
                                >
                                    #{tag.content}
                                </div>
                            ))
                        ) : (
                            <div>태그가 없습니다.</div>
                        )}
                    </div>

                    <div className='flex items-center mt-8 ml-4'>
                        <div className='font-bold text-[18px]'>후기 {detail.reviewCount}개</div>
                        <img src={numcomment} alt='numcomment' className='w-12 ml-2' />

                        <div className='ml-16 font-bold text-[18px] mt-1 mr-2'>{detail.ratingAverage}</div>
                        <FaStar size='24' color='gold' />

                        <button
                            onClick={toggleScrap}
                            className={`ml-auto right-0 border border-[#14AE63] rounded-xl p-2 w-28 h-10 ${
                                isScraped ? 'bg-white text-[#14AE63]' : 'bg-[#14AE63] text-white '
                            }`}
                        >
                            {isScraped ? '스크랩취소' : '스크랩'}
                            {/*<img src={isScraped ? scrapTrue : scrapFalse} alt='Scrap Icon' className='w-full h-full' /> */}
                        </button>
                    </div>

                    <ReviewContainer>
                        <Review reviewList={detail.reviews || []} />
                    </ReviewContainer>

                    <div className='flex flex-col mt-4'>
                        <input
                            onClick={handleClick}
                            readOnly
                            className='font-bold text-[15px] flex items-center justify-center w-full h-16 border bg-[#E7F2EC] rounded-[30px] p-2 '
                            placeholder='로그인 후 후기를 남겨보세요'
                        />
                        {isLoginPopupOpen && <LoginPopup onClose={closeLoginPopup} />}
                    </div>
                </div>

                <ChatPopup isOpen={isModalOpen} onRequestClose={closeModal} detail={detail} />
            </div>
        </div>
    );
}

export default RecipeDetail;
