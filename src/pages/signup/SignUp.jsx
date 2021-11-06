import React, { Component } from 'react'
import './signup.scss';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';

export default class SignUp extends Component {
    render() {
        return (
            <div class="main-content">
                <div class="main-content-left">
                    <div class="logo"> 
                        <span style={{color:'rgb(17, 142, 226)'}}>F</span><span style={{color:'rgb(234, 67, 53)'}}>u</span><span style={{color:'rgb(251, 188, 5)'}}>n</span>
                        <span style={{color:'rgb(17, 142, 226)'}}>d</span><span style={{color:'rgb(234, 67, 53)'}}>o</span>
                    </div>
                    
                    <span class="main-content-left-header">create your fundo account</span>
                    <form id="form">
                        <div class="name">
                            <TextField fullWidth label="first name" id="firstName" size="small" margin="dense" sx={{marginRight:"5px"}} />
                            <TextField fullWidth label="last name" id="lastName" size="small" margin="dense" sx={{marginLeft:"5px"}}/>
                        </div>
                        <TextField fullWidth label="user name"  id="fullWidth" size="small" margin="dense" helperText="you can use numbers,letters and periods" />
                        <div><p class="p">Use my current email address instead</p></div>
                        <div class="psw">
                            <TextField fullWidth label="Password" id="psw" size="small" margin="dense" sx={{marginRight:"5px"}} />
                            <TextField fullWidth label="Confirm" id="pswRepeat" size="small" margin="dense" sx={{marginLeft:"5px"}}/>
                        </div>
                        <p class="pswhelper">Use 8 or more characters with a mix of letters, numbers & symbols</p>
                        <div class="check">
                            <Checkbox/> Show password
                        </div>
                       <div class="buttons">
                            <Button>Sign in instead</Button>
                            <Button variant="contained">Next</Button>
                       </div>
                    </form>
                </div>
                <div class="main-content-right">
                    <img src="https://ssl.gstatic.com/accounts/signup/glif/account.svg" height="244" width="244"/>
                    <div class="main-content-right-caption">
                        <span>One account. All of Fundo</span><br/>
                        <span>working for you.</span>
                    </div>
                </div>
            </div>
        )
    }
}
