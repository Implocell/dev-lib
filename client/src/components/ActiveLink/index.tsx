import { LinkProps, useResolvedPath, useMatch, Link } from 'react-router-dom';
import './styles.scss';
const ActiveLink = ({ children, to, ...props }: LinkProps) => {
    let resolved = useResolvedPath(to);
    let match = useMatch({ path: resolved.pathname, end: true });

    return (
        <div>
            <Link
                className='active-link'
                style={{ textDecoration: match ? 'underline' : 'none' }}
                to={to}
                {...props}
            >
                {children}
            </Link>
        </div>
    );
};

export default ActiveLink;
