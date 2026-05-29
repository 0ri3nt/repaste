import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="footer">
            <nav>
                <Link to="/about-us">About Us</Link>
                <Link to="/markdown-reference">Markdown Reference</Link>
                <Link to="/inspiration">Inspiration</Link>
            </nav>
        </footer>
    );
};

export default Footer;