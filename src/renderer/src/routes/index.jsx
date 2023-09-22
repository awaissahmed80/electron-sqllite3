import { useEffect, Suspense } from 'react';
import { Route, Routes as Switch, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks';

import Home from '../pages/Home'
import Login from '../pages/auth/Login'

const ScrollToTop = () => {
    const { pathname } = useLocation();
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};


const Routes = () => {
        
    const { auth: { user, token } } = useAuth()

   
    return (
        <Suspense fallback={<div />}>
            <ScrollToTop />
            <Switch>
                {
                    (!user || !token) ?
                    <>
                        <Route path="/login" element={<Login />} />                        
                        <Route path="*" element={<Navigate to="/login" />} />
                    </>
                    :
                    <>
                        <Route path="/" element={<Home />} />
                        <Route path="*" element={<Navigate to="/" />} />
                    </>
                }
                
            </Switch>
        </Suspense>
    );
};

export default Routes;
