import React, { useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import HabitCard from "../Components/Habit/HabitCard";
import {Radio, FormControlLabel, Paper, Typography, FormLabel} from "@mui/material";
import { styled } from "@mui/material/styles";
import ButtonAppBar from "../Components/Appbar";
import useApplicationData from "../hooks/useApplicationData";
import {
  CompleteHabitList,
  IncompleteHabitList,
} from "../Components/Habit/HabitStatusList";
import RadialBar from "../Components/Gauge/StrokedGauge";
import EditHabit from "../Components/Habit/EditHabit";
import useAuth from "../hooks/useAuth";
import { flexbox, maxHeight } from "@mui/system";
import HabitChart from "../Components/Habit/HabitChart";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const HabitContainer = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: "465px"
}));
const Dashboard = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: "350px",
}));

/* 
We should have 2 data queries ready for when we select week or month.

*/

export default function HabitPageLayout(props) {
  const { state, setState } = useApplicationData();
  // let codingCompletedEvents = Number(state.eventsCount.filter((event) => event.completed)[0].event_count)
  // let exerciseCompletedEvents = Number(state.eventsCount.filter((event) => event.completed)[1].event_count)
  // let shootingCompletedEvents = Number(state.eventsCount.filter((event) => event.completed)[2].event_count)

  const [selectedValue, setSelectedValue] = useState("Line");

  const [editMode, setEditMode] = useState(false);

  const { auth } = useAuth();

  let user = auth.user;

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <Grid
      container
      rowSpacing={2}
      columnSpacing={3}
      sx={{
        pt: 12
      }}
    >
      <ButtonAppBar />
      <Grid  xs={10}>
        <Typography variant="h3" sx={{color:"#1976d2", borderBottom: "4mm ridge rgba(25, 118, 210, .6)"}}>{user} Habits</Typography>
      </Grid>
      <Grid xs={2}>
        <Item sx={{marginRight: "15px"}}>
          <FormControlLabel
            value="start"
            control={
              <Radio
                checked={selectedValue === "Line"}
                onChange={handleChange}
                value="Line"
                name="radio-buttons"
                inputProps={{ "aria-label": "A" }}
                sx={{
                  "& .MuiSvgIcon-root": {
                    fontSize: 12,
                  },
                }}
              />
            }
            label="Line"
            labelPlacement="top"
          />
          <FormControlLabel
            value="start"
            control={
              <Radio
                checked={selectedValue === "b"}
                onChange={handleChange}
                value="Bar"
                name="radio-buttons"
                inputProps={{ "aria-label": "B" }}
                sx={{
                  "& .MuiSvgIcon-root": {
                    fontSize: 12,
                  },
                }}
              />
            }
            label="Bar"
            labelPlacement="top"
          />
        </Item>
      </Grid>

      <Grid container spacing={2} width={"100%"} sx={{display: flexbox, justifyContent: "space-evenly"}}>
        <Grid xs={7}>
          <HabitContainer>

          {editMode === false && (
            <HabitCard
              state={state}
              setState={setState}
              setEditMode={setEditMode}
            />
          )}
          {editMode === true && (
            <EditHabit
              selectedHabit={state.selected}
              setEditMode={setEditMode}
              state={state}
              setState={setState}
            />
          )}
          </HabitContainer>
        </Grid>
        <Grid>
          <HabitContainer xs={5}>
            <HabitChart selectedValue={selectedValue}/>
          </HabitContainer>
        </Grid>
      </Grid>
      <Grid container spacing={2} width={"100%"}>
        <Grid xs={12}>
          <Typography
            variant="h4"
            style={{
              backgroundColor: "#1976d2",
              color: "#fff",
              textAlign: "center",
              paddingTop: 10,
              paddingBottom: 10,
            }}
          >
            Your Stat Summary
          </Typography>
        </Grid>
        <Grid xs={4}>
          <Dashboard>
            <h3>Amount of Completed Habit Events</h3>
            <CompleteHabitList
              eventsCount={state.eventsCount}
              habits={state.habits}
            />
          </Dashboard>
        </Grid>
        <Grid xs={4}>
          <Dashboard>
            <h3>Amount of Incompleted Habit Events</h3>
            <IncompleteHabitList
              eventsCount={state.eventsCount}
              habits={state.habits}
            />
          </Dashboard>
        </Grid>
        <Grid xs={4}>
          <Dashboard>
            <h3>Habit Progress</h3>
            <RadialBar state={state} />
          </Dashboard>
        </Grid>
      </Grid>
    </Grid>
  );
}
