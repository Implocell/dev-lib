import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { createBookComment } from '../../api/books';
import { SingleComment } from '../../api/types';
import Button from '../../components/Button';
import Form from '../../components/Form';
import TextArea from '../../components/TextArea';
import './styles.scss';

const CommentForm = ({
    isOpen,
    setIsOpen,
    slug,
    updateComments,
}: {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
    slug: string;
    updateComments: (comment: SingleComment) => void;
}) => {
    const [body, setBody] = useState('');

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        const comment = await createBookComment(slug, body);
        updateComments(comment);
        setIsOpen(false);
    };

    if (!isOpen) return null;

    return createPortal(
        <div className='add-book-comment'>
            <div id='modal-container'>
                <Form title='Add comment' handleSubmit={handleSubmit}>
                    <TextArea
                        displayName='Comment'
                        id='comment'
                        onChange={setBody}
                        value={body}
                    />
                    <Button type='submit' text='Add comment' />
                    <button
                        className='modal-container-exit'
                        onClick={() => setIsOpen(false)}
                        type='button'
                    >
                        x
                    </button>
                </Form>
            </div>
        </div>,
        document.body
    );
};

interface AddCommentProps {
    slug: string | undefined;
    updateComments: (comment: SingleComment) => void;
}

const AddComment = ({ slug, updateComments }: AddCommentProps) => {
    const [isOpen, setIsOpen] = useState(false);

    if (!slug) {
        return null;
    }

    return (
        <div className='comment-button'>
            <Button
                text='New comment'
                type='button'
                customClass='secondary'
                onClick={() => setIsOpen(true)}
            />
            <CommentForm
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                slug={slug}
                updateComments={updateComments}
            />
        </div>
    );
};

export default AddComment;
