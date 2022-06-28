import React from "react";
import styled from "styled-components";

const BottomWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 82px;
  padding-left: 46px;
  padding-right: 46px;
  flex-shrink: 0;
  background: var(--secondary-color);
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  height: fit-content;
  padding: 5px 15px;
  font-size: 24px;
  color: var(--primary-color);
  cursor: pointer;
  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }
`;
export default function CalendarBottom({
  onAddToday,
  selectedEvent,
  onDeleteEvent,
}) {
  return (
    <BottomWrapper>
      <ActionButton onClick={onAddToday}>Today</ActionButton>
      {selectedEvent && (
        <ActionButton onClick={onDeleteEvent}>Delete</ActionButton>
      )}
    </BottomWrapper>
  );
}
