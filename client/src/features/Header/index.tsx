import { useContext, useEffect } from 'react';
import { isValidToken } from '../../api/validToken';
import { AuthActionKind, AuthContext } from '../../context/Auth';
import Logo from './Logo';
import Nav from './nav';
import './styles.scss';

const Header = () => {
    const { dispatch } = useContext(AuthContext);

    useEffect(() => {
        async function checkAuth() {
            const valid = await isValidToken();

            if (valid) {
                dispatch({ type: AuthActionKind.LOGIN });
                return;
            }

            dispatch({ type: AuthActionKind.LOGOUT });
        }

        checkAuth();
    }, [dispatch]);

    return (
        <div className='header'>
            <Logo />
            <Nav />
        </div>
    );
};

export default Header;
