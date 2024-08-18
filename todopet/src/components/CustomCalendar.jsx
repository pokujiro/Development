import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // カレンダーのデフォルトスタイル

function CustomCalendar({ onDateChange }) {
  const [date, setDate] = useState(new Date());

  const handleDateChange = (newDate) => {
    setDate(newDate);
    onDateChange(newDate);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <Calendar
        onChange={handleDateChange}
        value={date}
      />
      {/*<p>Selected date: {date.toDateString()}</p>*/}
    </div>
  );
}

export default CustomCalendar;
