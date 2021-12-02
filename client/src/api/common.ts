import useAccount from '../hooks/useAccount';

export interface UserProps {
    username: string;
    firstName: string;
    lastName: string;
    role: number;
    token: string;
}
export interface User {
    user: UserProps;
}

export interface Errors {
    errors: {
        [key: string]: string;
    };
}

export const addAuthSession = (data: User | Errors) => {
    const res = data;

    if ('errors' in res) {
        return false;
    }

    sessionStorage.setItem('authToken', res.user.token);
    sessionStorage.setItem('user', JSON.stringify(res.user));
    return true;
};
