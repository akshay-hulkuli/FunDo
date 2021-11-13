import { Button, Collapse, IconButton, InputBase, Paper } from '@mui/material';
import React from 'react';
import Box from '@mui/material/Box';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import Icons from '../icons/Icons'
import NoteService from '../../services/NoteService';
const noteService = new NoteService(); 

export default function EditNotes(props) {
    const [titleData, setTitleData] = React.useState("");
    const [description, setdescription] = React.useState("");
    const [color, setColor] = React.useState("");

    React.useEffect(()=>{
        setTitleData(props.data.title);
        setdescription(props.data.description);
        setColor(props.data.color);
        // console.log(props.data.);
    },[])

    const updateTitle = (e) => {
        setTitleData(e.target.value);
    }

    const updateDes = (e) => {
        setdescription(e.target.value);
    }
    const close =() => {
        // console.log(props.data.description+" " +description)
        if( (titleData!== "" && description !== "") && (props.data.title !== titleData || props.data.description !== description) ){
            var data = {
                "noteId":props.data.id,
                "title":titleData,
                "description": description
            }

            noteService.updateNotes('notes/updateNotes',data)
                .then(()=>{
                    console.log("Edited notes");
                    props.updateData();
                })
                .catch((err)=>{
                    console.log(err);
                })
        }
        props.onClose();
    }
    
    return (

            <Box  sx={{display:'flex', flexDirection:'column' , justifyContent:'space-between'}}>
                <Paper sx={{padding:'10px 20px 5px 20px', borderRadius:'8px', border:'1px solid', backgroundColor:color}}>
                    <Box sx={{display:'flex'}}>
                        <InputBase
                            placeholder="Title"
                            sx={{flexGrow:'1'}}
                            value={titleData}
                            onChange={(e)=>updateTitle(e)}
                            id="title"
                        />
                        <IconButton><PushPinOutlinedIcon/></IconButton>
                    </Box>
                    <InputBase
                        placeholder="Take a notes... "
                        sx={{flexGrow:'1', padding:'10px'}}
                        multiline
                        maxRows={50}
                        fullWidth
                        sx={{flexGrow:1, padding: '20px 0'}}
                        value={description}
                        onChange={(e)=>updateDes(e)}
                        id="description"
                    />
                    <Box sx={{display:'flex'}}>
                        <Icons mode="EDIT" setColor={setColor} noteId={props.data.id} getData={props.updateData} onClose={props.onClose}/>
                        <Box sx={{flexGrow:1}}></Box>
                        <Button color="inherit" onClick={close}>Close</Button>
                    </Box>
                </Paper>
            </Box>
    
    )
}
