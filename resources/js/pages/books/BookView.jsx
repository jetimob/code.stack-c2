import { Grid, Rating, Stack, Text, Title } from '@mantine/core';
import { Link } from 'react-router-dom';
import BookCover from '../../components/book/BookCover.jsx';

import Page from '../../components/layout/Page.jsx';
import api from '../../services/api/index.js';
import withRemoteDataHoc from '../../utils/withRemoteDataHoc.jsx';

const BookView = ({ data: book }) => {
    return (
        <Page
            id={book.id}
            api={api.books}
            resource={'book'}
            route={'books'}
            title={`Book - ${book.title}`}
            hideTitle
            breadcrumbs={[
                { title: 'Books', to: '/books' },
                { title: book.title, to: `/books/${book.id}` },
            ]}
        >
            <Stack>
                <Grid>
                    <Grid.Col
                        span={{
                            base: 12,
                            md: 4,
                        }}
                    >
                        <BookCover book={book} />
                        <Text mt='md'>isbn: {book.isbn}</Text>
                    </Grid.Col>

                    <Grid.Col
                        span={{
                            base: 12,
                            md: 8,
                        }}
                    >
                        <Title order={1}>{book.title}</Title>
                        <Text>
                            by{' '}
                            <Link to={`/authors/${book.author.id}`}>
                                {book.author.name}
                            </Link>{' '}
                            (Author) |{' '}
                            <Link to={`/genres/${book.genre.id}`}>
                                {book.genre.name}
                            </Link>{' '}
                            (Genre) |{' '}
                            <Text span size='xs'>
                                {book.created_at}
                            </Text>
                        </Text>

                        <Rating readOnly value={book.rating} />

                        <Text mt='lg'>{book.description}</Text>
                    </Grid.Col>
                </Grid>
            </Stack>
        </Page>
    );
};

export default withRemoteDataHoc(BookView, api.books, true);
