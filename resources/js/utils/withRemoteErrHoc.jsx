import { ErrorBoundary } from 'react-error-boundary';

import RequestError from '../components/feedback/RequestError.jsx';

const withRemoteErr = Component => props => {
    return (
        <ErrorBoundary fallbackRender={RequestError}>
            <Component {...props} />
        </ErrorBoundary>
    );
};

export default withRemoteErr;
