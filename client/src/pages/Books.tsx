import useBooks from '../hooks/useBooks';
import BookList from '../features/Books/list';
import isEmpty from '../utils/objectEmpty';

const Books = () => {
    const { books, count, error } = useBooks();

    if (!isEmpty(error) || !books) {
        return <div>There was an error when getting books!</div>;
    }

    return <BookList books={books} />;
};

export default Books;
