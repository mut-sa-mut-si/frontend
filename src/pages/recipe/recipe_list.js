import React, { useState } from "react";
import Side from "../../components/side";
import iconMedicine from "../../assets/img/icon_medicine.png";
import iconSkin from "../../assets/img/icon_skin.png";
import iconHealth from "../../assets/img/icon_health.png";
import Sidebar from "../../components/sidebar";
import { useNavigate } from 'react-router-dom';
import ChatPopup from "../../components/chat_popup";

function RecipeList() {
  const [selected, setSelected] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  const handleClick = (type) => {
    setSelected(type);
  };

  const buttonClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <Side />

      <div className="fixed top-0 left-[670px] w-[512px] h-[calc(100vh-3px)] bg-[#F9F8F8] shadow-2xl rounded-[30px] p-6 overflow-y-auto no-scrollbar z-10">
        <div className="font-bold mt-4 ml-2 text-[24px]">레시피</div>

        <div className="flex justify-center mt-4 mr-[83px]">
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

        <div className="items-center justify-center w-200 h-[300px] mt-[39px] rounded-[20px] bg-[#E7F2EC] ">
          <button onClick={buttonClick}>
            운동 전 스트레칭, 그렇게 하는 거 아니에요
          </button>
        </div>

        <ChatPopup isOpen={isModalOpen} onRequestClose={closeModal} />
      </div>

      <Sidebar />
    </div>
  );
}

export default RecipeList;
