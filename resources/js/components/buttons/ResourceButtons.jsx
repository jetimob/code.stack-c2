import {
    Edit,
    OverflowMenuVertical,
    TrashCan,
    View,
} from '@carbon/icons-react';
import { ActionIcon, Box, Group, Menu, Text } from '@mantine/core';
import { modals } from '@mantine/modals';

import { success } from '../../services/notification/index.js';
import ResourceActionButton from './ResourceActionButton.jsx';

const ResourceButtons = ({
    api,
    id,
    route,
    resource,
    showView = true,
    onDelete = () => {},
}) => {
    const openModal = () =>
        modals.openConfirmModal({
            title: 'Are you sure?',
            onConfirm: () =>
                api.delete(id).then(() => {
                    success(`${resource} deleted successfully`);
                    onDelete(id);
                }),
            labels: { confirm: 'Delete', cancel: 'Cancel' },
            confirmProps: { color: 'red' },
            children: (
                <Text size='sm'>
                    This action{' '}
                    <Text fw={700} span>
                        cannot be undone
                    </Text>
                    . This will permanently delete the{' '}
                    <Text fw={700} span>
                        {resource}
                    </Text>{' '}
                    with id{' '}
                    <Text fw={700} span>
                        {id}
                    </Text>
                    .
                </Text>
            ),
        });

    const btns = [
        <ResourceActionButton to={`/${route}/${id}/edit`}>
            <Edit />
        </ResourceActionButton>,
        <ActionIcon variant='subtle' onClick={openModal}>
            <TrashCan />
        </ActionIcon>,
    ];

    if (showView) {
        btns.splice(
            0,
            0,
            <ResourceActionButton to={`/${route}/${id}`}>
                <View />
            </ResourceActionButton>
        );
    }

    return (
        <>
            <Group gap={3} visibleFrom='sm'>
                {btns.map((btn, i) => (
                    <Box key={i}>{btn}</Box>
                ))}
            </Group>
            <Box hiddenFrom='sm'>
                <Menu>
                    <Menu.Target>
                        <ActionIcon variant='subtle'>
                            <OverflowMenuVertical />
                        </ActionIcon>
                    </Menu.Target>

                    <Menu.Dropdown>
                        {btns.map((btn, i) => (
                            <Menu.Item key={i}>{btn}</Menu.Item>
                        ))}
                    </Menu.Dropdown>
                </Menu>
            </Box>
        </>
    );
};

export default ResourceButtons;
