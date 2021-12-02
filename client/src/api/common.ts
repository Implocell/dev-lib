import { Errors, User } from './types';

export const addAuthSession = (data: User | Errors) => {
    const res = data;

    if ('errors' in res) {
        return false;
    }
    if (!res.user.username) {
        logOut();
        return false;
    }

    sessionStorage.setItem('authToken', res.user.token);
    sessionStorage.setItem('user', JSON.stringify(res.user));
    return true;
};

export const logOut = () => {
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('user');
};
