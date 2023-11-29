import { Stack, Text } from '@mantine/core';

import RemoteBookList from '../../components/book/RemoteBookList.jsx';
import Page from '../../components/layout/Page.jsx';
import api from '../../services/api/index.js';
import withRemoteDataHoc from '../../utils/withRemoteDataHoc.jsx';

const GenreView = ({ data: genre }) => {
    const remoteSrc = {
        get: params => api.genres.books(genre.id, params),
    };

    return (
        <Page
            title={genre.name}
            breadcrumbs={[
                { title: 'Genres', to: '/genres' },
                { title: genre.name, to: `/genres/${genre.id}` },
            ]}
            api={api.genres}
            resource='genre'
            route='genres'
            id={genre.id}
        >
            <Stack>
                <Text>{genre.name}</Text>
                <Text>{genre.book_count} book(s) in this genre:</Text>
                <RemoteBookList remoteSrc={remoteSrc} />
            </Stack>
        </Page>
    );
};

export default withRemoteDataHoc(GenreView, api.genres, true);
