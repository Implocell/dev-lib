import { Book } from '../../api/types';
import './styles.scss';

import BookItem from './Item';

const List = ({ books }: { books: Book[] }) => {
    const renderList = () => {
        return books.map((book, index) => (
            <BookItem book={book} uniqueKey={index} />
        ));
    };

    return <ul className='book-list'>{renderList()}</ul>;
};

export default List;
