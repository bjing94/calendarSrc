import React from "react";
import styled from "styled-components";

const CarouselWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--secondary-color);
  padding-right: 18px;
  height: 141px;
  flex-shrink: 0;
`;

const WeekWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: fit-content;
  background: var(--secondary-color);
  width: 100%;
`;

const WeekGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: fit-content;
  width: 100%;
  height: fit-content;
  flex-basis: 87.5%;
`;

const CarouselItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;

const CarouselText = styled.div`
  font-size: 16px;
  line-height: 32px;
  text-align: center;

  &.selected {
    color: var(--primary-color);
  }
`;

const CarouselDay = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  font-size: 32px;
  line-height: 50px;
  text-align: center;

  &.selected {
    background: var(--primary-color);
    border-radius: 50%;
    color: white;
  }
`;

const CarouselMonth = styled.div`
  display: flex;
  flex-basis: 87.5%;
  padding-left: 35px;
  padding-right: 35px;
  justify-content: space-between;
  width: 100%;
  font-size: 24px;
  line-height: 26px;
  text-align: center;
`;

const ArrowButton = styled.button`
  border: none;
  color: var(--primary-color);
  background: none;
  font-weight: bold;
  cursor: pointer;
  border-radius: 50%;
  height: 25px;
  width: 25px;

  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }
`;
const MonthWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function CalendarCarousel({
  currentDate,
  browsingDate,
  week,
  onIncreaseWeek,
  onDecreaseWeek,
}) {
  const weekDays = week.map(({ name, timeStamp, day }) => {
    const weekDate = new Date(timeStamp);
    const isToday =
      weekDate.getFullYear() === currentDate.getFullYear() &&
      weekDate.getMonth() === currentDate.getMonth() &&
      weekDate.getDate() === currentDate.getDate();

    return (
      <CarouselItem key={day}>
        <CarouselText>{name}</CarouselText>
        <CarouselDay className={`${isToday ? "selected" : ""}`}>
          {day}
        </CarouselDay>
      </CarouselItem>
    );
  });

  const monthName = monthNames[browsingDate.getMonth()];
  const year = browsingDate.getFullYear();

  return (
    <CarouselWrapper>
      <WeekWrapper>
        <div
          style={{
            flexBasis: "12.5%",
            height: "100%",
          }}
        />
        <WeekGrid>{weekDays}</WeekGrid>
      </WeekWrapper>
      <MonthWrapper>
        <div
          style={{
            flexBasis: "12.5%",
            height: "100%",
          }}
        />
        <CarouselMonth>
          <ArrowButton onClick={onDecreaseWeek}>&#5176;</ArrowButton>
          <div>
            {monthName} {year}
          </div>

          <ArrowButton onClick={onIncreaseWeek}>&#5171;</ArrowButton>
        </CarouselMonth>
      </MonthWrapper>
    </CarouselWrapper>
  );
}
