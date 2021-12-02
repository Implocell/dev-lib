import { useContext, useEffect } from 'react';
import { AccountContext } from '../context/Account';

export default function useAccount() {
    const { account, setAccount } = useContext(AccountContext);

    useEffect(() => {
        const accountData = sessionStorage.getItem('user');
        if (accountData) {
            setAccount(JSON.parse(accountData));
        }
    }, [setAccount]);

    return account;
}
