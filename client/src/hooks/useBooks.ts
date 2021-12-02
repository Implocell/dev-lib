import { useEffect, useState } from 'react';
import { getBooks } from '../api/books';
import { Book } from '../api/types';

const useBooks = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [count, setCount] = useState<number>(0);
    const [error, setError] = useState({});

    useEffect(() => {
        async function fetchBooks() {
            const res = await getBooks();
            if ('errors' in res) {
                setError(res.errors);
                return;
            }
            console.log(res.books);
            setBooks(res.books);
            setCount(res.booksCount);
        }

        fetchBooks();
    }, []);

    return { books, count, error };
};

export default useBooks;
