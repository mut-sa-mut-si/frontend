import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const ChatPopup = ({ isOpen, onRequestClose, category, detail, memberId}) => {
  const popupRef = useRef();
  const navigate = useNavigate();

  console.log(memberId);
  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      onRequestClose();
    }
  };
 console.log(detail)
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
  const finalCategory = detail.category || category;
  const finalMemberId = detail.member ? detail.member.id : memberId;



  console.log(detail.category);
  console.log(finalMemberId);
  const handleJoinChat = async () => {
    try {
      const response = await axios.post(`http://${api}/api/v1/chats`, {}, {
        params: {
          memberId: finalMemberId,
          category: finalCategory,
        },
        headers: {
          'Authorization': `${cleanToken}`,
        },
      });
      console.log('Chat room created:', response.data);
      console.log(memberId);
      onRequestClose();
      navigate(`/chatroom`);
    } catch (error) {
      console.error('There was an error creating the chat room!', error);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className='fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50' >
            <div ref={popupRef}  className='bg-white p-6 rounded-lg shadow-lg w-auto'>
      
      
       {detail.member && (
      <div className="text-center mt-6">
        <h2 className="font-bold text-[24px] mb-28">{detail.member.name}님과의 1:1 채팅방에 입장하시겠어요?</h2>
        <button
          onClick={handleJoinChat}
          className="px-10 py-2 text-white w-[300px] text-[20px] font-bold h-14 bg-[#56C08C] rounded-[20px]"
        >
          입장하기
        </button>
      </div>
    )}
  </div>
  </div>
);
};


export default ChatPopup;