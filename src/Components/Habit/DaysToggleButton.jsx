import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useState } from 'react';
import { Typography } from '@mui/material';

export default function DaysToggleButtons(props) {
  const [daySelected, setDaySelected] = useState("");

  const daysButtonStyle = {maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px', margin: '20px 20px 20px 20px'}

  const daysArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

  const handleChange = (event, day) => {
    setDaySelected(day); // This passes a stale array, so the value is always missing the last day selected
    props.setHabit(prev => ({...prev, days: day.join(",")})); // Added to ensure that the habit state is updated for the days selected
  };

  const eachDayButton = daysArray.map((day, index) => {
    return(
      <ToggleButton
        value={day}
        key={index}
      >
        <Typography> {day} </Typography>
      </ToggleButton>
    ) 
  })
  
  return (
    <div id="togglebutton">
      <ToggleButtonGroup
        color="primary"
        value={daySelected}
        onChange={handleChange}
        aria-label="Platform"
      >
        {eachDayButton}
      </ToggleButtonGroup>
    </div>
  )
}