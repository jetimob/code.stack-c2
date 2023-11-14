import { Table as MTable } from '@mantine/core';

import RemoteList from '../../components/data-display/list/RemoteList.jsx';
import Table from '../../components/data-display/table/Table.jsx';
import TableActions from '../../components/data-display/table/TableActions.jsx';
import Page from '../../components/layout/Page.jsx';
import api from '../../services/api/index.js';

const GenreList = () => (
    <Page title='Genres' breadcrumbs={[]} addRoute='/genres/new'>
        <RemoteList
            api={api.genres}
            render={({ data: genres, fetchData }) => (
                <Table>
                    <MTable.Thead>
                        <MTable.Tr>
                            <MTable.Th>Genre</MTable.Th>
                            <MTable.Th>Books</MTable.Th>
                            <MTable.Th></MTable.Th>
                        </MTable.Tr>
                    </MTable.Thead>

                    <MTable.Tbody>
                        {genres.map(genre => (
                            <MTable.Tr key={genre.id}>
                                <MTable.Td>{genre.name}</MTable.Td>
                                <MTable.Td>{genre.book_count}</MTable.Td>
                                <TableActions
                                    id={genre.id}
                                    api={api.genres}
                                    route='genres'
                                    resource='genre'
                                    onDelete={fetchData}
                                />
                            </MTable.Tr>
                        ))}
                    </MTable.Tbody>
                </Table>
            )}
        />
    </Page>
);

export default GenreList;
