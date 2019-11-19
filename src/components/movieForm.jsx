import React from 'react';
import Form from '../components/common/form';
import Joi from 'joi-browser';
import Input from '../components/common/input';
import Select from '../components/common/select';
import { getMovie, saveMovie } from "../services/movieServices";
import { getGenres } from "../services/genreServices";

class MovieForm extends Form {

    state = {
        data: { 
            title: "",
            genreId: "",
            numberInStock: "",
            dailyRentalRate: ""
        },
        genres: [],
        errors: { }
    }

    schema = {
        _id: Joi.string(),
        title : Joi.string().required().label('Title'),
        genreId : Joi.string().required().label('Genre'),
        numberInStock : Joi.number().min(0).max(100).label('Number In Stock'),
        dailyRentalRate : Joi.number().min(0).max(10).label('Daily Rental Rate')
    }

    async populateGenres() {
        const { data: genres } = await getGenres();
        this.setState({ genres });
    }

    async populateMovie () {
        const movieId = this.props.match.params.id;
        if(movieId === "new") return;

        try {
            const { data: movie } = await getMovie(movieId);
            this.setState({ data: this.mapToViewModel(movie) });
        }
        catch (ex){
            if(ex.response && ex.response.status === 404)
                return this.props.history.replace("/not-found");
        }
    }

    async componentDidMount() {
        this.populateGenres();
        this.populateMovie();
    }

    mapToViewModel(movie){
        return {
            _id: movie._id,
            title: movie.title,
            genreId: movie.genre._id,
            numberInStock: movie.numberInStock,
            dailyRentalRate: movie.dailyRentalRate
        }
    }

    
    doSubmit = async () => {
        await saveMovie(this.state.data);
        this.props.history.push("/movies");
    }


    render() {
        const { data, errors } = this.state;
        return (
            <div className="mt-5 pt-5">
                <h1>Movie Form</h1>
                <form onSubmit={ this.handleSubmit }>
                    
                    <Input 
                        value={ data.title } 
                        onChange={ this.handleChange }
                        name="title"
                        type="text"
                        label="Title"
                        error = {errors.title}
                    />
                    <Select
                        value={ data.genreId } 
                        onChange={ this.handleChange }
                        options={ this.state.genres }
                        name="genreId"
                        label="Genre"
                        error = {errors.genreId}
                    />
                    <Input 
                        value={ data.numberInStock } 
                        onChange={ this.handleChange }
                        name="numberInStock"
                        type="text"
                        label="Number In Stock"
                        error = {errors.numberInStock}
                    />
                    <Input 
                        value={ data.dailyRentalRate } 
                        onChange={ this.handleChange }
                        name="dailyRentalRate"
                        type="text"
                        label="Rate"
                        error = {errors.dailyRentalRate}
                    />
                                       
                    { this.renderButton('Save') }
                </form>                
            </div>
        )
    }


}

export default MovieForm;