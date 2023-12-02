import { Stack, Textarea, TextInput } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import FormButtons from '../components/forms/FormButtons.jsx';

import api from '../services/api/index.js';
import notification from '../services/notification/index.js';
import withRemoteDataHoc from '../utils/withRemoteDataHoc.jsx';

const UpsertGenre = ({ data }) => {
    const navigate = useNavigate();
    const form = useForm({
        initialValues: {
            name: data?.name ?? '',
            biography: data?.biography ?? '',
            created_at: data?.created_at ? dayjs(data.created_at) : null,
            updated_at: data?.updated_at ? dayjs(data.updated_at) : null,
        },
        validate: {
            name: value => {
                const length = value.trim().length;
                if (length === 0) return 'Name is required';
                if (length > 255)
                    return 'Name must be less than 255 characters';
                return null;
            },
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
                        notification.success('Genre saved successfully');
                        navigate(`/genres/${data.id}`);
                    })
                    .catch(notification.requestError);
            })}
        >
            <Stack>
                <TextInput
                    label='Name'
                    placeholder='Enter genre name'
                    required
                    {...form.getInputProps('name')}
                />
                <Textarea
                    label='Biography'
                    placeholder='Enter genre normalized name'
                    required
                    {...form.getInputProps('normalized_name')}
                />
                <FormButtons/>
            </Stack>
        </form>
    );
};

export default withRemoteDataHoc(UpsertGenre, api.genres, true);
