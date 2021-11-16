import React, { useState } from 'react'
import DashBoardHeader from '../../components/header/Header'
import Box from '@mui/material/Box';
import { styled, createTheme,ThemeProvider } from '@mui/material/styles';
import { Route, Switch } from 'react-router-dom';
import Home from '../home/Home';
import Archives from '../archives/Archives';
import Trash from '../trash/Trash';

export default function Dashboard() {
  const [colorTheme, setcolorTheme] = useState('dark');
  
  const theme = createTheme({
    palette:{
        mode:colorTheme,
        primary:{
          main:'#202124'
        } 
    }
  });

  const onThemeChange = () => {
    setcolorTheme(colorTheme==='dark'?'light':'dark');
  }

  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));

  

  return (
    <ThemeProvider theme={theme}>
      <Box Box sx={{ display: 'flex'}}>
        <DashBoardHeader onThemeChange={onThemeChange}/>
        <Box Box component="main" sx={{ flexGrow: 1, p: 3}}>
          <DrawerHeader/>
          <Switch>
            <Route exact path="/dashboard" component={Home}/>
            <Route exact  path="/dashboard/archive" component={Archives}/>
            <Route exact path="/dashboard/trash" component={Trash}/>
          </Switch>
        </Box> 
      </Box>
    </ThemeProvider>
  )
}
