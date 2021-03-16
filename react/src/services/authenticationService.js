const authFun = {
    login,
    logout,
    isLoggedIn,
    getAuthHeader
}
export default authFun;

const ITEM_KEY = 'token';

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
          localStorage.setItem(ITEM_KEY, user.jwt);

          return user;
      });
}

function logout() {
    localStorage.removeItem(ITEM_KEY);
}

function isLoggedIn() {
    return !!(localStorage.getItem(ITEM_KEY));
}

function getAuthHeader() {
    const token = localStorage.getItem(ITEM_KEY);
    if (token) {
        return { Token: `Bearer ${token}` };
    }
    return {};
}
