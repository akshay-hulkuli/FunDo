import {IconButton, Paper, Typography } from '@mui/material';
import React from 'react';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Icons from "../icons/Icons";

export default function DisplayNotes(props) {
    const [checked, setChecked] = React.useState(false);

    const theme = createTheme({
        palette:{
            mode:'dark',
            primary:{
                main: 'rgb(239, 239, 239)',
                contrastText: '#e8eaed'
            }
        }
    })

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
        <ThemeProvider theme={theme}>
            <Box  sx={{display:'flex', flexDirection:'column'}} onMouseEnter={open} onMouseLeave={close} >
                <Paper sx={{border:'0.1px solid', borderRadius:'8px', padding: '0 20px'}} >
                    <Fade in={checked}>{title}</Fade>
                    <Box sx={{fontSize:'18px', padding:'5px'}} onClick={handleDialog}>
                        <div sx={{ wordBreak: 'break-all'}} id="container">
                            {props.data.description}
                        </div>
                    </Box>
                    <Fade in={checked}>{bottom}</Fade>
                </Paper>    
            </Box>
        </ThemeProvider>
    )
}
