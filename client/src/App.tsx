import Login from './pages/Login';
import Register from './pages/Register';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './features/Header';
import GuardedRoute from './utils/GuardedRoute';
import Home from './pages/Home';
import { AuthProvider } from './context/Auth';
import { useState } from 'react';

import { AccountContext } from './context/Account';
import NoAuth from './utils/NoAuthRoute';
import Books from './pages/Books';
import { UserProps } from './api/types';
import AddBook from './pages/AddBook';
import ViewBook from './pages/ViewBook';
import Profile from './pages/Profile';

function App() {
    const [account, setAccount] = useState<UserProps>();

    return (
        <div className='app'>
            <AuthProvider>
                <AccountContext.Provider value={{ account, setAccount }}>
                    <BrowserRouter>
                        <Header />
                        <Routes>
                            <Route index element={<Home />} />
                            <Route
                                path='login'
                                element={
                                    <NoAuth>
                                        <Login />
                                    </NoAuth>
                                }
                            />
                            <Route
                                path='register'
                                element={
                                    <NoAuth>
                                        <Register />
                                    </NoAuth>
                                }
                            />
                            <Route
                                path='/books/add'
                                element={
                                    <GuardedRoute>
                                        <AddBook />
                                    </GuardedRoute>
                                }
                            />
                            <Route
                                path='/books'
                                element={
                                    <GuardedRoute>
                                        <Books />
                                    </GuardedRoute>
                                }
                            />
                            <Route
                                path='/books/:slug'
                                element={
                                    <GuardedRoute>
                                        <ViewBook />
                                    </GuardedRoute>
                                }
                            />
                            <Route
                                path='/user/:username'
                                element={
                                    <GuardedRoute>
                                        <Profile />
                                    </GuardedRoute>
                                }
                            />
                        </Routes>
                    </BrowserRouter>
                </AccountContext.Provider>
            </AuthProvider>
        </div>
    );
}

export default App;
