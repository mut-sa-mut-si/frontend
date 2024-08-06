import React, {useState} from 'react';
import axios from 'axios';

// Import Images
import grwmProfile from '../../src/assets/img/grwmProfile.png';

// axios로 api 설정하기
const api = axios.create({
    baseURL: 'http://default-grwm-server-serv-1ac37-25678670-9aceb4885941.kr.lb.naverncp.com:8080/',
});

// 구독취소 버튼
function SubPopUp1({name, id, onClose}) {
    const [cancelComplete, setCancelComplete] = useState(false);
    const token = localStorage.getItem('jwt');
    const cleanToken = token ? token.replace('Token: ', '') : '';

    // 구독 취소 요청
    const handleCancel =  async () => {
        try {
            await api.delete(`api/v1/main/subscribes/${id}`, {
                headers: {
                    Authorization: `${cleanToken}`,
                },
            });
            console.log('Delete :', { name });
            setCancelComplete(true);
            
        } catch (error) {
            console.error(error);
        }
    };
        

    return (
   
        <div className='fixed ml-[565px] inset-x-0 bottom-0 flex items-center justify-center z-50 mb-4'>
            <div className='bg-white p-6 rounded-lg shadow-lg w-[512px]'>
                <div className='flex flex-col items-center mb-4'>
                    <img src={grwmProfile} alt='Profile' className='w-24 h-24 mb-4' />
                    <p className='text-center mb-1'>
                        정말 <span className='font-bold'>{name}님</span>을
                    </p>
                    <p className='text-center'>구독 취소하시겠습니까?</p>
                </div>
                <div className='flex flex-col space-y-2'>
                    <button className='px-4 py-2 bg-[#14AE63] text-white rounded-lg hover:bg-[#0E7B46]' onClick={handleCancel}>
                        네 구독취소할게요
                    </button>
                    <button
                        className='px-4 py-2 bg-white text-[#14AE63] border border-[#14AE63] rounded-lg'
                        onClick={onClose}
                    >
                        아뇨 다시 생각해볼게요
                    </button>
                </div>
                {cancelComplete && <CancelCompletPopUp /> }
            </div>
        </div>
    );

}

function CancelCompletPopUp() {
    return (
        <div className='bg-white p-6 rounded-lg shadow-lg w-[512px]'>
                <div className='flex flex-col items-center mb-4'>
            구독 취소 완료되었습니다.
        </div>
        </div>
    )
}

export default SubPopUp1;