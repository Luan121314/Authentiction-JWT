import React from 'react';
import Routes from './Routes/index';
import { AuthProvider } from './contexts/auth';
import './style.css'

const App = () => {


    return (
        <AuthProvider>
            <Routes />
        </AuthProvider>
    )
}


export default App;
