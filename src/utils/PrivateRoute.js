import { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { AppContext } from "../context/AppContext";

function PrivateRoute({ component: Component, ...rest }) {
  const [state] = useContext(AppContext);

  return (
    <Route
      {...rest}
      render={(props) => {
        return state.isLogin ? <Component {...props} /> : <Redirect to="/" />;
      }}
    />
  );
}

export default PrivateRoute;
