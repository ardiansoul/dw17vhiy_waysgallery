const { createContext, useReducer } = require("react");

export const AppContext = createContext();

const initialState = {
  isLogin: false,
  user: {},
};

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "USER_LOADED":
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        isLogin: true,
        user: action.payload,
      };
    case "LOGIN":
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        user: action.payload,
        isLogin: true,
      };
    case "AUTH_ERROR":
    case "LOGOUT":
      localStorage.removeItem("token");
      return {
        ...state,
        isLogin: false,
      };
    default:
      break;
  }
};

export const AppContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={[state, dispatch]}>
      {props.children}
    </AppContext.Provider>
  );
};
