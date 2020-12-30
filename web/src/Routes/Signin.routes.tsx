import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Signin from '../pages/Authentication';
import DefinePassword from '../pages/Authentication/DefinePassword';
import RequestNewPassword from '../pages/Authentication/RequestNewPassword';

const AppRoutes: React.FC = () => {
    return (
        <BrowserRouter>
            <Route path="/" exact component={Signin} />
            <Route path="/redefine" exact component={RequestNewPassword} />
            <Route path="/redefine/password/:token" component={DefinePassword} />
        </BrowserRouter>
    )
}

export default AppRoutes;