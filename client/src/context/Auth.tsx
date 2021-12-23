import { createContext, useReducer, Dispatch } from 'react';
import { logOut } from '../api/common';
interface AuthContextProps {
    isAuth: boolean;
}

export enum AuthActionKind {
    LOGOUT = 'LOGOUT',
    LOGIN = 'LOGIN',
}
interface AuthAction {
    type: AuthActionKind;
}

const initialState = {
    isAuth: false,
};

export const AuthContext = createContext<{
    state: AuthContextProps;
    dispatch: Dispatch<AuthAction>;
}>({
    state: initialState,
    dispatch: () => null,
});

export const authReducer = (
    state: AuthContextProps,
    action: AuthAction
): AuthContextProps => {
    switch (action.type) {
        case 'LOGOUT':
            logOut();
            return { ...state, isAuth: false };
        case 'LOGIN':
            return { ...state, isAuth: true };
        default:
            return state;
    }
};

export const AuthProvider: React.FC = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    return (
        <AuthContext.Provider value={{ state, dispatch: dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};
