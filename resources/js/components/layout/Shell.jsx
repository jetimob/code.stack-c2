import { Logout, Moon, OverflowMenuVertical, Sun } from '@carbon/icons-react';
import {
    ActionIcon,
    AppShell,
    Burger,
    Container,
    Group,
    Menu,
    Stack,
    Text,
    useMantineColorScheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { useAuth } from '../../context/AuthContext.jsx';
import HeaderButtons from './HeaderButtons.jsx';
import classes from './layout.module.css';

const Shell = ({ children }) => {
    const auth = useAuth();
    const [opened, { toggle }] = useDisclosure();
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();

    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{
                width: 300,
                breakpoint: 'sm',
                collapsed: { desktop: true, mobile: !opened },
            }}
            padding='md'
        >
            <AppShell.Header withBorder={false} className={classes.header}>
                <Group h='100%' px='md' maw={1080} justify='center' mx='auto'>
                    <Burger
                        opened={opened}
                        onClick={toggle}
                        hiddenFrom='sm'
                        size='sm'
                    />
                    <Group justify='space-between' style={{ flex: 1 }}>
                        <Text fw='bold' size='xl'>
                            JetTeca
                        </Text>

                        <Group ml='xl' visibleFrom='sm'>
                            <HeaderButtons />
                        </Group>

                        <Group spacing='xs'>
                            <Text size='sm'>{auth.user.name}</Text>
                            <Menu>
                                <Menu.Target>
                                    <ActionIcon variant='light'>
                                        <OverflowMenuVertical />
                                    </ActionIcon>
                                </Menu.Target>

                                <Menu.Dropdown>
                                    <Menu.Item
                                        leftSection={
                                            colorScheme === 'dark' ? (
                                                <Sun />
                                            ) : (
                                                <Moon />
                                            )
                                        }
                                        onClick={toggleColorScheme}
                                    >
                                        <Text size='sm'>
                                            {colorScheme === 'dark'
                                                ? 'Light mode'
                                                : 'Dark mode'}
                                        </Text>
                                    </Menu.Item>
                                    <Menu.Item
                                        leftSection={<Logout />}
                                        onClick={auth.signOut}
                                    >
                                        <Text size='sm'>Sign-out</Text>
                                    </Menu.Item>
                                </Menu.Dropdown>
                            </Menu>
                        </Group>
                    </Group>
                </Group>
            </AppShell.Header>

            <AppShell.Navbar py='md' px={4}>
                <Stack p='lg'>
                    <HeaderButtons />
                </Stack>
            </AppShell.Navbar>

            <AppShell.Main>
                <Container>{children}</Container>
            </AppShell.Main>
        </AppShell>
    );
};

export default Shell;
