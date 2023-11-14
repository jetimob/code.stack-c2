import { Image } from '@mantine/core';
import { deterministicRandomForN } from '../../utils/helpers.js';

const BookCover = ({ book, ...props }) => {
    const id = book?.id ?? 0;
    const src = book?.cover?.url ?? `/images/empty-cover-${deterministicRandomForN(id, 3)}.png`;

    return (
        <Image
            src={src}
            alt={book?.title ?? 'Book cover'}
            height={300}
            {...props}
        />
    )
};

export default BookCover;
