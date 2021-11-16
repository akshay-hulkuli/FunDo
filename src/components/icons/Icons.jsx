import React from 'react'
import { Button, Box, IconButton } from '@mui/material';
import AddAlertOutlinedIcon from '@mui/icons-material/AddAlertOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import CropOriginalOutlinedIcon from '@mui/icons-material/CropOriginalOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import Popover from '@mui/material/Popover';
import CircleIcon from '@mui/icons-material/Circle';
import NoteService from '../../services/NoteService';
import Dialog from "@mui/material/Dialog";
import Collaborators from '../Collaborators/Collaborators'

const noteService = new NoteService();

export default function Icons(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    
    const [rootEl, setrootEl] = React.useState(null);

    const handleClickOne = (event) => {
        setrootEl(event.currentTarget);
    };
    const handleCloseOne = () => {
        setrootEl(null);
    };

    const openMore = Boolean(rootEl);
    const id1 = openMore ? 'simple-popover' : undefined;


    const [openColab, setOpenColab] = React.useState(false);
    
    const handleClickOpenColab = () => {
        setOpenColab(true);
    };
    
    const handleCloseColab = () => {
        setOpenColab(false);
    };

    const changeColor = (key) => {
        props.setColor(key);
        if(props.mode === ("EDIT" ||"UPDATE")){
            const data={
                "noteIdList": [props.noteId],
                "color":key
            }
            noteService.updateColor('notes/changesColorNotes', data)
                .then(()=>{
                    console.log("successfully changed color")
                    props.getData();
                })
                .catch((Err)=>{
                    console.log(Err);
                });
          
        }
    }

    const changeIsArchived = () => {
        if(props.mode==="CREATE"){
            props.setIsArchived(true);
            props.setCallUseEffect(!props.callUseEffect);
        }
        else {
            const data={
                "noteIdList": [props.noteId],
                "isArchived":true
            }
            noteService.archive('notes/archiveNotes', data)
                .then(()=>{
                    console.log("successfully archived")
                    props.getData();
                })
                .catch((Err)=>{
                    console.log(Err);
                });
            
            if(props.mode==="EDIT"){
                props.onClose();
            }
        }
        
    }

    const deleteNote = () => {
        const data={
            "noteIdList": [props.noteId],
            "isDeleted":true
        }
        noteService.archive('notes/trashNotes', data)
            .then(()=>{
                console.log("successfully deleted")
                props.getData();
            })
            .catch((Err)=>{
                console.log(Err);
            });
        if(props.mode==="EDIT"){
            props.onClose();
        }
    }

    const extraIcons = () => {
        if(props.mode !== "CREATE"){
            return(
                <div style={{display:'flex', flexDirection:'column'}}>
                <Button color="inherit" onClick={()=> deleteNote()}>Delete Note</Button>
                <Button color="inherit">Make a copy</Button>
                <Button color="inherit" sx={{padding:'5px 30px'}}>Copy to funDocs</Button>
                </div>
            );
        }
        else{
            return null;
        }
    };

    

    const colors = ['#121212','#5c2b29','#614a19','#635d19','#345920','#16504b','#2d555e','#1e3a5f','#42275e','#5b2245','#442f19','#3c3f43'];

    return (
        <Box sx={{display:'flex', justifyContent:'space-between'}}>
            <IconButton><AddAlertOutlinedIcon/></IconButton>
            <IconButton onClick={handleClickOpenColab}><PersonAddAltOutlinedIcon/></IconButton>
            <Dialog open={openColab} onClose={handleCloseColab}>
                <Box sx={{width:'600px'}}>
                    <Collaborators handleDialogClose={handleCloseColab}/>
                </Box>
            </Dialog>
            <IconButton onClick={(e)=>handleClick(e)}><ColorLensOutlinedIcon/></IconButton>
            <Popover 
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <div style={{display:'grid', gridTemplateColumns:'repeat(4,1fr)'}}>
                    {colors.map((key)=>(
                        <IconButton sx={{color:key}} onClick={()=>changeColor(key)}><CircleIcon/></IconButton>
                    ))}
                </div>
            </Popover>
            <IconButton><CropOriginalOutlinedIcon/></IconButton>
            <IconButton onClick={()=>changeIsArchived()}><ArchiveOutlinedIcon/></IconButton>
            <IconButton onClick={(e)=>handleClickOne(e)} ><MoreVertOutlinedIcon/></IconButton>
            <Popover 
                id={id1}
                open={openMore}
                anchorEl={rootEl}
                onClose={handleCloseOne}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <Box sx={{display:'flex',flexDirection:'column'}} >
                    {extraIcons()}
                    <Button color="inherit">Add label</Button>
                    <Button color="inherit">Add drawing</Button>
                    <Button color="inherit">Show checkboxes</Button>
                    
                </Box>
            </Popover>
        </Box>

    )
}
