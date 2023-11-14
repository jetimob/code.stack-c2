import { Card as MantineCard } from '@mantine/core';

const Card = ({ children, ...props }) => (
    <MantineCard shadow='md' padding='lg' {...props}>
        {children}
    </MantineCard>
);

export default Card;
