import { Route, Redirect } from "react-router-dom";
import { useUser } from "../providers/UserProvider";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { accessToken } = useUser();
  const isAuthenticated = !!accessToken;

  return isAuthenticated ? (
    <Route {...rest} render={(props) => <Component {...props} />} />
  ) : (
    <Redirect to="/" />
  );
};

export default PrivateRoute;
