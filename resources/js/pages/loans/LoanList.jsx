import Page from '../../components/layout/Page.jsx';
import RemoteLoanList from '../../components/loan/RemoteLoanList.jsx';

const LoanList = () => {
    return (
        <Page title='Loans' breadcrumbs={[]} addRoute='/loans/new'>
            <RemoteLoanList />
        </Page>
    );
};

export default LoanList;
