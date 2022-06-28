import { useState } from "react";
import styled from "styled-components";
import monthNames from "../constants";

const MonthSelectorBackDrop = styled.div`
  position: absolute;
  z-index: 2;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.2);
`;
const MonthSelectorWrapper = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 3;
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 400px;
  height: 200px;
  background: white;
  border: 1px black solid;
  padding: 20px;

  transform: translate(-50%, -50%);
`;
const MonthSelectorGrid = styled.div`
  display: grid;
  grid-template-rows: repeat(4, 1fr);
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
`;
const MonthItem = styled.div`
  height: 20px;
  font-size: 14px;
  text-align: center;
  line-height: 20px;
  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }
  cursor: pointer;

  &.active {
    color: var(--primary-color);
  }
`;
const MonthFormControl = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
  & button {
    border: none;
    background: var(--primary-color);
    color: white;
  }
`;

const MonthSelectorPopup = ({ browsingDate, onClose, onSetBrowsingDate }) => {
  const [yearValue, setYearValue] = useState(browsingDate.getFullYear());
  const currentMonth = browsingDate.getMonth();
  const months = monthNames.map((name, id) => {
    return (
      <MonthItem
        onClick={() => {
          const newDate = new Date(browsingDate);
          newDate.setFullYear(yearValue);
          newDate.setMonth(id);
          onSetBrowsingDate(newDate);
          onClose();
        }}
        className={`${currentMonth === id ? "active" : ""}`}
      >
        {name}
      </MonthItem>
    );
  });
  return (
    <>
      <MonthSelectorBackDrop onClick={onClose} />
      <MonthSelectorWrapper>
        <MonthFormControl>
          <input
            type="number"
            value={yearValue}
            onInput={(event) => {
              setYearValue(event.target.value);
            }}
          />
          <button
            onClick={() => {
              const newDate = new Date(browsingDate);
              newDate.setFullYear(yearValue);
              onSetBrowsingDate(newDate);
              onClose();
            }}
          >
            Set year
          </button>
        </MonthFormControl>
        <MonthSelectorGrid>{months}</MonthSelectorGrid>
      </MonthSelectorWrapper>
    </>
  );
};
export default MonthSelectorPopup;
