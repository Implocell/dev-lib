import { useEffect, useState } from 'react';
import { getUserFavoritedBooks } from '../../../api/books';
import { BookList } from '../../../api/types';

const FavoritedBooks = ({ username }: { username: string }) => {
    const [books, setBooks] = useState<BookList>();

    useEffect(() => {
        async function fetchFeed() {
            setBooks(await getUserFavoritedBooks(username));
        }

        fetchFeed();
    }, [username]);

    const renderBooks = () => {
        return books?.books.map((book) => (
            <div className='book-feed-item'>
                <div className='book-feed-item-title'>{book.title}</div>
                <div className='book-feed-item-author'>{book.author}</div>
                <div className='book-feed-item-user'>{book.user.username}</div>
                <div className='book-feed-item-borrowable'>
                    {book.borrowable ? 'Yes' : 'No'}
                </div>
                <div className='book-feed-item-borrowed'>
                    {book.borrowed ? 'Yes' : 'No'}
                </div>
            </div>
        ));
    };

    return <>{renderBooks()}</>;
};

export default FavoritedBooks;
