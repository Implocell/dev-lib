import { useParams } from 'react-router';
import AddComment from '../features/Books/AddComment';
import Comments from '../features/Books/Comments';
import RenderBook from '../features/Books/RenderBook';
import '../scss/view-book.scss';
const ViewBook = () => {
    const { slug } = useParams();
    return (
        <div className='view-book'>
            <div className='view-book-container'>
                <RenderBook slug={slug} />
                <Comments slug={slug} />
            </div>
        </div>
    );
};

export default ViewBook;
