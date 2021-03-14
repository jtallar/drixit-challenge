export default {
    login,
    logout,
    isLoggedIn,
    getAuthHeader
}

function login(email, password) {
    const loginURL = '/api/v0/authenticate';
    const data = {
      email: email, 
      password: password
    }
    
    return fetch(loginURL, {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
      .then(user => {
          localStorage.setItem('token', user.jwt);

          return user;
      })
      .catch(error => console.error('Error: ', error));
}

function logout() {
    localStorage.removeItem('token');
}

function isLoggedIn() {
    return !!(localStorage.getItem('token'));
}

function getAuthHeader() {
    const token = localStorage.getItem('token');
    if (token) {
        return { Authorization: `Bearer ${token}` };
    }
    return {};
}
