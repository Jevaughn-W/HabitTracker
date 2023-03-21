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
import "@toast-ui/chart/dist/toastui-chart.min.css";
import { BarChart, LineChart } from "@toast-ui/react-chart";
import EditHabit from "../Components/Habit/EditHabit";
import TextureBG from "../Images/TextureBG.jpg";
import useAuth from "../hooks/useAuth";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
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

  const dataBarChart = {
    categories: ["January", "Februay", "March"],
    series: [
      {
        name: "Coding",
        data: [4, 5, 7],
      },
      {
        name: "Shooting",
        data: [8, 3, 8],
      },
      {
        name: "Exercise",
        data: [5, 6, 6],
      },
    ],
  };

  const dataLineChart = {
    categories: ["January", "Februay", "March"],
    series: [
      {
        name: "Coding",
        data: [4, 5, 7],
      },
      {
        name: "Shooting",
        data: [8, 3, 8],
      },
      {
        name: "Exercise",
        data: [5, 6, 6],
      },
    ],
  };

  const [selectedValue, setSelectedValue] = React.useState("Line");

  const options = {
    chart: {
      width: 790,
      height: 495,
      title:
        selectedValue === "Line"
          ? "Amount of Habits Completed per Month"
          : "Amount of Habits Completed per Month",
    },
    yAxis: {
      title: selectedValue === "Line" ? "Amount" : "Month",
    },
    xAxis: {
      title: selectedValue === "Line" ? "Month" : "Amount",
    },
  };

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const showChartPeriod = () => {
    if (selectedValue === "Line") {
      return <LineChart data={dataLineChart} options={options} />;
    }
    return <BarChart data={dataBarChart} options={options} />;
  };

  const [editMode, setEditMode] = useState(false);

  const { auth } = useAuth();

  let user = auth.user;

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
      <Grid xs={10}>
        <Typography variant="h4">{user} Habits</Typography>
      </Grid>
      <Grid xs={2}>
        <Item>
          <FormLabel id="demo-row-radio-buttons-group-label">
            Select Chart Type
          </FormLabel>
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
                value="b"
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

      <Grid container spacing={2} sx={{ flexGrow: 1 }}>
        <Grid xs={5}>
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
        </Grid>
        <Grid>
          <Item>
          {showChartPeriod()}
          </Item>
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
