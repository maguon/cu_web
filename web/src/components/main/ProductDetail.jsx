import React from 'react';
import Select from 'react-select';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {Input} from 'react-materialize';
import {reduxForm} from "redux-form";
import {ProductDetailActionType} from '../../actionTypes';
import {fileHost} from "../../config/HostConfig";

const productDetailAction = require('../../actions/main/ProductDetailAction');
const sysConst = require('../../util/SysConst');
const formatUtil = require('../../util/FormatUtil');

class ProductDetail extends React.Component {

    /**
     * 组件准备要挂载的最一开始，调用执行
     */
    constructor(props) {
        super(props);
    }

    /**
     * 组件完全挂载到页面上，调用执行
     */
    componentDidMount() {
        // 取得商品信息
        this.props.getProductInfo();
        $('ul.tabs').tabs();
        let viewer = new Viewer(document.getElementById('viewer'), {
            url: 'data-original'
        });
    }

    /**
     * 更新 商品信息：商品名称
     */
    changeProductName = (event, value) => {
        this.props.setProductName(value);
    };

    /**
     * 更新 商品信息：原价
     */
    changeOriginalPrice = (event, value) => {
        this.props.setOriginalPrice(value);
    };

    /**
     * 更新 商品信息：单价
     */
    changeUnitPrice = (event, value) => {
        this.props.setUnitPrice(value);
    };

    /**
     * 更新 商品信息：运费
     */
    changeFreight = (event, value) => {
        this.props.setFreight(value);
    };

    /**
     * 更新 商品信息：备注
     */
    changeRemark = (event, value) => {
        this.props.setRemark(value);
    };

    /**
     * 更新 商品信息：商品介绍
     */
    changeProductDes = (event, value) => {
        this.props.setProductDes(value);
    };

