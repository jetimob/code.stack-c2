import { Add } from '@carbon/icons-react';
import { Box, Breadcrumbs, Group, Stack, Title } from '@mantine/core';
import { useDocumentTitle } from '@mantine/hooks';
import { Link, useNavigate } from 'react-router-dom';

import ResourceActionButton from '../buttons/ResourceActionButton.jsx';
import ResourceButtons from '../buttons/ResourceButtons.jsx';

const Page = ({
    children,
    breadcrumbs,
    title,
    api = null,
    id = null,
    route = null,
    resource = null,
    hideTitle = false,
    addRoute = null,
}) => {
    useDocumentTitle(title);
    const showButtons = api && id && route && resource;
    const navigate = useNavigate();
    const navigateTo = breadcrumbs.length > 1 ? breadcrumbs[0].to : '/';

    return (
        <Stack>
            <Group justify='space-between' mb='md'>
                <Breadcrumbs>
                    {breadcrumbs.map((crumb, i) => (
                        <Link
                            style={{ textDecoration: 'none' }}
                            to={crumb.to}
                            key={i}
                        >
                            {crumb.title}
                        </Link>
                    ))}
                </Breadcrumbs>
                {showButtons && (
                    <ResourceButtons
                        api={api}
                        id={id}
                        resource={resource}
                        route={route}
                        showView={false}
                        onDelete={() => navigate(navigateTo)}
                    />
                )}
            </Group>
            <Group justify='space-between'>
                {!hideTitle && (
                    <Title order={1} align='center'>
                        {title}
                    </Title>
                )}
                {addRoute && (
                    <ResourceActionButton to={addRoute} variant='filled'>
                        <Add />
                    </ResourceActionButton>
                )}
            </Group>
            <Box sx={{ margin: 'auto' }}>{children}</Box>
        </Stack>
    );
};

export default Page;
