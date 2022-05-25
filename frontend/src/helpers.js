export const isAuthenticated = () => {
    return localStorage.getItem('token') ? true : false;
}

export const currentUser = () => JSON.parse(localStorage.getItem('user')) ;

export const isAdmin = () => currentUser().role === 1 ;