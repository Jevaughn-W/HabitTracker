import Card from '@mui/material/Card';
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import useApplicationData from '../../hooks/useApplicationData';




function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs() {
  const [value, setValue] = React.useState(0);
  const { state } = useApplicationData()

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  let tabs = state.habits.map((habit, index) => {
    return (<Tab label={habit.title} {...a11yProps(index)}/>)
  })
  let tabpanels = state.habits.map((habit, index) => {
    return (
    
    <TabPanel value={value} index={index}>
      {`Details: ${habit.body}`}
    </TabPanel>
    )
  })


  return (
    <Card>
      <Box
        sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 515 }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: 'divider' }}
        >
          {tabs}
        </Tabs>
        {tabpanels}
      </Box>
    </Card>
  );
}
