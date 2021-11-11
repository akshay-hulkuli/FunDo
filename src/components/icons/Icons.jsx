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
import Grid from '@mui/material/Grid';
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Checkbox from '@mui/material/Checkbox';

export default function Icons() {
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

    const colors = ['','#5c2b29','#614a19','#635d19','#345920','#16504b','#2d555e','#1e3a5f','#42275e','#5b2245','#442f19','#3c3f43'];

    return (
        <Box sx={{display:'flex'}}>
            <IconButton><AddAlertOutlinedIcon/></IconButton>
            <IconButton><PersonAddAltOutlinedIcon/></IconButton>
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
                        <Checkbox
                            icon={<CircleIcon sx={{color:key}} />}
                            checkedIcon={<CheckCircleIcon sx={{color:key}} />}
                        />
                    ))}
                </div>
            </Popover>
            <IconButton><CropOriginalOutlinedIcon/></IconButton>
            <IconButton><ArchiveOutlinedIcon/></IconButton>
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
                    <Button color="inherit" sx={{padding:'5px 30px'}}>more</Button>
                    <Button color="inherit">Delete Note</Button>
                    <Button color="inherit">Add label</Button>
                    <Button color="inherit">Add drawing</Button>
                    <Button color="inherit">Make a copy</Button>
                    <Button color="inherit">Show checkboxes</Button>
                </Box>
            </Popover>
        </Box>

    )
}
