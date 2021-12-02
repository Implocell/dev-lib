import request from './api';
import { BookList, Errors } from './types';

export const getBooks = async (limit = 5) => {
    const res = await request(`books?limit=${limit}`, 'GET');
    const data: BookList | Errors = await res.json();
    return data;
};

export const favoriteBook = async (slug: string) => {
    await request(`books/${slug}/favorite`, 'POST');
};
