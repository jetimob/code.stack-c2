import { Table as MTable } from '@mantine/core';

import RemoteList from '../../components/data-display/list/RemoteList.jsx';
import Table from '../../components/data-display/table/Table.jsx';
import TableActions from '../../components/data-display/table/TableActions.jsx';
import Page from '../../components/layout/Page.jsx';
import api from '../../services/api/index.js';

const PeopleList = () => (
    <Page title='Peoples' breadcrumbs={[]} addRoute='/peoples/new'>
        <RemoteList
            api={api.peoples}
            render={({ data: peoples, fetchData }) => (
                <Table>
                    <MTable.Thead>
                        <MTable.Tr>
                            <MTable.Th>People</MTable.Th>
                            <MTable.Th>Loans</MTable.Th>
                            <MTable.Th></MTable.Th>
                        </MTable.Tr>
                    </MTable.Thead>

                    <MTable.Tbody>
                        {peoples.map(people => (
                            <MTable.Tr key={people.id}>
                                <MTable.Td>{people.name}</MTable.Td>
                                <MTable.Td>{people.loans_count}</MTable.Td>
                                <TableActions
                                    id={people.id}
                                    api={api.peoples}
                                    route='peoples'
                                    resource='people'
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

export default PeopleList;
