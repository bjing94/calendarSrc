import styled from "styled-components";
import CalendarTop from "./components/CalendarTop";
import CalendarCarousel from "./components/CalendarCarousel";
import CalendarTimeline from "./components/CalendarTimeline";
import CalendarBottom from "./components/CalendarBottom";
import { useEffect, useState } from "react";
import MonthSelectorPopup from "./components/MonthSelectorPopup";

const AppWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  max-height: 100vh;
`;
const AppContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: space-between;
  max-width: 740px;
  width: 100%;
`;

const dayDuration = 24 * 60 * 60 * 1000;

function App() {
  const [events, setEvents] = useState([
    new Date("2022-06-27 11:05:00").getTime(),
  ]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewDate, setViewDate] = useState(new Date());
  const [browsingDate, setBrowsingDate] = useState(
    new Date(new Date() - (new Date().getDay() - 1) * dayDuration)
  );

  const [selectedEvent, setSelectedEvent] = useState(null);

  const [showMonthPopup, setShowMonthPopup] = useState(false);

  const handleAddEventToday = () => {
    const result = prompt("Adding event for today. Enter event time: HH:mm:ss");
    const dateNumber = Date.parse(
      `${currentDate.getFullYear()}-${
        currentDate.getMonth() + 1
      }-${currentDate.getDate()} ${result}`
    );
    if (Number.isNaN(dateNumber)) return;
    const newEvents = [...events, dateNumber];
    setEvents(newEvents);
  };

  const handleAddEvent = () => {
    const result = prompt("Enter event time: YYYY-MM-DD HH:mm:ss");

    const dateNumber = Date.parse(result);
    if (Number.isNaN(dateNumber)) return;
    const newEvents = [...events, dateNumber];
    setEvents(newEvents);
  };
  const handleDeleteEvent = (deletedEvent) => {
    const newEvents = events.filter((event) => event !== deletedEvent);
    setEvents(newEvents);
    setSelectedEvent(null);
  };

  function calculateWeek() {
    const firstDayOfWeek =
      browsingDate - (browsingDate.getDay() - 1) * dayDuration;

    let newWeek = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(firstDayOfWeek + dayDuration * i);
      date.setHours(0);
      date.setMinutes(0);
      date.setSeconds(0);
      date.setMilliseconds(0);

      const dayNumber = date.getDate();
      const weekDay = date.getDay();
      let dayName = "M";
      switch (weekDay) {
        case 1:
          dayName = "M";
          break;
        case 2:
          dayName = "T";
          break;
        case 3:
          dayName = "W";
          break;
        case 4:
          dayName = "T";
          break;
        case 5:
          dayName = "F";
          break;
        case 6:
          dayName = "S";
          break;
        case 0:
          dayName = "S";
          break;
        default:
          dayName = "M";
          break;
      }

      newWeek.push({
        name: dayName,
        day: dayNumber,
        timeStamp: date.getTime(),
      });
    }

    setWeek(newWeek);
  }
  const handleIncreaseWeek = () => {
    const newDate = new Date(browsingDate.getTime());
    newDate.setTime(newDate.getTime() + (8 - newDate.getDay()) * dayDuration);
    setBrowsingDate(newDate);
    calculateWeek();
  };
  const handleDecreaseWeek = () => {
    const newDate = new Date(browsingDate.getTime());
    newDate.setTime(newDate.getTime() - (8 - newDate.getDay()) * dayDuration);
    setBrowsingDate(newDate);
    calculateWeek();
  };

  useEffect(() => {
    calculateWeek();
  }, [browsingDate]);

  const [week, setWeek] = useState([]);
  if (week.length === 0) {
    return <div>loading</div>;
  }

  return (
    <AppWrapper>
      <AppContent>
        <CalendarTop name={"Interview Calendar"} onClickAdd={handleAddEvent} />
        <CalendarCarousel
          week={week}
          currentDate={currentDate}
          viewDate={viewDate}
          browsingDate={browsingDate}
          onIncreaseWeek={handleIncreaseWeek}
          onDecreaseWeek={handleDecreaseWeek}
          onSetViewDate={setViewDate}
          onClickMonth={() => {
            setShowMonthPopup(true);
          }}
        />
        <CalendarTimeline
          week={week}
          weekEvents={events}
          selectedEvent={selectedEvent}
          onSelectEvent={(time) => {
            setSelectedEvent(time);
          }}
        />
        <CalendarBottom
          selectedEvent={selectedEvent}
          onDeleteEvent={() => {
            handleDeleteEvent(selectedEvent);
          }}
          onAddToday={handleAddEventToday}
        />
      </AppContent>
      {showMonthPopup && (
        <MonthSelectorPopup
          browsingDate={browsingDate}
          onClose={() => {
            setShowMonthPopup(false);
          }}
          onSetBrowsingDate={(date) => {
            setBrowsingDate(date);
          }}
        />
      )}
    </AppWrapper>
  );
}

export default App;
