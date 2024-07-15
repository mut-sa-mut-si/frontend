import React from 'react';
import { useState } from 'react';

// 사진 불러오기
import backButton from '../../assets/img/backButton.png';
import testImg from '../../assets/img/testimg.png';
import heartButton from '../../assets/img/heartButton.png';
import commentButton from '../../assets/img/commentButton.png';
import scrapButton from '../../assets/img/scrapButton.png';
import profileImg from '../../assets/img/prfileImg.png';

// 컴포넌트 불러오기
import CommentList from '../../components/comment';

function SkinDetail() {
    // 댓글 버튼 눌렀을 때

    return (
        <div className='min-h-screen flex items-center justify-center '>
            <div className='container w-[512px] border border-gray-color rounded-lg h-full'>
                <div className='flex-grow'>
                    <div className='relative'>
                        <button type='button' className='w-6 h-6 bg-opacity-0 fixed top-2 left-2'>
                            <img src={backButton} className='w-full h-full' alt='Back Button' />
                        </button>
                        <img src={testImg} className='w-[512px]' />
                    </div>

                    <div className='w-[512px] h-[60px]'>
                        <div className='flex items-center m-[20px]'>
                            <img src={profileImg} className='w-8 h-7 mr-3' />
                            <p className='w-[400px]'>닉네임</p>
                            <button type='button' className='w-8 h-6 mr-2'>
                                <img src={heartButton} className='w-full h-full' alt='Heart Button' />
                            </button>
                            <p className='mr-2'>52</p>
                            <button type='button' className='w-8 h-6 mr-2'>
                                <img src={commentButton} className='w-full h-full' alt='Comment Button' />
                            </button>
                            <p className='mr-2'>3</p>
                            <button type='button' className='w-8 h-6 mr-2'>
                                <img src={scrapButton} className='w-full h-full' alt='Scrap Button' />
                            </button>
                            <p>25</p>
                        </div>
                    </div>

                    <div className='m-[20px]'>
                        <p className='w-[512px]'>본문</p>
                        <p>본문</p>
                    </div>

                    <div className='m-3'>
                        <p className='text-main-color text-sm'>#해시태그</p>
                        <p className='text-gray-color text-xs'>7월 15일</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SkinDetail;
