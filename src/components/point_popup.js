import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PointPopup = ({ onClose, id }) => {
    const navigate = useNavigate();
    const popupRef = useRef();
    const [pointData, setPointData] = useState({});
    const [error, setError] = useState('');
    const token = localStorage.getItem('jwt');
    const cleanToken = token ? token.replace('Token: ', '') : '';
    const api = 'default-grwm-server-serv-1ac37-25678670-9aceb4885941.kr.lb.naverncp.com:8080';
console.log(id)

    const handleClickOutside = (event) => {
        if (popupRef.current && !popupRef.current.contains(event.target)) {
            onClose(); // onClose prop을 호출하여 팝업을 닫음
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const fetchPointData = async () => {
            try {
                const response = await axios.get(`http://${api}/api/v1/recipes/${id}/lock`, {
                    headers: {
                        Authorization: `${cleanToken}`,
                    },
                });
                console.log(response.data);
                setPointData(response.data);
            } catch (error) {
                console.error('There was an error', error);
            }
        };

        fetchPointData();
    }, [id, cleanToken, api]);
    const handleUsePoints = async () => {
        if (pointData.point >= 120) {
            try {
                await axios.post(
                    `http://${api}/api/v1/recipes/${id}/read-private`,
                    {},
                    {
                        headers: {
                            Authorization: `${cleanToken}`,
                        },
                    }
                );
                navigate(`/recipeDetail/${id}`);
                onClose(); // 팝업 닫기
            } catch (error) {
                console.error('There was an error', error);
                setError('포인트 사용 중 오류가 발생했습니다.');
            }
        } else {
            setError('포인트가 부족합니다.');
        }
    };


    return (
        <div ref={popupRef} style={{
            position: 'fixed',
            bottom: '30%',
            left: '50%',
            transform: 'translate(-50%, 50%)',
            width: '400px',
            height: '400px',
            padding: '20px',
            borderRadius: '30px',
            backgroundColor: '#fff',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            zIndex: 100000
        }}>
            <div className="text-center mt-6">
                <p className="text-center text-[24px] font-bold mb-4"><span className="text-[#56C08C]">120 그룸 포인트</span>를 사용해</p>
                <p className="text-center text-lg mb-4">레시피를 확인해보시겠어요?</p>
                
                <div className="text-center text-sm text-gray-700 mb-4">
                    <p>{pointData.member?.name}님을 구독해</p>
                    <p>그룸 포인트 지불 없이 레시피를 볼 수도 있어요</p>
                </div>

                <div className="text-center text-sm text-gray-700 mb-4">
                    <p>보유 그룸 포인트 <span className="text-[#56C08C] font-bold">{pointData.point}</span></p>
                </div>

                {error && <p className="text-center text-red-500">{error}</p>}
                
                <button
                    onClick={handleUsePoints}
                    className="px-10 py-2 w-[300px] mt-10 text-[18px] font-bold h-14 bg-[#56C08C] text-white rounded-[20px]"
                >
                    그룸 포인트 사용
                </button>
            </div>
        </div>
    );
};

export default PointPopup;
