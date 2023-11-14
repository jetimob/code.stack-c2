import { Table as MantineTable } from '@mantine/core';

const Table = ({ children, ...props }) => (
    <MantineTable striped highlightOnHover withRowBorders={false} {...props}>
        {children}
    </MantineTable>
);

export default Table;
