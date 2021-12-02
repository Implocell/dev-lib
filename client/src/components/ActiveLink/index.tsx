import { LinkProps, useResolvedPath, useMatch, Link } from 'react-router-dom';

const ActiveLink = ({ children, to, ...props }: LinkProps) => {
    let resolved = useResolvedPath(to);
    let match = useMatch({ path: resolved.pathname, end: true });

    return (
        <div>
            <Link
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
