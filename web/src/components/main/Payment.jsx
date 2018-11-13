import React from 'react';
import Select from 'react-select';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {Input} from 'react-materialize';
import {PaymentActionType} from '../../actionTypes';

const paymentAction = require('../../actions/main/PaymentAction');
const sysConst = require('../../util/SysConst');
const formatUtil = require('../../util/FormatUtil');

class Payment extends React.Component {

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
            this.props.changeConditionPaymentType(null);
            this.props.setConditionPaymentUser('');
            this.props.setConditionBindPhone('');
            this.props.setConditionOrder('');
            this.props.setConditionCreatedOnStart('');
            this.props.setConditionCreatedOnEnd('');
        }
        this.props.getPaymentList();
    }

    /**
     * 更新 检索条件：编号
     */
    changeConditionNo = (event) => {
        this.props.setConditionNo(event.target.value);
    };

    /**
     * 更新 检索条件：支付人
     */
    changeConditionPaymentUser = (event) => {
        this.props.setConditionPaymentUser(event.target.value);
    };

    /**
     * 更新 检索条件：绑定手机
     */
    changeConditionBindPhone = (event) => {
        this.props.setConditionBindPhone(event.target.value);
    };

    /**
     * 更新 检索条件：关联订单
     */
    changeConditionOrder = (event) => {
        this.props.setConditionOrder(event.target.value);
    };

    /**
     * 更新 检索条件：支付时间(始)
     */
    changeConditionCreatedOnStart = (event, value) => {
        this.props.setConditionCreatedOnStart(value);
    };

    /**
     * 更新 检索条件：支付时间(始)
     */
    changeConditionCreatedOnEnd = (event, value) => {
        this.props.setConditionCreatedOnEnd(value);
    };

    /**
     * 查询支付记录列表
     */
    queryPaymentList = () => {
        // 默认第一页
        this.props.setStartNumber(0);
        this.props.getPaymentList();
    };

    /**
     * 上一页
     */
    preBtn = () => {
        this.props.setStartNumber(this.props.paymentReducer.start - (this.props.paymentReducer.size - 1));
        this.props.getPaymentList();
    };

    /**
     * 下一页
     */
    nextBtn = () => {
        this.props.setStartNumber(this.props.paymentReducer.start + (this.props.paymentReducer.size - 1));
        this.props.getPaymentList();
    };

    /**
     * 显示退款模态画面
     */
    showRefundModal = (event, paymentId) => {
        console.log('showRefundModal paymentId' , paymentId);
        // this.props.setUserId(this.props.match.params.id);
        // this.props.setCarNo(carId);
        // this.props.setPlateNum(plateNum);
        // this.props.getQRCode();
        // $('#carQRCodeModal').modal('open');
    };

    render() {
        const {paymentReducer, changeConditionPaymentType} = this.props;
        return (
            <div>
                {/* 标题部分 */}
                <div className="row">
                    <div className="input-field col s12 page-title">
                        <span className="margin-left10">支付管理</span>
                        <div className="divider custom-divider margin-top10"/>
                    </div>
                </div>

                {/* 上部分：检索条件输入区域 */}
                <div className="row grey-text text-darken-1">
                    <div className="col s11 search-condition-box">

                        {/* 查询条件：第一行 */}
                        <div>
                            {/* 查询条件：支付编号 */}
                            <Input s={3} label="支付编号" value={paymentReducer.conditionNo} onChange={this.changeConditionNo}/>

                            {/* 查询条件：支付类型 */}
                            <div className="input-field col s3">
                                <Select
                                    options={sysConst.PAYMENT_TYPE}
                                    onChange={changeConditionPaymentType}
                                    value={paymentReducer.conditionPaymentType}
                                    isSearchable={false}
                                    placeholder={"请选择"}
                                    styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                    isClearable={true}
                                />
                                <label className="active">支付类型</label>
                            </div>

                            <Input s={3} label="支付人" value={paymentReducer.conditionPaymentUser} onChange={this.changeConditionPaymentUser}/>

                            {/* 查询条件：绑定手机 */}
                            <Input s={3} label="绑定手机" value={paymentReducer.conditionBindPhone} onChange={this.changeConditionBindPhone}/>

                        </div>

                        {/* 查询条件：第二行 */}
                        <div>
                            {/* 查询条件：关联订单 */}
                            <Input s={6} label="关联订单" value={paymentReducer.conditionOrder} onChange={this.changeConditionOrder}/>

                            {/* 查询条件：支付时间(始) */}
                            <div className="custom-input-field col s3">
                                <Input s={12} label="支付时间(始)" type='date' options={sysConst.DATE_PICKER_OPTION} value={paymentReducer.conditionCreatedOnStart} onChange={this.changeConditionCreatedOnStart}/>
                                <span className="mdi data-icon mdi-table-large"/>
                            </div>

                            {/* 查询条件：支付时间(终) */}
                            <div className="custom-input-field col s3">
                                <Input s={12} label="支付时间(终)" type='date' options={sysConst.DATE_PICKER_OPTION} value={paymentReducer.conditionCreatedOnEnd} onChange={this.changeConditionCreatedOnEnd}/>
                                <span className="mdi data-icon mdi-table-large"/>
                            </div>
                        </div>
                    </div>

                    {/* 查询按钮 */}
                    <div className="col s1">
                        <a className="btn-floating btn-large waves-light waves-effect btn margin-top40 query-btn" onClick={this.queryPaymentList}>
                            <i className="mdi mdi-magnify"/>
                        </a>
                    </div>
                </div>

                {/* 下部分：检索结果显示区域 */}
                <div className="row">
                    <div className="col s12">

                        <div className="divider custom-divider"/>
                        <table className="fixed-table bordered striped">
                            <thead className="blue-grey lighten-5">
                            <tr className="grey-text text-darken-2">
                                <th>支付编号</th>
                                <th>关联订单</th>
                                <th>支付人</th>
                                <th>绑定手机</th>
                                <th className="center">支付类型</th>
                                <th className="right-align padding-right50">金额</th>
                                <th className="center">支付时间</th>
                                <th className="right-align padding-right50">操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                paymentReducer.paymentArray.map(function (item) {
                                    return (
                                        <tr className="grey-text text-darken-1">
                                            <td>{item.id}</td>
                                            <td>{item.order_id}</td>
                                            <td>{item.user_name}</td>
                                            <td>{item.phone}</td>
                                            <td className="center">{sysConst.PAYMENT_TYPE[item.type].label}</td>
                                            <td className={`right-align padding-right50 ${item.total_fee < 0 ?"red-font":"blue-text"}`}>{formatUtil.formatNumber(item.total_fee,2)}</td>
                                            <td className="center">{formatUtil.getDateTime(item.created_on)}</td>
                                            <td className="operation right-align padding-right30">
                                                {item.type === 1 &&
                                                <span className="refund-btn margin-right20" onClick={() => {this.showRefundModal(event,item.id)}}>
                                                    <span className="fz12">退款</span>
                                                </span>}
                                                <Link to={{pathname: '/payment/' + item.id}}>
                                                    <i className="mdi mdi-table-search light-blue-text"/>
                                                </Link>
                                            </td>
                                        </tr>
                                    )
                                },this)
                            }
                            {paymentReducer.paymentArray.length === 0 &&
                            <tr className="grey-text text-darken-1">
                                <td className="no-data-tr" colSpan="8">暂无数据</td>
                            </tr>}
                            </tbody>
                        </table>
                    </div>

                    {/* 上下页按钮 */}
                    <div className="col s12 margin-top10">
                        <div className="right">
                            {paymentReducer.start > 0 &&
                            <a className="waves-light waves-effect custom-blue btn margin-right10" id="pre" onClick={this.preBtn}>
                                上一页
                            </a>}
                            {paymentReducer.dataSize >= paymentReducer.size &&
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
        paymentReducer: state.PaymentReducer,
        fromDetail: fromDetail
    }
};

const mapDispatchToProps = (dispatch) => ({
    getPaymentList: () => {
        dispatch(paymentAction.getPaymentList())
    },
    setStartNumber: (start) => {
        dispatch(PaymentActionType.setStartNumber(start))
    },
    setConditionNo: (value) => {
        dispatch(PaymentActionType.setConditionNo(value))
    },
    changeConditionPaymentType: (value) => {
        dispatch(PaymentActionType.setConditionPaymentType(value))
    },
    setConditionPaymentUser: (value) => {
        dispatch(PaymentActionType.setConditionPaymentUser(value))
    },
    setConditionBindPhone: (value) => {
        dispatch(PaymentActionType.setConditionBindPhone(value))
    },
    setConditionOrder: (value) => {
        dispatch(PaymentActionType.setConditionOrder(value))
    },
    setConditionCreatedOnStart: (value) => {
        dispatch(PaymentActionType.setConditionCreatedOnStart(value))
    },
    setConditionCreatedOnEnd: (value) => {
        dispatch(PaymentActionType.setConditionCreatedOnEnd(value))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Payment)