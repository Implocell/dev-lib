import Button from '../Button';
import { ReactComponent } from '../../assets/hero.svg';
import './styles.scss';
import HorizontalLine from './horizontal-line';

const Hero = () => {
    return (
        <div className='hero'>
            <div className='hero-container'>
                <div className='hero-container-left'>
                    <h1>Knowledge seeker?</h1>
                    <h3>
                        Borrow, share, like and favorite books, and share them
                        with your colleagues
                    </h3>
                    <div className='hero-container-left-buttons'>
                        <Button text='Login' type='link' to='/login' />
                        <Button text='Register' type='link' to='/register' customClass="secondary" />
                    </div>
                </div>
                <div className='hero-container-right'>
                    <ReactComponent />
                </div>
            </div>
            <HorizontalLine />
        </div>
    );
};

export default Hero;
