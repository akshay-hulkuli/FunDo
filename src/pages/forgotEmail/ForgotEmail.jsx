import React, { Component } from 'react'
import './forgot_email.scss'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import UserService from '../../services/UserService';
const userService = new UserService();

export class ForgetEmail extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          email: "",
          emailError: false,
          redirect: null,
        };
      }

    change = (e) => {
        this.setState({
            [e.target.name] : e.target.value,
        });
    };

    isValid = () => {
        let isError = false;
        const errors = this.state;

        errors.emailError = this.state.email !== "" ? false : true;

        this.setState({
            ...errors
        });

        return (isError = errors.emailError)
    };

    next = () => {
        var isValidated = this.isValid();
        console.log(this.state)
        if(!isValidated){
            console.log("validation sucessfull");
            let data = {
                "email" : this.state.email,
            }
            userService.ForgotEmail("user/reset", data)
                .then(()=>{
                    console.log("sucessfully sent reset mail");
                })
                .catch ((err)=> {
                    console.log(err);
                });
        }
    }
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
                    <TextField 
                    fullWidth 
                    label="Phone number or email" 
                    name ="email"
                    error={this.state.emailError}
                    helperText = {this.state.emailError ? "this field is req" : ""}
                    onChange = {(e) => this.change(e)} 
                    size="medium" 
                    margin="dense" 
                    sx={{marginTop:'40px'}}
                />
                    <div class="forgot-email-buttons">
                            <Button variant="contained" sx={{width:'80px'}} onClick={this.next}>Next</Button>
                    </div>
                </form>
            </div>
        )
    }
}

export default ForgetEmail
