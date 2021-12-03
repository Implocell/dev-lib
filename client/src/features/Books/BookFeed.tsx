import { useEffect, useState } from 'react';
import { getBookFeed } from '../../api/books';
import { BookList } from '../../api/types';

const BookFeed = () => {
    const [books, setBooks] = useState<BookList>();

    useEffect(() => {
        async function fetchFeed() {
            setBooks(await getBookFeed());
        }

        fetchFeed();
    }, []);

    const renderBooks = () => {
        books?.books.map((book) => (
            <div className='book-feed-item'>
                <div className='book-feed-item-title'>{book.title}</div>
                <div className='book-feed-item-author'>{book.author}</div>
                <div className='book-feed-item-user'>{book.user}</div>
                <div className='book-feed-item-borrowable'>
                    {book.borrowable ? 'Yes' : 'No'}
                </div>
                <div className='book-feed-item-borrowed'>
                    {book.borrowed ? 'Yes' : 'No'}
                </div>
            </div>
        ));
    };

    return <>{books && renderBooks()}</>;
};

export default BookFeed;
