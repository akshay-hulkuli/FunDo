import { Button, Collapse, IconButton, InputBase, Paper } from '@mui/material';
import React from 'react';
import Box from '@mui/material/Box';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import BrushOutlinedIcon from '@mui/icons-material/BrushOutlined';
import Icons from '../icons/Icons'
import NoteService from '../../services/NoteService';
const noteService = new NoteService(); 

export default function NotesMaker(props) {
    const [checked, setChecked] = React.useState(false);
    const [titleData, setTitleData] = React.useState("");
    const [description, setdescription] = React.useState("");

    const updateTitle = (e) => {
        setTitleData(e.target.value);
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
                "description": description
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
        if(document.querySelector('#title') !=="") document.querySelector('#title').value ="";
        if(document.querySelector('#description') !=="") document.querySelector('#description').value = "";
    }

    const title = (
        <Box sx={{display:'flex'}}>
            <InputBase
                placeholder="Title"
                sx={{flexGrow:'1'}}
                onChange={(e)=>updateTitle(e)}
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
            <Icons/>
            <Box sx={{flexGrow:1}}></Box>
            <Button color="inherit" onClick={close}>Close</Button>
        </Box>
    );
    
    return (
            <Box  sx={{display:'flex', flexDirection:'column' , padding: '0 20%', justifyContent:'space-between'}}>
                <Paper sx={{padding:'10px 20px 5px 20px', borderRadius:'8px', border:'1px solid'}}>
                    <Collapse in={checked}>{title}</Collapse>
                    <Box sx={{display:'flex'}}>
                        <InputBase
                            placeholder="Take a notes... "
                            sx={{flexGrow:'1', padding:'10px'}}
                            multiline
                            maxRows={50}
                            onFocus={open}
                            fullWidth
                            sx={{flexGrow:1, padding: '20px 0'}}
                            onChange={(e)=>updateDes(e)}
                            id="description"
                        />
                        <Collapse sx={{paddingTop:'10px'}} in={!checked}>{icons}</Collapse>
                    </Box>
                    <Collapse in={checked}>{bottom}</Collapse>
                </Paper>
            </Box>
    )
}
