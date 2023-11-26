import { Stack, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useNavigate } from 'react-router-dom';
import FormButtons from '../components/forms/FormButtons.jsx';
import api from '../services/api/index.js';
import notification from '../services/notification/index.js';
import withRemoteDataHoc from '../utils/withRemoteDataHoc.jsx';

const UpsertPeople = ({ data }) => {
    const navigate = useNavigate();
    const form = useForm({
        initialValues: {
            name: data?.name ?? '',
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
                    promise = api.peoples.patch(data.id, values);
                } else {
                    promise = api.peoples.post(values);
                }

                promise
                    .then(({ data }) => {
                        notification.success('People saved successfully');
                        navigate(`/peoples/${data.id}`);
                    })
                    .catch(notification.requestError);
            })}
        >
            <Stack>
                <TextInput
                    label='Name'
                    placeholder='Enter people name'
                    required
                    {...form.getInputProps('name')}
                />
                <FormButtons/>
            </Stack>
        </form>
    );
};

export default withRemoteDataHoc(UpsertPeople, api.peoples, true);
