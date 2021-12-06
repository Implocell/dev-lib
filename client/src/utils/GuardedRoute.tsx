import { useContext } from 'react';
import { useLocation, Navigate } from 'react-router';
import { AuthContext } from '../context/Auth';

function RequireAuth({ children }: { children: JSX.Element }) {
    let location = useLocation();
    const { state } = useContext(AuthContext);

    if (!state.isAuth) {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to when they were redirected. This allows us to send them
        // along to that page after they login, which is a nicer user experience
        // than dropping them off on the home page.
        return <Navigate to='/' replace state={{ from: location }} />;
    }

    return children;
}

export default RequireAuth;
