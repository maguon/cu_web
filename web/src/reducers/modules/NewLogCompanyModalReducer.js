import {handleActions} from 'redux-actions';
import {NewLogCompanyModalActionType} from '../../actionTypes';

const initialState = {
    // 画面类型(新建/编辑)
    pageType: '',
    // 快递公司编号
    companyId: '',
    // 快递公司
    companyName: '',
    // 联系电话
    phone: '',
    // 备注
    remark: ''
};

export default handleActions({
    [NewLogCompanyModalActionType.setPageType]: (state, action) => {
        return {
            ...state,
            pageType: action.payload
        }
    },
    [NewLogCompanyModalActionType.setCompanyId]: (state, action) => {
        return {
            ...state,
            companyId: action.payload
        }
    },
    [NewLogCompanyModalActionType.setCompanyName]: (state, action) => {
        return {
            ...state,
            companyName: action.payload
        }
    },
    [NewLogCompanyModalActionType.setPhone]: (state, action) => {
        return {
            ...state,
            phone: action.payload
        }
    },
    [NewLogCompanyModalActionType.setRemark]: (state, action) => {
        return {
            ...state,
            remark: action.payload
        }
    }
}, initialState)