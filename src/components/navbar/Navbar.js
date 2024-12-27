import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Inicio</Link>
                </li>
                <li>
                    <Link to="/favorites">Favoritos</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;