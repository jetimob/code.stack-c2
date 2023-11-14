import { Center, Table } from '@mantine/core';

import ResourceButtons from '../../buttons/ResourceButtons.jsx';

const TableActions = ({ api, id, route, resource, onDelete = () => {} }) => {
    const Btns = () => (
        <ResourceButtons
            api={api}
            id={id}
            route={route}
            resource={resource}
            onDelete={onDelete}
        />
    );

    return (
        <Table.Td style={{ width: '25vw', maxWidth: '120px' }}>
            <Center>
                <Btns />
            </Center>
        </Table.Td>
    );
};

export default TableActions;
