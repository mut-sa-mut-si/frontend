import React from 'react';
import styled from 'styled-components';

const HistoryContainer = styled.div`
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
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
  overflow-x: auto;  /* 가로 스크롤 추가 */
  white-space: nowrap;  /* 요소들이 가로로 나열되도록 설정 */
`;

const KeywordContainer = styled.div`
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  border: 1px solid #eee;  /* 테두리 스타일 수정 */
  border-radius: 12px;
  margin-right: 8px;
  width:97px;
`;

const Keyword = styled.span`
  font-size: 14px;
`;

const RemoveButton = styled.button`
  color: gray;
  cursor: pointer;
  margin-left: 8px;  /* 버튼과 텍스트 사이에 간격 추가 */
`;

function History({ keywords, onRemoveKeyword, onClearKeywords }) {
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
            <Keyword>{text}</Keyword>
            <RemoveButton onClick={() => onRemoveKeyword(id)}>X</RemoveButton>
          </KeywordContainer>
        ))}
      </ListContainer>
    </HistoryContainer>
  );
}

export default History;
