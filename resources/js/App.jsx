import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import '@mantine/notifications/styles.css';
import { BrowserRouter } from 'react-router-dom';

import AuthStateManager from './components/auth/AuthStateManager.jsx';
import { AuthProvider } from './context/AuthContext.jsx';

const fontFamily = 'Lora, serif';

export default function App() {
    return (
        <MantineProvider
            theme={{
                primaryColor: 'gray',
                defaultRadius: 0,
                fontFamily: fontFamily,
                fontFamilyMonospace: fontFamily,
                headings: {
                    fontFamily: fontFamily,
                },
            }}
        >
            <Notifications />
            <ModalsProvider>
                <BrowserRouter>
                    <AuthProvider>
                        <AuthStateManager />
                    </AuthProvider>
                </BrowserRouter>
            </ModalsProvider>
        </MantineProvider>
    );
}
