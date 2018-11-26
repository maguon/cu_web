import React from 'react';
import Select from 'react-select';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {Input} from 'react-materialize';
import {SaleActionType} from '../../actionTypes';

const saleAction = require('../../actions/main/SaleAction');
const sysConst = require('../../util/SysConst');
const formatUtil = require('../../util/FormatUtil');

class Sale extends React.Component {

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
            // this.props.setConditionNo('');
            this.props.changeConditionPaymentStatus(null);
            this.props.setConditionProductId('');
            this.props.setConditionProductName('');
            this.props.setConditionOrderId('');
            this.props.setConditionCreatedOnStart('');
            this.props.setConditionCreatedOnEnd('');
        }
        this.props.getSaleList();
    }

    /**
     * 更新 检索条件：销售编号
     */
    changeConditionNo = (event) => {
        this.props.setConditionNo(event.target.value);
    };

    /**
     * 更新 检索条件：商品编号
     */
    changeConditionProductId = (event) => {
        this.props.setConditionProductId(event.target.value);
    };

    /**
     * 更新 检索条件：商品名称
     */
    changeConditionProductName = (event) => {
        this.props.setConditionProductName(event.target.value);
    };

    /**
     * 更新 检索条件：关联订单
     */
    changeConditionOrderId = (event) => {
        this.props.setConditionOrderId(event.target.value);
    };

    /**
     * 更新 检索条件：售出时间(始)
     */
    changeConditionCreatedOnStart = (event, value) => {
        this.props.setConditionCreatedOnStart(value);
    };

    /**
     * 更新 检索条件：售出时间(终)
     */
    changeConditionCreatedOnEnd = (event, value) => {
        this.props.setConditionCreatedOnEnd(value);
    };

    /**
     * 查询商品销售列表
     */
    querySaleList = () => {
        // 默认第一页
        this.props.setStartNumber(0);
        this.props.getSaleList();
    };

    /**
     * 上一页
     */
    preBtn = () => {
        this.props.setStartNumber(this.props.saleReducer.start - (this.props.saleReducer.size - 1));
        this.props.getSaleList();
    };

    /**
     * 下一页
     */
    nextBtn = () => {
        this.props.setStartNumber(this.props.saleReducer.start + (this.props.saleReducer.size - 1));
        this.props.getSaleList();
    };

    render() {
        const {saleReducer, changeConditionPaymentStatus} = this.props;
        return (
            <div>
                {/* 标题部分 */}
                <div className="row">
                    <div className="input-field col s12 page-title">
                        <span className="margin-left10">商品销售</span>
                        <div className="divider custom-divider margin-top10"/>
                    </div>
                </div>

                {/* 上部分：检索条件输入区域 */}
                <div className="row grey-text text-darken-1">
                    <div className="col s11 search-condition-box">

                        {/* 查询条件：第一行 */}
                        <div>
                            {/*/!* 查询条件：销售编号 *!/*/}
                            {/*<Input s={4} label="销售编号" value={saleReducer.conditionNo} onChange={this.changeConditionNo}/>*/}

                            {/* 查询条件：关联订单 */}
                            <Input s={4} label="关联订单" value={saleReducer.conditionOrderId} onChange={this.changeConditionOrderId}/>

                            {/* 查询条件：商品编号 */}
                            <Input s={4} label="商品编号" value={saleReducer.conditionProductId} onChange={this.changeConditionProductId}/>

                            {/* 查询条件：商品名称 */}
                            <Input s={4} label="商品名称" value={saleReducer.conditionProductName} onChange={this.changeConditionProductName}/>
                        </div>

                        {/* 查询条件：第二行 */}
                        <div>
                            {/* 查询条件：付款状态 */}
                            <div className="input-field col s4">
                                <Select
                                    options={sysConst.PAYMENT_STATUS}
                                    onChange={changeConditionPaymentStatus}
                                    value={saleReducer.conditionPaymentStatus}
                                    isSearchable={false}
                                    placeholder={"请选择"}
                                    styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                    isClearable={true}
                                />
                                <label className="active">付款状态</label>
                            </div>

                            {/* 查询条件：售出时间(始) */}
                            <div className="input-field col s4 custom-input-field">
                                <Input s={12} label="售出时间(始)" type='date' options={sysConst.DATE_PICKER_OPTION}
                                       value={saleReducer.conditionCreatedOnStart} onChange={this.changeConditionCreatedOnStart} />
                                <span className="mdi data-icon mdi-table-large"/>
                            </div>

                            {/* 查询条件：售出时间(终) */}
                            <div className="input-field col s4 custom-input-field">
                                <Input s={12} label="售出时间(终)" type='date' options={sysConst.DATE_PICKER_OPTION}
                                       value={saleReducer.conditionCreatedOnEnd} onChange={this.changeConditionCreatedOnEnd} />
                                <span className="mdi data-icon mdi-table-large"/>
                            </div>
                        </div>
                    </div>

                    {/* 查询按钮 */}
                    <div className="col s1">
                        <a className="btn-floating btn-large waves-light waves-effect btn margin-top40 query-btn" onClick={this.querySaleList}>
                            <i className="mdi mdi-magnify"/>
                        </a>
                    </div>
                </div>

                {/* 下部分：检索结果显示区域 */}
                <div className="row">
                    <div className="col s12">

                        <div className="divider custom-divider"/>
                        <table className="bordered striped">
                            <thead className="blue-grey lighten-5">
                            <tr className="grey-text text-darken-2">
                                <th>销售编号</th>
                                <th>商品编号</th>
                                <th>商品名称</th>
                                <th>关联订单</th>
                                <th>单价</th>
                                <th>数量</th>
                                <th>总价</th>
                                <th className="center">付款状态</th>
                                <th className="center">售出时间</th>
                                <th className="center">操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            {saleReducer.saleArray.map(function (item) {
                                return (
                                    <tr className="grey-text text-darken-1">
                                        <td>{item.id}</td>
                                        <td>{item.product_id}</td>
                                        <td>{item.product_name}</td>
                                        <td>{item.order_id}</td>
                                        <td>{formatUtil.formatNumber(item.unit_price, 2)}</td>
                                        <td>{formatUtil.formatNumber(item.prod_count, 0)}</td>
                                        <td>{formatUtil.formatNumber(item.total_price, 2)}</td>
                                        <td className={`center ${item.payment_status === 0 ?"red-font":""}`}>{sysConst.PAYMENT_STATUS[item.payment_status].label}</td>
                                        <td className="center">{formatUtil.getDateTime(item.created_on)}</td>
                                        <td className="operation center">
                                            <Link to={{pathname: '/sale/' + item.id}}>
                                                <i className="mdi mdi-table-search light-blue-text"/>
                                            </Link>
                                        </td>
                                    </tr>
                                )
                            })
                            }
                            { saleReducer.saleArray.length === 0 &&
                                <tr className="grey-text text-darken-1">
                                    <td className="no-data-tr" colSpan="10">暂无数据</td>
                                </tr>
                            }
                            </tbody>
                        </table>
                    </div>

                    {/* 上下页按钮 */}
                    <div className="col s12 margin-top10">
                        <div className="right">
                            {saleReducer.start > 0 && saleReducer.dataSize > 0 &&
                            <a className="waves-light waves-effect custom-blue btn margin-right10" id="pre" onClick={this.preBtn}>
                                上一页
                            </a>}
                            {saleReducer.dataSize >= saleReducer.size &&
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
        saleReducer: state.SaleReducer,
        fromDetail: fromDetail
    }
};

const mapDispatchToProps = (dispatch) => ({
    getSaleList: () => {
        dispatch(saleAction.getSaleList())
    },
    setStartNumber: (start) => {
        dispatch(SaleActionType.setStartNumber(start))
    },
    // setConditionNo: (value) => {
    //     dispatch(SaleActionType.setConditionNo(value))
    // },
    changeConditionPaymentStatus: (value) => {
        dispatch(SaleActionType.setConditionPaymentStatus(value))
    },
    setConditionProductId: (value) => {
        dispatch(SaleActionType.setConditionProductId(value))
    },
    setConditionProductName: (value) => {
        dispatch(SaleActionType.setConditionProductName(value))
    },

    setConditionOrderId: (value) => {
        dispatch(SaleActionType.setConditionOrderId(value))
    },
    setConditionCreatedOnStart: (value) => {
        dispatch(SaleActionType.setConditionCreatedOnStart(value))
    },
    setConditionCreatedOnEnd: (value) => {
        dispatch(SaleActionType.setConditionCreatedOnEnd(value))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Sale)