import React from "react";
import styled from "styled-components";

const CalendarTopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 46px;
  padding-right: 46px;
  padding-top: 52px;
  padding-bottom: 52px;
  height: 130px;
  flex-shrink: 0;
`;
const RoundButton = styled.button`
  border-radius: 50%;
  width: 50px;
  height: 50px;

  padding: 0;
  border: none;
  background: none;
  color: var(--primary-color);

  font-size: 32px;
  cursor: pointer;

  transition: all 0.2s ease-in;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;
const CalendarTitle = styled.div`
  font-size: 24px;
`;
export default function CalendarTop({ name, onClickAdd }) {
  return (
    <CalendarTopWrapper>
      <CalendarTitle>{name}</CalendarTitle>
      <RoundButton onClick={onClickAdd}>+</RoundButton>
    </CalendarTopWrapper>
  );
}
