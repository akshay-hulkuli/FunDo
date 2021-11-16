import React, { Component } from 'react'
import './signin.scss'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link, Redirect } from 'react-router-dom';
import UserService from '../../services/UserService';
const userService = new UserService();


export class SignIn extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          email: "",
          password: "",
          passwordError: false,
          emailError: false,
          redirect: null,
        };
    }
    
    goToSignUp = () => {
        this.props.history.push('/signup')
    }

    toGoForgotEmail = () => {
        this.props.history.push('/forgotemail')
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
        errors.passwordError = this.state.password !== "" ? false : true;

        this.setState({
            ...errors
        });

        return (isError = errors.emailError || errors.passwordError)
    };

    next = () => {
        var isValidated = this.isValid();
        console.log(this.state)
        if(!isValidated){
            console.log("validation sucessfull");
            let data = {
                "email" : this.state.email,
                "password": this.state.password
            }
            userService.LogIn("user/login", data)
                .then((a)=>{
                    console.log(a);
                    console.log("sucessfully logged in");
                    localStorage.setItem('uid', a.data.id);
                    localStorage.setItem('email',a.data.email);
                    localStorage.setItem('firstName',a.data.firstName);
                    localStorage.setItem('lastName',a.data.lastName);
                    this.props.history.push('/dashboard');
                })
                .catch ((err)=> {
                    console.log(err);
                });
        }
    }
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
                    <TextField
                        fullWidth 
                        label="Email or Phone" 
                        name ="email"
                        error={this.state.emailError}
                        helperText = {this.state.emailError ? "this field is req" : ""}
                        onChange = {(e) => this.change(e)} 
                        size="medium"
                        margin="dense"
                        sx={{marginTop:'40px'}}
                    />
                    <p class="para1" onClick={this.toGoForgotEmail}>Forgot email?</p>

                    <TextField
                        fullWidth 
                        label="password" 
                        name ="password"
                        error={this.state.passwordError}
                        helperText = {this.state.passwordError ? "this field is req" : ""}
                        onChange = {(e) => this.change(e)} 
                        size="medium"
                        margin="dense"
                        sx={{marginTop:'40px'}}
                    />
                    <div class="para2">
                        Not your computer? Use Guest mode to sign in privately.
                        <a href="#">Learn more</a>
                    </div>
                    <div class="signin-buttons">
                            <Button onClick={this.goToSignUp}>Create account</Button>
                            <Button variant="contained" onClick={this.next}>Next</Button>
                    </div>
                </form>
                
            </div>
        )
    }
}

export default SignIn
