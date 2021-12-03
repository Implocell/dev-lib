import { createContext } from 'react';
interface AuthContextProps {
    isAuth: boolean;
    logOutUser: (cb?: VoidFunction) => void;
}

export const AuthContext = createContext({} as AuthContextProps);
