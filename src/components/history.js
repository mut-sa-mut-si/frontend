import React from 'react';
import styled from 'styled-components';
import recent from '../assets/img/recent.png';

const HistoryContainer = styled.div`
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 16px;
  margin-top: 40px;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: bold;
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow-x: auto;
  white-space: nowrap;
`;

const KeywordContainer = styled.div`
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  border-radius: 15px;
  margin-right: 8px;
  width: 360px;
`;

const Keyword = styled.span`
  font-size: 14px;
  font-weight: bold;
`;

const RemoveButton = styled.button`
  color: gray;
  font-weight: bold;
  cursor: pointer;
  margin-left: 8px;
`;



function History({ keywords, onRemoveKeyword }) {
  console.log(keywords)
  if (keywords.length === 0) {
    return <HistoryContainer>최근 검색된 기록이 없습니다.</HistoryContainer>;
  }
  return (
    <HistoryContainer>
      <HeaderContainer>
        <Title>최근 검색어</Title>
      </HeaderContainer>
      <ListContainer>
        {keywords.map(({ id, text }) => (
          <KeywordContainer key={id}>
            <img src={recent} alt="recent" className='w-8 h-8' />
            <Keyword>{text}</Keyword>
            <RemoveButton onClick={() => onRemoveKeyword(id)}>X</RemoveButton>
          </KeywordContainer>
        ))}
      </ListContainer>
    </HistoryContainer>
  );
}

export default History;
