import { Stack, Text } from '@mantine/core';
import RemoteBookList from '../../components/book/RemoteBookList.jsx';
import Page from '../../components/layout/Page.jsx';
import api from '../../services/api';
import withRemoteDataHoc from '../../utils/withRemoteDataHoc.jsx';

const PublisherView = ({ data: publisher }) => {
    const remoteSrc = {
        get: params => api.publishers.books(publisher.id, params),
    };

    return (
        <Page
            title={publisher.name}
            breadcrumbs={[
                { title: 'Publishers', to: '/publishers' },
                { title: publisher.name, to: `/publishers/${publisher.id}` },
            ]}
            api={api.publishers}
            resource='publisher'
            route='publishers'
            id={publisher.id}
        >
        <Stack>
            <Text>{publisher.book_count} known book(s):</Text>
            <RemoteBookList remoteSrc={remoteSrc} />
        </Stack>
        </Page>
    );
};

export default withRemoteDataHoc(PublisherView, api.publishers, true);
