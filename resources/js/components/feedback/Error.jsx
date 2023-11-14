import { Warning } from '@carbon/icons-react';
import { Alert } from '@mantine/core';

const Error = ({ error }) => (
    <Alert title={ error.name } color="red" icon={ <Warning/> }>
        { error.message }
    </Alert>
);

export default Error;
