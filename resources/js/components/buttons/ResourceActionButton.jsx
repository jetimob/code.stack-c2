import { ActionIcon } from '@mantine/core';
import { Link } from 'react-router-dom';

const ResourceActionButton = ({ children, ...props }) => (
    <ActionIcon variant='subtle' component={Link} {...props}>
        {children}
    </ActionIcon>
);

export default ResourceActionButton;
