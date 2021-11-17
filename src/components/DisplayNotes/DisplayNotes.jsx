import {IconButton, Paper, Typography } from '@mui/material';
import React from 'react';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import { createTheme, ThemeProvider,styled } from '@mui/material/styles';
import Icons from "../icons/Icons";
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';


const ProfileImg = styled('div')(({theme})=>({
    height:'30px',
    width:'30px',
    borderRadius: '50px',
    backgroundColor: 'orange',
    textAlign: 'center',
    margin: '8px 5px 0 5px'
}))

export default function DisplayNotes(props) {
    const [checked, setChecked] = React.useState(false);
    const [color, setColor] = React.useState(props.data.color);

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
    const bottom = () =>  {
        if(props.data.isDeleted !== true){
            return (
                <Box>
                    <Icons mode="UPDATE"
                        setColor={setColor} 
                        noteId={props.data.id}
                        data = {props.data}
                        getData={props.getData}
                    />
                </Box>
            )
        }
        else return (
            <Box>
                <IconButton><RestoreFromTrashIcon/></IconButton>
                <IconButton><DeleteForeverIcon/></IconButton>
            </Box>
        )
        
    }
    const handleDialog = () => {
        props.dialog(props.data);
    }

    const collaboratorsIcons = () => {
        if(props.data.collaborators.length === 0) return null;
        else {
            return (
                props.data.collaborators.map((key)=>(
                    <ProfileImg>
                        <Typography sx={{fontSize:'18px', paddingTop:'1px'}}>{key.firstName.charAt(0)}</Typography>
                    </ProfileImg>
                ))
            );
        }
    }

    return (
            <Box  sx={{display:'flex', flexDirection:'column'}} onMouseEnter={open} onMouseLeave={close} >
                <Paper sx={{border:'0.1px solid', borderRadius:'8px', padding: '0 20px', backgroundColor:color}} >
                    <Box sx={{display:'flex'}} onClick={handleDialog}>
                        <div style={{fontSize:'16px', padding:'8px'}}>
                            {props.data.title}
                        </div>
                        <Box sx={{flexGrow:1}}></Box>
                        <Fade in={checked}>
                            <IconButton><PushPinOutlinedIcon/></IconButton>
                        </Fade>
                        
                    </Box>
                    
                    <Box sx={{fontSize:'18px', padding:'5px'}} onClick={handleDialog}>
                        <div style={{ wordBreak: 'break-all', textAlign:'start'}} id="container">
                            {props.data.description}
                        </div>
                    </Box>
                    <Box sx={{display:'flex'}}>
                        {collaboratorsIcons()}
                    </Box>
                    <Fade in={checked}>{bottom()}</Fade>
                </Paper>    
            </Box>
    )
}
