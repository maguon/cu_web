import {handleActions} from 'redux-actions';
import {ProductDetailActionType} from '../../actionTypes';

const initialState = {
    // 画面区分
    pageType: '',

    // 商品信息 - 商品基本信息(编辑画面用)
    productInfo: [],
    // 商品信息 - 新建商品id
    newProductId: '',
    // 商品信息 - 商品名称
    productName: '',
    // 商品信息 - 商品类型
    productType: null,
    // 商品信息 - 原价
    originalPrice: '',
    // 商品信息 - 单价
    unitPrice: '',
    // 商品信息 - 运费
    freight: '',
    // 商品信息 - 备注
    remark: '',

    // 商品图片
    productImg: '',

    // 商品介绍
    productDes: ''
};

export default handleActions({
    [ProductDetailActionType.setPageType]: (state, action) => {
        return {
            ...state,
            pageType: action.payload
        }
    },
    [ProductDetailActionType.getProductInfo]: (state, action) => {
        return {
            ...state,
            productInfo: action.payload
        }
    },
    [ProductDetailActionType.setNewProductId]: (state, action) => {
        return {
            ...state,
            newProductId: action.payload
        }
    },
    [ProductDetailActionType.setProductName]: (state, action) => {
        return {
            ...state,
            productName: action.payload
        }
    },
    [ProductDetailActionType.setProductType]: (state, action) => {
        return {
            ...state,
            productType: action.payload
        }
    },
    [ProductDetailActionType.setOriginalPrice]: (state, action) => {
        return {
            ...state,
            originalPrice: action.payload
        }
    },
    [ProductDetailActionType.setUnitPrice]: (state, action) => {
        return {
            ...state,
            unitPrice: action.payload
        }
    },
    [ProductDetailActionType.setFreight]: (state, action) => {
        return {
            ...state,
            freight: action.payload
        }
    },
    [ProductDetailActionType.setRemark]: (state, action) => {
        return {
            ...state,
            remark: action.payload
        }
    },
    [ProductDetailActionType.setProductImg]: (state, action) => {
        return {
            ...state,
            productImg: action.payload
        }
    },
    [ProductDetailActionType.setProductDes]: (state, action) => {
        return {
            ...state,
            productDes: action.payload
        }
    }
}, initialState)