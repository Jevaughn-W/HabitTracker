import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Button from "@mui/material/Button";
import {
  FormGroup,
  TextField,
  Typography,
} from "@mui/material";
import DaysToggleButtons from "./DaysToggleButton";
import { generateEvents } from "../../helpers/events";
import Axios from "axios";
import useAuth from "../../hooks/useAuth";

export default function EditHabit(props) {
  //gets user id object
  const { auth } = useAuth();

  const userid = auth.userId;

  const textStyle = { margin: "8px 0px", width: "100%" };
  const dateTimeStyle = { width: "12rem", margin: "8px 0px"};
  const dayStyle = {width: "8rem"};
  const buttons ={ width: "6rem", margin: "8px 0px"};

  const handleClick = () => {
    props.setEditMode(false);
  };

  const [habit, setHabit] = useState(props.selectedHabit);

  const saveHabit = (event) => {
    const habiturl = "http://localhost:8080/habit/Edit"; //Need to create an edit route
    const eventurl = "http://localhost:8080/habit/events";

    event.preventDefault();

    Axios.post(habiturl, {
      title: habit.title,
      body: habit.body,
      start_date: habit.start_date,
      end_date: habit.end_date,
      start_time: habit.start_time,
      end_time: habit.end_time,
      days: habit.days,
      user_id: userid,
      completed: false,
    })
      .then((res) => {
        // Remove the old habit from state and generate new events
        let excludedHabits = props.state.habits.filter(
          (prevHabit) => prevHabit.id !== habit.id
        );
        props.setState((prev) => ({
          ...prev,
          habits: [...excludedHabits, habit],
        }));

        let eventsList = generateEvents(res.data[0]);
        console.log("***HABIT:", habit);
        console.log("***EventsList:", eventsList);
        // loop through events generated and post each event to db
        for (let x = 0; x < eventsList.length; x++) {
          let uniqueEvent = eventsList[x].unique_event_id;
          let completedBoolean = eventsList[x].completed;
          Axios.post(eventurl, {
            unique_event_id: uniqueEvent,
            habit_id: res.data[0].id,
            user_id: userid,
            completed: completedBoolean,
          })
            .then((response) => {
              console.log(response.data);
            })
            .catch((error) => {
              console.error(error);
              throw new Error("Failed to save event");
            });
        }
        // Return to Calendar
        props.setEditMode(false);
      })
      .catch((error) => {
        console.error(error);
        throw new Error("Failed to save habit");
      });
  };

  const handleOnChange = (event) => {
    const value = event.target.value;
    setHabit({ ...habit, [event.target.name]: value });
  };

  return (
    <>
      <Typography variant="h3"> Create your Habit</Typography>
      <FormGroup>
        <TextField
          id="outlined-basic"
          label="Habit Name"
          variant="outlined"
          placeholder="Enter the name of your habit"
          style={textStyle}
          type="text"
          value={habit.title}
          name="title"
          onChange={(event) => handleOnChange(event)}
        />
        <TextField
          id="outlined-basic"
          label="Habit Details"
          variant="outlined"
          placeholder="Add a description of your habit"
          style={textStyle}
          type="text"
          value={habit.body}
          multiline
          rows={4}
          name="body"
          onChange={(event) => handleOnChange(event)}
        />

        <Grid container justifyContent="space-between" alignItems="center">
          <DaysToggleButtons setHabit={setHabit} days={habit.days} style={dayStyle} />
        </Grid>

        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          xs={12}
        >
          <Grid item container direction="column" alignItems="center">
            <TextField
              id="outlined-basic"
              variant="outlined"
              style={dateTimeStyle}
              type="date"
              name="start_date"
              value={habit.start_date}
              onChange={(event) => handleOnChange(event)}
            />
          </Grid>
          <Grid item container direction="column" alignItems="center">
            <TextField
              id="outlined-basic"
              variant="outlined"
              style={dateTimeStyle}
              type="date"
              name="end_date"
              value={habit.end_date}
              onChange={(event) => handleOnChange(event)}
            />
          </Grid>
          <Grid item container direction="column" alignItems="center">
            <TextField
              id="outlined-basic"
              variant="outlined"
              style={dateTimeStyle}
              type="time"
              name="start_time"
              value={habit.start_time}
              onChange={(event) => handleOnChange(event)}
            />
          </Grid>
          <Grid item container direction="column" alignItems="center">
            <TextField
              id="outlined-basic"
              variant="outlined"
              style={dateTimeStyle}
              type="time"
              name="end_time"
              value={habit.end_time}
              onChange={(event) => handleOnChange(event)}
            />
          </Grid>
        </Grid>

        <Grid
          item
          container
          direction="row"
          justifyContent="space-between"
          alignItems="left"
          xs={12}
          spacing={1}
        >
          <Typography>
            * Habits will repeat weekly until the designated end date
          </Typography>
        </Grid>

        <Grid
          item
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Button onClick={handleClick} color="error" variant="contained" style={buttons}>
            Cancel
          </Button>
          <Button
            onClick={saveHabit}
            type="submit"
            color="primary"
            variant="contained"
            style={buttons}
          >
            Save
          </Button>
        </Grid>
      </FormGroup>
    </>
  );
}
