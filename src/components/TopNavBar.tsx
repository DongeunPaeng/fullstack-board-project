import { Link } from "react-router-dom";
import { useUser } from "../providers/UserProvider";
import axios from "axios";
import { useHistory } from "react-router-dom";

const TopNavBar = () => {
    const history = useHistory();
    const { accessToken, setAccessToken, setUser } = useUser();

    const logout = () => {
        axios.get("/api/logout").then((res) => {
            if (res.status === 200) {
                setAccessToken(null);
                setUser(null);
                history.push("/");
            } else {
                alert("something went wrong...");
            }
        });
    };

    return (
        <nav>
            <div>
                <Link to="/" className="font-extrabold text-gray-800 items-center">
                    Dongeun Paeng
                </Link>
            </div>
            <div className="mt-4 items-center sm:flex sm:justify-between">
                <div className="block">
                    <Link className="topnavbar-links" to="/blogposts">
                        <span className="mr-4">Thoughts</span>
                    </Link>
                    <Link className="topnavbar-links" to="/study">
                        <span className="mr-4">StudyNotes</span>
                    </Link>
                    {accessToken ? (
                        <Link className="topnavbar-links" to="/draft">
                            <span className="mr-4 text-gray-400">Draft</span>
                        </Link>
                    ) : null}
                </div>
                {accessToken ? (
                    <div>
                        <Link className="topnavbar-links" to="/write">
                            <span className="mr-4">Write</span>
                        </Link>
                        <Link className="mr-4 topnavbar-links" to="/mypage">
                            MyPage
                        </Link>
                        <button className="topnavbar-links" onClick={logout}>
                            Logout
                        </button>
                    </div>
                ) : null}
            </div>
        </nav>
    );
};

export default TopNavBar;
