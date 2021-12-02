import { createContext } from 'react';
import { UserProps } from '../api/common';

interface AccountContextProps {
    account: UserProps | undefined;
    setAccount: (account: UserProps) => void;
}

export const AccountContext = createContext({} as AccountContextProps);
