import { Link } from 'react-router-dom';

const HeaderButtons = () => (
    <>
        <Link style={{ textDecoration: 'none' }} to='/books'>
            Books
        </Link>
        <Link style={{ textDecoration: 'none' }} to='/authors'>
            Authors
        </Link>
        <Link style={{ textDecoration: 'none' }} to='/genres'>
            Genres
        </Link>
        <Link style={{ textDecoration: 'none' }} to='/publishers'>
            Publishers
        </Link>
        <Link style={{ textDecoration: 'none' }} to='/loans'>
            Loans
        </Link>
        <Link style={{ textDecoration: 'none' }} to='/peoples'>
            Peoples
        </Link>
    </>
);

export default HeaderButtons;
