import React, { useState, useRef, useEffect } from 'react'
import DashBoardHeader from '../../components/header/Header'
import Box from '@mui/material/Box';
import NotesMaker from '../../components/notemaker/NotesMaker'
import DisplayNotes from '../../components/DisplayNotes/DisplayNotes';
import Dialog from "@mui/material/Dialog";
import EditNotes from '../../components/EditNotes/EditNotes';
import Grid from '@mui/material/Grid';
import NoteService from '../../services/NoteService';
import Paper from '@mui/material/Paper';
import { styled, useTheme, createTheme,ThemeProvider } from '@mui/material/styles';
const noteService = new NoteService();

export default function Dashboard() {
  const [colorTheme, setcolorTheme] = useState('dark');
  const [dataArray, setDataArray] = useState([]);
    const [editable, setEditable] = useState({});
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
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} rowSpacing={{md:10, xs: 3}}>
            {dataArray.filter(data => data.isArchived===false && data.isDeleted === false).map((data)=>(
                <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                <Item><DisplayNotes data={data} dialog={handleClickOpen} getData={getData}/></Item>
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
