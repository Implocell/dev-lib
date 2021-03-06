export interface BookList {
    books: Book[];
    booksCount: number;
}

export interface Book {
    title: string;
    slug: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    author: string;
    user: User;
    tagList: string[];
    favorited: boolean;
    favoritesCount: number;
    borrowable: boolean;
    borrowed: boolean;
}

export type PlainBook = Omit<
    Book,
    'user' | 'createdAt' | 'updatedAt' | 'slug' | 'favorited' | 'favoritesCount'
>;
export interface User {
    username: string;
    firstName: string;
    lastName: string;
    role: number;
    following: boolean;
}

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
export interface Tags {
    tags: string[];
}

export interface SingleBook {
    book: Book;
}

export interface SingleComment {
    comment: Comment;
}

export interface Comment {
    id: number;
    body: string;
    createdAt: string;
    updatedAt: string;
    author: User;
}

export interface Comments {
    comments: Comment[];
}
export interface UserProfile {
    profile: Profile;
}

export interface Profile {
    username: string;
    firstName: string;
    lastName: string;
    role: number;
    following: boolean;
}
