import { Stack, Text } from '@mantine/core';

import RemoteBookList from '../../components/book/RemoteBookList.jsx';
import Page from '../../components/layout/Page.jsx';
import api from '../../services/api';
import withRemoteDataHoc from '../../utils/withRemoteDataHoc.jsx';

const AuthorView = ({ data: author }) => {
    const remoteSrc = {
        get: params => api.authors.books(author.id, params),
    };

    return (
        <Page
            title={author.name}
            breadcrumbs={[
                { title: 'Authors', to: '/authors' },
                { title: author.name, to: `/authors/${author.id}` },
            ]}
            api={api.authors}
            resource='author'
            route='authors'
            id={author.id}
        >
            <Stack>
                <Stack gap={0}>
                    <Text size='sm' c='dimmed'>
                        Biography:
                    </Text>
                    <Text>{author.biography}</Text>
                </Stack>
                <Text size='sm' c='dimmed' align='right'>
                    Birth date: {author.birth_date} ({author.age} years old)
                </Text>
                <Text>{author.book_count} known book(s):</Text>
                <RemoteBookList remoteSrc={remoteSrc} />
            </Stack>
        </Page>
    );
};

export default withRemoteDataHoc(AuthorView, api.authors, true);
