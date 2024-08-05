import React, { useState } from 'react';

function SkinDetail({ skin, setSkin, onNext, button }) {
    const handleTypeSelect = (selectedType) => {
        const newSkin = { ...skin, type: selectedType };
        setSkin(newSkin);
    };

    const handleConditionSelect = (selectedCondition) => {
        const newConditions = skin.conditions ? [...skin.conditions] : [];
        if (newConditions.includes(selectedCondition)) {
            const index = newConditions.indexOf(selectedCondition);
            newConditions.splice(index, 1);
        } else {
            newConditions.push(selectedCondition);
        }
        const newSkin = { ...skin, conditions: newConditions };
        setSkin(newSkin);
    };

    return (
        <div className='flex flex-col justify-center h-full p-4'>
            <div className='mt-5 mb-8'>
                <h1 className='text-3xl font-ultrabold mb-2'>
                    피부 <span className='text-[#14AE63]'>타입</span>과 <span className='text-[#14AE63]'>상태</span>를
                    알려주세요
                </h1>
            </div>

            <p className='m-2 font-bold text-gray-300'>제일 가까운 쪽으로 하나만 선택해주세요</p>
            <div className='flex justify-center mb-5'>
                {['지성', '건성', '복합성'].map((type) => (
                    <button
                        key={type}
                        onClick={() => handleTypeSelect(type)}
                        className={`m-2 p-3 ${
                            skin.type === type
                                ? 'bg-[#14AE63] font-bold text-lg text-white w-32 h-16 rounded-2xl'
                                : 'bg-[#E7F2ED] font-bold text-lg w-32 h-16 rounded-2xl hover:bg-[#14AE63]'
                        }`}
                    >
                        {type}
                    </button>
                ))}
            </div>

            <p className='m-2 font-bold text-gray-300'>여러 고민이 있다면 선택해주세요</p>
            <div className='flex flex-wrap justify-center'>
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
                ].map((condition) => (
                    <button
                        key={condition}
                        onClick={() => handleConditionSelect(condition)}
                        className={`m-2 p-3 ${
                            skin.conditions && skin.conditions.includes(condition)
                                ? 'bg-[#14AE63] font-bold text-lg text-white w-[127px] h-[62px] rounded-2xl mx-2'
                                : 'bg-[#E7F2ED] font-bold text-lg w-[127px] h-[62px] rounded-2xl mx-2 hover:bg-[#14AE63]'
                        }`}
                    >
                        {condition}
                    </button>
                ))}
            </div>
            <div className='flex flex-wrap justify-start'>
                {['다크서클', '기타'].map((condition) => (
                    <button
                        key={condition}
                        onClick={() => handleConditionSelect(condition)}
                        className={`m-2 p-3 ${
                            skin.conditions && skin.conditions.includes(condition)
                                ? 'bg-[#14AE63] font-bold text-lg text-white w-[127px] h-[62px] rounded-2xl mx-2'
                                : 'bg-[#E7F2ED] font-bold text-lg w-[127px] h-[62px] rounded-2xl mx-2 hover:bg-[#14AE63]'
                        }`}
                    >
                        {condition}
                    </button>
                ))}
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

export default SkinDetail;
