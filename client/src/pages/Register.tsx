import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from '../context/Auth';
import RegisterForm from '../features/Register/form';
import '../scss/login-page.scss';

const Register = () => {
    const { isAuth } = useContext(AuthContext);
    const navigator = useNavigate();

    useEffect(() => {
        if (isAuth) {
            navigator('/');
        }
    }, [isAuth, navigator]);

    return (
        <div className='login-page'>
            <RegisterForm />
        </div>
    );
};

export default Register;
