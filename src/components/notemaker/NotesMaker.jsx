import { Button, Collapse, IconButton, InputBase, Paper } from '@mui/material';
import React from 'react';
import Box from '@mui/material/Box';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import AddAlertOutlinedIcon from '@mui/icons-material/AddAlertOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import CropOriginalOutlinedIcon from '@mui/icons-material/CropOriginalOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import BrushOutlinedIcon from '@mui/icons-material/BrushOutlined';

export default function NotesMaker(props) {
    const [checked, setChecked] = React.useState(false);
    const [titleData, setTitleData] = React.useState("");
    const [description, setdescription] = React.useState("");

    const theme = createTheme({
        palette:{
            mode:'dark',
            primary:{
                main: 'rgb(239, 239, 239)',
                contrastText: '#e8eaed'
            }
        }
    })

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
        }
        setChecked(false);
    }
    const title = (
        <Box sx={{display:'flex'}}>
            <InputBase
                placeholder="Title"
                sx={{flexGrow:'1'}}
                onChange={(e)=>updateTitle(e)}
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
            <IconButton><AddAlertOutlinedIcon/></IconButton>
            <IconButton><PersonAddAltOutlinedIcon/></IconButton>
            <IconButton><ColorLensOutlinedIcon/></IconButton>
            <IconButton><CropOriginalOutlinedIcon/></IconButton>
            <IconButton><ArchiveOutlinedIcon/></IconButton>
            <Box sx={{flexGrow:1}}></Box>
            <Button onClick={close}>Close</Button>
        </Box>
    );
    
    return (
        <ThemeProvider theme={theme}>
            <Box  sx={{display:'flex', flexDirection:'column' , padding: '0 20%', justifyContent:'space-between'}}>
                <Paper sx={{padding:'10px 20px 5px 20px', borderRadius:'8px', border:'1px solid'}}>
                    <Collapse in={checked}>{title}</Collapse>
                    <Box sx={{display:'flex'}}>
                        <InputBase
                            placeholder="Take a notes... "
                            sx={{flexGrow:'1', padding:'10px'}}
                            multiline
                            maxRows={4}
                            onFocus={open}
                            fullWidth
                            sx={{flexGrow:1, padding: '20px 0'}}
                            onChange={(e)=>updateDes(e)}
                        />
                        <Collapse sx={{paddingTop:'10px'}} in={!checked}>{icons}</Collapse>
                    </Box>
                    <Collapse in={checked}>{bottom}</Collapse>
                </Paper>
            </Box>
        </ThemeProvider>
    )
}
