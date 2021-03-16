import { Component } from 'react'
import { Redirect } from 'react-router-dom'
import '../styles/Login.css'
import authenticationService from '../services/authenticationService'

// Based on https://es.reactjs.org/docs/forms.html
export default class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            showPassword: false,
            invalidEmail: false,
            invalidCredentials: false,
            redirect: null
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(event) {
        const target = event.target;
        this.setState({
            [target.name]: target.value
        });
    }

    handleSubmit(event) {
        if (!this.state.showPassword) {
            if (this.state.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
                this.setState({
                    invalidEmail: false,
                    showPassword: true
                });
            } else {
                this.setState({
                    invalidEmail: true
                });
            }
        } else {
            // Perform login
            authenticationService.login(this.state.email, this.state.password)
                .then(response => {
                    this.setState({
                        redirect: '/user-info'
                    });
                })
                .catch(error => {
                    this.setState({
                        invalidCredentials: true
                    });
                });
        }
        event.preventDefault();
    }
    
    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />;
        }
        return (
            <>
                <form onSubmit={this.handleSubmit}>
                    <div className="row form-group">
                        <div className="col-4">
                            <label className="form-label">Email</label>
                        </div>
                        <div className="col-8">
                            <input
                                className="form-control"
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Enter email..."
                                value={this.state.email}
                                onChange={this.handleChange} />
                            { this.state.invalidEmail ?
                                <p className="form-error">Invalid email!</p>
                                : null
                            }
                        </div>
                    </div>
                    { this.state.showPassword ?
                        <div className="row form-group" >
                            <div className="col-4">
                                <label className="form-label">Password</label>
                            </div>
                            <div className="col-8">
                                <input
                                    className="form-control"
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="Enter password..."
                                    value={this.state.password}
                                    onChange={this.handleChange} />
                                </div>
                                { this.state.invalidCredentials ?
                                    <p className="form-error">Invalid credentials!</p>
                                    : null
                                }
                        </div>
                        : null
                    }
                    
                    <div className="text-right">
                        <input type="submit" className="btn btn-primary" value={this.state.showPassword ? 'Log In' : 'Next'}/>
                    </div>
                </form>
            </>
        );
    }
}