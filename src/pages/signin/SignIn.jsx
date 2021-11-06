import React, { Component } from 'react'
import './signin.scss'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export class SignIn extends Component {
    render() {
        return (
            <div class="signin-container">
                <div class="logo"> 
                        <span style={{color:'rgb(17, 142, 226)'}}>F</span><span style={{color:'rgb(234, 67, 53)'}}>u</span><span style={{color:'rgb(251, 188, 5)'}}>n</span>
                        <span style={{color:'rgb(17, 142, 226)'}}>d</span><span style={{color:'rgb(234, 67, 53)'}}>o</span>
                </div>
                <h1 class="signin-header">Sign in</h1>
                <span class="signin-caption">Use your Fundo account</span>
                <form>
                    <TextField fullWidth label="Email or Phone" id="emailorPhone" size="medium" margin="dense" sx={{marginTop:'40px'}}/>
                    <p class="para1">Forgot email?</p>
                    <div class="para2">
                        Not your computer? Use Guest mode to sign in privately.
                        <a href="#">Learn more</a>
                    </div>
                    <div class="signin-buttons">
                            <Button>Create account</Button>
                            <Button variant="contained">Next</Button>
                    </div>
                </form>
                
            </div>
        )
    }
}

export default SignIn
