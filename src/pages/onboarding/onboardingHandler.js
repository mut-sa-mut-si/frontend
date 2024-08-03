import React, { useState } from 'react';
import axios from 'axios';

// Import Components
import Side from '../../components/side';
import LoginInfo from './loginInfo';
import ChooseRecipe from './chooseRecipe';
import SkinDetail from './skinDetail';
import HealthDetail from './healthDetail';
import NutrientsDetail from './nutrientsDetail';

// 사진 가져오기
import BackButton from '../../assets/img/backButton.png';

// axios로 api 가져오기
const api = axios.create({
    baseURL: 'http://default-grwm-server-serv-1ac37-25678670-9aceb4885941.kr.lb.naverncp.com:8080/',
});

// 컴포넌트 핸들러
function OnboardingHandler() {
    const [step, setStep] = useState(0);

    // axios.post 해야하는 값들 부모 컴포넌트에 저장
    const [categories, setCategories] = useState(() => JSON.parse(localStorage.getItem('categories')) || []);
    const [skin, setSkin] = useState({ type: '', conditions: [] });
    const [health, setHealth] = useState([]);
    const [nutrients, setNutrients] = useState([]);

    const handleNext = () => {
        setStep(step + 1);
    };

    const handlePrevious = () => {
        if (step > 0) {
            setStep(step - 1);
        }
    };

    // categories 배열에 선택된 버튼 추가
    const handleSelectCategory = (category) => {
        setCategories((prev) =>
            prev.includes(category) ? prev.filter((item) => item !== category) : [...prev, category]
        );
    };

    // 완료 버튼 눌렸을 때
    const handleSubmit = async () => {
        const token = localStorage.getItem('jwt');
        const cleanToken = token ? token.replace('Token: ', '') : '';

        const data = {
            categories: categories.map((category) => ({ category })),
            skin: skin.type
                ? {
                      type: skin.type,
                      conditions: skin.conditions.map((condition) => ({ condition })),
                  }
                : null,
            health: health.length > 0 ? health.map((purpose) => ({ purpose })) : null,
            nutrients: nutrients.length > 0 ? nutrients.map((nutrient) => ({ nutrient })) : null,
        };

        // 완료 버튼 누르면 axios.post 하기
        const postOnbards = async () => {
            try {
                const res = await api.post(`api/v1/onboards`, data, {
                    headers: {
                        Authorization: `${cleanToken}`,
                    },
                });
                console.log(res.data);
            } catch (error) {
                console.error(error);
            }
        };
        postOnbards();
    };

    const isLastStep = step === categories.length + 1;

    // 페이지 순서
    const predefinedOrder = ['skin', 'health', 'nutrients'];

    // 뒤로가기 버튼 눌렸을 때 정보 저장
    const renderStepContent = () => {
        if (step === 0) return <LoginInfo onNext={handleNext} />;
        if (step === 1)
            return (
                <ChooseRecipe
                    onNext={handleNext}
                    onSelectCategory={handleSelectCategory}
                    selectedCategories={categories}
                />
            );

        const orderedCategories = predefinedOrder.filter((category) => categories.includes(category));
        const category = orderedCategories[step - 2];

        if (category === 'skin')
            return (
                <SkinDetail
                    skin={skin}
                    setSkin={setSkin}
                    onNext={isLastStep ? handleSubmit : handleNext}
                    button={isLastStep ? '완료' : '다음'}
                />
            );
        if (category === 'health')
            return (
                <HealthDetail
                    health={health}
                    setHealth={setHealth}
                    onNext={isLastStep ? handleSubmit : handleNext}
                    button={isLastStep ? '완료' : '다음'}
                />
            );
        if (category === 'nutrients')
            return (
                <NutrientsDetail
                    nutrients={nutrients}
                    setNutrients={setNutrients}
                    onNext={isLastStep ? handleSubmit : handleNext}
                    button={isLastStep ? '완료' : '다음'}
                />
            );
    };

    return (
        <div className='relative w-screen h-screen overflow-hidden'>
            {/* 배경 디자인 컴포넌트 */}
            <Side />
            <div className='fixed top-0 left-[765px] w-[512px] h-[calc(100vh-3px)] bg-[#FFFFFF] shadow-2xl rounded-[30px] p-6 overflow-y-auto no-scrollbar z-10'>
                {/* 초록색 박스 */}
                <button>
                    <img src={BackButton} onClick={handlePrevious} className='w-[20px] h-[20px]' alt='BackButton' />
                </button>
                {renderStepContent()}
            </div>
        </div>
    );
}

export default OnboardingHandler;
