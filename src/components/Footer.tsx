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
    <div className="bottom-0 left-0 right-0 fixed py-2 px-6 bg-gray-50 border-t border-gray-800">
      <footer id="footer">
        <div>
          <ul>
            <div className="flex justify-between items-center">
              <div className="flex space-x-3 items-center">
                <li>
                  <Link to="/books" className="footer-links">
                    인생 책
                  </Link>
                </li>
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
                  <a href="https://notion.deering.co" className="footer-links">
                    디어 소개
                  </a>
                </li>
              </div>
              <button className="text-2xl" onClick={scrollToTop}>
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
