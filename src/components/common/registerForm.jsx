import React from 'react';
import { Redirect } from 'react-router-dom';
import Form from './form';
import Joi from 'joi-browser';
import Input from './input';
import * as userService from '../../services/userServices';
import { getCurrentUser } from '../../services/authService';

export class RegisterForm extends Form {

    state = {
        data: { username: "", password: "", name: ""},
        errors: { }
    }

    schema = {
        username : Joi.string().required().label('Username'),
        password : Joi.string().required().label('Password'),
        name : Joi.string().required().label('Name'),
    }


    doSubmit = async () => {
        try {
            const response = await userService.register(this.state.data)
            localStorage.setItem("token",response.headers['x-auth-token']);
            // this.props.history.push("/");
            window.location = '/'
        }
        catch (ex) {
            if (ex.response && ex.response.status === 400) {
                const errors = { ...this.state.errors }
                errors.username = ex.response.data;
                this.setState({ errors })
            }
        }
        // const username = document.getElementById('Username').value;
        // const password = document.getElementById('Password').value;
        // const name = document.getElementById('Name').value;
        // console.log(username);
        // console.log(password);
        // console.log(name);
    }


    render() {
        const { data, errors } = this.state;
        if (getCurrentUser()) return <Redirect to="/" />
        return (
            <div className="mt-5 pt-5">
                <h1>Register</h1>
                <form onSubmit={ this.handleSubmit }>
                    
                    <Input 
                        value={ data.username } 
                        onChange={ this.handleChange }
                        name="username"
                        type="text"
                        label="Username"
                        error = {errors.username}
                    />
                    
                    <Input 
                        value={ data.password } 
                        onChange={ this.handleChange }
                        name="password"
                        type="password"
                        label="Password"
                        error = {errors.password}
                    />

                    <Input 
                        value={ data.name } 
                        onChange={ this.handleChange }
                        name="name"
                        type="name"
                        label="Name"
                        error = {errors.name}
                    />
                    
                    { this.renderButton('Login') }
                </form>                
            </div>
        )
    }
}

export default RegisterForm