    render() {
        const {productDetailReducer, changeProductType, saveProductInfo, changeProductStatus, saveProductImg, saveProductDesc, handleSubmit} = this.props;

        // 商品图片地址
        let avatarUrl = "";
        if (productDetailReducer.productImg !== null && productDetailReducer.productImg !== '') {
            avatarUrl = "http://" + fileHost + "/api/image/" + productDetailReducer.productImg;
        } else {
            avatarUrl = "";
        }

        return (
            <div>
                {/* 标题部分 */}
                <div className="row margin-bottom0">
                    <div className="input-field col s12">
                        <Link to={{pathname: '/product', state: {fromDetail: true}}}>
                            <a className="btn-floating btn waves-effect custom-blue waves-light fz15">
                                <i className="mdi mdi-arrow-left-bold"/>
                            </a>
                        </Link>
                        <span className="page-title margin-left30">{productDetailReducer.pageType === 'new' ? '商品管理 - 商品发布' : '商品管理 - 商品详情'}</span>
                        <div className="divider custom-divider margin-top10"/>
                    </div>
                </div>

                <div className="row">
                    {/* TAB 头部 */}
                    <div className="col s12">
                        <ul className="tabs">
                            <li className="tab col s4"><a href="#tab-base" className="active">商品信息</a></li>
                            <li className="tab col s4"><a href="#tab-img">商品图片</a></li>
                            <li className="tab col s4"><a href="#tab-desc">商品介绍</a></li>
                        </ul>
                    </div>

                    {/* TAB 1 : 商品信息TAB */}
                    <div id="tab-base" className="col s12">
                        <div className="row z-depth-1 detail-box margin-top40 margin-left50 margin-right50">
                            {/* 商品信息：商品编号 上架时间 (编辑画面显示) */}
                            {productDetailReducer.pageType === 'edit' && productDetailReducer.productInfo.length > 0 &&
                            <div className="row detail-box-header vc-center">
                                {/* 商品信息：商品编号 */}
                                <div className="col s6">商品编号：{productDetailReducer.productInfo[0].id}</div>
                                <div className="col s6 fz14 right-align grey-text">上架时间：{formatUtil.getDateTime(productDetailReducer.productInfo[0].created_on)}</div>
                            </div>}

                            {/* 商品信息：商品编辑部分 (新建/销售中商品 状态时 时 编辑) */}
                            {(productDetailReducer.pageType === 'new' || (productDetailReducer.pageType === 'edit' && productDetailReducer.productInfo.length > 0 && productDetailReducer.productInfo[0].status === 1)) &&
                            <div>
                                <div className="row margin-left20 margin-right20 margin-top40">
                                    <Input s={6} label="商品名称" maxLength="50" value={productDetailReducer.productName} onChange={this.changeProductName}/>
                                    {/* 查询条件：商品类型 */}
                                    <div className="input-field col s6">
                                        <Select
                                            options={sysConst.PRODUCT_TYPE}
                                            onChange={changeProductType}
                                            value={productDetailReducer.productType}
                                            isSearchable={false}
                                            placeholder={"请选择"}
                                            styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                            isClearable={false}
                                        />
                                        <label className="active">商品类型</label>
                                    </div>
                                </div>

                                <div className="row margin-left20 margin-right20 margin-top20">
                                    <Input s={4} label="原价(元)" maxLength="10" type="number" className="right-align fz16 red-font" value={productDetailReducer.originalPrice} onChange={this.changeOriginalPrice}/>
                                    <Input s={4} label="单价(元)" maxLength="10" type="number" className="right-align fz16 red-font" value={productDetailReducer.unitPrice} onChange={this.changeUnitPrice}/>
                                    <Input s={4} label="运费(元)" maxLength="10" type="number" className="right-align fz16 red-font" value={productDetailReducer.freight} onChange={this.changeFreight}/>
                                </div>

                                <div className="row margin-left20 margin-right20 margin-top20 margin-bottom40">
                                    <Input s={12} label="备注" maxLength="100" value={productDetailReducer.remark} onChange={this.changeRemark}/>
                                </div>
                            </div>}

                            {/* 商品信息：商品编辑部分 (下架商品 状态时 显示) */}
                            {productDetailReducer.pageType === 'edit' && productDetailReducer.productInfo.length > 0 && productDetailReducer.productInfo[0].status === 0 &&
                            <div>

                                <div className="row margin-left20 margin-right20 margin-top40">
                                    <Input s={6} label="商品名称" disabled maxLength="50" value={productDetailReducer.productName} onChange={this.changeProductName}/>
                                    {/* 查询条件：商品类型 */}
                                    <div className="input-field col s6">
                                        <Select
                                            options={sysConst.PRODUCT_TYPE}
                                            onChange={changeProductType}
                                            isDisabled={true}
                                            value={productDetailReducer.productType}
                                            isSearchable={false}
                                            placeholder={"请选择"}
                                            styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                            isClearable={false}
                                        />
                                        <label className="active">商品类型</label>
                                    </div>
                                </div>

                                <div className="row margin-left20 margin-right20 margin-top20">
                                    <Input s={4} label="原价(元)" disabled maxLength="10" type="number" className="right-align fz16 red-font" value={productDetailReducer.originalPrice} onChange={this.changeOriginalPrice}/>
                                    <Input s={4} label="单价(元)" disabled maxLength="10" type="number" className="right-align fz16 red-font" value={productDetailReducer.unitPrice} onChange={this.changeUnitPrice}/>
                                    <Input s={4} label="运费(元)" disabled maxLength="10" type="number" className="right-align fz16 red-font" value={productDetailReducer.freight} onChange={this.changeFreight}/>
                                </div>

                                <div className="row margin-left20 margin-right20 margin-top20 margin-bottom10">
                                    <Input s={12} label="备注" disabled maxLength="100" value={productDetailReducer.remark} onChange={this.changeRemark}/>
                                </div>

                                <div className="row margin-left20 margin-right20 margin-top10 margin-bottom40">
                                    <div className="col s12 fz14 right-align grey-text">下架时间：{formatUtil.getDateTime(productDetailReducer.productInfo[0].updated_on)}</div>
                                </div>
                            </div>}
                        </div>

                        {/* 下一步 按钮 */}
                        <div className="col s12 right-align padding-right70">
                            {productDetailReducer.pageType === 'new' && <button type="button" className="btn confirm-btn" onClick={saveProductInfo}>下一步</button>}
                            {productDetailReducer.pageType === 'edit' && productDetailReducer.productInfo.length > 0 &&
                                 <div>
                                    <button type="button" className="btn orange-btn" onClick={changeProductStatus}>{productDetailReducer.productInfo[0].status === 0 ? '重新上架' : '下架'}</button>
                                    <button type="button" className="btn confirm-btn margin-left20" onClick={saveProductInfo}>确定</button>
                                </div>
                            }
                        </div>
                    </div>

                    {/* TAB 2 : 商品图片TAB */}
                    <div id="tab-img" className="col s12">
                        <div className="row margin-top40 margin-left150 margin-right150">
                            <div className="col s6 padding-left150 padding-right150">
                                <div className="upload-img-box z-depth-1 detail-box right-align">
                                    <form ref="addForm" className="addForm" id="addForm" encType="multipart/form-data" method="post">
                                        <div className="upload-img  vc-center white-text custom-blue">
                                            <input id="product_image" name="product_image" type="file" onChange={handleSubmit}/>
                                            <i className="mdi mdi-camera"/>
                                        </div>
                                    </form>
                                    <div className="center grey-text">上传商品照片</div>
                                </div>
                            </div>
                            <div className="col s6 padding-left55">
                                <div className="upload-img-box z-depth-1 detail-box">
                                    <ul id="viewer" className="margin-top0">
                                        <li className="picture-list vc-center"><img src={avatarUrl} className="responsive-img"/></li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* 按钮 */}
                        <div className="col s12 right-align margin-top40 padding-right70">
                            {productDetailReducer.pageType === 'new' && <button type="button" className="btn confirm-btn" onClick={saveProductImg}>下一步</button>}
                            {productDetailReducer.pageType === 'edit' && productDetailReducer.productInfo.length > 0 &&
                                <button type="button" className="btn confirm-btn margin-left20" onClick={saveProductImg}>确定</button>}
                        </div>
                    </div>

                    {/* TAB 3 : 商品介绍TAB */}
                    <div id="tab-desc" className="col s12">
                        <div className="row z-depth-1 detail-box margin-top40 margin-left50 margin-right50 min-height500">
                            <div className="row detail-box-header vc-center margin-bottom0">
                                {/* 商品介绍：商品名称 */}
                                <div className="col s12 no-padding">{productDetailReducer.productName}</div>
                            </div>
                            <div className="row col s12">
                                <Input s={12} type='textarea' placeholder="请输入文字介绍" className="no-border-bottom" value={productDetailReducer.productDes} onChange={this.changeProductDes}/>
                            </div>
                        </div>
                        {/* 完成 按钮 */}
                        <div className="col s12 right-align padding-right70">
                            {productDetailReducer.pageType === 'new' && <button type="button" className="btn confirm-btn" onClick={saveProductDesc}>完成</button>}
                            {productDetailReducer.pageType === 'edit' && productDetailReducer.productInfo.length > 0 &&
                            <div>
                                <button type="button" className="btn orange-btn" onClick={()=>{this.changeProductDes(event,'')}}>清空</button>
                                <button type="button" className="btn confirm-btn margin-left20" onClick={saveProductDesc}>确定</button>
                            </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        productDetailReducer: state.ProductDetailReducer
    }
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    getProductInfo: () => {
        // 迁移地址id
        let productId = ownProps.match.params.id;
        // 画面区分：新建
        if (productId === 'new') {
            // 新建画面 TAB 不可操作
            $("ul.tabs li").addClass("disabled");
            // 画面区分：新建
            dispatch(ProductDetailActionType.setPageType('new'));
            // 初期化数据
            dispatch(ProductDetailActionType.setProductName(''));
            dispatch(ProductDetailActionType.setProductType(''));
            dispatch(ProductDetailActionType.setOriginalPrice(''));
            dispatch(ProductDetailActionType.setUnitPrice(''));
            dispatch(ProductDetailActionType.setFreight(''));
            dispatch(ProductDetailActionType.setRemark(''));
            dispatch(ProductDetailActionType.setProductImg(''));
            dispatch(ProductDetailActionType.setProductDes(''));
        } else {
            // 画面区分：编辑
            dispatch(ProductDetailActionType.setPageType('edit'));
            dispatch(productDetailAction.getProductInfo(productId));
        }
    },
    saveProductInfo: () => {
        dispatch(productDetailAction.saveProductInfo());
    },
    changeProductStatus: () => {
        dispatch(productDetailAction.changeProductStatus());
    },
    setProductName: (value) => {
        dispatch(ProductDetailActionType.setProductName(value))
    },
    changeProductType: (value) => {
        dispatch(ProductDetailActionType.setProductType(value))
    },
    setUnitPrice: (value) => {
        dispatch(ProductDetailActionType.setUnitPrice(value))
    },
    setOriginalPrice: (value) => {
        dispatch(ProductDetailActionType.setOriginalPrice(value))
    },
    setFreight: (value) => {
        dispatch(ProductDetailActionType.setFreight(value))
    },
    setRemark: (value) => {
        dispatch(ProductDetailActionType.setRemark(value))
    },
    setProductDes: (value) => {
        dispatch(ProductDetailActionType.setProductDes(value))
    },
    saveProductImg: (formData) => {
        dispatch(productDetailAction.saveProductImg(formData));
    },
    saveProductDesc: () => {
        dispatch(productDetailAction.saveProductDesc());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({
            // 必要参数，表单命名
            form: 'productDetailForm',
            // 可选参数 onSubmit : Function [optional[ : 表单提交配置，可以配置需要提交哪些参数，还有提交时触发的 dispatch等
            onSubmit: (values, dispatch, props) => {
                let formData = new FormData();
                formData.append('image', document.getElementById('product_image').files[0]);
                dispatch(productDetailAction.uploadProductImg(formData));
            }
        }
    )(ProductDetail)
);