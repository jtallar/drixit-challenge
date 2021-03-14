import {useState} from 'react'
import { Redirect } from 'react-router-dom'
import LoginForm from '../components/LoginForm'
import authenticationService from '../services/authenticationService'
import '../styles/Login.css'

export default function Login () {
    const [loading, setLoading] = useState(false);

    if (authenticationService.isLoggedIn()) {
        return <Redirect to='/user-info' />;
    }

    return (
        <div>
            <h1>Welcome to drixit challenge.</h1>
            <h3>Enter your credentials</h3>
            <LoginForm/>
        </div>
    );
}