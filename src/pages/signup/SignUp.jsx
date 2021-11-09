import React, { Component } from 'react'
import './signup.scss';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import UserService from '../../services/UserService';
const userService = new UserService();


export default class SignUp extends Component {
    
    constructor(props) {
        super(props);
    
        this.state = {
          fName: "",
          lName: "",
          userName: "",
          password: "",
          repeatedPsw: "",
          fNameError: false,
          lNameError: false,
          userNameError : false,
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

        errors.fNameError = this.state.fName !== "" ? false : true;
        errors.lNameError = this.state.lName !== "" ? false : true;
        errors.userNameError = this.state.userName !== "" ? false: true;
        errors.passwordError = this.state.password !== ""? false: true;
        errors.repeatedPswError = this.state.repeatedPsw !== "" ? false: true;

        this.setState({
            ...errors
        });

        return (isError = errors.fNameError || errors.lNameError || errors.userNameError || errors.passwordError || errors.repeatedPswError)
    };

    next = () => {
        var isValidated = this.isValid();
        console.log(this.state)
        if(!isValidated){
            console.log("validation sucessfull");
            let data = {
                "firstName": this.state.fName,
                "lastName": this.state.lName,
                "email" : this.state.userName,
                "password" : this.state.password,
                "service": "advance"
            }
            userService.Registration("http://fundoonotes.incubation.bridgelabz.com/api/user/userSignUp", data)
                .then(()=>{
                    console.log("sucessfully registered");
                })
                .catch ((err)=> {
                    console.log(err);
                });
        }
    }
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
                            <TextField 
                                fullWidth 
                                label="first name" 
                                name ="fName"
                                error={this.state.fNameError}
                                helperText = {this.state.fNameError ? "first name is req" : ""}
                                onChange = {(e) => this.change(e)}
                                size="small" 
                                margin="dense" 
                                sx={{marginRight:'5px'}}
                            />
                            <TextField 
                                fullWidth 
                                label="last name" 
                                name ="lName"
                                error={this.state.lNameError}
                                helperText = {this.state.lNameError ? "last name is req" : ""}
                                onChange = {(e) => this.change(e)}
                                size="small" 
                                margin="dense" 
                                sx={{marginLeft:'5px'}}/>
                        </div>
                        <TextField 
                            fullWidth 
                            label="user name"  
                            name ="userName"
                            error={this.state.userNameError}
                            helperText = {this.state.userNameError ? "this is a required field" : "you can use numbers,letters and periods"}
                            onChange = {(e) => this.change(e)}
                            size="small" 
                            margin="dense" 
                        />
                        <div><p class="p">Use my current email address instead</p></div>
                        <div class="psw">
                            <TextField 
                                fullWidth 
                                label="Password" 
                                name ="password"
                                error={this.state.passwordError}
                                helperText = {this.state.passwordError ? "password is req" : ""}
                                onChange = {(e) => this.change(e)}
                                size="small" 
                                margin="dense" 
                                sx={{marginRight:'5px'}}
                            />
                            <TextField 
                                fullWidth 
                                label="Confirm" 
                                name ="repeatedPsw"
                                error={this.state.repeatedPswError}
                                helperText = {this.state.repeatedPswError ? "confirm the password" : ""}
                                onChange = {(e) => this.change(e)}
                                size="small" 
                                margin="dense" 
                                sx={{marginLeft:'5px'}}
                            />
                        </div>
                        <p class="pswhelper">Use 8 or more characters with a mix of letters, numbers & symbols</p>
                        <div class="check">
                            <Checkbox/> Show password
                        </div>
                       <div class="buttons">
                            <Button>Sign in instead</Button>
                            <Button variant="contained" onClick={this.next}>Next</Button>
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
