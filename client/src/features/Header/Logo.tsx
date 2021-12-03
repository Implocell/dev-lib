import { ReactComponent } from '../../assets/logo.svg';
import { Link } from 'react-router-dom';
const Logo = () => {
    return (
        <div className='logo'>
            <ReactComponent />
            <Link to='/'>SkillSip</Link>
        </div>
    );
};

export default Logo;
