import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from '../context/Auth';
import LoginForm from '../features/Login/form';
import '../scss/login-page.scss';

const Login = () => {
    const { isAuth } = useContext(AuthContext);
    const navigator = useNavigate();

    useEffect(() => {
        if (isAuth) {
            navigator('/');
        }
    }, [isAuth, navigator]);

    return (
        <div className='login-page'>
            <LoginForm />
        </div>
    );
};

export default Login;
