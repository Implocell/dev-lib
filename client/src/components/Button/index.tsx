import ButtonLink from './link';
import './styles.scss';
interface Props {
    text: string;
    type: 'button' | 'reset' | 'submit' | 'link';
    onClick?: () => void;
    to?: string;
    customClass?: string;
}

const Button = ({
    text,
    type = 'button',
    onClick,
    to,
    customClass = '',
}: Props) => {
    if (type === 'link') {
        return (
            <ButtonLink displayName={text} to={to} customClass={customClass} />
        );
    }

    if (onClick) {
        return (
            <button
                className={`button ${customClass}`}
                type={type}
                onClick={() => onClick()}
            >
                {text}
            </button>
        );
    }
    return (
        <button className={`button ${customClass}`} type={type}>
            {text}
        </button>
    );
};

export default Button;
