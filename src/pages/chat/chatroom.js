import React, { useEffect, useRef, useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import axios from 'axios';

import back from '../../assets/img/back_.png';
import { Client } from '@stomp/stompjs';
import { Stomp } from "@stomp/stompjs";
import Side from '../../components/side';
import SockJS from 'sockjs-client';
import SendImg from '../../assets/img/chatSend.png';


const Chatroom = () => {
  // URL에서 채팅방 ID를 가져옴
  const { id } = useParams();
  const roomId = id;
  const [isSending, setIsSending] = useState(false);
  const navigate = useNavigate();
  

  // 채팅 메시지 상태
  const [messages, setMessages] = useState([]);

  // 메시지 입력 상태
  const [message, setMessage] = useState("");

  const stompClient = useRef(null);

  // 채팅 메시지 목록의 끝을 참조하는 ref. 이를 이용해 새 메시지가 추가될 때 스크롤을 이동
  const messagesEndRef = useRef(null);
  const [memberId, setMemberId] = useState("");
  const api = 'default-grwm-server-serv-1ac37-25678670-9aceb4885941.kr.lb.naverncp.com:8080';

  
  const token = localStorage.getItem('jwt');
  const cleanToken = token ? token.replace('Token: ', '') : '';

  useEffect(() => {
    fetchMessages();
    connect();
    return () => disconnect();
  }, [roomId]);

  // 메시지 목록이 업데이트될 때마다 스크롤을 최하단으로 이동시키는 함수
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // 웹소켓 연결 설정



  const disconnect = () => {
    if (stompClient.current) {
      stompClient.current.deactivate();
    }
  };


 
  const fetchMessages = () => {
    axios
      .get(`http://${api}/api/v1/chats/${id}`, {
        headers: {
          'Authorization': `${cleanToken}`,
        },
     
      })
      .then((response) => {
 
        const { chats } = response.data;
        setMemberId(response.data.meMember.id);
       
        setMessages(Array.isArray(chats) ? chats : []); // chats가 배열인지 확인
       

      })
      .catch((error) => console.error("Failed to fetch chat messages.", error));
  };

  fetchMessages();


const connect = () => {
  const socket = new SockJS(`http://${api}/connect`);
  stompClient.current = Stomp.over(socket);
  stompClient.current.connect({ Authorization: `${cleanToken}` }, (frame) => {
    console.log('Connected:', frame);
    stompClient.current.subscribe(`/chats/${roomId}`, (message) => {
      const newMessage = JSON.parse(message.body);
      console.log('Received:', newMessage);

      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });
  }, (error) => {
    console.error('WebSocket error:', error);
  });
};


  // 새 메시지를 보내는 함수
  const sendMessage = () => {
    if (stompClient.current && stompClient.current.connected && message.trim() && !isSending) {
      setIsSending(true);  // 로딩 상태로 설정
      const messageObj = {
        memberId: memberId,
        message: message.trim(),
      };
      console.log('Sending message:', messageObj);
      stompClient.current.send(
        `/api/v1/chats/${roomId}/send`,
        { Authorization: `${cleanToken}` },
        JSON.stringify(messageObj)
      );
     
      setMessage(""); // 입력 필드 초기화
      fetchMessages();
      console.log("Sent message:", messageObj);
      setTimeout(() => {
        setIsSending(false); // 로딩 상태 해제
      }, 500); // 500ms 후에 로딩 상태 해제
    } else {
      console.error("Failed to send message. WebSocket client is not connected, message is empty, or already sending.");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' || event.keyCode === 13) {
      event.preventDefault(); // Enter 키의 기본 동작(줄 바꿈)을 방지합니다.
      sendMessage();
      setMessage("");
    }
  };

  const handleBackClick = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <Side />
      <div className="fixed top-0 left-[670px] w-[512px] h-[calc(100vh-3px)] bg-[#F9F8F8] shadow-2xl rounded-[30px] flex flex-col overflow-hidden no-scrollbar z-10">
        <div className="bg-[#6fbf73] p-4 text-white font-bold text-center flex items-center justify-between">
          <img src={back} alt="back" className="w-6 h-6 cursor-pointer" onClick={handleBackClick}/>
          <span className="flex-grow text-center">채팅방 {roomId}</span>
          <div className="w-6 h-6"></div>
        </div>
        <div className="flex-1 overflow-y-auto p-4" style={{ marginBottom: '100px' }}>
        {Array.isArray(messages) && messages.map((msg, index) => {
            const time = new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            return (
              <div>
              <div key={index} className={`mb-4 p-4 ${msg.owner === 'me' ? 'bg-white text-right ml-auto' : 'bg-[#E7F2EC] text-left mr-auto'} rounded-[30px] w-fit max-w-[60%]`}>
                <div>{msg.message}</div>  <div><div className="text-xs text-gray-500 mt-1">{time}</div></div>
               
              </div>
            
              </div>
              
            );
          })}
          <div ref={messagesEndRef} />
        </div>
        <div className="fixed bottom-0 left-[670px] w-[512px] bg-white border-t p-4 flex">
          <input
            type="text"
  className="flex-1 p-2 border rounded-[30px] bg-[#E7F2EC] focus:border-[#E7F2EC] outline-none"
            placeholder="메시지를 입력하세요"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <button
            className='w-12 h-12'
            onClick={sendMessage}
            disabled={isSending} 
          >
              <img src={SendImg} alt="SendImg" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatroom;