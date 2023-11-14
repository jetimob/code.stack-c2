import { notifications } from '@mantine/notifications';

export const show = (message, options = {}) =>
    notifications.show({
        message,
        ...options,
    });

export const error = (message, options = {}) =>
    show(message, { color: 'red', ...options });

export const requestError = (err, options = {}) => {
    if (err.response) {
        const { data } = err.response;
        if (data.errors) {
            const messages = Object.entries((data.errors)).map(([key, value]) => {
                return `${key}: ${value.join(' ')}`;
            });
            return error(messages.join('; '), options);
        }

        if (data.message) {
            return error(data.message, options);
        }
    }

    return error(err.message, options);
}

export const success = (message, options = {}) =>
    show(message, { color: 'green', ...options });

export const info = (message, options = {}) =>
    show(message, { color: 'blue', ...options });

export default {
    show,
    error,
    success,
    info,
    requestError,
};
