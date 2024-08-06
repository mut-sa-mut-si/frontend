import React, {useState} from 'react';

// Import Images
import grwmProfile from '../../src/assets/img/grwmProfile.png';
import { useNavigate } from 'react-router-dom';

// 구독하기 버튼
function SubPopUp1({name, id, onClose}) {
    const navigate=useNavigate();

    const handleSub = () => {
        navigate(`/subpurchase/${id}`);
    }

    return (
        <div className='fixed ml-[565px] inset-x-0 bottom-0 flex items-center justify-center z-50 mb-4'>
            <div className='bg-white p-6 rounded-lg shadow-lg w-[512px]'>
                <div className='flex flex-col items-center mb-4'>
                    <img src={grwmProfile} alt='Profile' className='w-24 h-24 mb-4' />
                    <p className='text-center mb-1'>
                        정말 구독하시겠습니까?
                    </p>
                </div>
                <div className='flex flex-col space-y-2'>
                    <button className='px-4 py-2 bg-[#14AE63] text-white rounded-lg hover:bg-[#0E7B46]' onClick={handleSub}>
                        네 구독할래요!
                    </button>
                    <button
                        className='px-4 py-2 bg-white text-[#14AE63] border border-[#14AE63] rounded-lg'
                        onClick={onClose}
                    >
                     아뇨 구독 안할래요
                    </button>
                </div>
            </div>
        </div>
    );

}

export default SubPopUp1;