import React, { Component } from 'react'
import './forgot_email.scss'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export class ForgetEmail extends Component {
    render() {
        return (
            <div class="forgot-email-container">
                <div class="logo"> 
                        <span style={{color:'rgb(17, 142, 226)'}}>F</span><span style={{color:'rgb(234, 67, 53)'}}>u</span><span style={{color:'rgb(251, 188, 5)'}}>n</span>
                        <span style={{color:'rgb(17, 142, 226)'}}>d</span><span style={{color:'rgb(234, 67, 53)'}}>o</span>
                </div>
                <h1 class="forgot-email-header">Find your email</h1>
                <span class="forgot-email-caption">Enter your phone number or recovery email</span>
                <form>
                    <TextField fullWidth label="Phone number or email" id="emailorPhone" size="medium" margin="dense" sx={{marginTop:'40px'}}/>
                    <div class="signin-buttons">
                            <Button variant="contained" sx={{width:'80px'}}>Next</Button>
                    </div>
                </form>
            </div>
        )
    }
}

export default ForgetEmail
