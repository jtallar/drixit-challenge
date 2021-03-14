import {useState} from 'react'
import LoginForm from '../components/LoginForm'
import '../styles/Login.css'

export default function Login () {
    const [loading, setLoading] = useState(false);

    return (
        <div>
            <h1>Welcome to drixit challenge.</h1>
            <h3>Enter your credentials</h3>
            <LoginForm/>
        </div>
    );
}