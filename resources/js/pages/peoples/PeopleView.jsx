import { Stack, Text } from '@mantine/core';

import Page from '../../components/layout/Page.jsx';
import RemoteLoanList from '../../components/loan/RemoteLoanList.jsx';
import api from '../../services/api';
import withRemoteDataHoc from '../../utils/withRemoteDataHoc.jsx';

const PeopleView = ({ data: people }) => {
    const remoteSrc = {
        get: params => api.peoples.loans(people.id, params),
    };

    return (
        <Page
            title={people.name}
            breadcrumbs={[
                { title: 'Peoples', to: '/peoples' },
                { title: people.name, to: `/peoples/${people.id}` },
            ]}
            api={api.peoples}
            resource='people'
            route='peoples'
            id={people.id}
        >
            <Stack>
                <Stack>
                    <RemoteLoanList remoteSrc={remoteSrc} />
                </Stack>
            </Stack>
        </Page>
    );
};

export default withRemoteDataHoc(PeopleView, api.peoples, true);
