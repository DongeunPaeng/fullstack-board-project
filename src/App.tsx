import { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import UserProvider from "./providers/UserProvider";
import PrivateRoute from "./routes/PrivateRoute";
import LoginPage from "./pages/LoginPage";
import FindPasswordPage from "./pages/FindPasswordPage";
import WritePage from "./pages/WritePage";
import EditPage from "./pages/EditPage";
import PostDetailPage from "./pages/PostDetailPage";
import MyPagePage from "./pages/MyPagePage";
import PrinciplesPage from "./pages/PrinciplesPage";
import GamePage from "./pages/GamePage";
import BookShelfPage from "./pages/BookShelfPage";
import DraftPage from "./pages/DraftPage";
import ErrorPage from "./pages/ErrorPage";
import TopNavBar from "./components/TopNavBar";
import Footer from "./components/Footer";
import Body from "./components/Body";
import Wrapper from "./components/Wrapper";
import ReactGA from "react-ga";

const TRACKING_ID = "UA-181290080-1";

ReactGA.initialize(TRACKING_ID);

const App = () => {
    useEffect(() => {
        ReactGA.pageview(window.location.pathname + window.location.search);
    }, []);

    return (
        <UserProvider>
            <Router>
                <Wrapper>
                    <TopNavBar />
                    <Switch>
                        <Route exact path="/" component={Body} />
                        <Route path="/blogposts" component={Body} />
                        <Route path="/journals" component={Body} />
                        <Route path="/study" component={Body} />
                        <Route path="/login" component={LoginPage} />
                        <Route path="/find-password" component={FindPasswordPage} />
                        <Route path="/posts/:id" component={PostDetailPage} />
                        <Route path="/principles" component={PrinciplesPage} />
                        <Route path="/game" component={GamePage} />
                        <Route path="/bookshelf" component={BookShelfPage} />
                        <PrivateRoute path="/write" component={WritePage} />
                        <PrivateRoute path="/edit/:id" component={EditPage} />
                        <PrivateRoute path="/mypage" component={MyPagePage} />
                        <PrivateRoute path="/draft" component={DraftPage} />
                        <Route component={ErrorPage} />
                    </Switch>
                    <Footer />
                </Wrapper>
            </Router>
        </UserProvider>
    );
};

export default App;
