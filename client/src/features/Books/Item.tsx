import { favoriteBook, unFavoriteBook } from '../../api/books';
import { Book } from '../../api/types';
import HoverBox from '../../components/HoverBox';
import { ReactComponent as FavoriteIcon } from '../../assets/favorite.svg';
import { ReactComponent as FavoritedIcon } from '../../assets/favorited.svg';
import './styles.scss';

interface Props {
    book: Book;
    uniqueKey?: string | number;
}

const BookItem = ({ book, uniqueKey = 'uniqueKey' }: Props) => {
    const renderBorrowing = () => {
        if (book.borrowable) {
            return (
                <div className='book-item-col'>
                    <span className='book-item-borrow-title'>
                        This book can be borrowed
                    </span>
                    <span className='book-item-borrow-available'>
                        Available:
                        <span
                            className={!book.borrowed ? 'red' : 'green'}
                        ></span>
                    </span>
                </div>
            );
        }
        return null;
    };

    const renderFavorite = () => {
        if (book.favorited) {
            return (
                <div
                    className='book-item-favorite-icon'
                    onClick={() => unFavoriteBook(book.slug)}
                >
                    <FavoritedIcon />
                </div>
            );
        }

        return (
            <div
                className='book-item-favorite-icon'
                onClick={() => favoriteBook(book.slug)}
            >
                <FavoriteIcon />
            </div>
        );
    };

    const renderTags = (tags: string[]) =>
        tags.map((tag) => <span className='book-item-tag'>{tag}</span>);

    return (
        <div className='book-item' key={uniqueKey}>
            <div className='book-item-container'>
                {uniqueKey !== 'uniqueKey' && (
                    <HoverBox text='See more' to={`/books/${book.slug}`} />
                )}
                <div className='book-item-row'>
                    <div className='book-item-col'>
                        <h1 className='book-item-title'>{book.title}</h1>
                        <span className='book-item-author'>{book.author}</span>
                    </div>
                    {renderBorrowing()}
                </div>
                <span className='book-item-description'>
                    {book.description}
                </span>
                <span className='book-item-user'>
                    Added by: {book.user.username}
                </span>
            </div>
            <div className='book-item-footer'>
                <div className='book-item-tags'>{renderTags(book.tagList)}</div>
                <span className='book-item-favorite'>
                    {renderFavorite()}
                    <span className='book-item-favorite-count'>
                        {book.favoritesCount}
                    </span>
                </span>
            </div>
        </div>
    );
};

export default BookItem;
