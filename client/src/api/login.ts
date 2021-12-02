import request from './api';
import { addAuthSession, Errors, User } from './common';

export const login = async (email: string, password: string) => {
    const loginInfo = JSON.stringify({ user: { email, password } });
    const res = await request('user/login', 'POST', loginInfo);
    const data: User | Errors = await res.json();
    const ok = addAuthSession(data);
    if (ok) {
        return;
    }
    throw new Error('Login failed');
};

export default login;
