import React from 'react'
import { Button, Box, IconButton } from '@mui/material';
import AddAlertOutlinedIcon from '@mui/icons-material/AddAlertOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import CropOriginalOutlinedIcon from '@mui/icons-material/CropOriginalOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';

export default function Icons() {
    return (
        <Box sx={{display:'flex'}}>
            <IconButton><AddAlertOutlinedIcon/></IconButton>
            <IconButton><PersonAddAltOutlinedIcon/></IconButton>
            <IconButton><ColorLensOutlinedIcon/></IconButton>
            <IconButton><CropOriginalOutlinedIcon/></IconButton>
            <IconButton><ArchiveOutlinedIcon/></IconButton>
            <IconButton><MoreVertOutlinedIcon/></IconButton>
        </Box>
    )
}
