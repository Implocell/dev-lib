import useTags from '../../hooks/useTags';
import { Book } from '../../api/types';
import { getBooksByTag } from '../../api/books';

interface Props {
    setBooks: React.Dispatch<React.SetStateAction<Book[]>>;
    setCount: React.Dispatch<React.SetStateAction<number>>;
}

const ListTags = ({ setBooks, setCount }: Props) => {
    const tags = useTags();
    if (!tags) {
        return null;
    }

    const handleClick = async (tag: string) => {
        const bookList = await getBooksByTag(tag);
        setBooks(bookList.books);
        setCount(bookList.booksCount);
    };

    return (
        <div className='tag-list'>
            {tags.map((tag) => (
                <div
                    key={tag}
                    className='tag-item'
                    onClick={() => handleClick(tag)}
                >
                    {tag}
                </div>
            ))}
        </div>
    );
};

export default ListTags;
