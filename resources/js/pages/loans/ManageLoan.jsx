import { useParams } from 'react-router-dom';

import Page from '../../components/layout/Page.jsx';
import UpsertLoan from '../../forms/UpsertLoan.jsx';

const ManageLoan = () => {
    const { id } = useParams();
    const breadcrumbs = [{ title: 'Loans', to: '/loans' }];

    if (id) {
        breadcrumbs.push({ title: id, to: `/loans/${id}` });
    }

    return (
        <Page
            title={id ? `Edit Loan - ${id}` : 'New Loan'}
            breadcrumbs={breadcrumbs}
        >
            <UpsertLoan id={id} />
        </Page>
    );
};

export default ManageLoan;
