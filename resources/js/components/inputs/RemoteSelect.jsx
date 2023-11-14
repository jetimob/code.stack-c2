import { useEffect, useState } from 'react';

import { Pending } from '@carbon/icons-react';
import {
    Center,
    Group,
    Loader,
    MultiSelect,
    Select,
    Text,
} from '@mantine/core';
import debounce from 'lodash.debounce';

import withRemoteErrHoc from '../../utils/withRemoteErrHoc.jsx';

const RemoteSelect = ({
    elementNameKey = 'name',
    multiselect,
    api,
    withOption = {},
    ...props
}) => {
    const [q, setQ] = useState('');
    const [data, setData] = useState(null);
    const [request, setRequest] = useState(null);
    const [selected, setSelected] = useState(props.value || null);
    let selectableData = [];

    useEffect(() => {
        let qs = {};
        if (q.length > 2) {
            qs.q = q;
        }

        const request = api.get({ qs });
        setRequest({
            request,
            isFetching: true,
        });

        request
            .then(response => {
                setData(response.data);
            })
            .finally(() => {
                setRequest({
                    request,
                    isFetching: false,
                });
            });
    }, [q]);

    if (data) {
        selectableData = [...data];
        if (
            Object.keys(withOption).length &&
            !selectableData.some(el => el.id === withOption.id)
        ) {
            selectableData.push({ ...withOption });
        }
    } else if (Object.keys(withOption).length) {
        selectableData = [withOption];
    }

    const mapEl = el => ({
        label: el[elementNameKey],
        value: String(el.id),
    });

    const blockInput = request?.isFetching;
    const Component = multiselect ? MultiSelect : Select;

    useEffect(() => {
        if (selected !== props.value) {
            setSelected(props.value);
        }
    }, [props.value]);

    const debouncedSetter = debounce(value => {
        if (blockInput || selected) {
            return;
        }

        setQ(value);
    }, 500);

    return (
        <Component
            clearable
            icon={blockInput ? <Loader size='sm' variant='oval' /> : null}
            styles={{
                root: {
                    flex: '1 !important',
                },
            }}
            nothingFoundMessage={
                blockInput ? (
                    <Loader size='lg' variant='oval' />
                ) : (
                    <Center>
                        <Group>
                            <Pending size={24} />
                            <Text>Nada por aqui</Text>
                        </Group>
                    </Center>
                )
            }
            disabled={blockInput}
            data={selectableData.map(mapEl)}
            searchable
            onSearchChange={debouncedSetter}
            {...props}
            value={selected}
            onChange={value => {
                setSelected(value);
                props.onChange(value);
            }}
        />
    );
};

RemoteSelect.defaultProps = {
    multiselect: false,
};

export default withRemoteErrHoc(RemoteSelect);
