import React, { useState } from 'react'
import DashBoardHeader from '../../components/header/Header'
import NotesMaker from '../../components/notemaker/NotesMaker'
import Box from '@mui/material/Box';
import { styled, useTheme, createTheme,ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import DisplayNotes from '../../components/DisplayNotes/DisplayNotes';

export default function Dashboard() {
  const [dataArray, setDataArray] = useState([]);

  const theme = createTheme({
    palette:{
        mode:'dark',
        primary:{
            main: 'rgb(239, 239, 239)',
        }
    }
  });
  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));
  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', backgroundColor:'#202124' }}>
        <DashBoardHeader/>
        <Box Box component="main" sx={{ flexGrow: 1, p: 3}}>
          <DrawerHeader/>
          <NotesMaker/>
          <Box sx={{paddingTop:'5%'}}/>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} rowSpacing={{md:10}}>
            {dataArray.map((data)=>(
                <Grid item xs={6} sm={3} md={2} >
                <Item><DisplayNotes data={data}/></Item>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  )
}
