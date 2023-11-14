import { Email, Password } from '@carbon/icons-react';
import { Button, Group, PasswordInput, Stack, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';

import { useAuth } from '../../context/AuthContext.jsx';

const SignIn = () => {
    const auth = useAuth();
    const form = useForm({
        initialValues: {
            email: '',
            password: '',
        },
        validate: {
            email: value =>
                !value.includes('@') ? 'Please provide a valid email' : null,
            password: value =>
                value.length < 6
                    ? 'Password must be at least 6 characters long'
                    : null,
        },
    });

    return (
        <form onSubmit={form.onSubmit(values => auth.signIn(values))}>
            <Stack>
                <TextInput
                    leftSection={<Email />}
                    label='Email'
                    placeholder='Your email'
                    required
                    {...form.getInputProps('email')}
                />
                <PasswordInput
                    leftSection={<Password />}
                    label='Password'
                    placeholder='Your password'
                    required
                    {...form.getInputProps('password')}
                />
                <Group justify='flex-end'>
                    <Button type='submit' variant='light'>
                        Sign in
                    </Button>
                </Group>
            </Stack>
        </form>
    );
};

export default SignIn;
