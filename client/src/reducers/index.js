import {combineReducers} from 'redux';
import alert from './alert';
import auth from './auth';
import collection from './collection';

export default combineReducers({
    alert,
    auth,
    collection
});
