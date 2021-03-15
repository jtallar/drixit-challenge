import {useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import authenticationService from '../services/authenticationService'
import userService from '../services/userService'
import User from '../components/User'
import '../styles/UserInfo.css'

export default function UserInfo () {
    const [user, setUser] = useState({});
    const [redirect, setRedirect] = useState(null);
    const history = useHistory();

    useEffect(function () {
        userService.getUserInfo()
            .then(response => {
                setUser(response);
            })
            .catch(error => {
                authenticationService.logout();
                history.replace("/login");
            });
    }, []);

    return (
        <div>
            <h1>UserInfo</h1>
            <User user={user}/>
        </div>
    )
}