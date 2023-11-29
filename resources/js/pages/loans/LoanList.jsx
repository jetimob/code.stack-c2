import { Table as MTable } from '@mantine/core';

import RemoteList from '../../components/data-display/list/RemoteList.jsx';
import Table from '../../components/data-display/table/Table.jsx';
import TableActions from '../../components/data-display/table/TableActions.jsx';
import Page from '../../components/layout/Page.jsx';
import RemoteLoanList from '../../components/loan/RemoteLoanList.jsx';
import api from '../../services/api/index.js';

const LoanList = () => {
    return (
        <Page title='Loans' breadcrumbs={[]} addRoute='/loans/new'>
            <RemoteLoanList />
        </Page>
    );
};

export default LoanList;
