import storage from "../utils/storage";
import loginServices from '../services/login'

const loginReducer = (state = [], action) => {
  switch (action.type) {
    case "SHOW_USER":
      return action.data;
    case "LOG_OUT":
      return action.data;
      case "LOG_IN":
        return action.data
    default:
      return state;
  }
};

export const showUser = (user) => {
  return {
    type: "SHOW_USER",
    data: user,
  };
};

  export const logIn = (password, username) => {
    return async (dispatch) => {
      const user = await loginServices.login({
        username,
        password,
      });
      storage.saveUser(user)
      dispatch({
        type: "LOG_IN",
        data: user,
      });
    };
  };

export const logOut =()=>{
  return {
    type: "LOG_OUT",
    data: null
  };
}

export default loginReducer;
