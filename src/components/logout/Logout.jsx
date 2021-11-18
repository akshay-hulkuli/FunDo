import { styled } from '@material-ui/styles'
import { Typography, Button } from '@mui/material'
import React from 'react'
import auth from '../../protectedRoute/Auth'
import { useHistory } from 'react-router-dom';

const ProfileImg = styled('div')(({theme})=>({
    height:'80px',
    width:'80px',
    borderRadius: '50px',
    backgroundColor: 'darkgreen',
    textAlign: 'center',
    margin: '0 auto',
    cursor:'pointer'

  }))

const Root = styled('div') (({theme}) => ({
    minHeight:'300px',
    minWidth:'300px',
    display: 'flex',
    flexDirection:'column',
    justifyContent:'center'
}))

export default function Logout() {
    const history = useHistory();
    const handleLogout = () =>{
        auth.logout(()=>{   
            history.push('/');
            localStorage.clear();
        })
    }
    return (
        <Root>
            <ProfileImg> <Typography sx={{fontSize:'48px'}}>{localStorage.getItem('firstName').charAt(0)}</Typography></ProfileImg>
            <Typography sx={{textAlign:'center', fontWeight:'bold'}}>{localStorage.getItem('firstName')+" "+localStorage.getItem('lastName')}</Typography>
            <Typography sx={{textAlign:'center'}}>{localStorage.getItem('email')}</Typography>
            <Button 
                sx={{margin:'20px 30px', borderRadius:'20px', border:'1px solid white', color:'white'}}
                variant="outlined"
                onClick={handleLogout}>   
                Logout
            </Button>
        </Root>

    )
}
