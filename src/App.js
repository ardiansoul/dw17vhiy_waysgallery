import { useContext, useEffect, useState } from "react";
import { QueryCache, ReactQueryCacheProvider } from "react-query";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import { AppContext } from "./context/AppContext";
import AddPostpage from "./pages/addPostpage";
import addProject from "./pages/addProject";
import Detailpage from "./pages/Detailpage";
import DetailProject from "./pages/DetailProject";
import EditProfilepage from "./pages/EditProfilepage";
import Hirepage from "./pages/Hirepage";
import Homepage from "./pages/Homepage";
import Landingpage from "./pages/Landingpage";
import Profilepage from "./pages/Profilepage";
import Transactionpage from "./pages/Transactionpage";
import { API, options, setAuthToken } from "./utils/API";
import PrivateRoute from "./utils/PrivateRoute";

const queryCache = new QueryCache();

function App() {
  const [modalLogin, setModalLogin] = useState(false);
  const [modalRegister, setModalRegister] = useState(false);

  const [state, dispatch] = useContext(AppContext);

  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  const loadUser = async () => {
    try {
      const response = await API.get("check-auth", options);

      if (response.status === 401) {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }

      dispatch({
        type: "USER_LOADED",
        payload: response.data.data,
      });
    } catch (err) {
      dispatch({
        type: "AUTH_ERROR",
      });
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const showModalLogin = () => {
    setModalLogin(!modalLogin);
    setModalRegister(false);
  };

  const showModalRegister = () => {
    setModalRegister(!modalRegister);
    setModalLogin(false);
  };

  return (
    <>
      <ReactQueryCacheProvider queryCache={queryCache}>
        {modalLogin && (
          <Login
            showModalRegister={showModalRegister}
            showModalLogin={showModalLogin}
          />
        )}
        {modalRegister && (
          <Register
            showModalLogin={showModalLogin}
            showModalRegister={showModalRegister}
          />
        )}
        <Router>
          <Switch>
            <Route path="/" exact>
              <Landingpage
                showModalLogin={showModalLogin}
                showModalRegister={showModalRegister}
              />
            </Route>
            <PrivateRoute path="/home" exact component={Homepage} />
            <PrivateRoute path="/detail/:id" exact component={Detailpage} />
            <PrivateRoute path="/add-post" exact component={AddPostpage} />
            <PrivateRoute path="/hire" exact component={Hirepage} />
            <PrivateRoute path="/profile" exact component={Profilepage} />
            <PrivateRoute path="/user/:id" exact component={Profilepage} />
            <PrivateRoute path="/add-project" exact component={addProject} />
            <PrivateRoute path="/project/:id" exact component={DetailProject} />
            <PrivateRoute
              path="/edit-profile"
              exact
              component={EditProfilepage}
            />
            <PrivateRoute
              path="/transaction"
              component={Transactionpage}
              exact
            />
          </Switch>
        </Router>
      </ReactQueryCacheProvider>
    </>
  );
}

export default App;
