import { useEffect, useState } from 'react';
import { getBookComments } from '../../api/books';
import { Comment, SingleComment } from '../../api/types';
import AddComment from './AddComment';
import './styles.scss';

interface Props {
    slug: string | undefined;
}

const RenderSingleComment = (comment: Comment) => {
    console.log(comment)
    const renderDate = () => {
        let chosenDate: string;
        let dateString = 'Created at:';

        if (comment.createdAt !== comment.updatedAt) {
            dateString = 'Updated at:';
            chosenDate = comment.updatedAt;
        } else {
            chosenDate = comment.createdAt;
        }

        const customDate = new Date(chosenDate).toLocaleDateString();

        return (
            <span className='comment-item-time'>{`${dateString} ${customDate}`}</span>
        );
    };

    return (
        <div className='comment-item' key={comment.id}>
            <div className='comment-item-body'>{comment.body}</div>
            <div className='row'>
                {renderDate()}
                <span className='comment-item-author'>
                    {comment.author.username}
                </span>
            </div>
        </div>
    );
};

const Comments = ({ slug }: Props) => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [error, setError] = useState(false);
    useEffect(() => {
        async function fetchComments() {
            if (typeof slug === 'string') {
                const data = await getBookComments(slug);
                setComments(data);
                return;
            }
            setError(true);
        }
        fetchComments();
    }, [slug]);

    const updateComments = (comment: SingleComment) => {
        setComments((prev) => [...prev, comment.comment]);
    };

    const renderComments = () => {
        if (!comments) {
            return null;
        }
        return comments.map((comment) => RenderSingleComment(comment));
    };

    if (error) {
        return null;
    }

    return (
        <>
            <AddComment slug={slug} updateComments={updateComments} />
            <div className='comments'>{renderComments()}</div>
        </>
    );
};

export default Comments;
