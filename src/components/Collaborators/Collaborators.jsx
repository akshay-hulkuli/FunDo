import { Divider, InputBase, Typography, Button, Popper, Popover, Grow } from '@mui/material'
import { Box, fontWeight, styled } from '@mui/system'
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import React from 'react'
import UserService from '../../services/UserService';
import NoteService from '../../services/NoteService';

const userService = new UserService();
const noteService = new NoteService();

const ProfileImg = styled('div')(({theme})=>({
    height:'40px',
    width:'40px',
    borderRadius: '50px',
    backgroundColor: 'red',
    textAlign: 'center',
    margin: '8px 0'
}))

export default function Collaborators(props) {
    const [userArray, setUserArray] = React.useState([]);
    const [searchedUser, setSearchedUser] = React.useState([]);
    const [myset, setMySet] = React.useState(new Set());

    React.useEffect(()=>{
        if(props.mode==='EDIT' || props.mode ==="UPDATE"){
        setUserArray(...userArray,props.data.collaborators );
        }
        // console.log(props.data)
    },[])

    const [rootEl, setrootEl] = React.useState(null);

    const handlePopoverOpen = () => {
        setrootEl(document.getElementById('sid'));
    };
    const handlePopoverClose = () => {
        setrootEl(null);
    };

    const openPopover = Boolean(rootEl);
    const id = openPopover ? 'simple-popover' : undefined;

    const getUser = (e) => {
        console.log(e.target.value)
        if(e.target.value !== ""){
            var data = {
                "searchWord" : e.target.value
            }

            userService.SearchUser('user/searchUserList', data)
                .then((response)=>{
                    console.log(response.data.data);
                    setSearchedUser(response.data.data.details);
                    handlePopoverOpen();
                })
                .catch((err)=> {
                    console.log(err);
                })
        }
    }

    const addUser = (key) => {
        if(!myset.has(key.email)){
            setMySet(prev => new Set(prev.add(key.email)))
            setUserArray([...userArray,key]);
        }
        handlePopoverClose();
    }

    const onSave = () => {
        if(props.mode==='EDIT' || props.mode==='UPDATE'){
            const url = "notes/"+props.noteId+"/AddcollaboratorsNotes";
            // const data = {
            //     "collaborators": JSON.stringify(userArray),
            // }
            userArray.map((user)=>{
                noteService.addCollaborators(url,user)
                .then(()=>{
                    console.log("successfully added collaborators");
                    props.getData();
                    props.handleDialogClose();
                    if(props.mode==='EDIT') props.onClose();
                })
                .catch((err)=>{
                    console.log(err);
                })
            })
        }
        else{
            props.setCollaborators(userArray);  
            console.log('hello')
            props.handleDialogClose();
        }
    }
    return (
        <Box sx={{display:'flex', flexDirection:'column', padding:'5px 10px'}}> 
            <Typography sx={{fontSize:'20px', padding:"15px"}}>Collaborators</Typography>
            <Divider/>
            <Box sx={{display:'flex', paddingTop:'20px'}}>
                <ProfileImg>
                    <span style={{fontSize:'24px'}}>{localStorage.getItem('firstName').charAt(0)}</span>
                </ProfileImg>
                <Box sx={{padding:'5px 10px'}}>
                    <Typography sx={{fontSize:'18px', fontWeight:'bold'}}>{localStorage.getItem('firstName')+" "+ localStorage.getItem('lastName')+" "}<i>(owner)</i></Typography>
                    <Typography>{localStorage.getItem('email')}</Typography>
                </Box>
            </Box>
            {userArray.map((key) => (
                <Box sx={{display:'flex'}}>
                    <ProfileImg>
                        <span style={{fontSize:'24px'}}>{key.firstName.charAt(0)}</span>
                    </ProfileImg>
                    <Box sx={{padding:'5px 10px'}}>
                        <Typography sx={{fontSize:'18px', fontWeight:'bold'}}>{key.firstName+ " "+ key.lastName}</Typography>
                        <Typography>{key.email}</Typography>
                    </Box>
                </Box>
            ))}
            <Box sx={{display:'flex'}}>
                <ProfileImg sx={{backgroundColor:'#121212', paddingTop:'7px'}}>
                    <PersonAddIcon/>    
                </ProfileImg>
                <InputBase
                    placeholder="Person or email to share with"
                    sx={{flexGrow:'1', padding:'5px 10px'}}
                    onChange={(e) => getUser(e)}
                    id='sid'
                />
            </Box>
            <Popover
                id={id}
                open={openPopover}
                anchorEl={rootEl}
                onClose={handlePopoverClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                sx={{maxHeight:'400px', minWidth:'500px'}}
                disableAutoFocus={true}
                disableEnforceFocus={true}
            >
                <Box sx={{display:'flex',flexDirection:'column'}} >
                    {searchedUser.map(key => (
                        <Button sx={{color:'white', textTransform:'capitalize'}} onClick={()=>addUser(key)}>{key.firstName+" "+key.lastName+ " <"+key.email+">"}</Button>
                    ))}
                </Box>
            </Popover>
            <Divider/>
            <Box sx={{display:'flex', padding:'10px'}}>
                <Box sx={{flexGrow:1}}/>
                <Button onClick={props.handleDialogClose} sx={{color:'white'}}>Cancel</Button>
                <Button onClick = {onSave} sx={{color:'white'}}>Save</Button>
            </Box>
        </Box>
    )
}