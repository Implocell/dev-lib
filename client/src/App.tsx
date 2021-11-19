import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
    const [value, setValue] = useState('');
    useEffect(() => {
        async function getData() {
            const res = await fetch('/api');
            const data = await res.text();
            setValue(data);
        }
        getData()
    }, []);
    return (
        <div className='App'>
            <header className='App-header'>
                <img src={logo} className='App-logo' alt='logo' />
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a
                    className='App-link'
                    href='https://reactjs.org'
                    target='_blank'
                    rel='noopener noreferrer'
                >
                    Learn React
                    {value && <span>{value}</span>}
                </a>
            </header>
        </div>
    );
}

export default App;
