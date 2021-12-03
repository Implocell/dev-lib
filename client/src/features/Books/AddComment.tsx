import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { createBookComment } from '../../api/books';
import Button from '../../components/Button';
import Form from '../../components/Form';
import TextArea from '../../components/TextArea';
import './styles.scss';

const CommentForm = ({
    isOpen,
    setIsOpen,
    slug,
}: {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
    slug: string;
}) => {
    const [body, setBody] = useState('');

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        await createBookComment(slug, body);
        setIsOpen(false);
        console.log('comment submitted');
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
                </Form>
            </div>
        </div>,
        document.body
    );
};

interface AddCommentProps {
    slug: string | undefined;
}

const AddComment = ({ slug }: AddCommentProps) => {
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
            <CommentForm isOpen={isOpen} setIsOpen={setIsOpen} slug={slug} />
        </div>
    );
};

export default AddComment;
