import { Table as MTable } from '@mantine/core';

import RemoteList from '../../components/data-display/list/RemoteList.jsx';
import Table from '../../components/data-display/table/Table.jsx';
import TableActions from '../../components/data-display/table/TableActions.jsx';
import Page from '../../components/layout/Page.jsx';
import api from '../../services/api/index.js';

const PublisherList = () => (
    <Page title='Publisher' breadcrumbs={[]} addRoute='/publisher/new'>
        <RemoteList
            api={api.authors}
            render={({ data: publisher, fetchData }) => (
                <Table>
                    <MTable.Thead>
                        <MTable.Tr>
                            <MTable.Th>Publisher</MTable.Th>
                            <MTable.Th>Books</MTable.Th>
                            <MTable.Th></MTable.Th>
                        </MTable.Tr>
                    </MTable.Thead>

                    <MTable.Tbody>
                        {publishers.map(author => (
                            <MTable.Tr key={publisher.id}>
                                <MTable.Td>{publisher.name}</MTable.Td>
                                <MTable.Td>{publisher.book_count}</MTable.Td>
                                <TableActions
                                    id={publisher.id}
                                    api={api.publishers}
                                    route='publishers'
                                    resource='publisher'
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

export default PublisherList;
