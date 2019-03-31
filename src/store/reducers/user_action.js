const LOGIN_USER = 'LOGIN_USER';
const SIGNUP_USER = 'SIGNUP_USER';
const LOGOUT_USER = 'LOGOUT_USER';
const GET_USER = 'GET_USER';

const initialState = { 
    user: {},
    userList: []
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
        return {
            user: action.data,
            userList: state.userList
        }
    
    case SIGNUP_USER:    
        return {
            user: action.data,
            userList: state.userList
        }

    case LOGOUT_USER:    
        return {
            user: {},
            userList: []
        }

    case GET_USER:
        return {
            user: state.user,
            userList: action.data
        }

    default:
      return state;
  }
}

export function loginUser(data) {    
    return {
        type: LOGIN_USER,
        data
    };
}

export function logOutUser() {    
    return {
        type: LOGOUT_USER,
    };
}

export function signupUser(data){
    return {
        type: SIGNUP_USER,        
        data,
    }
}

export function getUser(data){
    return {
        type: GET_USER,        
        data,
    }
}