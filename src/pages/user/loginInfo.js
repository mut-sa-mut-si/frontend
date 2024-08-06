import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Side from '../../components/side';
import styles from '../../pages/user/loginInfo.css';

// 사진 가져오기
import GRWMCharacter from '../../assets/img/characterImg.png';
import BackButton from '../../assets/img/backButton.png';

// axios로 api 가져오기
const api = axios.create({
    baseURL: 'http://default-grwm-server-serv-1ac37-25678670-9aceb4885941.kr.lb.naverncp.com:8080/',
});

// 컴포넌트 핸들러
function HandleLoginInfo() {
    const [step, setStep] = useState(0);

    // axios.post 해야하는 값들 부모 컴포넌트에 저장
    const [categories, setCategories] = useState(() => JSON.parse(localStorage.getItem('categories')) || []);
    const [skin, setSkin] = useState({ type: '', condition: '' });
    const [health, setHealth] = useState({ weight: '', muscleWeight: '', threeWeight: '' });
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
        const data = {
            categories: categories.map((category) => ({ category })),
            skin: skin.type && skin.condition ? skin : null,
            health: health.weight && health.muscleWeight && health.threeWeight ? health : null,
            nutrients: nutrients ? nutrients.map((nutrient) => ({ nutrient })) : null,
        };

        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('jwt')}`, // 예시로 Authorization 헤더 추가
        };

        // 완료 버튼 누르면 axios.post 하기
        try {
            const res = await api.post(`/api/v1/login/onboards`, data);
            console.log('Success: ', res.data);

            const authorizationToken = res.headers['authorization'];
        } catch (error) {
            console.error('Error: ', error);
        }
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
            <Side className='hidden sm:block' />
            <div className='fixed top-0 left-0 sm:left-[765px] sm:w-[512px] h-[calc(100vh-3px)] w-full bg-[#F9F8F8] shadow-2xl rounded-[30px] p-6 overflow-y-auto no-scrollbar z-10'>
                {/* 초록색 박스 */}
                <button>
                    <img src={BackButton} onClick={handlePrevious} className='w-[20px] h-[20px]' alt='BackButton' />
                </button>
                {renderStepContent()}
            </div>
        </div>
    );
}

// 0페이지
function LoginInfo({ onNext }) {
    // const [loginMember, setLoginMember] = useState(''); // 로그인한 멤버 저장

    useEffect(() => {
        const fetchLoginInfo = async () => {
            try {
                const response = await api.get(`api/v1/login/onboards`);
                console.log(response.data);
                // setLoginMember(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchLoginInfo();
    }, []);

    return (
        <div className='flex flex-col justify-center h-full p-4'>
            <div className='mt-5 mb-8'>
                <h1 className='text-3xl font-ultrabold mb-2'>
                    <span className='font-ultrabold text-[#24A064]'>멋사멋시</span>님
                </h1>
                <h1 className='text-3xl font-ultrabold mb-2'>
                    <span className='font-ultrabold text-[#24A064]'>그룸</span>에 오신 것을 환영해요
                </h1>
            </div>
            <div>
                <h2 className='text-2xl mb-3 font-extrabold'>당신에 대해서 알려주세요</h2>
                <p className='text-gray-300 text-s mb-5'>
                    저에 대해서 먼저 알려드리면, 저는 <span className='font-bold'>그룸</span>이고...
                </p>
            </div>
            <div className='flex justify-center items-center'>
                <img src={GRWMCharacter} className='w-65 h-60 mb-3' alt='Character' />
            </div>
            <div className='flex justify-center items-center h-screen'>
                <button
                    onClick={onNext}
                    className='fixed bg-[#56C08C] bottom-30 text-white center font-bold py-2 px-4 w-[300px] h-[50px] rounded-full'
                >
                    다음
                </button>
            </div>
        </div>
    );
}

// 관심있는 레시피 선택 (1페이지)
function ChooseRecipe({ onSelectCategory, onNext, selectedCategories }) {
    const [categories, setCategories] = useState(selectedCategories);

    const handleSelect = (category) => {
        setCategories((prev) =>
            prev.includes(category) ? prev.filter((item) => item !== category) : [...prev, category]
        );
        onSelectCategory(category);
    };

    useEffect(() => {
        setCategories(selectedCategories);
    }, [selectedCategories]);

    return (
        <div className='flex flex-col justify-center h-full p-4'>
            <div className='mt-5 mb-8'>
                <h1 className=' text-3xl font-ultrabold mb-2'>관심있는</h1>
                <h1 className=' text-3xl font-ultrabold mb-2'>
                    <span className='font-ultrabold text-[#24A064]'>레시피</span>를 골라주세요
                </h1>
            </div>

            <div className='flex justify-center items-center mb-10'>
                <button
                    onClick={() => handleSelect('skin')}
                    className={
                        categories.includes('skin')
                            ? 'bg-[#56C08C] font-bold text-lg text-white w-[127px] h-[62px] rounded-2xl mx-2'
                            : 'bg-[#E7F2ED] font-bold text-lg w-[127px] h-[62px] rounded-2xl mx-2'
                    }
                >
                    피부
                </button>
                <button
                    onClick={() => handleSelect('health')}
                    className={
                        categories.includes('health')
                            ? 'bg-[#56C08C] font-bold text-lg text-white w-[127px] h-[62px] rounded-2xl mx-2'
                            : 'bg-[#E7F2ED] font-bold text-lg w-[127px] h-[62px] rounded-2xl mx-2'
                    }
                >
                    헬스
                </button>
                <button
                    onClick={() => handleSelect('nutrients')}
                    className={
                        categories.includes('nutrients')
                            ? 'bg-[#56C08C] font-bold text-lg text-white w-[127px] h-[62px] rounded-2xl mx-2'
                            : 'bg-[#E7F2ED] font-bold text-lg w-[127px] h-[62px] rounded-2xl mx-2'
                    }
                >
                    영양제
                </button>
            </div>

            <div className='flex justify-center items-center'>
                <img src={GRWMCharacter} className='w-65 h-60 mb-3' alt='Character' />
            </div>
            <div className='flex justify-center items-center h-screen'>
                <button
                    onClick={onNext}
                    className='fixed bottom-40 bg-[#56C08C] text-white center font-bold py-2 px-4 w-[300px] h-[50px] rounded-full'
                >
                    다음
                </button>
            </div>
        </div>
    );
}

// 피부 설문조사
function SkinDetail({ skin, setSkin, onNext, button }) {
    const handleTypeSelect = (selectedType) => {
        const newSkin = { ...skin, type: selectedType };
        setSkin(newSkin);
    };

    const handleConditionSelect = (selectedCondition) => {
        const newSkin = { ...skin, condition: selectedCondition };
        setSkin(newSkin);
    };

    return (
        <div className='flex flex-col justify-center h-full p-4'>
            <div className='mt-5 mb-3'>
                <h1 className='text-3xl font-ultrabold mb-2'>
                    피부 <span className='text-[#24A064]'>타입</span>과 <span className='text-[#24A064]'>상태</span>를
                    알려주세요
                </h1>
            </div>

            <div>
                <p className='m-4 text text-center text-gray-300'>제일 가까운 쪽으로 하나만 선택해주세요</p>
                <div className='flex'>
                    {['지성', '건성', '복합성'].map((type) => (
                        <button
                            key={type}
                            onClick={() => handleTypeSelect(type)}
                            className={`m-10 p-3 ${
                                skin.type === type
                                    ? 'bg-[#56C08C] font-bold text-lg text-white w-40 h-50 rounded-2xl mx-2'
                                    : 'bg-[#E7F2ED] font-bold text-lg w-40 h-50 rounded-2xl mx-2'
                            }`}
                        >
                            {type}
                        </button>
                    ))}
                </div>
            </div>

            <p>여러 고민이 있다면 선택해주세요</p>
            <div className='flex flex-col items-center'>
                {[
                    '민감성',
                    '여드름',
                    '블랙헤드',
                    '기미',
                    '모공',
                    '잡티',
                    '미백',
                    '주름',
                    '아토피',
                    '다크서클',
                    '기타',
                ].map((condition) => (
                    <button
                        key={condition}
                        onClick={() => handleConditionSelect(condition)}
                        className={`m-2 p-3 ${
                            skin.condition === condition
                                ? 'bg-[#56C08C] font-bold text-lg text-white w-[420px] h-50 rounded-2xl mx-2'
                                : 'bg-[#E7F2ED] font-bold text-lg w-[420px] h-50 rounded-2xl mx-2'
                        }`}
                    >
                        {condition}
                    </button>
                ))}
            </div>

            <div className='flex justify-center h-screen'>
                <button
                    onClick={onNext}
                    className='fixed bg-[#56C08C] bottom-40 text-white center font-bold py-2 px-4 w-[300px] h-[50px] rounded-full'
                >
                    {button}
                </button>
            </div>
        </div>
    );
}

// 헬스 설문조사
function HealthDetail({ health, setHealth, onNext, button }) {
    const handleInputChange = (field, value) => {
        setHealth((prevHealth) => ({
            ...prevHealth,
            [field]: value,
        }));
    };

    return (
        <div className='flex flex-col justify-center h-full p-4'>
            <div className='mt-5 mb-8'>
                <h1 className='text-3xl font-ultrabold mb-2'>헬스에 관심이 있으시군요</h1>
            </div>
            <div className='mb-4'>
                <div className='w-full mb-4'>
                    <p className='text-lg font-bold mb-1'>몸무게를 알려주세요</p>
                    <p className='text-gray-300 text-xs mb-2'>그룸이 못 본 척 해드릴게요</p>

                    <input
                        type='text'
                        placeholder='몸무게 입력하기'
                        value={health.weight}
                        onChange={(e) => handleInputChange('weight', e.target.value)}
                        className='w-full px-4 py-3 mb-4 rounded-xl bg-[#56C08C] placeholder-gray-400 bg-[#E7F2ED]'
                    />
                </div>
                <div className='w-full mb-4'>
                    <p className='text-lg font-bold mb-1'>근육량을 알려주세요</p>
                    <p className='text-gray-300 text-xs mb-2'>거짓말 치면 안 돼요</p>
                    <input
                        type='text'
                        placeholder='근육량 입력하기'
                        value={health.muscleWeight}
                        onChange={(e) => handleInputChange('muscleWeight', e.target.value)}
                        className='w-full px-4 py-3 mb-4 rounded-xl bg-[#56C08C] placeholder-gray-400 bg-[#E7F2ED]'
                    />
                </div>
                <div className='w-full mb-4'>
                    <p className='text-lg font-bold mb-1'>3대 운동 중량을 알려주세요</p>
                    <p className='text-gray-300 text-xs mb-2'>봉 무게는 조상님이 들어주시는 거 아니에요</p>
                    <input
                        type='text'
                        placeholder='3대 중량 입력하기'
                        value={health.threeWeight}
                        onChange={(e) => handleInputChange('threeWeight', e.target.value)}
                        className='w-full px-4 py-3 mb-4 rounded-xl bg-[#56C08C] placeholder-gray-400 bg-[#E7F2ED]'
                    />
                </div>
            </div>
            <div className='flex justify-center h-screen'>
                <button
                    onClick={onNext}
                    className='fixed bg-[#56C08C] bottom-40 text-white center font-bold py-2 px-4 w-[300px] h-[50px] rounded-full'
                >
                    {button}
                </button>
            </div>
        </div>
    );
}

// 영양제 설문조사
function NutrientsDetail({ nutrients, setNutrients, onNext, button }) {
    const handleSelect = (vitamin) => {
        setNutrients((prev) => (prev.includes(vitamin) ? prev.filter((item) => item !== vitamin) : [...prev, vitamin]));
    };

    return (
        <div className='flex flex-col justify-center h-full p-4'>
            <div className='mt-5 mb-8'>
                <h1 className='text-3xl font-ultrabold mb-2'>영양제는 먹을 나이는 없어요</h1>
                <p className='text-gray-300'>갈 때는 순서가 없어요</p>
            </div>

            <div className='mb-4'>
                <p className='text-xl font-bold mb-4'>어떤 영양제를 복용하고 있으신가요?</p>
                <div className='flex flex-w font-bold justify-center'>
                    <button
                        onClick={() => handleSelect('vitaminA')}
                        className={`m-2 p-3 rounded-2xl ${
                            nutrients.includes('vitaminA')
                                ? 'bg-[#56C08C] font-bold text-lg text-white w-[127px] h-[62px] rounded-2xl mx-2'
                                : 'bg-[#E7F2ED] font-bold text-lg w-[127px] h-[62px] rounded-2xl mx-2'
                        }`}
                    >
                        비타민A
                    </button>
                    <button
                        onClick={() => handleSelect('lutein')}
                        className={`m-2 p-3 rounded-2xl ${
                            nutrients.includes('lutein')
                                ? 'bg-[#56C08C] font-bold text-lg text-white w-[127px] h-[62px] rounded-2xl mx-2'
                                : 'bg-[#E7F2ED] font-bold text-lg w-[127px] h-[62px] rounded-2xl mx-2'
                        }`}
                    >
                        루테인
                    </button>
                    <button
                        onClick={() => handleSelect('vitaminB')}
                        className={`m-2 p-3 rounded-2xl ${
                            nutrients.includes('vitaminB')
                                ? 'bg-[#56C08C] font-bold text-lg text-white w-[127px] h-[62px] rounded-2xl mx-2'
                                : 'bg-[#E7F2ED] font-bold text-lg w-[127px] h-[62px] rounded-2xl mx-2'
                        }`}
                    >
                        비타민B
                    </button>
                </div>

                <div className='flex flex-w font-bold justify-center'>
                    <button
                        onClick={() => handleSelect('milkThistle')}
                        className={`m-2 p-3 rounded-2xl ${
                            nutrients.includes('milkThistle')
                                ? 'bg-[#56C08C] font-bold text-lg text-white w-[127px] h-[62px] rounded-2xl mx-2'
                                : 'bg-[#E7F2ED] font-bold text-lg w-[127px] h-[62px] rounded-2xl mx-2'
                        }`}
                    >
                        밀크씨슬
                    </button>
                    <button
                        onClick={() => handleSelect('vitaminC')}
                        className={`m-2 p-3 rounded-2xl ${
                            nutrients.includes('vitaminC')
                                ? 'bg-[#56C08C] font-bold text-lg text-white w-[127px] h-[62px] rounded-2xl mx-2'
                                : 'bg-[#E7F2ED] font-bold text-lg w-[127px] h-[62px] rounded-2xl mx-2'
                        }`}
                    >
                        비타민C
                    </button>
                    <button
                        onClick={() => handleSelect('vitaminD')}
                        className={`m-2 p-3 rounded-2xl ${
                            nutrients.includes('vitaminD')
                                ? 'bg-[#56C08C] font-bold text-lg text-white w-[127px] h-[62px] rounded-2xl mx-2'
                                : 'bg-[#E7F2ED] font-bold text-lg w-[127px] h-[62px] rounded-2xl mx-2'
                        }`}
                    >
                        비타민D
                    </button>
                </div>

                <div className='flex flex-w font-bold justify-center'>
                    <button
                        onClick={() => handleSelect('multivitamin')}
                        className={`m-2 p-3 rounded-2xl ${
                            nutrients.includes('multivitamin')
                                ? 'bg-[#56C08C] font-bold text-lg text-white w-[127px] h-[62px] rounded-2xl mx-2'
                                : 'bg-[#E7F2ED] font-bold text-lg w-[127px] h-[62px] rounded-2xl mx-2'
                        }`}
                    >
                        종합비타민
                    </button>
                    <button
                        onClick={() => handleSelect('chondroitin')}
                        className={`m-2 p-3 rounded-2xl ${
                            nutrients.includes('chondroitin')
                                ? 'bg-[#56C08C] font-bold text-lg text-white w-[127px] h-[62px] rounded-2xl mx-2'
                                : 'bg-[#E7F2ED] font-bold text-lg w-[127px] h-[62px] rounded-2xl mx-2'
                        }`}
                    >
                        콘드로이친
                    </button>
                    <button
                        onClick={() => handleSelect('magnesium')}
                        className={`m-2 p-3 rounded-2xl ${
                            nutrients.includes('magnesium')
                                ? 'bg-[#56C08C] font-bold text-lg text-white w-[127px] h-[62px] rounded-2xl mx-2'
                                : 'bg-[#E7F2ED] font-bold text-lg w-[127px] h-[62px] rounded-2xl mx-2'
                        }`}
                    >
                        마그네슘
                    </button>
                </div>

                <div className='flex font-bold mb-4'>
                    <button
                        onClick={() => handleSelect('omega3')}
                        className={`m-2 p-3 rounded-2xl ${
                            nutrients.includes('omega3')
                                ? 'bg-[#56C08C] font-bold text-lg text-white w-[127px] h-[62px] rounded-2xl mx-2'
                                : 'bg-[#E7F2ED] font-bold text-lg w-[127px] h-[62px] rounded-2xl mx-2'
                        }`}
                    >
                        오메가3
                    </button>
                </div>
            </div>

            <div className='flex justify-center h-screen'>
                <button
                    onClick={onNext}
                    className='fixed bg-[#56C08C] bottom-40 text-white center font-bold py-2 px-4 w-[300px] h-[50px] rounded-full'
                >
                    {button}
                </button>
            </div>
        </div>
    );
}

export default HandleLoginInfo;
