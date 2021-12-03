import Button from '../Button';
import './styles.scss';

interface Props {
    text: string;
    to: string;
}

const HoverBox = ({ text, to }: Props) => {
    return (
        <div className='hover-box'>
                <Button text={text} type='link' to={to} />
        </div>
    );
};

export default HoverBox;
