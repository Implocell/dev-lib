import Logo from './Logo';
import Nav from './nav';
import './styles.scss';

const Header = () => {
    return (
        <div className='header'>
            <Logo />
            <Nav />
        </div>
    );
};

export default Header;
