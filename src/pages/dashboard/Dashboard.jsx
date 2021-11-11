import React, { useState, useRef, useEffect } from 'react'
import './dashboard.scss'
import DashBoardHeader from '../../components/header/Header'
import NotesMaker from '../../components/notemaker/NotesMaker'
import Box from '@mui/material/Box';
import { styled, useTheme, createTheme,ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import DisplayNotes from '../../components/DisplayNotes/DisplayNotes';
import Dialog from "@mui/material/Dialog";
import NoteService from '../../services/NoteService';
import DialogContent from '@mui/material/DialogContent';
import EditNotes from '../../components/EditNotes/EditNotes';
const noteService = new NoteService();

export default function Dashboard() {
  const [dataArray, setDataArray] = useState([]);
  const [editable, setEditable] = useState({});
  const [colorTheme, setcolorTheme] = useState('dark')
  const theme = createTheme({
    palette:{
        mode:colorTheme,
        color1:{
          main:'pink[500]'
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
  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  const getData = () => {
    noteService.getNotes('notes/getNotesList')
      .then((notes)=>{
        console.log(notes.data.data.data)
        setDataArray(notes.data.data.data);
      })
      .catch((err)=>{
        console.log(err);
      });
  }

  useEffect(()=>{
    getData();
    console.log('inside useEffect')
  },[])

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (data) => {
    setOpen(true);
    setEditable(data);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <ThemeProvider theme={theme}>
      <Box Box sx={{ display: 'flex'}}>
        <DashBoardHeader onThemeChange={onThemeChange}/>
        <Box Box component="main" sx={{ flexGrow: 1, p: 3}}>
          <DrawerHeader/>
          <NotesMaker func={getData}/>
          <Box sx={{paddingTop:'5%'}}/>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} rowSpacing={{md:10}}>
            {dataArray.map((data, index)=>(
                <Grid item xs={6} sm={3} md={2} >
                <Item><DisplayNotes data={data} dialog={handleClickOpen}/></Item>
              </Grid>
            ))}
          </Grid>
          <Dialog open={open} onClose={handleClose}>
            <Box sx={{width:'600px'}}>
              <EditNotes onClose = {handleClose} data={editable} updateData={getData}/>
            </Box>
          </Dialog>
        </Box>
      </Box>
    </ThemeProvider>
  )
}
