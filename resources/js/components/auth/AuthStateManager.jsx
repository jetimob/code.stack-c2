import { lazy } from 'react';

import { useAuth } from '../../context/AuthContext.jsx';

const Authenticated = lazy(() => import('./Authenticated.jsx'));
const Unauthenticated = lazy(() => import('./Unauthenticated.jsx'));

const AuthStateManager = () => {
    const auth = useAuth();

    return auth.signedIn ? <Authenticated /> : <Unauthenticated />;
};

export default AuthStateManager;
