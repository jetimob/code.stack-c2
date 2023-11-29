import {
    Badge,
    Center,
    Grid,
    Card as MantineCard,
    Rating,
    Text,
} from '@mantine/core';
import { Link } from 'react-router-dom';

import Card from '../data-display/card/Card.jsx';
import BookCover from './BookCover.jsx';

const BookCard = ({ book }) => {
    return (
        <Card>
            <MantineCard.Section>
                <BookCover book={book} height={150} />
            </MantineCard.Section>

            <Link style={{ textDecoration: 'none' }} to={`/books/${book.id}`}>
                <Text truncate mt='md' fw={700}>
                    {book.title}
                </Text>
            </Link>

            <Grid mt='md'>
                <Grid.Col span='auto'>
                    <Link
                        style={{ textDecoration: 'none' }}
                        to={`/authors/${book.author.id}`}
                    >
                        <Text size='sm' truncate>
                            {book.author.name}
                        </Text>
                    </Link>
                </Grid.Col>

                <Grid.Col span='content'>
                    <Link
                        style={{ textDecoration: 'none' }}
                        to={`/genres/${book.genre.id}`}
                    >
                        <Badge color='blue' variant='light'>
                            {book.genre.name}
                        </Badge>
                    </Link>
                </Grid.Col>
            </Grid>

            <Center>
                <Rating value={book.rating} readOnly size='lg' my='md' />
            </Center>
        </Card>
    );
};

export default BookCard;
