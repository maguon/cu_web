import {createAction} from 'redux-actions';

export const setPageType = createAction('SET_PAGE_TYPE');
export const getProductInfo = createAction('GET_PRODUCT_INFO');
export const setNewProductId = createAction('SET_NEW_PRODUCT_ID');
export const setProductName = createAction('SET_PRODUCT_NAME');
export const setProductType = createAction('SET_PRODUCT_TYPE');
export const setOriginalPrice = createAction('SET_ORIGINAL_PRICE');
export const setUnitPrice = createAction('SET_UNIT_PRICE');
export const setFreight = createAction('SET_FREIGHT');
export const setRemark = createAction('SET_REMARK');
export const setProductImg = createAction('SET_PRODUCT_IMG');
export const setProductDes = createAction('SET_PRODUCT_DES');