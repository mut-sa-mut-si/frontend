import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

// Import images
import BackButton from '../../assets/img/backButton.png';
import KakaoPay from '../../assets/img/kakaopay.png';
import grwmProfile from '../../assets/img/grwmProfile.png';

// Import component
import Side from '../../components/side';

// axios로 api 가져오기
const api = axios.create({
    baseURL: 'http://default-grwm-server-serv-1ac37-25678670-9aceb4885941.kr.lb.naverncp.com:8080/',
});

function SubPurchase() {
    const [data, setData] = useState('');
    const [pay, setPay] = useState('1개월 결제');
    const [totalAmount, setTotalAmount] = useState(1900);
    const [name, setName] = useState('');
    const { id } = useParams();
    const token = localStorage.getItem('jwt');
    const cleanToken = token ? token.replace('Token: ', '') : '';
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    };

    useEffect(() => {
        if (pay === '1개월 결제') {
            setTotalAmount(1900);
        } else {
            setTotalAmount(20000);
        }
    }, [pay]);

    useEffect(() => {
        const fetchSub = async () => {
            try {
                const response = await api.get(`api/v1/members/${id}/click-subscribe`);
                setName(response.data);
                console.log('Fetch name: ', response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchSub();
    }, [id]);

    const handlePay = async () => {
        const requestBody = {
            memberId: id,
            itemName: pay,
            totalAmount: totalAmount,
        };

        try {
            const response = await api.post('api/v1/payment', requestBody, {
                headers: {
                    Authorization: `${cleanToken}`,
                },
            });
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='relative w-screen h-screen'>
            {/* 배경 디자인 컴포넌트 */}
            <Side />
            <div className='fixed top-0 left-[765px] w-[512px] h-[calc(100vh-3px)] p-6 bg-[#FFFFFF] shadow-2xl rounded-[30px] z-10 overflow-y-auto'>
                {/* 상단 바 */}
                <div className='flex items-center mb-10'>
                    <img src={BackButton} alt='Back' onClick={handleBack} className='w-6 h-6 cursor-pointer' />
                    <p className='ml-2 text-lg'>결제하기</p>
                </div>
                <div className='flex items-center justify-center mb-10'>
                    <img src={grwmProfile} alt='Profile' className='w-1/3 h-1/5 mr-2' />
                    <p className='text-2xl font-bold'>
                        <span className='text-green-600'>{name.memberName}</span>님 구독하기
                    </p>
                </div>
                <div
                    className={`w-4/5 mx-auto border p-4 mb-4 rounded-lg cursor-pointer ${
                        pay === '1개월 결제' ? 'border-green-500' : 'border-gray-300'
                    }`}
                    onClick={() => setPay('1개월 결제')}
                >
                    <div className={`flex justify-between items-center `}>
                        <p className='font-bold text-lg '>1개월</p>
                        <p>
                            <span className='font-bold'>₩1,900</span>/월
                        </p>
                    </div>
                    <p className='text-gray-300'>다음 결제일 : 2024.9.7</p>
                </div>
                <div
                    className={`w-4/5 mx-auto border p-4 mb-4 rounded-lg cursor-pointer ${
                        pay === '1년 결제' ? 'border-green-500' : 'border-gray-300'
                    }`}
                    onClick={() => setPay('1년 결제')}
                >
                    <div className='flex justify-between items-center '>
                        <p className='font-bold text-lg '>1년 결제</p>
                        <p>
                            <span className='line-through text-xs mr-2'>₩22,800</span>
                            <span className='font-bold'>₩20,000</span>/년
                        </p>
                    </div>
                    <p className='text-gray-300'>다음 결제일 : 2025.8.7</p>
                </div>
            </div>
            <div className='fixed bottom-0 left-[765px] w-[512px] p-6 bg-white rounded-b-2xl z-20'>
                <div className='w-5/6 mx-auto flex font-bold mb-4'>
                    <p>오늘 결제 총액</p>
                    <p className='ml-auto'>{pay === '1개월 결제' ? '₩1,900' : '₩20,000'}</p>
                </div>
                <div className='mb-4'>
                    <button
                        className='w-4/5 mx-auto flex items-center bg-[#FEEB00] p-4 rounded-lg justify-center'
                        onClick={handlePay}
                    >
                        <img src={KakaoPay} alt='Pay' className='w-15 h-8 mr-2' />
                        <p className='font-bold text-lg'>카카오페이로 결제하기</p>
                    </button>
                </div>
                <div className='text-gray-300 text-sm text-center flex flex-col items-center'>
                    <p>
                        갱신일 <span className='font-bold'>최소 하루전까지</span> 얼마든지 취소할 수 있습니다
                    </p>
                    <p>취소할 때까지 구독이 자동으로 갱신됩니다</p>
                </div>
            </div>
        </div>
    );
}

export default SubPurchase;
