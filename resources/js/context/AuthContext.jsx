import { createContext, useContext, useEffect, useState } from 'react';

import Spinner from '../components/feedback/Spinner.jsx';
import api from '../services/api/index.js';
import notification from '../services/notification/index.js';

const AuthContext = createContext({
    user: null,
    signIn: () => {},
    signUp: () => {},
    signOut: () => {},
    signedIn: false,
});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const req = promise => {
        setLoading(true);
        return promise.finally(() => {
            setLoading(false);
        });
    };

    const signIn = userData =>
        req(
            api.auth
                .initCsrfToken()
                .then(() =>
                    api.auth.signIn(userData).then(data => {
                        setUser(data);
                        notification.success('Signed in successfully!');
                    })
                )
                .catch(notification.requestError)
        );

    const signUp = userData =>
        req(
            api.auth
                .signUp(userData)
                .then(() => notification.success('Signed up successfully!'))
                .catch(notification.requestError)
        );

    const signOut = () =>
        req(
            api.auth
                .signOut()
                .then(() => {
                    setUser(null);
                    notification.success('Signed out successfully!');
                })
                .catch(notification.requestError)
        );

    useEffect(() => {
        const interceptorId = api.api.interceptors.response.use(
            response => response,
            error => {
                if (
                    !error.request.responseURL.includes('/auth/') &&
                    (error.response.status === 419 ||
                        error.response.status === 401)
                ) {
                    notification.error(
                        'Your session has expired. Please sign in again.'
                    );
                    setUser(null);
                }

                return Promise.reject(error);
            }
        );

        req(
            api.auth
                .me()
                .then(user => {
                    setUser(user);
                })
                .catch(console.error)
        );

        return () => {
            api.api.interceptors.response.eject(interceptorId);
        };
    }, []);

    if (loading) {
        return <Spinner />;
    }

    return (
        <AuthContext.Provider
            value={{ user, signIn, signUp, signOut, signedIn: !!user }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
