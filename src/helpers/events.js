

let weekObject = {
  "Sunday": 0,
  "Monday": 1,
  "Tuesday": 2,
  "Wednesday": 3,
  "Thursday": 4,
  "Friday": 5,
  "Saturday": 6
}


const addDays = (startDate, num) => { // Adds days to the date passed in
  let someDate = new Date(startDate)
  console.log("someDate", someDate)
  let numberOfDaysToAdd = num;
  let result = someDate.setDate(someDate.getDate() + numberOfDaysToAdd);
  let output = new Date(result)
  console.log("result",result);
  return output;
}

const calculateDuration = (start, end) => {
  let startDate = new Date(start);
  let endDate = new Date(end);
  let weeks = 4
  return weeks;
}


const generateEvents = (habit, sunday) => { // Use sunday as the reference point to change the day

  let sundayConverted = `${sunday.d.getFullYear()}-0${sunday.d.getMonth() + 1}-0${sunday.d.getDate()}`;  // Moment JS could probably format better
  // Template event object to be created
  let event = {
    title: habit.title,
    body: habit.details,
    category: "time",
    start: habit.startDate,
    end: habit.startDate,
    state: null,
    attendees: null,
    isPrivate: false,
    backgroundColor: "#1976d2",
    color: "white",
    daysSelected: habit.days
  }
  
  let eventsGenerated = [];

  // let duration = calculateDuration(habit.start, habit.Date)

  habit.days.forEach(day =>
    {
     
      let newDay = addDays("2023-03-05", weekObject[day])

      let updatedEvent = {...event, start: newDay, end: newDay}
      eventsGenerated.push(updatedEvent);
    });

    console.log(eventsGenerated);
    console.log("Sunday", sundayConverted)
  return eventsGenerated;

}

export { generateEvents }