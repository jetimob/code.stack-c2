import { Grid, Rating, Stack, Text, Title } from '@mantine/core';

import api from '../../services/api/index.js';
import withRemoteDataHoc from '../../utils/withRemoteDataHoc.jsx';

const GenreView = ({ data: genre }) => {
    return (
        <Page
            id={genre.id}
            api={api.genre}
            resource={'genre'}
            route={'genres'}
            title={`Genre - ${Genre.name}`}
            hideTitle
            breadcrumbs={[
                { title: 'Genre', to: '/genres' },
                { title: book.title, to: `/genres/${genres.id}` },
            ]}
        >
            <Stack>
                <Grid>
                    <Grid.Col
                        span={{
                            base: 12,
                            md: 8,
                        }}
                    >
                        <Text>
                            <Text to={`/genres/${genres.id}`}>
                                {genre.id}
                            </Text>{' '}
                            (Author) |{' '}
                            <Text to={`/genres/${genre.name}`}>
                                {genre.name}
                            </Text>{' '}
                            (Genre) |{' '}
                            <Text span size='xs'>
                                {genre.created_at}
                            </Text><Text span size='xs'>
                                {genre.updated_at}
                            </Text>
                        </Text>
                    </Grid.Col>
                </Grid>
            </Stack>
        </Page>
    );
};

export default withRemoteDataHoc(GenreView, api.genres, true);
