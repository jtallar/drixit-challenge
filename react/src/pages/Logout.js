import { Redirect } from 'react-router-dom'
import authenticationService from '../services/authenticationService'

export default function Login () {
    authenticationService.logout();
    return <Redirect to='/login' />;
}