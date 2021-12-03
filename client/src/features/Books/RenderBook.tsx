import { useEffect, useState } from 'react';
import { getBookBySlug } from '../../api/books';
import { Book } from '../../api/types';
import BookItem from './Item';

const ViewBook = ({ slug }: { slug: string | undefined }) => {
    const [book, setBook] = useState<Book>();
    const [error, setError] = useState(false);

    useEffect(() => {
        async function getBook() {
            if (typeof slug === 'string') {
                setBook(await getBookBySlug(slug));
                return;
            }
            setError(true);
        }

        getBook();
    }, [slug]);

    if (error) {
        return (
            <div className='book-error'>
                <span>Something went horribly wrong 🐥</span>
            </div>
        );
    }

    if (book) {
        return <BookItem book={book} />;
    }

    return <div className='book-loading'>Loading</div>;
};

export default ViewBook;
