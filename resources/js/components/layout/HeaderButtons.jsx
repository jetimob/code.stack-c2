import { Link } from 'react-router-dom';

const HeaderButtons = () => (
    <>
        <Link to='/books'>Books</Link>
        <Link to='/authors'>Authors</Link>
        <Link to='/genres'>Genres</Link>
        <Link to='/publishers'>Publishers</Link>

    </>
);

export default HeaderButtons;
