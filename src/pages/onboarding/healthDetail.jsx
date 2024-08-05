import React from 'react';

function HealthDetail({ health, setHealth, onNext, button }) {
    const handleSelect = (vitamin) => {
        setHealth((prev) => (prev.includes(vitamin) ? prev.filter((item) => item !== vitamin) : [...prev, vitamin]));
    };

    return (
        <div className='flex flex-col justify-center h-full p-4'>
            <div className='mt-5 mb-8'>
                <h1 className='text-3xl font-ultrabold mb-2'>헬스에 관심이 있으시군요</h1>
                <p className='font-bold text-gray-300'>관심 있는 부분 모두 선택해주세요</p>
            </div>

            {/* 상체 */}
                <div className='mb-4'>
                    <p className='text-xl font-bold'>상체</p>
                    <div className='flex flex-w font-bold justify-center'>
                        <button
                            onClick={() => handleSelect('chest')}
                            className={`m-2 p-3 rounded-2xl ${
                                health.includes('chest')
                                    ? 'bg-[#14AE63] font-bold text-lg text-white w-[127px] h-[62px] rounded-2xl mx-2'
                                    : 'bg-[#E7F2ED] font-bold text-lg w-[127px] h-[62px] rounded-2xl mx-2 hover:bg-[#14AE63]'
                            }`}
                        >
                            가슴
                        </button>
                        <button
                            onClick={() => handleSelect('shoulder')}
                            className={`m-2 p-3 rounded-2xl ${
                                health.includes('shoulder')
                                    ? 'bg-[#14AE63] font-bold text-lg text-white w-[127px] h-[62px] rounded-2xl mx-2'
                                    : 'bg-[#E7F2ED] font-bold text-lg w-[127px] h-[62px] rounded-2xl mx-2 hover:bg-[#14AE63]'
                            }`}
                        >
                            어깨
                        </button>
                        <button
                            onClick={() => handleSelect('back')}
                            className={`m-2 p-3 rounded-2xl ${
                                health.includes('back')
                                    ? 'bg-[#14AE63] font-bold text-lg text-white w-[127px] h-[62px] rounded-2xl mx-2'
                                    : 'bg-[#E7F2ED] font-bold text-lg w-[127px] h-[62px] rounded-2xl mx-2 hover:bg-[#14AE63]'
                            }`}
                        >
                            등
                        </button>
                    </div>
                
                
                <div className='flex font-bold mb-4'>
                    <button
                        onClick={() => handleSelect('arm')}
                        className={`m-2 p-3 rounded-2xl ${
                            health.includes('arm')
                                ? 'bg-[#14AE63] font-bold text-lg text-white w-[127px] h-[62px] rounded-2xl mx-2'
                                : 'bg-[#E7F2ED] font-bold text-lg w-[127px] h-[62px] rounded-2xl mx-2 hover:bg-[#14AE63]'
                        }`}
                    >
                        팔
                    </button>
                </div>
            </div>

            {/* 하체 */}
                <div className='mb-4'>
                    <p className='text-xl font-bold'>하체</p>
                    <div className='flex flex-w font-bold'>
                    <button
                        onClick={() => handleSelect('leg')}
                        className={`m-2 p-3 rounded-2xl ${
                            health.includes('leg')
                                ? 'bg-[#14AE63] font-bold text-lg text-white w-[127px] h-[62px] rounded-2xl mx-2'
                                : 'bg-[#E7F2ED] font-bold text-lg w-[127px] h-[62px] rounded-2xl mx-2 hover:bg-[#14AE63]'
                        }`}
                    >
                        다리
                    </button>
                    <button
                        onClick={() => handleSelect('hip')}
                        className={`m-2 p-3 rounded-2xl ${
                            health.includes('hip')
                                ? 'bg-[#14AE63] font-bold text-lg text-white w-[127px] h-[62px] rounded-2xl mx-2'
                                : 'bg-[#E7F2ED] font-bold text-lg w-[127px] h-[62px] rounded-2xl mx-2 hover:bg-[#14AE63]'
                        }`}
                    >
                        엉덩이
                    </button>
                </div>                
            </div> 

            {/* 기타 */}
            <div className='mb-4'>
                    <p className='text-xl font-bold'>기타</p>
                    <div className='flex flex-w font-bold'>
                    <button
                        onClick={() => handleSelect('diet')}
                        className={`m-2 p-3 rounded-2xl ${
                            health.includes('diet')
                                ? 'bg-[#14AE63] font-bold text-lg text-white w-[127px] h-[62px] rounded-2xl mx-2'
                                : 'bg-[#E7F2ED] font-bold text-lg w-[127px] h-[62px] rounded-2xl mx-2 hover:bg-[#14AE63]'
                        }`}
                    >
                        다이어트
                    </button>
                    <button
                        onClick={() => handleSelect('stretch')}
                        className={`m-2 p-3 rounded-2xl ${
                            health.includes('stretch')
                                ? 'bg-[#14AE63] font-bold text-lg text-white w-[127px] h-[62px] rounded-2xl mx-2'
                                : 'bg-[#E7F2ED] font-bold text-lg w-[127px] h-[62px] rounded-2xl mx-2 hover:bg-[#14AE63]'
                        }`}
                    >
                        스트레칭
                    </button>
                    <button
                        onClick={() => handleSelect('oxygen')}
                        className={`m-2 p-3 rounded-2xl ${
                            health.includes('oxygen')
                                ? 'bg-[#14AE63] font-bold text-lg text-white w-[127px] h-[62px] rounded-2xl mx-2'
                                : 'bg-[#E7F2ED] font-bold text-lg w-[127px] h-[62px] rounded-2xl mx-2 hover:bg-[#14AE63]'
                        }`}
                    >
                        유산소
                    </button>
                    </div>
                    <div className='flex font-bold mb-4'>
                    <button
                        onClick={() => handleSelect('else')}
                        className={`m-2 p-3 rounded-2xl ${
                            health.includes('else')
                                ? 'bg-[#14AE63] font-bold text-lg text-white w-[127px] h-[62px] rounded-2xl mx-2'
                                : 'bg-[#E7F2ED] font-bold text-lg w-[127px] h-[62px] rounded-2xl mx-2 hover:bg-[#14AE63]'
                        }`}
                    >
                        기타
                    </button>
                </div>
            </div>
            
            <div className='flex justify-center h-screen'>
                <button
                    onClick={onNext}
                    className='fixed bg-[#14AE63] bottom-40 text-white center font-bold py-2 px-4 w-[300px] h-[50px] rounded-full hover:bg-[#0E7B46]'
                >
                    {button}
                </button>
            </div>
        </div>
    );
}

export default HealthDetail;
