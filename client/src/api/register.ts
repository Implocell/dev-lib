import request from './api';
import { addAuthSession } from './common';
import { Errors, User } from './types';

const register = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    username: string
) => {
    const registerInfo = JSON.stringify({
        user: {
            email,
            password,
            firstName,
            lastName,
            username,
        },
    });
    const res = await request('user', 'POST', registerInfo);
    const data: User | Errors = await res.json();
    const ok = addAuthSession(data);
    if (ok) {
        return;
    }
    throw new Error('Login failed');
};

export default register;
