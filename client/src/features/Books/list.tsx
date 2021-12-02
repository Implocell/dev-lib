import { favoriteBook } from '../../api/books';
import { Book } from '../../api/types';
import { ReactComponent as FavoriteIcon } from '../../assets/favorite.svg';
import { ReactComponent as FavoritedIcon } from '../../assets/favorited.svg';
import './styles.scss';

const List = ({ books }: { books: Book[] }) => {
    const renderBorrowing = (book: Book) => {
        if (book.borrowable) {
            return (
                <div className='book-item-col'>
                    <span className='book-item-borrow-title'>
                        This book can be borrowed
                    </span>
                    <span className='book-item-borrow-available'>
                        Available:
                        <span
                            className={book.borrowed ? 'red' : 'green'}
                        ></span>
                    </span>
                </div>
            );
        }
        return null;
    };

    const renderTags = (tags: string[]) =>
        tags.map((tag) => <span className='book-item-tag'>{tag}</span>);

    const renderList = () => {
        return books.map((book) => (
            <li className='book-item'>
                <div className='book-item-container'>
                    <div className='book-item-row'>
                        <div className='book-item-col'>
                            <h1 className='book-item-title'>{book.title}</h1>
                            <span className='book-item-author'>
                                {book.author}
                            </span>
                        </div>
                        {renderBorrowing(book)}
                    </div>
                    <span className='book-item-description'>
                        {book.description}
                    </span>
                    <span className='book-item-user'>
                        Added by: {book.user.username}
                    </span>
                </div>
                <div className='book-item-footer'>
                    <div className='book-item-tags'>
                        {renderTags(book.tagList)}
                    </div>
                    <span className='book-item-favorite'>
                        {book.slug}
                        <div
                            className='book-item-favorite-icon'
                            onClick={() => favoriteBook(book.slug)}
                        >
                            {book.favorited ? (
                                <FavoritedIcon />
                            ) : (
                                <FavoriteIcon />
                            )}
                        </div>
                        <span className='book-item-favorite-count'>
                            {book.favoritesCount}
                        </span>
                    </span>
                </div>
            </li>
        ));
    };

    return <ul className='book-list'>{renderList()}</ul>;
};

export default List;
