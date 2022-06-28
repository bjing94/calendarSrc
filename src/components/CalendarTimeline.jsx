import React, { useState } from "react";
import styled from "styled-components";

const TimelineWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  max-height: 780px;
`;

const CalendarRow = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: fit-content;
  width: 100%;
  height: fit-content;
`;

const CalendarCell = styled.div`
  position: relative;
  height: 100%;
  height: 64px;
  border: solid 1px var(--secondary-color);
  border-left: none;
  border-top: none;
  padding: 2px;
`;

const EventWrapper = styled.div`
  width: 100%;
  height: 100%;
  &.active {
    background: var(--event-color);

    &.selected {
      background: var(--event-selected-color);
    }
  }
`;

const EventPopup = styled.div`
  position: absolute;
  z-index: 2;
  left: 0;
  top: -100%;
  width: 100px;
  height: 75px;
  background: white;
  border: 1px solid black;
  padding: 10px;
`;

const TimeRow = styled.div`
  height: fit-content;
  flex-basis: 12.5%;
  padding-left: 18px;
  padding-top: 32px;
`;
const Hour = styled.div`
  display: flex;
  align-items: center;
  height: 64px;
  line-height: 16px;
  color: var(--secondary-dark-color);
`;

const ActionsColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex-basis: 87.5%;
`;

const CalendarEventCell = ({ date, selected, hasEvent, onSelectEvent }) => {
  const [showPopup, setShowPopup] = useState(false);
  return (
    <CalendarCell
      onClick={onSelectEvent}
      onMouseEnter={() => {
        setShowPopup(true);
      }}
      onMouseLeave={() => {
        setShowPopup(false);
      }}
    >
      {showPopup && hasEvent && (
        <EventPopup>Event at: {date.toLocaleString()}</EventPopup>
      )}
      <EventWrapper
        className={`${hasEvent ? "active" : ""} ${selected ? "selected" : ""}`}
      />
    </CalendarCell>
  );
};

export default function CalendarTimeline({
  selectedEvent,
  onSelectEvent,
  week,
  weekEvents,
}) {
  let hours = [];
  let rows = [];
  for (let i = 1; i < 25; i++) {
    const tempRow = [];
    for (let j = 0; j < 7; j++) {
      const cellDate = new Date(week[j].timeStamp);
      cellDate.setHours(i);

      // Get events that are in range of our cell
      const eventTime = weekEvents.find((time) => {
        return (
          time < cellDate.getTime() &&
          time >= cellDate.getTime() - 60 * 60 * 1000
        );
      });

      const hasEvent = eventTime !== undefined;
      tempRow.push(
        <CalendarEventCell
          key={`cell-${i}-${j}`}
          date={new Date(eventTime)}
          selected={selectedEvent === eventTime}
          hasEvent={hasEvent}
          onSelectEvent={() => {
            if (hasEvent) {
              onSelectEvent(eventTime);
            } else {
              onSelectEvent(null);
            }
          }}
        />
      );
    }

    rows.push(<CalendarRow key={`row-${i}`}>{tempRow}</CalendarRow>);
  }

  for (let i = 1; i < 24; i++) {
    if (i < 10) {
      hours.push(<Hour key={`0${i}:00`}>{`0${i}:00`}</Hour>);
    } else {
      hours.push(<Hour key={`${i}:00`}>{`${i}:00`}</Hour>);
    }
  }
  return (
    <TimelineWrapper>
      <TimeRow>{hours}</TimeRow>
      <ActionsColumn>{rows}</ActionsColumn>
    </TimelineWrapper>
  );
}
