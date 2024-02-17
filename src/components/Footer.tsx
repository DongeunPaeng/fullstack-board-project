import { Link } from "react-router-dom";
import { BsFillArrowDownCircleFill } from "react-icons/bs";

const Footer = () => {
    const scrollToBottom = () => {
        window.scrollTo({
            top: document.body.scrollHeight,
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
                            <button className="lg:pr-8 text-2xl" onClick={scrollToBottom}>
                                <BsFillArrowDownCircleFill />
                            </button>
                        </div>
                    </ul>
                </div>
            </footer>
        </div>
    );
};

export default Footer;
