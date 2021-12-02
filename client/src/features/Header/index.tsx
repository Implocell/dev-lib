import ActiveLink from '../../components/ActiveLink';

const Header = () => {
    return (
        <div>
            <ActiveLink to='/login'>Login</ActiveLink>
            <ActiveLink to='/register'>Register</ActiveLink>
        </div>
    );
};

export default Header;
