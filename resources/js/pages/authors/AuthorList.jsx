import { Table as MTable } from '@mantine/core';

import RemoteList from '../../components/data-display/list/RemoteList.jsx';
import Table from '../../components/data-display/table/Table.jsx';
import TableActions from '../../components/data-display/table/TableActions.jsx';
import Page from '../../components/layout/Page.jsx';
import api from '../../services/api';

const AuthorList = () => (
    <Page title='Authors' breadcrumbs={[]} addRoute='/authors/new'>
        <RemoteList
            api={api.authors}
            render={({ data: authors, fetchData }) => (
                <Table>
                    <MTable.Thead>
                        <MTable.Tr>
                            <MTable.Th>Author</MTable.Th>
                            <MTable.Th>Books</MTable.Th>
                            <MTable.Th></MTable.Th>
                        </MTable.Tr>
                    </MTable.Thead>

                    <MTable.Tbody>
                        {authors.map(author => (
                            <MTable.Tr key={author.id}>
                                <MTable.Td>{author.name}</MTable.Td>
                                <MTable.Td>{author.book_count}</MTable.Td>
                                <TableActions
                                    id={author.id}
                                    api={api.authors}
                                    route='authors'
                                    resource='author'
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

export default AuthorList;
