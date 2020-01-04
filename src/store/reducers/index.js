import { combineReducers } from 'redux';
import login from './login.reducer';
import createaccount from './createaccount.reducer';
import dashboard from './dashboard.reducer';
import ipad from './ipad.reducer';


const mainReducers = (asyncReducers) =>
    combineReducers({
        login,
        createaccount,
        dashboard,
        ipad,
        ...asyncReducers
    });

export default mainReducers;
