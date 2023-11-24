import { Link } from 'react-router-dom';

const HeaderButtons = () => (
    <>
        <Link to='/books'>Books</Link>
        <Link to='/authors'>Authors</Link>
        <Link to='/genres'>Genres</Link>
        <Link to='/publishers'>Publishers</Link>
        <Link to='/loans'>Loans</Link>
        <Link to='/peoples'>Peoples</Link>
    </>
);

export default HeaderButtons;
