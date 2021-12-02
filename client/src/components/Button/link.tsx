import { Link } from 'react-router-dom';

interface Props {
    displayName: string;
    to: string | undefined;
    customClass?: string;
}

const ButtonLink = ({ displayName, to, customClass = '' }: Props) => {
    if (!to) {
        console.error('got button link but no navigation');
        return null;
    }
    return (
        <Link className={`button-link ${customClass}`} to={to}>
            {displayName}
        </Link>
    );
};

export default ButtonLink;
