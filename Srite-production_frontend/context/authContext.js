import axios from "axios";
import { useEffect, useReducer, createContext } from "react";
import { baseUrl, getHeaders } from "../api/api";

// Initial State
const initialState = { user: null, loading: true, logout: false };

// Create Context
const authContext = createContext();

// Root Reducer
const rootReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload?.user,
        loading: action.payload?.loading,
      };
    case "LOGOUT":
      return { ...state, user: null, loading: false, logout: true };
    default:
      return state;
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);

  useEffect(() => {
    (async () => {
      try {
        const { data: data } = await axios.get(
          `${baseUrl}/users/get-one-user`,
          {
            headers: getHeaders(),
          }
        );

        dispatch({
          type: "LOGIN",
          payload: {
            user: data.data,
            loading: false,
          },
        });
      } catch ({ response }) {
        dispatch({
          type: "LOGIN",
          payload: {
            user: null,
            loading: false,
          },
        });
      }
    })();
  }, []);

  return (
    <authContext.Provider value={{ state, dispatch }}>
      {children}
    </authContext.Provider>
  );
};

export { authContext, AuthProvider };
