import React, { Component } from 'react';
import Joi from 'joi-browser';

export class Form extends Component {
    state ={
        data: {},
        errors: {}
    }

    validate = () => {
        const result = Joi.validate(this.state.acccount, this.schema, {
            abortEarly: false
        });

        if (!result.error) return null;

        const errors = {};

        for (let item of result.error.details){
            errors[item.path[0]] = item.message;
        }

        return errors;
    }

    validateProperty = ({ name, value}) => {
        const obj = { [name]: value };
        const schema = { [name]: this.schema[name]}
        
        const result = Joi.validate(obj, schema);
        return result.error ? result.error.details[0].message : null;
    }

    handleSubmit = e => {
        e.preventDefault();

        const errors = this.validate();
        this.setState({ errors: errors || {} });
        if (errors) return;

        //Call the server
        this.doSubmit();
        
    }

    handleChange = ({ currentTarget: input }) => {
        const errors = { ...this.state.errors };
        const errorMessage = this.validateProperty(input);
        if(errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name];

        const data = {...this.state.data};
        data[input.name] = input.value;
        this.setState({ data, errors });
    }

    renderButton(label){
        return(
            <button disabled={this.validate()} className="btn btn-primary">
                {label}
            </button>
        );
    }

}

export default Form
