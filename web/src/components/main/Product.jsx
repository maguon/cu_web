import React from 'react';
import Select from 'react-select';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {Input} from 'react-materialize';
import {ProductActionType} from '../../actionTypes';

const productAction = require('../../actions/main/ProductAction');
const sysConst = require('../../util/SysConst');
const formatUtil = require('../../util/FormatUtil');

class Product extends React.Component {

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
        if (!this.props.fromDetail) {
            this.props.setStartNumber(0);
            this.props.setConditionNo('');
            this.props.setConditionProductName('');
            this.props.changeConditionProductType(null);
            this.props.setConditionCreatedOnStart('');
            this.props.setConditionCreatedOnEnd('');
            this.props.changeConditionSaleStatus(null);
        }
        this.props.getProductList();
    }

    /**
     * 更新 检索条件：编号
     */
    changeConditionNo = (event) => {
        this.props.setConditionNo(event.target.value);
    };

    /**
     * 更新 检索条件：商品名称
     */
    changeConditionProductName = (event) => {
        this.props.setConditionProductName(event.target.value);
    };

    /**
     * 更新 检索条件：上架时间(始)
     */
    changeConditionCreatedOnStart = (event, value) => {
        this.props.setConditionCreatedOnStart(value);
    };

    /**
     * 更新 检索条件：上架时间(终)
     */
    changeConditionCreatedOnEnd = (event, value) => {
        this.props.setConditionCreatedOnEnd(value);
    };

    /**
     * 查询商品列表
     */
    queryProductList = () => {
        // 默认第一页
        this.props.setStartNumber(0);
        this.props.getProductList();
    };

    /**
     * 上一页
     */
    preBtn = () => {
        this.props.setStartNumber(this.props.productReducer.start - (this.props.productReducer.size - 1));
        this.props.getProductList();
    };

    /**
     * 下一页
     */
    nextBtn = () => {
        this.props.setStartNumber(this.props.productReducer.start + (this.props.productReducer.size - 1));
        this.props.getProductList();
    };

    render() {
        const {productReducer, changeConditionProductType, changeConditionSaleStatus} = this.props;
        return (
            <div>
                {/* 标题部分 */}
                <div className="row">
                    <div className="input-field col s12 page-title">
                        <span className="margin-left10">商品管理</span>
                        <div className="divider custom-divider margin-top10"/>
                    </div>
                </div>

                {/* 上部分：检索条件输入区域 */}
                <div className="row grey-text text-darken-1">
                    <div className="col s10 search-condition-box">

                        {/* 查询条件：第一行 */}
                        <div>
                            {/* 查询条件：商品编号 */}
                            <Input s={4} label="商品编号" value={productReducer.conditionNo} onChange={this.changeConditionNo}/>

                            {/* 查询条件：商品名称 */}
                            <Input s={4} label="商品名称" value={productReducer.conditionProductName} onChange={this.changeConditionProductName}/>

                            {/* 查询条件：商品类型 */}
                            <div className="input-field col s4">
                                <Select
                                    options={sysConst.PRODUCT_TYPE}
                                    onChange={changeConditionProductType}
                                    value={productReducer.conditionProductType}
                                    isSearchable={false}
                                    placeholder={"请选择"}
                                    styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                    isClearable={true}
                                    backspaceRemovesValue={false}
                                />
                                <label className="active">商品类型</label>
                            </div>
                        </div>

                        {/* 查询条件：第二行 */}
                        <div>
                            {/* 查询条件：上架时间(始) */}
                            <div className="input-field col s4 custom-input-field">
                                <Input s={12} label="上架时间(始)" type='date' options={sysConst.DATE_PICKER_OPTION}
                                       value={productReducer.conditionCreatedOnStart} onChange={this.changeConditionCreatedOnStart} />
                                <span className="mdi data-icon mdi-table-large"/>
                            </div>

                            {/* 查询条件：上架时间(终) */}
                            <div className="input-field col s4 custom-input-field">
                                <Input s={12} label="上架时间(终)" type='date' options={sysConst.DATE_PICKER_OPTION}
                                       value={productReducer.conditionCreatedOnEnd} onChange={this.changeConditionCreatedOnEnd} />
                                <span className="mdi data-icon mdi-table-large"/>
                            </div>

                            {/* 查询条件：销售状态 */}
                            <div className="input-field col s4">
                                <Select
                                    options={sysConst.SALE_STATUS}
                                    onChange={changeConditionSaleStatus}
                                    value={productReducer.conditionSaleStatus}
                                    isSearchable={false}
                                    placeholder={"请选择"}
                                    styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                    isClearable={true}
                                    backspaceRemovesValue={false}
                                />
                                <label className="active">销售状态</label>
                            </div>

                        </div>
                    </div>

                    {/* 查询按钮 */}
                    <div className="col s1">
                        <a className="btn-floating btn-large waves-light waves-effect btn margin-top40 query-btn" onClick={this.queryProductList}>
                            <i className="mdi mdi-magnify"/>
                        </a>
                    </div>

                    {/* 追加按钮 */}
                    <div className="col s1">
                        <Link to={{pathname: '/product/'+ 'new'}} >
                            <a className="btn-floating btn-large waves-light waves-effect btn margin-top40 add-btn">
                                <i className="mdi mdi-plus"/>
                            </a>
                        </Link>
                    </div>
                </div>

                {/* 下部分：检索结果显示区域 */}
                <div className="row">
                    <div className="col s12">

                        <div className="divider custom-divider"/>
                        <table className="bordered striped">
                            <thead className="blue-grey lighten-5">
                            <tr className="grey-text text-darken-2">
                                <th>商品编号</th>
                                <th>商品名称</th>
                                <th className="center">商品类型</th>
                                <th>单价</th>
                                <th>运费</th>
                                <th className="center">上架时间</th>
                                <th className="center">销售状态</th>
                                <th className="center">操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            {productReducer.productArray.map(function (item) {
                                return (
                                    <tr className="grey-text text-darken-1">
                                        <td>{item.id}</td>
                                        <td>{item.product_name}</td>
                                        <td className="center">{(item.type !== 0 && item.type !== 1) ? '未知' : sysConst.PRODUCT_TYPE[item.type].label}</td>
                                        <td>{formatUtil.formatNumber(item.unit_price, 2)}</td>
                                        <td>{formatUtil.formatNumber(item.freight, 2)}</td>
                                        <td className="center">{formatUtil.getDateTime(item.created_on)}</td>
                                        <td className="center">{(item.status !== 0 && item.status !== 1) ? '未知' : sysConst.SALE_STATUS[item.status].label}</td>
                                        <td className="operation center">
                                            <Link to={{pathname: '/product/' + item.id}}>
                                                <i className="mdi mdi-table-search light-blue-text"/>
                                            </Link>
                                        </td>
                                    </tr>
                                )
                            })
                            }
                            { productReducer.productArray.length === 0 &&
                                <tr className="grey-text text-darken-1">
                                    <td className="no-data-tr" colSpan="8">暂无数据</td>
                                </tr>
                            }
                            </tbody>
                        </table>
                    </div>

                    {/* 上下页按钮 */}
                    <div className="col s12 margin-top10">
                        <div className="right">
                            {productReducer.start > 0 && productReducer.dataSize > 0 &&
                            <a className="waves-light waves-effect custom-blue btn margin-right10" id="pre" onClick={this.preBtn}>
                                上一页
                            </a>}
                            {productReducer.dataSize >= productReducer.size &&
                            <a className="waves-light waves-effect custom-blue btn" id="next" onClick={this.nextBtn}>
                                下一页
                            </a>}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    let fromDetail = false;
    if (typeof ownProps.location.state !== 'undefined' && ownProps.location.state.fromDetail === true) {
        fromDetail = true;
    }
    return {
        productReducer: state.ProductReducer,
        fromDetail: fromDetail
    }
};

const mapDispatchToProps = (dispatch) => ({
    getProductList: () => {
        dispatch(productAction.getProductList())
    },
    setStartNumber: (start) => {
        dispatch(ProductActionType.setStartNumber(start))
    },
    setConditionNo: (value) => {
        dispatch(ProductActionType.setConditionNo(value))
    },
    setConditionProductName: (value) => {
        dispatch(ProductActionType.setConditionProductName(value))
    },
    changeConditionProductType: (value) => {
        dispatch(ProductActionType.setConditionProductType(value))
    },
    setConditionCreatedOnStart: (value) => {
        dispatch(ProductActionType.setConditionCreatedOnStart(value))
    },
    setConditionCreatedOnEnd: (value) => {
        dispatch(ProductActionType.setConditionCreatedOnEnd(value))
    },
    changeConditionSaleStatus: (value) => {
        dispatch(ProductActionType.setConditionSaleStatus(value))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Product)