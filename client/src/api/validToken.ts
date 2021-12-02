import request from './api';
import { addAuthSession } from './common';
import { Errors, User } from './types';

export const isValidToken = async () => {
    const res = await request('user', 'GET');
    const data: User | Errors = await res.json();
    const ok = addAuthSession(data);
    if (ok) {
        return true;
    }
    return false;
};
