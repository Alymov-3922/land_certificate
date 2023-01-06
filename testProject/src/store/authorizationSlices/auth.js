import { createSlice } from "@reduxjs/toolkit";
import { getLocal, removeLocal, setLocal } from "../../utils/helpers/hooks";

// setLocal("user", { name: "Adilet", password: "123", id: "3" });
// removeLocal("user");

function reloadGetLocale() {
  const user = getLocal("user");
  if (user) {
    return user;
  }
  return {};
}

const initialState = {
  user: reloadGetLocale(),
  ink: "",
};

const authSlices = createSlice({
  name: "authSlices",
  initialState,
  reducers: {
    setInk: (state, { payload }) => {
      state.ink = payload;
    },
    setEmail: (state, { payload }) => {
      state.user = payload;
    },
    exitApp: (state) => {
      state.user = {};
    },
  },
});

export const authActions = authSlices.actions;
export default authSlices;

export const signIn = (user) => {
  return async (dispatch) => {
    try {
      const response = await fetch("http://192.46.233.197:8002/login/", {
        method: "POST",
        body: JSON.stringify({ username: user.name, password: user.password }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      if (!response.ok) {
        throw new Error("error");
      }
      const data = await response.json();
      setLocal("user", data);
      dispatch(
        authActions.setEmail({
          email: data.email,
          token: data.token,
          id: data.user_id,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
};

export const signOut = () => {
  return (dispatch) => {
    removeLocal("user");
    dispatch(authActions.exitApp());
  };
};
