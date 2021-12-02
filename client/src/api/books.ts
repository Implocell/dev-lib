import Books from '../pages/Books';
import request from './api';
import { BookList, Errors, Book, PlainBook, Tags } from './types';

export const getBooks = async (limit = 5) => {
    const res = await request(`books?limit=${limit}`, 'GET');
    const data: BookList | Errors = await res.json();
    return data;
};

export const favoriteBook = async (slug: string) => {
    await request(`books/${slug}/favorite`, 'POST');
};

export const addBook = async ({
    title,
    author,
    description,
    borrowable,
    borrowed,
    tagList,
}: PlainBook) => {
    const bookJson = JSON.stringify({
        book: { title, author, description, borrowable, borrowed, tagList },
    });
    const res = await request('books', 'POST', bookJson);
    const data: Book | Errors = await res.json();
    return data;
};

export const getTags = async () => {
    const res = await request('/books/tags', 'GET');
    const data: Tags = await res.json();

    return data;
};

export const getBooksByTag = async (tag: string) => {
    const res = await request(`/books?tag=${tag}`, 'GET');
    const data: BookList = await res.json();
    return data;
};
