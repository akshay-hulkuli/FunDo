import React, { useState, useRef, useEffect } from 'react'
import DashBoardHeader from '../../components/header/Header'
import NotesMaker from '../../components/notemaker/NotesMaker'
import Box from '@mui/material/Box';
import { styled, useTheme, createTheme,ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import DisplayNotes from '../../components/DisplayNotes/DisplayNotes';
import Dialog from "@mui/material/Dialog";
import NoteService from '../../services/NoteService';
import EditNotes from '../../components/EditNotes/EditNotes';

const noteService = new NoteService();

export default function Trash() {
  const [dataArray, setDataArray] = useState([]);
  const [editable, setEditable] = useState({});
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
    <React.Fragment>
      <Box sx={{paddingTop:'5%'}}/>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} rowSpacing={{md:10, xs: 3}}>
        {dataArray.filter(data => data.isDeleted=== true).map((data)=>(
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
    </React.Fragment>
        
  )
}
