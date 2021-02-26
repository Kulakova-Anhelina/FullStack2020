import storage from "../utils/storage";
import loginServices from '../services/login'

const loginReducer = (state = [], action) => {
  console.log(action, "Action");
  console.log(state, "State");

  switch (action.type) {
    case "SHOW_USER":
      return action.data;
    case "LOG_OUT":
      return state;
      case "LOG_IN":
        return action.data
    default:
      return state;
  }
};

export const showUser = () => {
  const user = storage.loadUser();
  console.log(user);
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
      console.log(user);
      dispatch({
        type: "LOG_IN",
        data: user,
      });
    };
  };

export const logOut =()=>{
  const user = storage.logoutUser()
  console.log(user);
  return {
    type: "LOG_OUT",
    data: user
  };

}

export default loginReducer;
