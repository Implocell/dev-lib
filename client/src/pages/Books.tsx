import useBooks from '../hooks/useBooks';
import BookList from '../features/Books/list';
import isEmpty from '../utils/objectEmpty';
import AddBookCTA from '../features/Books/addBookCTA';
import ListTags from '../features/Books/ListTags';

const Books = () => {
    const { books, count, error, setBooks, setCount } = useBooks();

    if (!isEmpty(error) || !books) {
        return <div>There was an error when getting books!</div>;
    }

    return (
        <div className='books-page'>
            <AddBookCTA />
            <ListTags setBooks={setBooks} setCount={setCount} />
            <BookList books={books} />
            <div className='count'>Number of results: {count}</div>
        </div>
    );
};

export default Books;
