import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


// Import images
import profile from '../../assets/img/profile.png';
import BackButton from '../../assets/img/backButton.png';
import ChatBox from '../../assets/img/chat_empty.png';

// Import Components
import Side from '../../components/side';
import Footer from '../../components/footer';

function ChatroomList() {
    const [selected, setSelected] = useState('SKIN');
    const [chatrooms, setChatrooms] = useState([]);
    const api = 'default-grwm-server-serv-1ac37-25678670-9aceb4885941.kr.lb.naverncp.com:8080';
    const token = localStorage.getItem('jwt');
    const cleanToken = token ? token.replace('Token: ', '') : '';
    const navigate = useNavigate();

    useEffect(() => {
        const fetchChatrooms = async () => {
            try {
                const response = await axios.get(`http://${api}/api/v1/chats`, {
                    headers: {
                        Authorization: `${cleanToken}`,
                    },
                    params: {
                        category: selected,
                    },
                });
                setChatrooms(response.data.chats);
                console.log(response.data.chats);
            } catch (error) {
                console.error('There was an error fetching the chat rooms!', error);
            }
        };

        fetchChatrooms();
    }, [selected]);

    const handleClick = (type) => {
        setSelected(type);
    };

    const openChatRoom = (roomId) => {
        navigate(`/chatroom/${roomId}`);
    };

    const handleBack = () => {
        console.log('Back button clicked');
        navigate(-1);
    };

 
    return (
        <div className='relative w-screen h-screen overflow-hidden'>
            <Side />
            <div className='fixed top-0 left-[765px] w-[512px] h-[calc(100vh-3px)] bg-[#FFFFFF] shadow-2xl rounded-[30px] flex flex-col overflow-hidden no-scrollbar z-10'>
                <div className='p-6 h-auto'>
                    <div className='mb-4 flex'>
                        <img
                            src={BackButton}
                            alt='BackButton'
                            className='w-7 h-7 mr-2 cursor-pointer'
                            onClick={handleBack}
                        />
                        <p className='text-2xl'>채팅</p>
                    </div>
                    <div className='mt-6 h-auto'>
                        {chatrooms.length > 0 ? (
                            chatrooms.map((chatroom) => (
                                <button
                                    key={chatroom.id}
                                    className='flex items-center p-4 mb-4 bg-[#EDF7F2] rounded-[20px] w-full text-left'
                                    onClick={() => openChatRoom(chatroom.id)}
                                >
                                    <img src={profile} alt='Profile' className='w-10 h-10 rounded-full mr-4' />
                                    <div>
                                        <div className='font-bold'>{chatroom.member.name}</div>
                                        <div className='text-gray-600'>{chatroom.lastMessage}</div>
                                    </div>
                                </button>
                            ))
                        ) : (
                            <div className='flex flex-col items-center justify-center h-full pt-10'>
                                <img src={ChatBox} alt='chatbox' className='w-1/2 mt-10' />
                                <p className='text-2xl text-center'>아직 채팅이 없어요</p>
                            </div>
                        )}
                    </div>
                </div>
                <div className='flex flex-col flxed items-center justify-between'>
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default ChatroomList;
