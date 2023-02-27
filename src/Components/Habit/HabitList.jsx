import React from "react";
import HabitListItem from "./HabitsListItem";

const habits = ['Piano', 'Swimming', 'Jogging'];

let habitsList = habits.map((habit, index) => {
  
  return(
    <HabitListItem key ={index} habitListItem={habit}/>
  )
});

export default function HabitList() {

  return(
    <div>
      {habitsList}
    </div>
  )
}