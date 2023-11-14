import { Alert, Button, Card, List, Stack, Text } from '@mantine/core';

const RequestError = ({ error, resetErrorBoundary }) => {
    let errMsg = [error.message];
    let errTitle = error.name;
    return (
        <Alert title='Erro durante a última requisição' color='red'>
            <Stack>
                <Card>
                    <Text pageSection>O que houve?</Text>
                    <Text c='dimmed' size='sm'>
                        {errTitle}
                    </Text>
                    <Text pageSection>Detalhes:</Text>
                    <List>
                        {errMsg.map(err => (
                            <List.Item key={err}>{err}</List.Item>
                        ))}
                    </List>
                </Card>
                <Button
                    onClick={resetErrorBoundary}
                    color='red'
                    variant='light'
                >
                    Tentar novamente?
                </Button>
            </Stack>
        </Alert>
    );
};

export default RequestError;
