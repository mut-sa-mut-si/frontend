import React, { useEffect, useRef } from 'react';

const ChatPopup = ({ isOpen, onRequestClose }) => {
  const popupRef = useRef();

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
        <h2 className="font-bold text-[24px] mb-28">김진우님과의 1:1 채팅방에 입장하시겠어요?</h2>
        <button
          onClick={onRequestClose}
          className=" px-10 py-2 text-white w-[300px] text-[20px] font-bold h-14 bg-[#56C08C] rounded-[20px]"
        >
          입장하기
        </button>
      </div>
    </div>
  );
};

export default ChatPopup;
