import { Box, Button, Container, Stack, Text, Title } from '@mantine/core';
import { useToggle } from '@mantine/hooks';

import SignIn from './SignIn.jsx';
import SignUp from './SignUp.jsx';
import classes from './auth.module.css';

const Unauthenticated = () => {
    const [state, toggleState] = useToggle();

    return (
        <Box className={classes.wrapper}>
            <Container size='xs'>
                <Title order={1} align='center'>
                    Welcome to JetTeca
                </Title>
                <Text align='center' size='sm' mb='md'>
                    Your personal library
                </Text>
                <Stack>
                    {state ? <SignUp onSignUp={toggleState} /> : <SignIn />}
                    <Button variant='subtle' fullWidth onClick={toggleState}>
                        {state ? 'Already have an account?' : 'Don\'t have an account?'}
                    </Button>
                </Stack>
            </Container>
        </Box>
    );
};

export default Unauthenticated;
