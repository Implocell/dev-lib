import { useState } from 'react';
import { addBook } from '../../api/books';
import Button from '../../components/Button';
import Checkbox from '../../components/Checkbox';
import Form from '../../components/Form';
import Input from '../../components/Input';
import TextArea from '../../components/TextArea';
import stringToBool from '../../utils/stringToBool';

const AddBook = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');
    const [borrowable, setBorrowable] = useState(false);
    const [borrowed, setBorrowed] = useState(false);
    const [tagList, setTagList] = useState('');

    const handleSubmit = async (event: React.SyntheticEvent) => {
        const tags: string[] = tagList.split(',').map((tag) => tag.trim());
        const flipBorrowed = !borrowed;
        event.preventDefault();
        try {
            await addBook({
                title,
                author,
                description,
                borrowable,
                borrowed: flipBorrowed,
                tagList: tags,
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Form handleSubmit={handleSubmit} title='Add book'>
            <Input
                displayName='Title'
                id='title'
                onChange={setTitle}
                type='text'
                value={title}
            />
            <Input
                displayName='Author'
                id='author'
                onChange={setAuthor}
                type='text'
                value={author}
            />
            <TextArea
                displayName='Description'
                id='description'
                onChange={setDescription}
                value={description}
            />
            <Checkbox
                displayName='Possible to borrow?'
                id='borrowable'
                onChange={setBorrowable}
                value={borrowable}
            />
            <Checkbox
                displayName='Is it available to borrow?'
                id='borrowable'
                onChange={setBorrowed}
                value={borrowed}
            />
            <Input
                displayName='Tags (split with ",")'
                id='tags'
                onChange={setTagList}
                type='text'
                value={tagList}
            />

            <Button text='Submit' type='submit' />
        </Form>
    );
};

export default AddBook;
