import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import HabitList from './HabitList';


export default function BasicCard() {
  return (
    <>
      <Card>
        <CardContent>
         <HabitList/>
        </CardContent>
        <CardActions>
          <Button size="small">Add Habit</Button>
        </CardActions>
      </Card>
    </>
  );
}

