import request from './api';
import {
    BookList,
    Errors,
    Book,
    PlainBook,
    Tags,
    SingleBook,
    Comments,
    SingleComment,
    Comment,
} from './types';

export const getBooks = async (limit = 5) => {
    const res = await request(`books?limit=${limit}`, 'GET');
    const data: BookList | Errors = await res.json();
    return data;
};

export const favoriteBook = async (slug: string) => {
    await request(`books/${slug}/favorite`, 'POST');
};

export const unFavoriteBook = async (slug: string) => {
    await request(`books/${slug}/favorite`, 'DELETE');
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

export const getBookBySlug = async (tag: string) => {
    const res = await request(`/books/${tag}`, 'GET');
    const data: SingleBook = await res.json();
    return data.book;
};

export const getBookComments = async (tag: string) => {
    const res = await request(`/books/${tag}/comments`, 'GET');
    const data: Comments = await res.json();
    return data.comments;
};

export const createBookComment = async (tag: string, comment: string) => {
    const jsonComment = JSON.stringify({ comment: { body: comment } });
    const res = await request(`/books/${tag}/comments`, 'POST', jsonComment);
    const data: SingleComment = await res.json();
    return data;
};

export const getBookFeed = async () => {
    const res = await request('/books/feed', 'GET');
    const data: BookList = await res.json();

    return data;
};

export const getUserFavoritedBooks = async (username: string) => {
    const res = await request(`/books?favorited=${username}`, 'GET');
    const data: BookList = await res.json();
    return data;
};
