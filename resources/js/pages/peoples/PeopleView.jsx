import { Stack, Text } from '@mantine/core';
import Page from '../../components/layout/Page.jsx';
import api from '../../services/api';
import withRemoteDataHoc from '../../utils/withRemoteDataHoc.jsx';

const PeopleView = ({ data: people }) => {

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
            <Text>Loan history: </Text>
        </Stack>
        </Page>
    );
};

export default withRemoteDataHoc(PeopleView, api.peoples, true);
