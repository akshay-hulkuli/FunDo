import { Button, Collapse, IconButton, InputBase, Paper } from '@mui/material';
import React from 'react';
import Box from '@mui/material/Box';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';
import { styled } from '@mui/material/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import BrushOutlinedIcon from '@mui/icons-material/BrushOutlined';
import Icons from '../icons/Icons'
import NoteService from '../../services/NoteService';
const noteService = new NoteService(); 


const Root = styled('div')(({ theme }) => ({
    display:'flex',
    flexDirection:'column' , 
    justifyContent:'space-between',
    [theme.breakpoints.down('md')]: {
        padding: '0',
    },
    [theme.breakpoints.up('md')]: {
        padding: '0 20%',
    },
  }));

export default function NotesMaker(props) {

    const [checked, setChecked] = React.useState(false);
    const [titleData, setTitleData] = React.useState("");
    const [description, setdescription] = React.useState("");
    const [color, setColor] = React.useState('#121212');
    const [isArchived, setIsArchived] = React.useState(false);
    const [callUseEffect, setCallUseEffect] = React.useState(false);

    React.useEffect(()=>{
        console.log("in use effect")
        close();
    },[callUseEffect])

   


    const updateTitle = (e) => {
        setTitleData(e.target.value);
        console.log(e.target.value)
    }

    const updateDes = (e) => {
        setdescription(e.target.value);
    }

    const open = () => {
        setChecked(true);
    };
    const close =() => {
        if(titleData !== "" && description !== ""){
            var data = {
                "title": titleData,
                "description": description,
                "color": color,
                "isArchived": isArchived
            }
            noteService.addNotes('notes/addNotes', data)
                .then(()=>{
                    console.log("succesfully added note");
                    props.func();
                })
                .catch((err)=>{
                    console.log(err);
                });
        }
        setChecked(false);
        setTitleData("");
        setdescription("");
        setColor("#121212");
        setIsArchived(false);
        if(document.querySelector('#title') !=="") document.querySelector('#title').value ="";
        if(document.querySelector('#description') !=="") document.querySelector('#description').value = "";
    }


    // whenever there is a change in state isArchived useEffect is called.
   

    const title = (
        <Box sx={{display:'flex'}}>
            <InputBase
                placeholder="Title"
                sx={{flexGrow:'1'}}
                onChange={(e)=>setTitleData(e.target.value)}
                id="title"
            />
            <IconButton><PushPinOutlinedIcon/></IconButton>
            
        </Box>
    );
    const icons = (
        <Box sx={{display:'flex'}}>
            <IconButton><CheckBoxOutlinedIcon/></IconButton>
            <IconButton><BrushOutlinedIcon/></IconButton>
            <IconButton><ColorLensOutlinedIcon/></IconButton>
        </Box>
    );
    const bottom = (
        <Box sx={{display:'flex'}}>
            <Icons mode={"CREATE"} 
                setColor={setColor} 
                setIsArchived={setIsArchived} 
                close={close}
                setCallUseEffect={setCallUseEffect}
                callUseEffect={callUseEffect}
            />
            <Box sx={{flexGrow:1}}></Box>
            <Button color="inherit" onClick={close}>Close</Button>
        </Box>
    );
    console.log("title",description)
    return (
      
            // <Box  sx={{display:'flex', flexDirection:'column' , padding: '0 20%', justifyContent:'space-between'}}>
            <Root>
                <Paper sx={{padding:'10px 20px 5px 20px', borderRadius:'8px', border:'1px solid', backgroundColor:color}}>
                    <Collapse in={checked}>{title}</Collapse>
                    <Box sx={{display:'flex'}}>
                        <InputBase
                            placeholder="Take a notes... "
                            // sx={{flexGrow:'1', padding:'10px'}}
                            multiline
                            maxRows={50}
                            onFocus={open}
                            fullWidth
                            sx={{flexGrow:1, padding: '20px 0'}}
                            onChange={(e)=> setdescription(e.target.value)}
                            id="description"
                        />
                        <Collapse sx={{paddingTop:'10px'}} in={!checked}>{icons}</Collapse>
                    </Box>
                    <Collapse in={checked}>{bottom}</Collapse>
                </Paper>
                </Root>
            // </Box>
    )
}
