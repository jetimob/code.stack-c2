import { Box, LoadingOverlay } from '@mantine/core';

const Spinner = () => <Box sx={{
    position: 'absolute',
    height: '100vh',
    width: '100vw',
    top: 0,
    left: 0,
    zIndex: 1000,
}}>
    <LoadingOverlay visible={true} overlayProps={{ blur: 2 }}/>
</Box>;

export default Spinner;
