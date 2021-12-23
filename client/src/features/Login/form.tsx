import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import loginApi from '../../api/login';
import Button from '../../components/Button';
import Form from '../../components/Form';
import Input from '../../components/Input';
import { AuthActionKind, AuthContext } from '../../context/Auth';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigator = useNavigate();
    const { dispatch } = useContext(AuthContext);

    const handleSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        try {
            await loginApi(email, password);
            dispatch({ type: AuthActionKind.LOGIN });
            navigator('/');
        } catch (error) {
            setPassword('');
            console.log(error);
        }
    };

    return (
        <Form handleSubmit={handleSubmit} title='Login'>
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
