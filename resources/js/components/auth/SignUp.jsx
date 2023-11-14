import { Button, Group, PasswordInput, Stack, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';

import { useAuth } from '../../context/AuthContext.jsx';

const SignUp = ({ onSignUp }) => {
    const auth = useAuth();
    const form = useForm({
        initialValues: {
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
        },
        validate: {
            name: value =>
                value.length < 3
                    ? 'Name must be at least 3 characters long'
                    : null,
            email: value =>
                !value.includes('@') ? 'Please provide a valid email' : null,
            password: value =>
                value.length < 6
                    ? 'Password must be at least 6 characters long'
                    : null,
            password_confirmation: value =>
                value !== form.values.password
                    ? 'Password confirmation does not match'
                    : null,
        },
    });

    return (
        <form
            onSubmit={form.onSubmit(values => {
                auth.signUp(values).then(() => onSignUp(values));
            })}
        >
            <Stack>
                <TextInput
                    label='Name'
                    placeholder='Your name'
                    required
                    {...form.getInputProps('name')}
                />
                <TextInput
                    label='Email'
                    placeholder='Your email'
                    required
                    {...form.getInputProps('email')}
                />
                <PasswordInput
                    label='Password'
                    placeholder='Your password'
                    required
                    {...form.getInputProps('password')}
                />
                <PasswordInput
                    label='Password confirmation'
                    placeholder='Your password confirmation'
                    required
                    {...form.getInputProps('password_confirmation')}
                />
                <Group justify='flex-end'>
                    <Button type='submit' variant='light'>
                        Sign up
                    </Button>
                </Group>
            </Stack>
        </form>
    );
};

export default SignUp;
