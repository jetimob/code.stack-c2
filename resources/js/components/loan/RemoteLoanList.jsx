import { Table as MTable, Stack, Text } from '@mantine/core';

import RemoteList from '../../components/data-display/list/RemoteList.jsx';
import Table from '../../components/data-display/table/Table.jsx';
import TableActions from '../../components/data-display/table/TableActions.jsx';
import api from '../../services/api/index.js';

const RemoteLoanList = ({ remoteSrc = api.loans }) => {
    return (
        <RemoteList
            api={remoteSrc}
            render={({ data: loans, fetchData }) => {
                if (loans.length === 0) {
                    return <p>No loans available.</p>;
                }
                return (
                    <Stack>
                        <Text>Loan history: </Text>
                        <Table>
                            <MTable.Thead>
                                <MTable.Tr>
                                    <MTable.Th>People</MTable.Th>
                                    <MTable.Th>Book</MTable.Th>
                                    <MTable.Th>Status</MTable.Th>
                                    <MTable.Th></MTable.Th>
                                </MTable.Tr>
                            </MTable.Thead>
                            <MTable.Tbody>
                                {loans.map(loan => {
                                    const rowStyle =
                                        loan.status === 'Delayed'
                                            ? { color: 'red' }
                                            : {};
                                    return (
                                        <MTable.Tr key={loan.id}>
                                            <MTable.Td>
                                                {loan.people.name}
                                            </MTable.Td>
                                            <MTable.Td>
                                                {loan.book.title}
                                            </MTable.Td>
                                            <MTable.Td style={rowStyle}>
                                                {loan.status}
                                            </MTable.Td>
                                            <TableActions
                                                id={loan.id}
                                                api={api.loans}
                                                route='loans'
                                                resource='loan'
                                                onDelete={fetchData}
                                            />
                                        </MTable.Tr>
                                    );
                                })}
                            </MTable.Tbody>
                        </Table>
                    </Stack>
                );
            }}
        />
    );
};

export default RemoteLoanList;
