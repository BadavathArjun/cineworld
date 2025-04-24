import { FaGithub, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h3 className="footer-brand">
                        <span className="brand-cine">CINE</span>
                        <span className="brand-world">WORLD</span>
                    </h3>
                    <p className="footer-description">
                        Your ultimate destination for movies and TV shows.
                        Discover, watch, and stay updated with the latest in entertainment.
                    </p>
                </div>

                <div className="footer-section">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="/movies">Movies</a></li>
                        <li><a href="/tv-shows">TV Shows</a></li>
                        <li><a href="/trending">Trending</a></li>
                        <li><a href="/upcoming">Upcoming</a></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4>Genres</h4>
                    <ul>
                        <li><a href="/genre/action">Action</a></li>
                        <li><a href="/genre/drama">Drama</a></li>
                        <li><a href="/genre/comedy">Comedy</a></li>
                        <li><a href="/genre/horror">Horror</a></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4>Connect With Us</h4>
                    <div className="social-links">
                        <a href="#" aria-label="GitHub">
                            <FaGithub />
                        </a>
                        <a href="#" aria-label="Twitter">
                            <FaTwitter />
                        </a>
                        <a href="#" aria-label="Instagram">
                            <FaInstagram />
                        </a>
                        <a href="#" aria-label="LinkedIn">
                            <FaLinkedin />
                        </a>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; 2025 CineWorld. All rights reserved.</p>
                <p>Powered by @Badavath Arjun (2025)</p>
                <div className="footer-links">
                    <a href="/privacy">Privacy Policy</a>
                    <a href="/terms">Terms of Service</a>
                    <a href="/contact">Contact Us</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer; 