import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import {Paper, Grid, Radio, Typography} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import ButtonAppBar from "../Components/Appbar";
import AddHabitButton from "../Components/Habit/AddHabitButton";
import HabitList from "../Components/Habit/HabitList";
import HabitCalendar from "../Components/Calendar";
import CreateHabit from "../Components/Habit/CreateHabit";
import useApplicationData from "../hooks/useApplicationData";
import TextureBG from "../Images/TextureBG.jpg";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

// Sets the details of the calendar

export default function UserLandingPage(props) {
  const [calendarView, setCalendarView] = React.useState("week");
  const [habitId, setHabitId] = useState(0);
  const { state, setState } = useApplicationData();

  const handleChange = (event) => {
    setCalendarView(event.target.value);
  };

  let [date, setDate] = useState(new Date());
  let [startOfRange, setStartOfRange] = useState("");

  useEffect(() => {
    setDate(new Date());
  }, []);

  let options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }; // To format the date being passes

  const [mode, setMode] = useState("SHOWING");

  const CREATING = "CREATING";
  const SHOWING = "SHOWING";

  return (
    <>
      <ButtonAppBar />
      <Grid
        container
        rowSpacing={2}
        columnSpacing={3}
        sx={{
          pt: 12
        }}
      >
        <Grid item xs={2}>
          <Item>{date.toLocaleDateString("en-US", options)}</Item>
        </Grid>
        <Grid item xs={2}>
          <AddHabitButton setMode={setMode} />
        </Grid>
        <Grid item xs={6}></Grid>
        <Grid item xs={2}>
          <Item>
            <FormControlLabel
              value="start"
              control={
                <Radio
                  checked={calendarView === "week"}
                  onChange={handleChange}
                  value="week"
                  name="radio-buttons"
                  inputProps={{ "aria-label": "A" }}
                  sx={{
                    "& .MuiSvgIcon-root": {
                      fontSize: 15,
                    },
                  }}
                />
              }
              label="Week"
              labelPlacement="top"
            />
            <FormControlLabel
              value="start"
              control={
                <Radio
                  checked={calendarView === "month"}
                  onChange={handleChange}
                  value="month"
                  name="radio-buttons"
                  inputProps={{ "aria-label": "B" }}
                  sx={{
                    "& .MuiSvgIcon-root": {
                      fontSize: 15,
                    },
                  }}
                />
              }
              label="Month"
              labelPlacement="top"
            />
          </Item>
        </Grid>
        <Grid item xs={2}>
          <Item style={{ maxheight: "450px", marginBottom:"2em" }}>
            <Typography sx={{display:"flex", justifyContent:"center", color:"#1976d2"}}>Active Habits</Typography>
            <HabitList
              date={date}
              upcoming={true}
              state={state}
              setState={setState}
            />
          </Item>
          <Item style={{ maxheight: "450px" }}>
            <Typography sx={{display:"flex", justifyContent:"center", color:"#1976d2"}}>Inactive Habits</Typography>
            <HabitList
              date={date}
              upcoming={false}
              state={state}
              setState={setState}
            />
          </Item>
        </Grid>
        <Grid item xs={10}>
          <Item>
            {mode === SHOWING && (
              <HabitCalendar
                view={calendarView}
                initialMonth={date.getMonth()}
                initialYear={date.getFullYear()}
                setStartOfRange={setStartOfRange}
                sunday={startOfRange}
                state={state}
                setState={setState}
              />
            )}
            {mode === CREATING && (
              <CreateHabit
                setMode={setMode}
                sunday={startOfRange}
                habitId={habitId}
                setHabitId={setHabitId}
                state={state}
                setState={setState}
              />
            )}
          </Item>
        </Grid>
      </Grid>
    </>
  );
}
