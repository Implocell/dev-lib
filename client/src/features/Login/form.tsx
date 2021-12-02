import React, { useState } from 'react';
import loginApi from '../../api/login';
import Button from '../../components/Button';
import Form from '../../components/Form';
import Input from '../../components/Input';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        try {
            await loginApi(email, password);
            //redirect user
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Form handleSubmit={handleSubmit}>
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

export default Login;
