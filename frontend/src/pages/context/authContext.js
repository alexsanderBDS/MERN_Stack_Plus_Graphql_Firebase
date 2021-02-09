import React, { useReducer, createContext, useEffect } from "react";
import { auth } from "../../firebase";

const AuthContext = createContext();

const firebaseReducer = (state, action) => {
  switch (action.type) {
    case "USER_LOGGED":
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

const initialState = {
  user: null,
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(firebaseReducer, initialState);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      dispatch({
        type: "USER_LOGGED",
        payload: null,
      });

      if (user) {
        const idTokenResult = await user.getIdTokenResult();

        dispatch({
          type: "USER_LOGGED",
          payload: { email: user.email, token: idTokenResult.token },
        });
      } else {
        dispatch({
          type: "USER_LOGGED",
          payload: null,
        });
      }
    });
    return () => unsubscribe();
  }, []);

  const value = { state, dispatch };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
