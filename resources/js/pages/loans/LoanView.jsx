import { Box, Grid, Stack, Text, Title } from '@mantine/core';
import { Link } from 'react-router-dom';

import BookCover from '../../components/book/BookCover.jsx';
import Page from '../../components/layout/Page.jsx';
import api from '../../services/api';
import withRemoteDataHoc from '../../utils/withRemoteDataHoc.jsx';

const LoanView = ({ data: loan }) => {
    const statusDelayed = loan.status === 'Delayed';

    const statusReturned = loan.status === 'Returned';

    const delayedStatusStyle = {
        color: 'red',
    };

    return (
        <Page
            title={<span>Loan {loan.id}</span>}
            breadcrumbs={[
                { title: 'Loans', to: '/loans' },
                { title: loan.id, to: `/loans/${loan.id}` },
            ]}
            api={api.loans}
            resource='loan'
            route='loans'
            id={loan.id}
        >
            <Stack>
                <Grid>
                    <Grid.Col
                        span={{
                            base: 12,
                            md: 4,
                        }}
                    >
                        <BookCover book={loan.book} />
                    </Grid.Col>
                    <Grid.Col
                        span={{
                            base: 12,
                            md: 8,
                        }}
                    >
                        <Title order={1}>{loan.book.title}</Title>
                        <Text>
                            Status:
                            {statusDelayed && (
                                <span style={delayedStatusStyle}>
                                    {' '}
                                    {loan.status}
                                </span>
                            )}
                            {!statusDelayed && <span> {loan.status}</span>}
                        </Text>
                        <Text>
                            People:{' '}
                            <Link
                                style={{ textDecoration: 'none' }}
                                to={`/peoples/${loan.people.id}`}
                            >
                                {loan.people.name}
                            </Link>
                        </Text>
                        {statusReturned && (
                            <Text>Returned on: {loan.return_date}</Text>
                        )}

                        <Box style={{ textAlign: 'right' }}>
                            <Text span size='xs'>
                                Loan create at: {loan.created_at}
                            </Text>
                        </Box>
                    </Grid.Col>
                </Grid>
                <Link
                    style={{ textDecoration: 'none' }}
                    to={`/books/${loan.book.id}`}
                >
                    See book details
                </Link>
            </Stack>
        </Page>
    );
};

export default withRemoteDataHoc(LoanView, api.loans, true);
