import { useContext } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import ActiveLink from '../../components/ActiveLink';
import Button from '../../components/Button';
import { AuthActionKind, AuthContext } from '../../context/Auth';
import useAccount from '../../hooks/useAccount';

interface linkProps {
    to: string;
    display: string;
    type?: string;
    onClick?: () => void;
}

const loggedOutLinks: linkProps[] = [];

const loggedInLinks: linkProps[] = [
    {
        display: 'Books',
        to: '/books',
        type: 'link',
    },
];

const Nav = () => {
    const account = useAccount();
    const { state, dispatch } = useContext(AuthContext);
    const navigator = useNavigate();

    const handleLogout = () => {
        dispatch({ type: AuthActionKind.LOGOUT });
        navigator('/');
    };

    const renderLoginOrLogout = () => {
        if (!state.isAuth) {
            return <Button type='link' to='/login' text='Login' />;
        }
        return <Button type='button' onClick={handleLogout} text='Logout' />;
    };

    const renderLink = (link: linkProps) => {
        if (link.type === 'buttonLink') {
            return <Button text={link.display} type='link' to={link.to} />;
        }

        return <ActiveLink to={link.to}>{link.display}</ActiveLink>;
    };

    const renderLinks = () => {
        if (state.isAuth) {
            return loggedInLinks.map((link) => (
                <li className='nav-link' key={link.to}>
                    {renderLink(link)}
                </li>
            ));
        }
        return loggedOutLinks.map((link) => (
            <li className='nav-link' key={link.to}>
                {renderLink(link)}
            </li>
        ));
    };

    const renderUsername = () => {
        if (account && state.isAuth) {
            return (
                <Link to={`user/${account.username}`} className='nav-username'>
                    {account.username}
                </Link>
            );
        }
    };

    return (
        <div className='navbar'>
            <ul className='nav'>{renderLinks()}</ul>
            <div className='user-actions'>
                {renderLoginOrLogout()}
                {renderUsername()}
            </div>
        </div>
    );
};

export default Nav;
