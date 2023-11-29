import { Alert, Button, Group, Stack } from '@mantine/core';
import { Link, useNavigate } from 'react-router-dom';

import Page from '../components/layout/Page.jsx';

const NotFound = () => {
    const navigate = useNavigate();
    return (
        <Page title='Not Found' breadcrumbs={[]}>
            <Alert color='red' title='404 - Not Found'>
                <Stack>
                    <p>Sorry, the page you are looking for does not exist.</p>
                    <Group justify='flex-end'>
                        <Button
                            variant='subtle'
                            color='red'
                            onClick={() => navigate(-1)}
                        >
                            Go back
                        </Button>
                        <Button
                            component={Link}
                            to='/'
                            variant='outline'
                            color='red'
                        >
                            Go home
                        </Button>
                    </Group>
                </Stack>
            </Alert>
        </Page>
    );
};

export default NotFound;
