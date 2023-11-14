import { useState } from 'react';

import { FileInput, Input, Rating, Stack, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useNavigate } from 'react-router-dom';

import BookCover from '../components/book/BookCover.jsx';
import FormButtons from '../components/forms/FormButtons.jsx';
import RemoteSelect from '../components/inputs/RemoteSelect.jsx';
import api from '../services/api';
import notification from '../services/notification/index.js';
import withRemoteDataHoc from '../utils/withRemoteDataHoc.jsx';

const UpsertBook = ({ data, setDataWith }) => {
    const navigate = useNavigate();
    const [coverData, setCoverData] = useState(null);
    const form = useForm({
        initialValues: {
            title: data?.title ?? '',
            description: data?.description ?? '',
            rating: data?.rating ?? 0,
            isbn: data?.isbn ?? '',
            author_id: data?.author?.id ?? null,
            genre_id: data?.genre?.id ?? null,
            cover_id: data?.cover?.id ?? null,
        },
        validate: {
            title: value => {
                const length = value.trim().length;
                if (length === 0) return 'Title is required';
                if (length > 255)
                    return 'Title must be less than 255 characters';
                return null;
            },
            description: value =>
                value.trim().length === 0 ? 'Description is required' : null,
            rating: value =>
                value < 0 && value > 5
                    ? 'Rating must be between 0 and 5'
                    : null,
            isbn: value =>
                value.trim().length !== 13 ? 'ISBN must be 13 characters' : null,
        },
    });

    const destroyCover = async () => {
        if (data?.id && data.cover?.id) {
            return api.books.dissociateCover(data.id, data.cover.id).then(() => setDataWith({ cover: null }));
        } else if (coverData?.id) {
            return api.covers.delete(coverData.id);
        }

        return Promise.resolve();
    }

    const uploadCover = file => {
        if (file === null) {
            destroyCover().then(() => {
                notification.success('Cover removed successfully');
                setCoverData(null);
                form.setFieldValue('cover_id', null);
            });
            return;
        }

        api.covers
            .post(
                { cover: file },
                { headers: { 'Content-Type': 'multipart/form-data' } }
            )
            .then(async ({ data: fileData }) => {
                await destroyCover();
                setCoverData(fileData);
                form.setFieldValue('cover_id', fileData.id);
                setDataWith({ cover: fileData });
                notification.success('Cover uploaded successfully');
            })
            .catch(notification.requestError);
    };

    return (
        <>
            <BookCover book={data} />
            <FileInput
                label='Cover'
                accept='image/*'
                placeholder='Select a cover'
                clearable
                description='Select an image to use as the cover for this book'
                value={data?.cover?.url ?? null}
                onChange={uploadCover}
                valueComponent={value => {
                    return value?.value ?? '';
                }}
            />
            <form
                onSubmit={form.onSubmit(values => {
                    let promise;
                    if (data?.id) {
                        promise = api.books.patch(data.id, values);
                    } else {
                        promise = api.books.post(values);
                    }

                    promise
                        .then(({ data }) => {
                            notification.success('Book saved successfully');
                            navigate(`/books/${data.id}`);
                        })
                        .catch(notification.requestError);
                })}
            >
                <Stack>
                    <TextInput
                        required
                        label='Title'
                        placeholder='Enter a title'
                        {...form.getInputProps('title')}
                    />
                    <TextInput
                        required
                        label='Description'
                        placeholder='Enter a description'
                        {...form.getInputProps('description')}
                    />
                    <Input.Wrapper required label='Rating'>
                        <Rating {...form.getInputProps('rating')} />
                    </Input.Wrapper>
                    <TextInput
                        required
                        label='ISBN'
                        placeholder='Enter an ISBN'
                        {...form.getInputProps('isbn')}
                    />
                    <RemoteSelect
                        required
                        label='Author'
                        api={api.authors}
                        placeholder='Select an author'
                        withOption={data?.author ?? {}}
                        {...form.getInputProps('author_id')}
                    />
                    <RemoteSelect
                        required
                        label='Genre'
                        api={api.genres}
                        placeholder='Select a genre'
                        withOption={data?.genre ?? {}}
                        {...form.getInputProps('genre_id')}
                    />
                    <FormButtons/>
                </Stack>
            </form>
        </>
    );
};

export default withRemoteDataHoc(UpsertBook, api.books, true);
