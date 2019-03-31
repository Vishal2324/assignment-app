import { combineReducers } from 'redux';
import userReducer from './user_action';

export default combineReducers({
    userData: userReducer,    
});
