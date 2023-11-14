import { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

import Error from '../components/feedback/Error.jsx';
import Spinner from '../components/feedback/Spinner.jsx';

const withDataFromRemote = (WrappedComponent, api, single) => {
    // eslint-disable-next-line react/display-name
    return props => {
        const [data, setData] = useState(single ? null : []);
        const [error, setError] = useState(null);
        const [isLoading, setIsLoading] = useState(true);
        const { id } = useParams();

        const updateData = async () => {
            setIsLoading(true);
            try {
                let remoteData = single
                    ? await api.getOne(id)
                    : await api.get();
                setData(remoteData.data);
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };

        useEffect(() => {
            if (!id && single) {
                setIsLoading(false);
                return;
            }

            updateData();
        }, [id]);

        const setDataWith = newData =>
            setData(data => ({ ...data, ...newData }));

        if (isLoading) return <Spinner />;

        if (error) {
            return <Error error={error} />;
        }

        return (
            <WrappedComponent
                {...props}
                data={data}
                error={error}
                updateData={updateData}
                setDataWith={setDataWith}
                required
            />
        );
    };
};

export default withDataFromRemote;
