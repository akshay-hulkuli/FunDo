import { Button, Collapse, Icon, IconButton, Paper } from '@mui/material';
import React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import AddAlertOutlinedIcon from '@mui/icons-material/AddAlertOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import CropOriginalOutlinedIcon from '@mui/icons-material/CropOriginalOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';

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
        <Box sx={{display:'flex'}}>
            <IconButton><AddAlertOutlinedIcon/></IconButton>
            <IconButton><PersonAddAltOutlinedIcon/></IconButton>
            <IconButton><CropOriginalOutlinedIcon/></IconButton>
            <IconButton><ArchiveOutlinedIcon/></IconButton>
            <IconButton><ColorLensOutlinedIcon/></IconButton>
            <IconButton><MoreVertOutlinedIcon/></IconButton>
        </Box>
    );
    
    return (
        <ThemeProvider theme={theme}>
            <Box  sx={{display:'flex', flexDirection:'column'}} onMouseEnter={open} onMouseLeave={close}>
                <Paper sx={{border:'0.1px solid', borderRadius:'8px', padding: '0 20px'}} >
                    <Fade in={checked}>{title}</Fade>
                    <Box sx={{fontSize:'18px', padding:'5px'}}>
                        <div>
                            {props.data.content}
                        </div>
                    </Box>
                    <Fade in={checked}>{bottom}</Fade>
                </Paper>
            </Box>
        </ThemeProvider>
    )
}
