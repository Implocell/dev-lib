import request from './api';
import { User, UserProfile } from './types';

export const followUser = async (username: string) => {
    const res = await request(`user/${username}/follow`, 'POST');
    const data: UserProfile = await res.json();
    return data.profile;
};

export const getUserProfile = async (username: string) => {
    const res = await request(`user/${username}`, 'GET');
    const data: UserProfile = await res.json();
    return data.profile;
};
