import { Component } from 'react'
import '../styles/Login.css'

// Based on https://es.reactjs.org/docs/forms.html
export default class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            showPassword: false
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
    
    // TODO: Ver que hago aca
    handleSubmit(event) {
        if (!this.showPassword) {
            this.showPassword = true;
        }
        event.preventDefault();
    }
    
    render() {
        return (
            <div>
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
                        </div>
                    </div>
                    { this.state.showPassword &&
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
                        </div>
                    }
                    
                    <div className="text-right">
                        <input type="submit" className="btn btn-primary" value="Next"/>
                    </div>
                </form>
            </div>
        );
    }
}