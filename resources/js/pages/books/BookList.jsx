import { useState } from 'react';

import { Loader, Select, SimpleGrid } from '@mantine/core';

import BookCard from '../../components/book/BookCard.jsx';
import RemoteList from '../../components/data-display/list/RemoteList.jsx';
import Page from '../../components/layout/Page.jsx';
import api from '../../services/api';

const BookList = () => {
    const [orderBy, setOrderBy] = useState('title');

    const orderOptions = [
        { value: 'title', label: 'Title' },
        { value: 'author_id', label: 'Author' },
        { value: 'genre_id', label: 'Genre' },
        { value: 'rating', label: 'Rating' },
    ];

    const handleOrderByChange = value => {
        setOrderBy(value);
    };

    return (
        <Page title='Books' breadcrumbs={[{}]} addRoute='/books/new'>
            <div style={{ width: '150px', marginBottom: '20px' }}>
                <Select
                    label='Order By:'
                    icon={<Loader size='sm' variant='oval' />}
                    data={orderOptions}
                    value={orderBy}
                    onChange={handleOrderByChange}
                />
            </div>
            <RemoteList
                api={api.books}
                orderBy={orderBy}
                booksOrdered={true}
                render={({ data }) => (
                    <SimpleGrid
                        cols={{
                            base: 1,
                            xs: 2,
                            md: 3,
                        }}
                    >
                        {data.map(book => (
                            <BookCard key={book.id} book={book} />
                        ))}
                    </SimpleGrid>
                )}
            />
        </Page>
    );
};

export default BookList;
