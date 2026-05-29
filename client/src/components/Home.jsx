import { Link } from 'react-router-dom';

const HomeButton = () => {
    return (
        <Link to="/" className="home-button">
            <img src="/home.svg" />
        </Link>
    );
};

export default HomeButton;