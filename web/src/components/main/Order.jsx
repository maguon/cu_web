import React from 'react';
import Select from 'react-select';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {Input} from 'react-materialize';
import {OrderActionType} from '../../actionTypes';

const orderAction = require('../../actions/main/OrderAction');
const sysConst = require('../../util/SysConst');
const formatUtil = require('../../util/FormatUtil');

class Order extends React.Component {

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
            this.props.setConditionUser('');
            this.props.setConditionPhone('');
            this.props.setConditionCreatedOnStart('');
            this.props.setConditionCreatedOnEnd('');
            this.props.changeConditionPaymentStatus(null);
            this.props.changeConditionLogStatus(null);
        }
        this.props.getOrderList();
    }

    /**
     * 更新 检索条件：编号
     */
    changeConditionNo = (event) => {
        this.props.setConditionNo(event.target.value);
    };

    /**
     * 更新 检索条件：购买人
     */
    changeConditionUser = (event) => {
        this.props.setConditionUser(event.target.value);
    };

    /**
     * 更新 检索条件：手机
     */
    changeConditionPhone = (event) => {
        this.props.setConditionPhone(event.target.value);
    };

    /**
     * 更新 检索条件：绑定时间(始)
     */
    changeConditionStartDate = (event, value) => {
        this.props.setConditionCreatedOnStart(value);
    };

    /**
     * 更新 检索条件：绑定时间(始)
     */
    changeConditionEndDate = (event, value) => {
        this.props.setConditionCreatedOnEnd(value);
    };

    /**
     * 查询绑定车辆列表
     */
    queryOrderList = () => {
        // 默认第一页
        this.props.setStartNumber(0);
        this.props.getOrderList();
    };

    /**
     * 上一页
     */
    preBtn = () => {
        this.props.setStartNumber(this.props.orderReducer.start - (this.props.orderReducer.size - 1));
        this.props.getOrderList();
    };

    /**
     * 下一页
     */
    nextBtn = () => {
        this.props.setStartNumber(this.props.orderReducer.start + (this.props.orderReducer.size - 1));
        this.props.getOrderList();
    };

    render() {
        const {orderReducer, changeConditionPaymentStatus, changeConditionLogStatus} = this.props;
        return (
            <div>
                {/* 标题部分 */}
                <div className="row">
                    <div className="input-field col s12 page-title">
                        <span className="margin-left10">订单管理</span>
                        <div className="divider custom-divider margin-top10"/>
                    </div>
                </div>

                {/* 上部分：检索条件输入区域 */}
                <div className="row grey-text text-darken-1">
                    <div className="col s11 search-condition-box">

                        {/* 查询条件：第一行 */}
                        <div>
                            {/* 查询条件：订单编号 */}
                            <Input s={6} label="订单编号" value={orderReducer.conditionNo} onChange={this.changeConditionNo}/>

                            {/* 查询条件：购买人 */}
                            <Input s={3} label="购买人" value={orderReducer.conditionUser} onChange={this.changeConditionUser}/>

                            {/* 查询条件：手机 */}
                            <Input s={3} label="手机" value={orderReducer.conditionPhone} onChange={this.changeConditionPhone}/>
                        </div>

                        {/* 查询条件：第二行 */}
                        <div>
                            {/* 查询条件：下单时间(始) */}
                            <div className="input-field col s3 custom-input-field">
                                <Input s={12} label="下单时间(始)" type='date' options={sysConst.DATE_PICKER_OPTION}
                                       value={orderReducer.conditionCreatedOnStart} onChange={this.changeConditionStartDate} />
                                <span className="mdi data-icon mdi-table-large"/>
                            </div>

                            {/* 查询条件：下单时间(终) */}
                            <div className="input-field col s3 custom-input-field">
                                <Input s={12} label="下单时间(终)" type='date' options={sysConst.DATE_PICKER_OPTION}
                                       value={orderReducer.conditionCreatedOnEnd} onChange={this.changeConditionEndDate} />
                                <span className="mdi data-icon mdi-table-large"/>
                            </div>

                            {/* 查询条件：付款状态 */}
                            <div className="input-field col s3">
                                <Select
                                    options={sysConst.PAYMENT_STATUS}
                                    onChange={changeConditionPaymentStatus}
                                    value={orderReducer.conditionPaymentStatus}
                                    isSearchable={false}
                                    placeholder={"请选择"}
                                    styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                    isClearable={true}
                                />
                                <label className="active">付款状态</label>
                            </div>

                            {/* 查询条件：发货状态 */}
                            <div className="input-field col s3">
                                <Select
                                    options={sysConst.LOG_STATUS}
                                    onChange={changeConditionLogStatus}
                                    value={orderReducer.conditionLogStatus}
                                    isSearchable={false}
                                    placeholder={"请选择"}
                                    styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                    isClearable={true}
                                />
                                <label className="active">发货状态</label>
                            </div>

                        </div>
                    </div>

                    {/* 查询按钮 */}
                    <div className="col s1">
                        <a className="btn-floating btn-large waves-light waves-effect btn margin-top40 query-btn" onClick={this.queryOrderList}>
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
                                <th>订单编号</th>
                                <th>购买人</th>
                                <th className="center">绑定手机</th>
                                <th className="center">下单时间</th>
                                <th>应付金额(元)</th>
                                <th className="center">付款状态</th>
                                <th className="center">发货状态</th>
                                <th className="center">操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                orderReducer.orderArray.map(function (item) {
                                    return (
                                            <tr className="grey-text text-darken-1">
                                                <td>{item.id}</td>
                                                <td>{item.user_name}</td>
                                                <td className="center">{item.phone}</td>
                                                <td className="center">{formatUtil.getDateTime(item.created_on)}</td>
                                                <td>{formatUtil.formatNumber(item.total_price + item.total_freight,2)}</td>
                                                <td className={`center ${item.payment_status === 0 ?"red-font":""}`}>{sysConst.PAYMENT_STATUS[item.payment_status].label}</td>
                                                <td className="center">{sysConst.LOG_STATUS[item.log_status].label}</td>
                                                <td className="operation center">
                                                    <Link to={{pathname: '/order/'+ item.id}} >
                                                        <i className="mdi mdi-table-search light-blue-text"/>
                                                    </Link>
                                                </td>
                                            </tr>
                                    )
                                })
                            }
                            { orderReducer.orderArray.length === 0 &&
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
                            {orderReducer.start > 0 &&
                            <a className="waves-light waves-effect custom-blue btn margin-right10" id="pre" onClick={this.preBtn}>
                                上一页
                            </a>}
                            {orderReducer.dataSize >= orderReducer.size &&
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
        orderReducer: state.OrderReducer,
        fromDetail: fromDetail
    }
};

const mapDispatchToProps = (dispatch) => ({
    getOrderList: () => {
        dispatch(orderAction.getOrderList())
    },
    setStartNumber: (start) => {
        dispatch(OrderActionType.setStartNumber(start))
    },
    setConditionNo: (no) => {
        dispatch(OrderActionType.setConditionNo(no))
    },
    setConditionUser: (user) => {
        dispatch(OrderActionType.setConditionUser(user))
    },
    setConditionPhone: (phone) => {
        dispatch(OrderActionType.setConditionPhone(phone))
    },
    setConditionCreatedOnStart: (time) => {
        dispatch(OrderActionType.setConditionCreatedOnStart(time))
    },
    setConditionCreatedOnEnd: (time) => {
        dispatch(OrderActionType.setConditionCreatedOnEnd(time))
    },
    changeConditionPaymentStatus: (status) => {
        dispatch(OrderActionType.setConditionPaymentStatus(status))
    },
    changeConditionLogStatus: (status) => {
        dispatch(OrderActionType.setConditionLogStatus(status))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Order)
