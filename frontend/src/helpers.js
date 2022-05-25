export const isAuthenticated = () => {
    return localStorage.getItem('token') ? true : false;
}

export const currentUser = () => JSON.parse(localStorage.getItem('user')) ;
export const getToken = () => localStorage.getItem('token') ;

export const isAdmin = () => currentUser().role === 1 ;