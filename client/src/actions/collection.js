import axios from 'axios';
import {setAlert} from './alert';
import {
    GET_COLLECTIONS,
    GET_COLLECTION,
    ADD_COLLECTION,
    DELETE_COLLECTION,
    COLLECTION_ERROR
} from './types';

// Get post
export const getCollections = () => async dispatch => {
    try {
        const res=await axios.get('/api/collection/list');

        dispatch({
            type:GET_COLLECTIONS,
            payload:res.data
        });
    } catch (err) {
        console.error(err);
        dispatch({
            type: COLLECTION_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Get post
export const getCollection = id => async dispatch => {
    try {
        const res=await axios.get(`/api/collection/load/${id}`);

        dispatch({
            type:GET_COLLECTION,
            payload:res.data
        });
    } catch (err) {
        console.error(err);
        dispatch({
            type: COLLECTION_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Delete Collection
export const deleteCollection = id => async dispatch => {
    try {
        const res=await axios.delete(`/api/collection/${id}`);

        dispatch({
            type:DELETE_COLLECTION,
            payload:id
        });

        dispatch(setAlert('Collection Removed', 'success'));
    } catch (err) {
        dispatch({
            type: COLLECTION_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}