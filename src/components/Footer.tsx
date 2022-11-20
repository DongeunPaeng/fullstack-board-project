import { Link } from "react-router-dom";
import { BsFillArrowUpCircleFill } from "react-icons/bs";

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <div className="bottom-0 left-0 right-0 fixed py-2 px-6 bg-white border-t border-gray-800">
            <footer id="footer">
                <div>
                    <ul>
                        <div className="mx-auto max-w-5xl flex justify-between items-center">
                            <div className="lg:pl-8 flex space-x-3 items-center">
                                <li>
                                    <Link to="/bookshelf" className="footer-links">
                                        책장
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/principles" className="footer-links">
                                        원칙
                                    </Link>
                                </li>
                                <li>
                                    <a
                                        href="https://github.com/DongeunPaeng"
                                        className="footer-links"
                                        rel="noreferrer"
                                        target="_blank"
                                    >
                                        GitHub
                                    </a>
                                </li>
                            </div>
                            <button className="lg:pr-8 text-2xl" onClick={scrollToTop}>
                                <BsFillArrowUpCircleFill />
                            </button>
                        </div>
                    </ul>
                </div>
            </footer>
        </div>
    );
};

export default Footer;
