import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useParams,useNavigate } from 'react-router-dom';

// Import Component
import Side from '../../components/side';

// Import images
import profileImage from '../../assets/img/profile.png'; 


// axios로 api 가져오기
const api = axios.create({
  baseURL: 'http://default-grwm-server-serv-1ac37-25678670-9aceb4885941.kr.lb.naverncp.com:8080/',
});

function SubComplete() {
  const navigate = useNavigate();
  const {id} = useParams();
  const [name, setName] = useState('');
  const token = localStorage.getItem('jwt');
  const cleanToken = token ? token.replace('Token: ', '') : '';

  const handleClick = () => {
    navigate(`/main`);
  }
  
    useEffect(() => {
      const subName = async () => {
          try {
              const response = await api.get(`api/v1/members/${id}/click-subscribe`);
              setName(response.data);
              console.log('Fetch name: ', response.data);
          } catch (error) {
              console.error(error);
          }
      };
      subName();
  }, [id]);

  
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* 배경 디자인 컴포넌트 */}
      <Side />
        <div className="fixed top-0 left-[765px] w-[512px] h-[calc(100vh-3px)] bg-[#FFFFFF] shadow-2xl rounded-[30px] p-6 overflow-y-auto no-scrollbar z-10">
        {/* 초록색 박스 */}
            <div className="flex items-center justify-center h-full">
            <div className="text-center p-8 w-full">
                <div className="mb-4">
                <img src={profileImage} alt="Dino" className="w-32 mx-auto" />
                </div>
                <div className="text-3xl font-bold mb-3">결제완료!</div>
                <div className="text-xl mb-4 py-2 ">
                    이제 {name.memberName}님의 레시피를
                    <br />
                    전부 열람할 수 있어요
                </div>
                <div className='py-20'>
                <button
                onClick={handleClick}
                className="bg-[#14AE63] text-white py-4 px-20 rounded-2xl hover:bg-[#0E7B46]">
                홈으로 돌아가기
                </button>
                </div>
            </div>
            </div>
        </div>
    </div>
  );
}

export default SubComplete;