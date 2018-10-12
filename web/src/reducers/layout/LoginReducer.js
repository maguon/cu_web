import {handleActions} from 'redux-actions';
import {LoginActionType} from '../../actionTypes';

const initialState = {
    data: {
        userName: '',
        password: ''
    }
};

export default handleActions(
    {
        [LoginActionType.loginInit]: (state, action) => {
            return {
                ...state,
                data: action.payload
            }
        }
    }, initialState)