import Login from './features/Login';
import Register from './features/Register';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './features/Header';
import GuardedRoute from './utils/GuardedRoute';
import Home from './pages/Home';

function App() {
    return (
        <div className='app'>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route index element={<Home />} />
                    <Route path='login' element={<Login />} />
                    <Route
                        path='register'
                        element={
                            <GuardedRoute auth={false}>
                                <Register />
                            </GuardedRoute>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
