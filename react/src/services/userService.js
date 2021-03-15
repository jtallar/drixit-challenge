import authenticationService from '../services/authenticationService'

export default {
    getUserInfo
}

function getUserInfo() {
    const userInfoURL = '/api/v0/users/me';

    return fetch(userInfoURL, {
        method: 'GET',
        headers: authenticationService.getAuthHeader()
      }).then(res => res.json())
      .then(user => {
          return user;
      });
}