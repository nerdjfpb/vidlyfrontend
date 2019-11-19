import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import ProtectedRoute from './components/common/protectedRoute';
import { ToastContainer } from 'react-toastify';
import { getCurrentUser } from './services/authService'
import Movies from './components/movies';
import MovieForm from './components/movieForm';
import Customer from './components/customer';
import Rentals from './components/rentals';
import NotFound from './components/notFound';
import NavBar from './components/NavBar';
import LoginForm from './components/common/loginForm';
import RegisterForm from './components/common/registerForm';
import Logout from './components/common/logout';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

class App extends Component {
  state = {}

  componentDidMount() {
    const user = getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state
    return (
        <main role="main" className="container">  
          <ToastContainer />
          <NavBar user={user}/>
          <Switch>
            <Route path="/Register" component={ RegisterForm } />
            <Route path="/login" component={ LoginForm } />
            <Route path="/logout" component={ Logout } />
            <ProtectedRoute path="/movies/:id" component={MovieForm} />
            <Route path="/movies" 
              render={props => <Movies {...props} user={user}/>}
            />
            <Route path="/customers" component={ Customer } />
            <Route path="/rentals" component={ Rentals } />
            <Route path="/not-found" component={ NotFound } />
            <Redirect from="/" exact to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        
          {/* <Movies /> */}

        </main>
    );
  }
}

export default App;
