import { useEffect, useState } from 'react';

import { Box, Center, Pagination, Stack } from '@mantine/core';
import { useSearchParams } from 'react-router-dom';

import withRemoteErr from '../../../utils/withRemoteErrHoc.jsx';

const RemoteList = ({
    api,
    render,
    WrapperComponent,
    wrapperProps,
    booksOrdered = false,
    orderBy,
}) => {
    const [response, setResponse] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const newSearchParams = new URLSearchParams(searchParams);
    const [currentPage, setCurrentPage] = useState(
        Number(searchParams.get('page') || 1)
    );

    async function fetchData() {
        const castQPage = Number(searchParams.get('page') || 1);
        if (castQPage !== currentPage) {
            setCurrentPage(castQPage);
        }

        const response = booksOrdered
            ? await api.getOrdered(orderBy, currentPage)
            : await api.get({ qs: { page: currentPage } });
        setResponse(response);
    }

    useEffect(() => {
        fetchData();
    }, [searchParams, orderBy]);

    const totalPages = response?.meta.last_page;

    useEffect(() => {
        if (currentPage === 1 && !newSearchParams.has('page')) {
            return;
        }

        const replace = currentPage === Number(searchParams.get('page') || 1);
        newSearchParams.set('page', String(currentPage));
        setSearchParams(newSearchParams, { replace });
    }, [currentPage]);

    return (
        <Box sx={{ position: 'relative' }}>
            <WrapperComponent {...wrapperProps}>
                <Stack sx={{ width: '100%' }}>
                    {render({
                        data: response?.data ?? [],
                        page: currentPage,
                        fetchData,
                    })}
                    <Center>
                        <Pagination
                            total={totalPages}
                            siblings={1}
                            boundaries={1}
                            page={currentPage}
                            position='center'
                            withEdges
                            onChange={p => {
                                setCurrentPage(p);
                            }}
                        />
                    </Center>
                </Stack>
            </WrapperComponent>
        </Box>
    );
};

RemoteList.defaultProps = {
    WrapperComponent: Stack,
    wrapperProps: {},
};

export default withRemoteErr(RemoteList);
