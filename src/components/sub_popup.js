import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import grwmProfile from '../assets/img/grwmProfile.png';

const Subpopup = ({ name, onClose, onCancel }) => {
    return (
        <div className='absolute inset-0 flex items-center justify-center z-50'>
            <div className='bg-white p-6 rounded-lg shadow-lg w-[320px]'>
                <div className='flex flex-col items-center mb-4'>
                    <img src={grwmProfile} alt='Profile' className='w-24 h-24 mb-4' />
                    <p className='text-center mb-1'>
                        정말 <span className='font-bold'>{name}님</span>을
                    </p>
                    <p className='text-center'>구독 취소하시겠습니까?</p>
                </div>
                <div className='flex flex-col space-y-2'>
                    <button className='px-4 py-2 bg-green-500 text-white rounded-lg' onClick={onClose}>
                        구독 유지하기
                    </button>
                    <button
                        className='px-4 py-2 bg-white text-green-500 border border-green-500 rounded-lg'
                        onClick={onCancel}
                    >
                        구독 취소하기
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Subpopup;
