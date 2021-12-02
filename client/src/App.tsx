import Login from './features/Login';
import Register from './features/Register';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './features/Header';
import GuardedRoute from './utils/GuardedRoute';
import Home from './pages/Home';
import { AuthContext } from './context/Auth';
import { useEffect, useState } from 'react';
import { isValidToken } from './api/validToken';
import { AccountContext } from './context/Account';
import { UserProps } from './api/common';

function App() {
    const [isAuth, setIsAuth] = useState(false);
    const [account, setAccount] = useState<UserProps>();

    useEffect(() => {
        async function setAuth() {
            setIsAuth(await isValidToken());
        }
        setAuth();
    }, []);

    return (
        <div className='app'>
            <AuthContext.Provider value={isAuth}>
                <AccountContext.Provider value={{ account, setAccount }}>
                    <BrowserRouter>
                        <Header />
                        <Routes>
                            <Route index element={<Home />} />
                            <Route path='login' element={<Login />} />
                            <Route
                                path='register'
                                element={
                                    <GuardedRoute auth={isAuth}>
                                        <Register />
                                    </GuardedRoute>
                                }
                            />
                        </Routes>
                    </BrowserRouter>
                </AccountContext.Provider>
            </AuthContext.Provider>
        </div>
    );
}

export default App;
