import React, { Component } from 'react'
import './reset.scss'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import History from '../../history/History';
import UserService from '../../services/UserService';
const userService = new UserService();

export class Reset extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          password: "",
          repeatedPsw : "",
          passwordError: false,
          repeatedPswError: false,
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

        errors.passwordError = this.state.password !== "" ? false : true;
        errors.repeatedPswError = this.state.repeatedPsw !== "" ? false : true;
        this.setState({
            ...errors
        });

        return (isError = errors.passwordError || errors.repeatedPswError)
    };

    next = () => {
        var isValidated = this.isValid();
        console.log(this.state)
        const queryString = window.location.href;
        if(!isValidated){
            console.log("validation sucessfull");
            const urlArray = queryString.split("/")
            console.log(urlArray[urlArray.length-1]);
            let config = {
                headers:{
                    "Authorization" : urlArray[urlArray.length-1],
            }
            }
            let data = {
                "newPassword" : this.state.password
            }
            userService.Reset("http://fundoonotes.incubation.bridgelabz.com/api/user/reset-password", data, config)
                .then(()=>{
                    console.log("sucessfully changed password");
                    History.push('/');
                })
                .catch ((err)=> {
                    console.log(err);
                });
        }
    }
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
                    <TextField 
                        fullWidth 
                        label="Enter new password" 
                        name ="password"
                        error={this.state.passwordError}
                        helperText = {this.state.passwordError ? "this field is req" : ""}
                        onChange = {(e) => this.change(e)} 
                        size="small" 
                        margin="dense" 
                        sx={{marginTop:'40px'}}
                    />
                    <TextField 
                        fullWidth 
                        label="Confirm the password" 
                        name ="repeatedPsw"
                        error={this.state.repeatedPswError}
                        helperText = {this.state.repeatedPswError ? "this field is req" : ""}
                        onChange = {(e) => this.change(e)}  
                        size="small" 
                        margin="dense" 
                        sx={{marginTop:'20px'}}
                    />
                    <div class="reset-buttons">
                            <Button variant="contained" sx={{width:'80px'}} onClick={this.next}>Next</Button>
                    </div>
                </form>
            </div>
        )
    }
}

export default Reset
