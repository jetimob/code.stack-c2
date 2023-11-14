import { Button, Group } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

const FormButtons = () => {
    const navigate = useNavigate();
    return (
        <Group justify="flex-end">
            <Button onClick={() => navigate(-1)} variant='subtle'>cancel</Button>
            <Button type='submit'>save</Button>
        </Group>
    );
}

export default FormButtons;
