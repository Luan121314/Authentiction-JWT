import React from 'react';
import { useAuth } from '../hooks/useAuth';
import SingIn from './Signin.routes';
import AppRoutes from './App.routes';


const Routes: React.FC = () => {
    const {signed, loading} = useAuth()

    if(loading){
        return(
            <div className="container">
                <h1>Loading</h1>
            </div>)
    }

    return signed ? <AppRoutes/> : <SingIn/>;
}

export default Routes;