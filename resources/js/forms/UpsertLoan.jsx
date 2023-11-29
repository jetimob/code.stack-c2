import { useEffect } from 'react';

import { Select, Stack } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { useNavigate } from 'react-router-dom';

import FormButtons from '../components/forms/FormButtons.jsx';
import RemoteSelect from '../components/inputs/RemoteSelect.jsx';
import api from '../services/api/index.js';
import notification from '../services/notification/index.js';
import withRemoteDataHoc from '../utils/withRemoteDataHoc.jsx';

const UpsertLoan = ({ data }) => {
    const navigate = useNavigate();
    const initialReturnDate = data?.return_date
        ? new Date(data.return_date)
        : null;

    const form = useForm({
        initialValues: {
            status: data?.status ?? '',
            people_id: data?.people?.id ?? '',
            book_id: data?.book?.id ?? '',
            return_date: initialReturnDate,
        },
        validate: {},
    });

    useEffect(() => {
        form.setFieldValue('status', data?.status || 'Borrowed');
    }, [data]);

    return (
        <form
            onSubmit={form.onSubmit(values => {
                const formattedValues = {
                    ...values,
                };

                if (formattedValues.status !== 'Returned') {
                    delete formattedValues.return_date;
                }
                if (formattedValues.status == null && !data) {
                    formattedValues.status = 'Borrowed';
                }

                let promise;
                if (data?.id) {
                    promise = api.loans.patch(data.id, formattedValues);
                } else {
                    promise = api.loans.post(formattedValues);
                }

                promise
                    .then(({ data }) => {
                        notification.success('Loan saved successfully');
                        navigate(`/loans/${data.id}`);
                    })
                    .catch(error => {
                        if (error.response.data.status === 'loan_limit_exceeded') {
                            notification.error('Person has exceeded loan limit');
                        } else if (error.response && error.response.data.status === 'book_unavailable') {
                            notification.error('Book is unavailable');
                        } else {
                            notification.requestError(error);
                        }
                    });
            })}
        >
            <Stack>
                <RemoteSelect
                    required
                    label='People'
                    api={api.peoples}
                    placeholder='Select a people'
                    withOption={data?.people ?? {}}
                    {...form.getInputProps('people_id')}
                />
                <RemoteSelect
                    required
                    label='Book'
                    elementNameKey='title'
                    api={api.books}
                    placeholder='Select a book'
                    withOption={data?.book ?? {}}
                    {...form.getInputProps('book_id')}
                />
                {data && (
                    <Select
                        required
                        label='Select a status'
                        data={[
                            { value: 'Returned', label: 'Returned' },
                            { value: 'Delayed', label: 'Delayed' },
                            { value: 'Borrowed', label: 'Borrowed' },
                        ]}
                        value={form.values.status || ''}
                        onChange={value => form.setFieldValue('status', value)}
                        placeholder='Select status'
                    />
                )}
                {form.values.status == 'Returned' && (
                    <DatePickerInput
                        label='Return date'
                        placeholder='Enter return date'
                        required
                        value={form.values.return_date}
                        onChange={value =>
                            form.setFieldValue('return_date', value)
                        }
                        {...form.getInputProps('return_date')}
                    />
                )}
                <FormButtons />
            </Stack>
        </form>
    );
};

export default withRemoteDataHoc(UpsertLoan, api.loans, true);
