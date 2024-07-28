import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Client } from '@stomp/stompjs';
import { Stomp } from "@stomp/stompjs";
import Side from '../../components/side';
import SockJS from 'sockjs-client';


const Chatroom = () => {
  // URL에서 채팅방 ID를 가져옴
  const { id } = useParams();
  const roomId = id;

  

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
    connect();
    fetchMessages();
    // 컴포넌트 언마운트 시 웹소켓 연결 해제
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


  // 기존 채팅 메시지를 서버로부터 가져오는 함수
  const fetchMessages = () => {
    axios
      .get(`http://${api}/api/v1/chats/${id}`, {
        headers: {
          'Authorization': `${cleanToken}`,
        },
     
      })
      .then((response) => {
        console.log("메시지 목록", response.data);
        console.log(id)
        const { chats } = response.data;
        setMemberId(response.data.meMember.id);
       
        setMessages(Array.isArray(chats) ? chats : []); // chats가 배열인지 확인
        fetchMessages();

      })
      .catch((error) => console.error("Failed to fetch chat messages.", error));
  };


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
  

console.log(memberId);
  // 새 메시지를 보내는 함수
  const sendMessage = () => {
    if (stompClient.current && stompClient.current.connected && message) {
      const messageObj = {
        memberId: memberId,
        message: message,
      };
      console.log('Sending message:', messageObj);
      stompClient.current.send(
        `/api/v1/chats/${roomId}/send`,
        { Authorization: `${cleanToken}` },
        JSON.stringify(messageObj)
      );
      setMessage(""); // 입력 필드 초기화
      console.log("Sent message:", messageObj);
      fetchMessages();
    } else {
      console.error("Failed to send message. WebSocket client is not connected or message is empty.");
    }
  };
  
  console.log(memberId);
  console.log(message);


  
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <Side />
      <div className="fixed top-0 left-[670px] w-[512px] h-[calc(100vh-3px)] bg-[#F9F8F8] shadow-2xl rounded-[30px] flex flex-col overflow-hidden no-scrollbar z-10">
        <div className="bg-[#6fbf73] p-4 text-white font-bold text-center">
          채팅방 {roomId}
        </div>
        <div className="flex-1 overflow-y-auto p-4" style={{ marginBottom: '100px' }}>
          {Array.isArray(messages) && messages.map((msg, index) => (
            <div key={index} className={`mb-4 p-2 ${msg.owner === 'me' ? 'bg-blue-200 text-right ml-auto' : 'bg-gray-200 text-left mr-auto'} rounded-lg w-fit max-w-[60%]`}>
              {msg.message}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="fixed bottom-0 left-[670px] w-[512px] bg-white border-t p-4 flex">
          <input
            type="text"
            className="flex-1 p-2 border rounded-lg"
            placeholder="메시지를 입력하세요"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            className="ml-2 p-2 bg-[#6fbf73] text-white rounded-lg"
            onClick={sendMessage}
          >
            보내기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatroom;