export interface User {
    user: {
        username: string;
        firstName: string;
        lastName: string;
        role: number;
        token: string;
    };
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
    // forward user to context
    return true;
};
