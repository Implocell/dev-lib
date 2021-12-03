import { useEffect, useState } from 'react';
import { getBooks } from '../api/books';
import { Book } from '../api/types';

const useBooks = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [count, setCount] = useState<number>(0);
    const [error, setError] = useState({});

    useEffect(() => {
        async function fetchBooks() {
            const res = await getBooks(20);
            if ('errors' in res) {
                setError(res.errors);
                return;
            }
            setBooks(res.books);
            setCount(res.booksCount);
        }

        fetchBooks();
    }, []);

    return { books, count, error, setBooks, setCount };
};

export default useBooks;
