import Login from './pages/Login';
import Register from './pages/Register';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './features/Header';
import GuardedRoute from './utils/GuardedRoute';
import Home from './pages/Home';
import { AuthContext } from './context/Auth';
import { useEffect, useState } from 'react';
import { isValidToken } from './api/validToken';
import { AccountContext } from './context/Account';
import { logOut } from './api/common';
import NoAuth from './utils/NoAuthRoute';
import Books from './pages/Books';
import { UserProps } from './api/types';
import AddBook from './pages/AddBook';

function App() {
    const [isAuth, setIsAuth] = useState(false);
    const [account, setAccount] = useState<UserProps>();

    const logOutUser = (cb?: VoidFunction) => {
        logOut();
        setIsAuth(false);
        if (cb) cb();
    };

    useEffect(() => {
        async function setAuth() {
            setIsAuth(await isValidToken());
        }
        setAuth();
    }, []);

    return (
        <div className='app'>
            <AuthContext.Provider value={{ isAuth, logOutUser }}>
                <AccountContext.Provider value={{ account, setAccount }}>
                    <BrowserRouter>
                        <Header />
                        <Routes>
                            <Route index element={<Home />} />
                            <Route
                                path='login'
                                element={
                                    <NoAuth auth={isAuth}>
                                        <Login />
                                    </NoAuth>
                                }
                            />
                            <Route
                                path='register'
                                element={
                                    <NoAuth auth={isAuth}>
                                        <Register />
                                    </NoAuth>
                                }
                            />
                            <Route
                                path='/books/add'
                                element={
                                    <GuardedRoute auth={isAuth}>
                                        <AddBook />
                                    </GuardedRoute>
                                }
                            />
                            <Route
                                path='/books'
                                element={
                                    <GuardedRoute auth={isAuth}>
                                        <Books />
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
