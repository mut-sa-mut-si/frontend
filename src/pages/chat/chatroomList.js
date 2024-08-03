import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Side from "../../components/side";
import axios from 'axios';
import iconMedicine from "../../assets/img/icon_medicine.png";
import iconSkin from "../../assets/img/icon_skin.png";
import iconHealth from "../../assets/img/icon_health.png";
import profile from '../../assets/img/profile.png';

function ChatroomList() {
  const [selected, setSelected] = useState("SKIN");
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
            'Authorization': `${cleanToken}`,
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
  }, [selected]); // 여기에 selected 추가

  const handleClick = (type) => {
    setSelected(type);
  };

  const openChatRoom = (roomId) => {
    navigate(`/chatroom/${roomId}`);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <Side />
      <div className="fixed top-0 left-[670px] w-[512px] h-[calc(100vh-3px)] bg-[#F9F8F8] shadow-2xl rounded-[30px] flex flex-col overflow-hidden no-scrollbar z-10">
        <div className="p-6 h-auto">
          <div className="text-2xl font-bold">채팅</div>
          <div className="flex justify-center mt-4">
            <button
              className={`w-28 h-12 font-bold flex items-center justify-center rounded-[20px] border ${selected === "skin" ? "border-[#56C08C]" : "border-gray-300"}`}
              onClick={() => handleClick("skin")}
            >
              <img src={iconSkin} alt="mainIcon" className="mr-4" />
              <div className="ml-8 absolute">피부</div>
            </button>

            <button
              className={`w-28 h-12 font-bold flex ml-4 items-center justify-center rounded-[20px] border ${selected === "health" ? "border-[#56C08C]" : "border-gray-300"}`}
              onClick={() => handleClick("health")}
            >
              <img src={iconHealth} alt="mainIcon" className="mr-2" />
              헬스
            </button>

            <button
              className={`w-28 h-12 font-bold flex ml-4 items-center justify-center rounded-[20px] border ${selected === "medicine" ? "border-[#56C08C]" : "border-gray-300"}`}
              onClick={() => handleClick("medicine")}
            >
              <img src={iconMedicine} alt="mainIcon" className="mr-2" />
              영양제
            </button>
          </div>
          <div className="mt-6 h-auto">
            {chatrooms.map((chatroom) => (
              <button
                key={chatroom.id}
                className="flex items-center p-4 mb-4 bg-[#EDF7F2] rounded-[20px] w-full text-left"
                onClick={() => openChatRoom(chatroom.id)}
              >
                <img src={profile} alt="avatar" className="w-10 h-10 rounded-full mr-4" />
                <div>
                  <div className="font-bold">{chatroom.member.name}</div>
                  <div className="text-gray-600">{chatroom.lastMessage}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatroomList;
