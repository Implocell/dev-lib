import useBooks from '../../hooks/useBooks';
import List from './list';

const Books = () => {
    const { books, count, error } = useBooks();

    if (error || !books) {
        return <div>There was an error when getting books!</div>;
    }

    return <List books={books} />;
};

export default Books;
