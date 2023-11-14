import { SimpleGrid } from '@mantine/core';

import BookCard from '../../components/book/BookCard.jsx';
import RemoteList from '../../components/data-display/list/RemoteList.jsx';
import api from '../../services/api';

const RemoteBookList = ({ remoteSrc = api.books }) => {
    return (
        <RemoteList
            api={remoteSrc}
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
    );
};

export default RemoteBookList;
