import React, { Component } from 'react'
import './reset.scss'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
export class Reset extends Component {
    render() {
        return (
            <div class="reset-container">
                 <div class="logo"> 
                        <span style={{color:'rgb(17, 142, 226)'}}>F</span><span style={{color:'rgb(234, 67, 53)'}}>u</span><span style={{color:'rgb(251, 188, 5)'}}>n</span>
                        <span style={{color:'rgb(17, 142, 226)'}}>d</span><span style={{color:'rgb(234, 67, 53)'}}>o</span>
                </div>
                <h1 class="reset-header">Reset your password</h1>
                <span class="reset-caption">Enter your new password and then </span>
                <form>
                    <TextField fullWidth label="Enter new password" id="psw" size="small" margin="dense" sx={{marginTop:'40px'}}/>
                    <TextField fullWidth label="Confirm the password" id="cpsw" size="small" margin="dense" sx={{marginTop:'20px'}}/>
                    <div class="reset-buttons">
                            <Button variant="contained" sx={{width:'80px'}}>Next</Button>
                    </div>
                </form>
            </div>
        )
    }
}

export default Reset
