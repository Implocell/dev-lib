import { useNavigate } from 'react-router';
import ActiveLink from '../../components/ActiveLink';
import Button from '../../components/Button';
import useAccount from '../../hooks/useAccount';
import useAuth from '../../hooks/useAuth';

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
    const { isAuth, logOutUser } = useAuth();
    const navigator = useNavigate();

    const renderLoginOrLogout = () => {
        if (!isAuth) {
            return <Button type='link' to='/login' text='Login' />;
        }
        return (
            <Button
                type='button'
                onClick={() => logOutUser(() => navigator('/'))}
                text='Logout'
            />
        );
    };

    const renderLink = (link: linkProps) => {
        if (link.type === 'buttonLink') {
            return <Button text={link.display} type='link' to={link.to} />;
        }

        return <ActiveLink to={link.to}>{link.display}</ActiveLink>;
    };

    const renderLinks = () => {
        if (isAuth) {
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
        if (account) {
            return <div className='nav-username'>{account.username}</div>;
        }
    };

    return (
        <ul className='nav'>
            {renderLinks()}
            {renderLoginOrLogout()}
            {renderUsername()}
        </ul>
    );
};

export default Nav;
