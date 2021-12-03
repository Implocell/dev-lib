import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import registerApi from '../../api/register';
import Button from '../../components/Button';
import Form from '../../components/Form';
import Input from '../../components/Input';

const Register = () => {
    const navigator = useNavigate();
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        try {
            await registerApi(email, password, firstName, lastName, username);

            navigator('/');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Form handleSubmit={handleSubmit} title='Register'>
            <Input
                displayName='Username'
                id='username'
                onChange={setUsername}
                type='text'
                value={username}
            />
            <Input
                displayName='First name'
                id='firstname'
                onChange={setFirstName}
                type='text'
                value={firstName}
            />
            <Input
                displayName='Last name'
                id='lastname'
                onChange={setLastName}
                type='text'
                value={lastName}
            />
            <Input
                displayName='Email'
                id='email'
                onChange={setEmail}
                type='email'
                value={email}
            />
            <Input
                displayName='Password'
                id='password'
                onChange={setPassword}
                type='password'
                value={password}
            />
            <Button text='Submit' type='submit' />
        </Form>
    );
};

export default Register;
