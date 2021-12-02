import ActiveLink from '../../components/ActiveLink';
import useAccount from '../../hooks/useAccount';
import useAuth from '../../hooks/useAuth';

const loggedInLinks = [
    {
        to: '/login',
        display: 'Login',
    },
    {
        to: '/register',
        display: 'Register',
    },
];

const loggedOutLinks = [
    {
        to: '/login',
        display: 'Login',
    },
    {
        to: '/register',
        display: 'Register',
    },
];

const Nav = () => {
    const account = useAccount();
    const auth = useAuth();

    const renderLinks = () => {
        if (auth) {
            return loggedInLinks.map((link) => (
                <li className='nav-link'>
                    <ActiveLink to={link.to}>{link.display}</ActiveLink>
                </li>
            ));
        }
        return loggedOutLinks.map((link) => (
            <li className='nav-link'>
                <ActiveLink to={link.to}>{link.display}</ActiveLink>
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
            {renderUsername()}
        </ul>
    );
};

export default Nav;
