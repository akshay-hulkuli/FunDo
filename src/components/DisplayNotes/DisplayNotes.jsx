import {IconButton, Paper, Typography } from '@mui/material';
import React from 'react';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Icons from "../icons/Icons";

export default function DisplayNotes(props) {
    const [checked, setChecked] = React.useState(false);

    const open = () => {
        setChecked(true);
    }
    const close = () => {
        setChecked(false);
    }
    const title = (
        <Box sx={{display:'flex', justifyContent:'flex-end'}}>
            <IconButton><PushPinOutlinedIcon/></IconButton>
        </Box>
    );
    const bottom = (
        <Box>
            <Icons/>
        </Box>
        
    )
    const handleDialog = () => {
        props.dialog(props.data);
    }
    return (
            <Box  sx={{display:'flex', flexDirection:'column'}} onMouseEnter={open} onMouseLeave={close} >
                <Paper sx={{border:'0.1px solid', borderRadius:'8px', padding: '0 20px'}} >
                    <Box sx={{display:'flex'}} onClick={handleDialog}>
                        <div style={{fontSize:'16px', padding:'10px' }}>
                            {props.data.title}
                        </div>
                        <Box sx={{flexGrow:1}}></Box>
                        <Fade in={checked}>
                            <IconButton><PushPinOutlinedIcon/></IconButton>
                        </Fade>
                        
                    </Box>
                    
                    <Box sx={{fontSize:'18px', padding:'5px'}} onClick={handleDialog}>
                        <div style={{ wordBreak: 'break-all'}} id="container">
                            {props.data.description}
                        </div>
                    </Box>
                    <Fade in={checked}>{bottom}</Fade>
                </Paper>    
            </Box>
    )
}
