import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const ChatPopup = ({ isOpen, onRequestClose, category }) => {
  const popupRef = useRef();
  const navigate = useNavigate();
  const { memberId } = useParams(); // memberId 받아옴

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      onRequestClose();
    }
  };
 
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const api = 'default-grwm-server-serv-1ac37-25678670-9aceb4885941.kr.lb.naverncp.com:8080';
  const token = localStorage.getItem('jwt');

  const cleanToken = token ? token.replace('Token: ', '') : '';

  console.log('JWT Token:', cleanToken);
  const finalCategory = category || 'SKIN';
  const handleJoinChat = async () => {
    try {
      const response = await axios.post(`http://${api}/api/v1/chats`, {}, {
        params: {
          memberId: 1,
          category: finalCategory,
        },
        headers: {
          'Authorization': `${cleanToken}`,
        },
      });
      console.log('Chat room created:', response.data);
      console.log(memberId);
      onRequestClose();
      navigate(`/chatroom/${response.data.roomId}`);
    } catch (error) {
      console.error('There was an error creating the chat room!', error);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      ref={popupRef}
      style={{
        position: 'absolute',
        width: '400px',
        height: '300px',
        bottom: '3%',
        left: '50%',
        transform: 'translateX(-50%)',
        padding: '20px',
        borderRadius: '30px',
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        zIndex: 1000
      }}
    >
      <div className="text-center mt-6">
        <h2 className="font-bold text-[24px] mb-28">{`${1}님과의 1:1 채팅방에 입장하시겠어요?`}</h2>
        <button
          onClick={handleJoinChat}
          className=" px-10 py-2 text-white w-[300px] text-[20px] font-bold h-14 bg-[#56C08C] rounded-[20px]"
        >
          입장하기
        </button>
      </div>
    </div>
  );
};

export default ChatPopup;
