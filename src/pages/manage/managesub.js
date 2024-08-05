import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

// Import images
import BackButton from '../../assets/img/backButton.png';
import grwmProfile from '../../assets/img/grwmProfile.png';

// Import Component
import Side from '../../components/side';

const api = axios.create({
    baseURL: 'http://default-grwm-server-serv-1ac37-25678670-9aceb4885941.kr.lb.naverncp.com:8080/',
});

function ManageSub() {
    const [data, setData] = useState('');
    const [selectedSub, setSelectedSub] = useState(null);
    const [selectedSubID, setSelectedSubID] = useState(null);
    const { id } = useParams();
    const token = localStorage.getItem('jwt');
    const cleanToken = token ? token.replace('Token: ', '') : '';
    const navigate = useNavigate();

    // 마이페이지 구독관리 정보 data에 저장
    useEffect(() => {
        const fetchMySub = async () => {
            try {
                const response = await api.get(`api/v1/main/${id}/subscribes`, {
                    headers: {
                        Authorization: `${cleanToken}`,
                    },
                });
                setData(response.data);
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchMySub();
    }, [id]);

    const handleBack = () => {
        navigate(-1);
    };

    const handleCancel = (name, id) => {
        setSelectedSub(name);
        setSelectedSubID(id);
    };

    return (
        <div className='relative w-screen h-screen'>
            {/* 배경 디자인 컴포넌트 */}
            <Side />
            <div className='fixed top-0 left-[765px] w-[512px] h-[calc(100vh-3px)] bg-[#FFFFFF] shadow-2xl rounded-[30px] z-10'>
                {/* 상단 바 */}
                <div className='flex items-center p-4'>
                    <img src={BackButton} onClick={handleBack} className='cursor-pointer w-6 h-6 mr-2' alt='Back' />
                    <p className='ml-4 text-lg font-bold'>구독 관리</p>
                </div>
                <div className='p-10'>
                    {data.subscribers && data.subscribers.length > 0 ? (
                        data.subscribers.map((subscriber) => (
                            <div key={subscriber.id} className='flex items-center p-4 mb-3 bg-green-100 rounded-lg'>
                                <img src={grwmProfile} alt='Profile' className='w-12 h-12 rounded-full' />
                                <p className='ml-4 text-lg'>{subscriber.name}</p>
                                <button
                                    className='ml-auto text-s px-4 py-2 bg-green-500 text-white rounded-lg'
                                    onClick={() => handleCancel(subscriber.name, subscriber.id)}
                                >
                                    구독 취소
                                </button>
                            </div>
                        ))
                    ) : (
                        <div>id : {id}</div>
                    )}
                </div>
                {selectedSub && (
                    <CancelSub
                        name={selectedSub}
                        setSelectedSub={setSelectedSub}
                        id_1={data.memberId}
                        id_2={selectedSubID}
                    />
                )}
            </div>
        </div>
    );
}

function CancelSub({ name, setSelectedSub, id_1, id_2 }) {
    const token = localStorage.getItem('jwt');
    const cleanToken = token ? token.replace('Token: ', '') : '';

    const onClose = () => {
        setSelectedSub(null);
    };

    const onCancel = async () => {
        try {
            const response = await api.delete(`api/v1/main/${id_1}/subscribes/${id_2}`, {
                headers: {
                    Authorization: `${cleanToken}`,
                },
            });
            console.log('Delete ', { name });
            setSelectedSub(null);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='absolute inset-0 flex items-center justify-center'>
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
}

export default ManageSub;
