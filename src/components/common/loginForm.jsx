import React from 'react';
import { Redirect } from 'react-router-dom';
import Form from './form';
import Joi from 'joi-browser';
import Input from './input';
import { login, getCurrentUser } from '../../services/authService'

export class LoginForm extends Form {

    state = {
        data: { username: '', password: ''},
        errors: { }
    }

    schema = {
        username : Joi.string().required().label('Username'),
        password : Joi.string().required().label('Password')
    }


    doSubmit = async () => {
        try {
            const { data } = this.state;
            await login(data.username, data.password);
            // this.props.history.push('/');
            //This is for reload
            const { state } = this.props.location;
            //redirect to page where user left/trying to into
            window.location= state ? state.from.pathname : '/';
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                const errors = { ...this.state.errors }
                errors.username = ex.response.data
                this.setState({ errors })
            }
        }
        // const username = document.getElementById('username').value;
        // const password = document.getElementById('password').value;
        // console.log(username);
        // console.log(password);
    }


    render() {
        const { data, errors } = this.state;
        if (getCurrentUser()) return <Redirect to="/" />
        return (
            <div className="mt-5 pt-5">
                <h1>Login</h1>
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
                    
                    { this.renderButton('Login') }
                </form>                
            </div>
        )
    }
}

export default LoginForm
