import { Stack, Textarea, TextInput } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import FormButtons from '../components/forms/FormButtons.jsx';

import api from '../services/api/index.js';
import notification from '../services/notification/index.js';
import withRemoteDataHoc from '../utils/withRemoteDataHoc.jsx';

const UpsertAuthor = ({ data }) => {
    const navigate = useNavigate();
    const form = useForm({
        initialValues: {
            name: data?.name ?? '',
            biography: data?.biography ?? '',
            birth_date: data?.birth_date ? dayjs(data.birth_date) : null,
        },
        validate: {
            name: value => {
                const length = value.trim().length;
                if (length === 0) return 'Name is required';
                if (length > 255)
                    return 'Name must be less than 255 characters';
                return null;
            },
            biography: value =>
                value.trim().length === 0 ? 'Biography is required' : null,
            birth_date: value => value === null ? 'Birth date is required' : null,
        },
    });

    return (
        <form
            onSubmit={form.onSubmit(values => {
                let promise;
                if (data?.id) {
                    promise = api.authors.patch(data.id, values);
                } else {
                    promise = api.authors.post(values);
                }

                promise
                    .then(({ data }) => {
                        notification.success('Author saved successfully');
                        navigate(`/authors/${data.id}`);
                    })
                    .catch(notification.requestError);
            })}
        >
            <Stack>
                <TextInput
                    label='Name'
                    placeholder='Enter author name'
                    required
                    {...form.getInputProps('name')}
                />
                <Textarea
                    label='Biography'
                    placeholder='Enter author biography'
                    required
                    {...form.getInputProps('biography')}
                />
                <DatePickerInput
                    label='Birth date'
                    placeholder='Enter author birth date'
                    required
                    {...form.getInputProps('birth_date')}
                />
                <FormButtons/>
            </Stack>
        </form>
    );
};

export default withRemoteDataHoc(UpsertAuthor, api.authors, true);
