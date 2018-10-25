import {handleActions} from 'redux-actions';
import {TrafficPoliceDetailActionType} from '../../actionTypes';

const initialState = {
    // 交警资料：状态
    status: '',
    // 交警资料：姓名
    name: '',
    // 交警资料：性别
    gender: '0',
    // 交警资料：职务
    position: null,
    // 交警资料：电话
    phone: '',
    // 交警资料：头像
    avatarImg: ''
};

export default handleActions({
    [TrafficPoliceDetailActionType.setStatus]: (state, action) => {
        return {
            ...state,
            status: action.payload
        }
    },
    [TrafficPoliceDetailActionType.setName]: (state, action) => {
        return {
            ...state,
            name: action.payload
        }
    },
    [TrafficPoliceDetailActionType.setGender]: (state, action) => {
        return {
            ...state,
            gender: action.payload
        }
    },
    [TrafficPoliceDetailActionType.setPolicePosition]: (state, action) => {
        return {
            ...state,
            position: action.payload
        }
    },
    [TrafficPoliceDetailActionType.setPhone]: (state, action) => {
        return {
            ...state,
            phone: action.payload
        }
    },
    [TrafficPoliceDetailActionType.setAvatarImg]: (state, action) => {
        return {
            ...state,
            avatarImg: action.payload
        }
    }
}, initialState)